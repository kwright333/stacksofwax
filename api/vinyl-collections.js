let db = require('../db')
let mysql = require('mysql');

exports.getAllVinylCollections = async function (req, res) {
    const results = await db.executeQuery(`SELECT * FROM vinyl_collection`);
    res.send(results)
}

exports.getVinylCollectionById = async function (req, res) {
    const results = await db.executeQuery(`SELECT * FROM vinyl_collection WHERE vinyl_collection_id = '${req.params.id}'`);
    res.send(results)
}

exports.getTopRatedVinylCollections = async function (req, res) {
    const results = await db.executeQuery(`SELECT * FROM vinyl_collection ORDER BY like_count DESC LIMIT 9`);
    res.send(results);
}

exports.createVinylCollection = async function (req, res) {
    const results = await db.executeQuery(`INSERT INTO vinyl-collection VALUES (null, ${req.body.memberId}, ${req.body.collectionName}, ${req.body.description}, 0)`);
    res.send({
        success: true
    });
}

exports.createVinylCollectionComment = async function (req, res) {
    const results = await db.executeQuery(`INSERT INTO comments VALUES (null, ${mysql.escape(req.body.comment)}, ${req.body.memberId}, ${req.body.vinylCollectionId})`);
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
    
    const result = await db.executeQuery(`UPDATE vinyl_collection SET like_count = like_count + 1 WHERE vinyl_collection_id = ${req.params.id}`);
    const result1 = await db.executeQuery(`INSERT INTO rating VALUES (null, ${req.body.memberId}, null, ${req.params.id})`);
    res.send({
        success: true
    });
}

exports.renderVinylCollectionsPage = async function (req, res) {
    const vinylCollections = await db.executeQuery(`SELECT * FROM vinyl_collection`);

    let memberId = null;
    if (req.session.memberId) {
        memberId = req.session.memberId;
    }
    
    res.render("collections.ejs", { vinylCollections, memberId } );
}

exports.renderVinylCollectionsForMember = async function (req, res) {
    const vinylCollections = await db.executeQuery(`SELECT * FROM vinyl_collection WHERE member_id = '${req.params.id}'`);

    let memberId = null;
    if (req.session.memberId) {
        memberId = req.session.memberId;
    }

    await ejs.renderFile('views/member-vinyl-collections.ejs', { vinylCollections });
    
    res.render("collections.ejs", { vinylCollections, memberId } );
}
