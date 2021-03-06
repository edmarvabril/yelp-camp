var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var middleware = require("../middleware");

//ROOT ROUTE
router.get("/", function(req, res){
    res.render("landing");
});


//show register form
router.get("/register", function(req, res){
    if(req.isAuthenticated()){
        res.redirect("/campgrounds");
    }else{
        res.render("register");
    }
});
//handle sign up logic
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("error", err.message);
            return res.redirect("register");
        }
       passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to YelpCamp, "+user.username);
            res.redirect("/campgrounds");
       });
    });
});

//show login form
router.get("/login", function(req, res){
    res.render("login");
});

//handle login logic
router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }), function(req, res){
});

//logout route
router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "Successfully logged out.");
    res.redirect("/campgrounds");
});

module.exports = router;