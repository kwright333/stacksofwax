let db = require('../db')
let mysql = require('mysql');

exports.registerNewMember = async function (req, res) {
    console.log('body', req.body);
    
    const details = [
        mysql.escape(req.body.firstName),
        mysql.escape(req.body.lastName),
        mysql.escape(req.body.age),
        mysql.escape(req.body.email),
        mysql.escape(req.body.password),
        mysql.escape(req.body.country),
        mysql.escape(req.body.gender)
    ];
    const result = await db.executeQuery(`INSERT INTO members VALUES (null, ${details.join(',')})`);
    res.send(result);
}

exports.login = async function (req, res) {
    console.log('body', req.body);
    
    const details = [
        mysql.escape(req.body.email),
        mysql.escape(req.body.password),
    ];
    const result = await db.executeQuery(`SELECT member_id FROM members WHERE email = ${details[0]} AND password = ${details[1]}`);

    if (result.length === 1) {
        req.session.loggedIn = true;
        req.session.memberId = result[0].member_id;


        res.redirect("/");
    } else {
        res.send({
            success: false,
            memberId: null
        });
    }
}

exports.getMemberDetails = async function (req, res) {
    console.log('body', req.body);
    
    const result = await db.executeQuery(`SELECT member_id, first_name, last_name, age, email, country, gender FROM members WHERE member_id = ${req.params.id}`);

    res.send(result);
}

exports.renderMemberDetails = async function (req, res) {
    if (!req.session.loggedIn) {
        res.redirect('login.html');
    }

    const memberDetails = await db.executeQuery(`SELECT member_id, first_name, last_name, age, email, country, gender FROM members WHERE member_id = ${req.params.id}`);
    const vinylCollectionsResults = await db.executeQuery(`SELECT * FROM vinyl_collection WHERE member_id = '${req.params.id}' ORDER BY vinyl_collection_id DESC`);
    const vinyls = await db.executeQuery(`SELECT vinyl_id, album, album_art FROM vinyl`);
    
    let vinylRemoveList = [];

    const vinylCollectionsPromises = await vinylCollectionsResults.map(async function(vinylCollection) {
        const vinylListResults = await db.executeQuery(`SELECT vinyl_id FROM vinyl_collections_items WHERE vinyl_collection_id = ${vinylCollection.vinyl_collection_id}`);
        const collectionComments = await db.executeQuery(`SELECT comment_id, comment, first_name, last_name, vinyl_collection_id FROM comments JOIN members ON members.member_id = comments.member_id WHERE vinyl_collection_id = ${vinylCollection.vinyl_collection_id}`);

        return {
            ...vinylCollection,
            vinylList: vinyls.filter(x => vinylListResults.find(y => y.vinyl_id == x.vinyl_id) != undefined).map(vinyl => ({ vinylId: vinyl.vinyl_id, album: vinyl.album, art: vinyl.album_art })),
            collectionComments
        }
    });
    const vinylCollections = await Promise.all(vinylCollectionsPromises);

    res.render("members.ejs", { memberDetails: memberDetails[0], vinylCollections, vinyls, showEdit: true } );
}