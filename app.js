let vinyls = require("./api/vinyls")
let vinylCollections = require("./api/vinyl-collections")
let member = require("./api/member")
const createSession = require("./db").createSession;

let express = require('express');
var bodyParser = require('body-parser')

let app = express();

app.use(express.json());
app.use(express.static("static"));
app.set('view engine', 'ejs')

app.use(createSession());

function logPath(req, res, next) {
    console.log(req.url);
    next();
}
app.use(logPath);

// Example of how to check if someone is logged in
function checkLogin(req, res, next) {
    if (!req.session.loggedIn && !req.url.includes("api")) {
        res.redirect('login.html');
    } else {
        next();
    }
}

//////////////////////////////////////////////////////
//                 Web Pages Routes                 //
//////////////////////////////////////////////////////

// Creates a route that renders static/index.ejs
app.get('/', vinyls.getHomePage);

// Creates a route that renders views/vinyls.ejs
app.get('/vinyls', vinyls.getVinylsPage);
app.get('/members/:id', member.renderMemberDetails)
app.get('/collections', vinylCollections.renderVinylCollectionsPage)


//////////////////////////////////////////////////////
//                API Routes                        //
//////////////////////////////////////////////////////

const router = express.Router()
router.use(express.json());
router.use(bodyParser.urlencoded({ extended: false }))

///////////////////
// Vinyls routes //
///////////////////
router.get('/vinyls', vinyls.getAllVinyls);
router.get('/vinyls/top-rated', vinyls.getTopRatedVinyls);
router.get('/vinyls/genres/:genre', vinyls.getVinylsByGenre);
router.get('/vinyls/by-genre/:genre', vinyls.renderVinylsByGenre);
router.get('/vinyls/by-artist/:artist', vinyls.renderVinylsByArtist);
router.get('/vinyls/mostLiked', vinyls.renderVinylsByMostLiked);
router.get('/vinyls/leastLiked', vinyls.renderVinylsByLeastLiked);
router.post(`/vinyls/:id/like`, vinyls.likeVinyl);

/////////////////////////////
//Vinyl-collections routes //
/////////////////////////////
const resourceName = "vinyl-collections";

router.get(`/${resourceName}`, vinylCollections.getAllVinylCollections);
router.get(`/${resourceName}/top-rated`, vinylCollections.getTopRatedVinylCollections);
router.get(`/${resourceName}/:id/comments`, vinylCollections.getVinylCollectionComments);
router.post(`/${resourceName}`, vinylCollections.createVinylCollection);
router.put(`/${resourceName}`, vinylCollections.updateVinylCollection);
router.post(`/${resourceName}/:id/comment`, vinylCollections.createVinylCollectionComment);
router.post(`/${resourceName}/:id/items`, vinylCollections.addVinylsToCollection);
router.delete(`/${resourceName}/:id/items`, vinylCollections.removeVinylsFromCollection);
router.post(`/${resourceName}/:id/like`, vinylCollections.likeVinylCollection);
router.get(`/${resourceName}/:id`, vinylCollections.getVinylCollectionById);

///////////////////
// Member routes //
///////////////////
// Create a route for users to register
router.post('/register', member.registerNewMember);
router.post('/login', member.login);
router.get('/member/:id', member.getMemberDetails);

router.use(logPath);

app.use('/api', router);

app.listen(3000);

