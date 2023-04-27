let db = require('../db');
const ejs = require('ejs');
const helper = require('./helper');

exports.getVinylsPage = async function (req, res) {
    const vinyls = await db.executeQuery(`SELECT * FROM vinyl`);
    const genres = await db.executeQuery(`SELECT DISTINCT genre FROM vinyl`);
    const artists = await db.executeQuery(`SELECT DISTINCT artist FROM vinyl`);

    let memberId = helper.getMemberId(req);
    
    res.render("vinyls.ejs", { vinyls, genres, artists, memberId, filtering: true } )
}

exports.getVinylPage = async function (req, res) {
    const vinyls = await db.executeQuery(`SELECT * FROM vinyl WHERE vinyl_id = '${req.params.id}'`);

    let memberId = helper.getMemberId(req);
    
    res.render("vinyls.ejs", { vinyls, memberId, filtering: false } )
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
    const topRatedVinylCollections = await db.executeQuery(`SELECT * FROM vinyl_collection ORDER BY like_count DESC LIMIT 3`);

    let memberId = helper.getMemberId(req);
    
    const vinylCollectionsPromises = await topRatedVinylCollections.map(async function(vinylCollection) {
        const vinylListResults = await db.executeQuery(`SELECT vinyl_id FROM vinyl_collections_items WHERE vinyl_collection_id = ${vinylCollection.vinyl_collection_id}`);
        const collectionComments = await db.executeQuery(`SELECT comment_id, comment, first_name, last_name, vinyl_collection_id FROM comments JOIN members ON members.member_id = comments.member_id WHERE vinyl_collection_id = ${vinylCollection.vinyl_collection_id}`);

        return {
            ...vinylCollection,
            vinylList: vinyls.filter(x => vinylListResults.find(y => y.vinyl_id == x.vinyl_id) != undefined).map(vinyl => ({ vinylId: vinyl.vinyl_id, album: vinyl.album, art: vinyl.album_art })),
            collectionComments
        }
    });
    const vinylCollections = await Promise.all(vinylCollectionsPromises);

    res.render("index.ejs", { vinyls, topVinyls, memberId, topRatedVinylCollections: vinylCollections } )
}

exports.likeVinyl = async function (req, res) {
    if (!req.session.loggedIn) {
        res.redirect('/login');
    }

    let memberId = helper.getMemberId(req);

    const result = await db.executeQuery(`UPDATE vinyl SET like_count = like_count + 1 WHERE vinyl_id = ${req.params.id}`);
    const result1 = await db.executeQuery(`INSERT INTO rating VALUES (null, ${memberId}, ${req.params.id}, null)`);
    res.send({
        success: true
    });
}