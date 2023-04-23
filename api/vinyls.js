let db = require('../db')

exports.getVinylsPage = async function (req, res) {
    const vinyls = await db.executeQuery(`SELECT * FROM vinyl`);
    res.render("vinyls.ejs", { vinyls } )
}

exports.getAllVinyls = async function (req, res) {
    const results = await db.executeQuery(`SELECT * FROM vinyl`);
    res.send(results)
}

exports.getTopRatedVinyls = async function (req, res) {
    const results = await db.executeQuery(`SELECT * FROM vinyl ORDER BY like_count DESC LIMIT 5`);
    res.send(results)
}

exports.getVinylsByGenre = async function (req, res) {
    const results = await db.executeQuery(`SELECT * FROM vinyl WHERE genre = '${req.params.genre}'`);
    res.send(results)
}

exports.getHomePage = async function (req, res) {
    const vinyls = await db.executeQuery(`SELECT * FROM vinyl`);
    res.render("index.ejs", { vinyls } )
}