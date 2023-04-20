let mysql = require('mysql');

let express = require('express');
let app = express();
const PORT = 3000;

const path = require("path");
app.use(express.json());
app.use(express.static("static"));

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'stacks_of_wax',
    port: 3306
});

connection.connect();

app.get('/', function (req, res) {
    res.render("index.html")
});

app.get('/vinyls', function (req, res) {
    connection.query(`SELECT * FROM vinyl`, function (error, results, fields) {
        if (error) throw error;
        console.log('The solution is: ', results);
        res.send(results)
    });
});

app.get('/vinyl-collections', function (req, res) {
    connection.query(`SELECT * FROM vinyl_collection`, function (error, results, fields) {
        if (error) throw error;
        console.log('The solution is: ', results);
        res.send(results)
    });
});

app.get('/vinyl-collection/:id', function (req, res) {
    connection.query(`SELECT * FROM vinyl_collection WHERE vinyl_collection_id = '${req.params.id}'`, function (error, results, fields) {
        if (error) throw error;
        console.log('The solution is: ', results);
        res.send(results)
    });
});

app.listen(3000);