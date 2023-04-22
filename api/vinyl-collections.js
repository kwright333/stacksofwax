let db = require('../db')

exports.getAllVinylCollections = async function (req, res) {
    const results = await db.executeQuery(`SELECT * FROM vinyl_collection`);
    res.send(results)
}

exports.getVinylCollectionById = async function (req, res) {
    const results = await db.executeQuery(`SELECT * FROM vinyl_collection WHERE vinyl_collection_id = '${req.params.id}'`);
    res.send(results)
}

exports.getTopRatedVinylCollections = async function (req, res) {
    const results = await db.executeQuery(`SELECT * FROM vinyl_collection WHERE ORDER BY like_count DESC LIMIT 5`);
    res.send(results);
}

exports.createVinylCollectionComment = async function (req, res) {
    const results = await db.executeQuery(`INSERT INTO comments VALUES (null, ${req.body.comment}, ${req.body.memberId}, ${req.body.vinylCollectionId})`);
    res.send(results);
}

exports.getVinylCollectionComments = async function (req, res) {
    const results = await db.executeQuery(`SELECT * FROM comments WHERE vinyl_collection_id = '${req.params.id}'`);
    res.send(results);
}