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
    password: 'apples1!',
    database: 'stacks_of_wax'
});



app.get('/', function (req, res) {
    res.send("index.html")
});

app.get('/data', function (req, res) {
    connection.connect();
    connection.query(`SELECT * FROM vinyl`, function (error, results, fields) {
        if (error) throw error;
        console.log('The solution is: ', results);
        res.send(results)
    });
    connection.end();
});

app.listen(3000);