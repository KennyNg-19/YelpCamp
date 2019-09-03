// Requiring modules
var express             = require("express"),
    app                 = express(),
    bodyParser          = require("body-parser"),
    mongoose            = require("mongoose"),
    passport            = require("passport"),
    LocalStrategy       = require("passport-local"),
    methodOverride      = require("method-override"),
    flash               = require("connect-flash"),
    cookieParser        = require("cookie-parser"),
    session             = require("express-session"),
    // load collections
    Campground          = require("./models/campground"),
    Comment             = require("./models/comment"),
    User                = require("./models/user");


// Requiring routes
var commentRoutes       = require("./routes/comments"),
    campgroundRoutes    = require("./routes/campgrounds"),
    indexRoutes         = require("./routes/index");

// Assigning mongoose promise library and connecting to db
mongoose.Promise = global.Promise;
const databaseUri = process.env.MONGODB_URI || "mongodb+srv://admin-kenny:1@cluster0-7phca.mongodb.net/yelp-campDB";
mongoose.connect(databaseUri, { useMongoClient: true })
      .then(() => console.log(`Database connected`))
      .catch(err => console.log(`Database connection error: ${err.message}`));

// Accounting for deprecated mongoose settings
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
app.use(bodyParser.urlencoded({extended: true}));


app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(cookieParser('secret'));

// Requiring moment
app.locals.moment = require("moment");

// Passport configuration
app.use(require("express-session")({
    secret: "Any string can go here!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// Setting up flash messages
app.use(flash());
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});

// Setting route prefixes so we don't have to type them out in /routes
app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port, function() {
  console.log("Server started on port " + port);
});
