let vinyls = require("./api/vinyls");
let vinylCollections = require("./api/vinyl-collections");
let member = require("./api/member");
let search = require("./api/search");
const createSession = require("./db").createSession;
var ensureLogIn = require('connect-ensure-login').ensureLoggedIn;

var ensureLoggedIn = ensureLogIn();

var passport = require('passport');
var LocalStrategy = require('passport-local');
var crypto = require('crypto');
var csrf = require('csurf');
var db = require('./db');

passport.use(new LocalStrategy({
    usernameField: "email"
}, function verify(email, password, cb) {
    db.executeQueryWithCallback('SELECT * FROM members WHERE email = ?', [email], function (err, row) {
        if (err) { return cb(err); }
        if (!row) { return cb(null, false, { message: 'Incorrect username or password.' }); }

        crypto.pbkdf2(password, row[0].salt, 310000, 32, 'sha256', function (err, hashedPassword) {
            if (err) { return cb(err); }
            if (!crypto.timingSafeEqual(row[0].hash_password, hashedPassword)) {
                return cb(null, false, { message: 'Incorrect username or password.' });
            }
            return cb(null, row[0]);
        });
    });
}));

passport.serializeUser(function (user, cb) {
    process.nextTick(function () {
        cb(null, { id: user.member_id, username: user.username, email: user.email });
    });
});

passport.deserializeUser(function (user, cb) {
    process.nextTick(function () {
        return cb(null, user);
    });
});

let express = require('express');
var bodyParser = require('body-parser')

let app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static("static"));
app.set('view engine', 'ejs')

app.use(createSession());
app.use(csrf());
app.use(passport.authenticate('session'));

app.use(function (req, res, next) {
    var msgs = req.session.messages || [];
    res.locals.messages = msgs;
    res.locals.hasMessages = !!msgs.length;
    req.session.messages = [];
    next();
});
app.use(function (req, res, next) {
    res.locals.csrfToken = req.csrfToken();
    next();
});

//////////////////////////////////////////////////////
//                 Web Pages Routes                 //
//////////////////////////////////////////////////////

// Creates a route that renders static/index.ejs
app.get('/', vinyls.getHomePage);

// Creates a route that renders views/vinyls.ejs
app.get('/vinyls', vinyls.getVinylsPage);
app.get('/vinyls/:id', vinyls.getVinylPage);
app.get('/members/:id', ensureLoggedIn, member.renderMemberDetails)
app.get('/collections', vinylCollections.renderVinylCollectionsPage)
app.get('/collections/:id', vinylCollections.renderVinylCollectionsPage)
app.get('/register', member.renderRegisterPage)
app.get('/login', member.renderLoginPage)


//////////////////////////////////////////////////////
//                API Routes                        //
//////////////////////////////////////////////////////

const router = express.Router()
router.use(express.json());
router.use(bodyParser.urlencoded({ extended: true }))
router.use(csrf());
router.use(passport.authenticate('session'));

router.use(function (req, res, next) {
    var msgs = req.session.messages || [];
    res.locals.messages = msgs;
    res.locals.hasMessages = !!msgs.length;
    req.session.messages = [];
    next();
});
router.use(function (req, res, next) {
    res.locals.csrfToken = req.csrfToken();
    next();
});

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
// router.post('/login', member.login);
router.get('/member/:id', member.getMemberDetails);
router.post('/login/password', passport.authenticate('local', {
    successReturnToOrRedirect: '/',
    failureRedirect: '/login',
    failureMessage: true
}));

router.post('/logout', function (req, res, next) {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

///////////////////
// Search routes //
///////////////////
router.post('/search', search.search)

app.use('/api', router);

app.listen(3000);

