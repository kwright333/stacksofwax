let vinyls = require("./api/vinyls")
let vinylCollections = require("./api/vinyl-collections")
let member = require("./api/member")

let express = require('express');
var bodyParser = require('body-parser')

let app = express();

app.use(express.json());

app.use(express.static("static"));
app.set('view engine', 'ejs')


//////////////////////////////////////////////////////
//                 Web Pages Routes                 //
//////////////////////////////////////////////////////

// Creates a route that renders static/index.ejs
app.get('/', async function (req, res) {
    res.render("index.ejs")
});

// Creates a route that renders views/vinyls.ejs
app.get('/vinyls', vinyls.getVinylsPage);

//////////////////////////////////////////////////////
//                API Routes                        //
//////////////////////////////////////////////////////

const router = express.Router()
router.use(express.json());
router.use(bodyParser.urlencoded({ extended: false }))

// Vinyls routes //
router.get('/vinyls', vinyls.getAllVinyls);
router.get('/vinyls/top-rated', vinyls.getTopRatedVinyls);
router.get('/vinyls/genres/:genre', vinyls.getVinylsByGenre);


//Vinyl-collections routes //
router.get('/vinyl-collections', vinylCollections.getAllVinylCollections);
// Uses route params to get vinyl collection id so it can use it in the SQL query
router.get('/vinyl-collection/:id', vinylCollections.getVinylCollectionById);
router.get('/vinyl-collections/top-rated', vinylCollections.getTopRatedVinylCollections);
router.get('/vinyl-collection/:id/comments', vinylCollections.getVinylCollectionComments);
router.post('/vinyl-collection/:id/comment', vinylCollections.createVinylCollectionComment);

// Member routes //
// Create a route for users to register
router.post('/register', member.registerNewMember);
router.post('/login', member.login);

app.use('/api', router);

app.listen(3000);

