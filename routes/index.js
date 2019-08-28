var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

// ROOT
router.get("/", function(req, res){
    res.render("landing");
});

// REGISTER - shows register form
router.get("/register", function(req, res){
    res.render("register", {page: 'register'});
});

// REGISTER POST - handles new account logic
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    // checks if account will be admin role
    if(req.body.adminCode === process.env.ADMIN_CODE) {
        newUser.isAdmin = true;
    }
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register", {error: err.message});
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Successfully Signed Up! Nice to meet you " + req.body.username);
            res.redirect("/campgrounds");
        });
    });
});

// LOGIN - shows login form
router.get("/login", function(req, res){
    res.render("login", {page: 'login'});
});

// LOGIN POST - handles login logic
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/campgrounds", 
        failureRedirect: "/login",
        failureFlash: true,
        successFlash: 'Welcome to YelpCamp!'
    }), function(req, res){
});

// LOGOUT - handles logout logic
router.get("/logout", function(req, res){
    req.logOut();
    req.flash("success", "Successfully logged out.");
    res.redirect("/campgrounds");
});

module.exports = router;