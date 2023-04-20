let mysql = require('mysql');

let express = require('express');
var bodyParser = require('body-parser')

let app = express();

app.use(express.json());

app.use(express.static("static"));
app.set('view engine', 'ejs')

const connectionOptions = {
    host: 'localhost',
    user: 'root',
    database: 'stacks_of_wax',
    port: 3306
};

if (process.env.MYSQL_PASSWORD) {
    connectionOptions.password = process.env.MYSQL_PASSWORD;
}

var connection = mysql.createConnection(connectionOptions);
connection.connect();

async function executeQuery(query) {
    return await new Promise((resolve, reject) => {
        connection.query(query, function (error, results, fields) {
            if (error) reject(error);
            console.log('The solution is: ', results);
            resolve(results);
        });
    })
}

// Creates a route that renders static/index.html
app.get('/', async function (req, res) {
    res.render("index.html")
});

// Creates a route that renders views/vinyls.ejs
app.get('/vinyls', async function (req, res) {
    const vinyls = await executeQuery(`SELECT * FROM vinyl`);
    res.render("vinyls.ejs", { vinyls } )
});

const router = express.Router()
router.use(express.json());
router.use(bodyParser.urlencoded({ extended: false }))

router.get('/vinyls', async function (req, res) {
    const results = await executeQuery(`SELECT * FROM vinyl`);
    res.send(results)
});

router.get('/vinyl-collections', async function (req, res) {
    const results = await executeQuery(`SELECT * FROM vinyl_collection`);
    res.send(results)
});

// Uses route params to get vinyl collection id so it can use it in the SQL query
router.get('/vinyl-collection/:id', async function (req, res) {
    const results = await executeQuery(`SELECT * FROM vinyl_collection WHERE vinyl_collection_id = '${req.params.id}'`);
    res.send(results)
});

// Create a route for users to register
router.post('/register', async function (req, res) {
    console.log('body', req.body);
    
    const details = [
        connection.escape(req.body.firstName),
        connection.escape(req.body.lastName),
        connection.escape(req.body.age),
        connection.escape(req.body.email),
        connection.escape(req.body.password),
        connection.escape(req.body.country),
        connection.escape(req.body.gender)
    ];
    const result = await executeQuery(`INSERT INTO members VALUES (null, ${details.join(',')})`);
    res.send(result);
});

app.use('/api', router);

app.listen(3000);