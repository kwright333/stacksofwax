let mysql = require('mysql');
let db = require('../db');
const ejs = require('ejs');

exports.search = async function (req, res) {
    const searchText = `%${req.body.searchText}%`;
    
    const vinyls = await db.executeQuery(`SELECT * FROM vinyl WHERE album LIKE ${mysql.escape(searchText)}`);
    const vinylCollections = await db.executeQuery(`SELECT * FROM vinyl_collection  WHERE vinyl_collection_name LIKE ${mysql.escape(searchText)}`);

    let searchResults = {
        vinyls: [],
        collections: []
    };
    for (const vinyl of vinyls) {
        searchResults.vinyls.push({
            album: vinyl.album,
            art: vinyl.album_art,
            artist: vinyl.artist,
            vinylId: vinyl.vinyl_id,
            likeCount: vinyl.like_count
        });
    }

    for (const collection of vinylCollections) {
        searchResults.collections.push({
            collectionName: collection.vinyl_collection_name,
            description: collection.description,
            likeCount: collection.like_count,
            id: collection.vinyl_collection_id
        });
    }

    const responseContent = await ejs.renderFile('views/components/search-result.ejs', { vinyls: searchResults.vinyls, collections: searchResults.collections });

    res.send(responseContent); 
}   