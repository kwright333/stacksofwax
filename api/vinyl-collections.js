let db = require('../db');
let mysql = require('mysql');
const ejs = require('ejs');

exports.getAllVinylCollections = async function (req, res) {
    const results = await db.executeQuery(`SELECT * FROM vinyl_collection`);
    res.send(results)
}

exports.getVinylCollectionById = async function (req, res) {
    const results = await db.executeQuery(`SELECT * FROM vinyl_collection WHERE vinyl_collection_id = '${req.params.id}'`);
    res.send(results)
}

exports.getTopRatedVinylCollections = async function (req, res) {
    const results = await db.executeQuery(`SELECT * FROM vinyl_collection ORDER BY like_count DESC LIMIT 3`);
    res.send(results);
}

exports.createVinylCollection = async function (req, res) {
    let memberId = null;
    if (req.session.memberId) {
        memberId = req.session.memberId;
    }

    const results = await db.executeQuery(`INSERT INTO vinyl_collection VALUES (null, ${memberId}, ${mysql.escape(req.body.collectionName)}, ${mysql.escape(req.body.description)}, 0)`);

    const vinylInserts = req.body.vinylIds.map(vinylId => `(${results.insertId}, ${vinylId})`).join(',');

    const insertResult = await db.executeQuery(`INSERT INTO vinyl_collections_items VALUES ${vinylInserts}`);
    res.send({
        success: true
    });
}

exports.updateVinylCollection = async function (req, res) {
    let memberId = null;
    if (req.session.memberId) {
        memberId = req.session.memberId;
    }

    const results = await db.executeQuery(`UPDATE vinyl_collection SET vinyl_collection_name = ${mysql.escape(req.body.collectionName)}, description = ${mysql.escape(req.body.description)} WHERE vinyl_collection_id = ${req.body.collectionId}`);

    const vinylInserts = req.body.vinylIds.map(vinylId => `(${req.body.collectionId}, ${vinylId})`).join(',');

    await db.executeQuery(`DELETE FROM vinyl_collections_items WHERE vinyl_collection_id = ${req.body.collectionId}`);
    const insertResult = await db.executeQuery(`INSERT INTO vinyl_collections_items VALUES ${vinylInserts}`);
    res.send({
        success: true
    });
}

exports.createVinylCollectionComment = async function (req, res) {
    let memberId = null;
    if (req.session.memberId) {
        memberId = req.session.memberId;
    }

    const results = await db.executeQuery(`INSERT INTO comments VALUES (null, ${mysql.escape(req.body.comment)}, ${memberId}, ${req.body.vinylCollectionId})`);
    res.send(results);
}

exports.getVinylCollectionComments = async function (req, res) {
    const results = await db.executeQuery(`SELECT * FROM comments WHERE vinyl_collection_id = '${req.params.id}'`);
    res.send(results);
}

exports.addVinylsToCollection = async function (req, res) {
    for (const vinylId of req.body.vinylIds) {
        const result = await db.executeQuery(`INSERT INTO vinyl_collections_items VALUES (${req.params.id}, ${vinylId})`);
    }
    res.send({
        success: true
    });
}

exports.removeVinylsFromCollection = async function (req, res) {
    for (const vinylId of req.body.vinylIds) {
        const result = await db.executeQuery(`DELETE FROM vinyl_collections_items WHERE vinyl_collection_id = (${req.params.id} and vinyl_id = ${vinylId})`);
    }
    res.send({
        success: true
    });
}

exports.likeVinylCollection = async function (req, res) {
    if (!req.session.loggedIn) {
        res.redirect('login.html');
    }

    let memberId = null;
    if (req.session.memberId) {
        memberId = req.session.memberId;
    }
    
    const result = await db.executeQuery(`UPDATE vinyl_collection SET like_count = like_count + 1 WHERE vinyl_collection_id = ${req.params.id}`);
    const result1 = await db.executeQuery(`INSERT INTO rating VALUES (null, ${memberId}, null, ${req.params.id})`);
    res.send({
        success: true
    });
}

exports.renderVinylCollectionsPage = async function (req, res) {
    let vinylCollectionsResults = null;
    if (req.params.id) {
        vinylCollectionsResults = await db.executeQuery(`SELECT * FROM vinyl_collection WHERE vinyl_collection_id = ${req.params.id}`);
    } else {
        vinylCollectionsResults = await db.executeQuery(`SELECT * FROM vinyl_collection ORDER BY vinyl_collection_id DESC`);
    }

    const vinyls = await db.executeQuery(`SELECT vinyl_id, album, album_art FROM vinyl`);
    
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

    let memberId = null;
    if (req.session.memberId) {
        memberId = req.session.memberId;
        req.session.loggedIn = true;
    } else {
        req.session.loggedIn = false;
    }
    
    res.render("collections.ejs", { vinylCollections, memberId, showEdit: false, vinyls, loggedIn: req.session.loggedIn } );
}

exports.renderVinylCollectionsForMember = async function (req, res) {
    const vinylCollections = await db.executeQuery(`SELECT * FROM vinyl_collection WHERE member_id = '${req.params.id}' ORDER BY vinyl_collection_id DESC`);

    let memberId = null;
    if (req.session.memberId) {
        memberId = req.session.memberId;
    }

    await ejs.renderFile('views/member-vinyl-collections.ejs', { vinylCollections });
    
    res.render("collections.ejs", { vinylCollections, memberId } );
}
