let db = require('../db')
const helper = require('./helper');

var crypto = require('crypto');

exports.registerNewMember = async function (req, res, next) {
    console.log('body', req.body);

    await db.executeQuery(`SET NAMES 'utf8mb4'`);

    var salt = crypto.randomBytes(16);
    crypto.pbkdf2(req.body.password, salt, 310000, 32, 'sha256', function (err, hashedPassword) {
        if (err) { return next(err); }
        const details = [
            req.body.firstName,
            req.body.lastName,
            req.body.age,
            req.body.email,
            req.body.country,
            req.body.gender,
            hashedPassword,
            salt
        ];

        db.executeQuery(`INSERT INTO members VALUES (null, ?,?,?,?,?,?,?,?)`, details)
        .then(result => {
            if (err) { return next(err); }
            var user = {
                id: result.insertId,
                username: req.body.email
            };
            req.login(user, function (err) {
                if (err) { return next(err); }
                res.redirect('/');
            });
        });
    });
}

exports.getMemberDetails = async function (req, res) {
    console.log('body', req.body);

    const result = await db.executeQuery(`SELECT member_id, first_name, last_name, age, email, country, gender FROM members WHERE member_id = ${req.params.id}`);

    res.send(result);
}

exports.renderMemberDetails = async function (req, res) {
    const memberDetails = await db.executeQuery(`SELECT member_id, first_name, last_name, age, email, country, gender FROM members WHERE member_id = ${req.params.id}`);
    const vinylCollectionsResults = await db.executeQuery(`SELECT * FROM vinyl_collection WHERE member_id = '${req.params.id}' ORDER BY vinyl_collection_id DESC`);
    const vinyls = await db.executeQuery(`SELECT vinyl_id, album, album_art FROM vinyl`);

    const vinylCollectionsPromises = await vinylCollectionsResults.map(async function (vinylCollection) {
        const vinylListResults = await db.executeQuery(`SELECT vinyl_id FROM vinyl_collections_items WHERE vinyl_collection_id = ${vinylCollection.vinyl_collection_id}`);
        const collectionComments = await db.executeQuery(`SELECT comment_id, comment, first_name, last_name, vinyl_collection_id FROM comments JOIN members ON members.member_id = comments.member_id WHERE vinyl_collection_id = ${vinylCollection.vinyl_collection_id}`);

        return {
            ...vinylCollection,
            vinylList: vinyls.filter(x => vinylListResults.find(y => y.vinyl_id == x.vinyl_id) != undefined).map(vinyl => ({ vinylId: vinyl.vinyl_id, album: vinyl.album, art: vinyl.album_art })),
            collectionComments
        }
    });
    const vinylCollections = await Promise.all(vinylCollectionsPromises);

    let memberId = helper.getMemberId(req);
    if (memberId) {
        req.session.loggedIn = true;
    } else {
        req.session.loggedIn = false;
    }

    res.render("members.ejs", { memberDetails: memberDetails[0], vinylCollections, vinyls, showEdit: true, loggedIn: req.session.loggedIn });
}

exports.renderRegisterPage = async function (req, res) {
    res.render("register.ejs")
}

exports.renderLoginPage = async function (req, res) {
    res.render("login.ejs")
}
