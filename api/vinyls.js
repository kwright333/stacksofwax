let db = require('../db')
const ejs = require('ejs')

exports.getVinylsPage = async function (req, res) {
    const vinyls = await db.executeQuery(`SELECT * FROM vinyl`);
    const genres = await db.executeQuery(`SELECT DISTINCT genre FROM vinyl`);
    const artists = await db.executeQuery(`SELECT DISTINCT artist FROM vinyl`);

    let memberId = null;
    if (req.session.memberId) {
        memberId = req.session.memberId;
    }
    
    res.render("vinyls.ejs", { vinyls, genres, artists, memberId } )
}

exports.getAllVinyls = async function (req, res) {
    const results = await db.executeQuery(`SELECT * FROM vinyl`);
    res.send(results)
}

exports.getTopRatedVinyls = async function (req, res) {
    const results = await db.executeQuery(`SELECT * FROM vinyl ORDER BY like_count DESC LIMIT 9`);
    res.send(results)
}

exports.getVinylsByGenre = async function (req, res) {
    const results = await db.executeQuery(`SELECT * FROM vinyl WHERE genre = '${req.params.genre}'`);
    res.send(results)
}

exports.renderVinylsByGenre = async function (req, res) {
    const vinyls = await db.executeQuery(`SELECT * FROM vinyl WHERE genre = '${req.params.genre}'`);

    const data = await ejs.renderFile('views/our-vinyls.ejs', { vinyls });
    res.send(data)
}

exports.renderVinylsByArtist = async function (req, res) {
    const vinyls = await db.executeQuery(`SELECT * FROM vinyl WHERE artist = '${req.params.artist}'`);

    const data = await ejs.renderFile('views/our-vinyls.ejs', { vinyls });
    res.send(data)
}

exports.renderVinylsByMostLiked = async function (req, res) {
    const vinyls = await db.executeQuery(`SELECT * FROM vinyl ORDER BY like_count DESC`);

    const data = await ejs.renderFile('views/our-vinyls.ejs', { vinyls });
    res.send(data)
}

exports.renderVinylsByLeastLiked = async function (req, res) {
    const vinyls = await db.executeQuery(`SELECT * FROM vinyl ORDER BY like_count ASC`);

    const data = await ejs.renderFile('views/our-vinyls.ejs', { vinyls });
    res.send(data)
}

exports.getHomePage = async function (req, res) {
    const vinyls = await db.executeQuery(`SELECT * FROM vinyl`);
    const topVinyls = await db.executeQuery(`SELECT * FROM vinyl ORDER BY like_count DESC LIMIT 9`);
    const topVinylCollections = await db.executeQuery(`SELECT * FROM vinyl_collection ORDER BY like_count DESC LIMIT 3`);

    let memberId = null;
    if (req.session.memberId) {
        memberId = req.session.memberId;
    }

    res.render("index.ejs", { vinyls, topVinyls, memberId, topVinylCollections } )
}

exports.likeVinyl = async function (req, res) {
    if (!req.session.loggedIn) {
        res.redirect('login.html');
    }

    let memberId = null;
    if (req.session.memberId) {
        memberId = req.session.memberId;
    }

    const result = await db.executeQuery(`UPDATE vinyl SET like_count = like_count + 1 WHERE vinyl_id = ${req.params.id}`);
    const result1 = await db.executeQuery(`INSERT INTO rating VALUES (null, ${memberId}, ${req.params.id}, null)`);
    res.send({
        success: true
    });
}