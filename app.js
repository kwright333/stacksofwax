let mysql = require('mysql');

let express = require('express');
let app = express();

app.use(express.json());
app.use(express.static("static"));
app.set('view engine', 'ejs')

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'stacks_of_wax',
    port: 3306
});

connection.connect();

// Creates a route that renders static/index.html
app.get('/', function (req, res) {
    res.render("index.html")
});

// Creates a route that renders views/vinyls.ejs
app.get('/vinyls', function (req, res) {
    connection.query(`SELECT * FROM vinyl`, function (error, results, fields) {
        if (error) throw error;
        console.log('The solution is: ', results);
        res.render("vinyls.ejs", { vinyls: results } )
    });
});

const router = express.Router()
router.use(express.json());

router.get('/vinyls', function (req, res) {
    connection.query(`SELECT * FROM vinyl`, function (error, results, fields) {
        if (error) throw error;
        console.log('The solution is: ', results);
        res.send(results)
    });
});

router.get('/vinyl-collections', function (req, res) {
    connection.query(`SELECT * FROM vinyl_collection`, function (error, results, fields) {
        if (error) throw error;
        console.log('The solution is: ', results);
        res.send(results)
    });
});

// Uses route params to get vinyl collection id so it can use it in the SQL query
router.get('/vinyl-collection/:id', function (req, res) {
    connection.query(`SELECT * FROM vinyl_collection WHERE vinyl_collection_id = '${req.params.id}'`, function (error, results, fields) {
        if (error) throw error;
        console.log('The solution is: ', results);
        res.send(results)
    });
});

app.use('/api', router);

app.listen(3000);