'use strict';

var express = require('express');
var passport = require('passport');
var router = express.Router();
var Group = require('../models/group.js');
var Banner = require('../models/banner.js');
var Event = require('../models/event.js');
var User = require('../models/user.js');
var Suggestion = require('../models/suggestion.js');



/* GET home page. */
router.get('/', function(req, res, next) {
    req.session.returnTo = req.path;
    let user = (req.user ? req.user : { username: "", email: ""}) 

    res.render('index', { title: 'Ravie', user : user });
});

router.get('/register', function(req, res) {
    res.render('register', { title: 'Ravie' });
});

router.post('/register', function(req, res) {
    User.register(new User({ username : req.body.username, email: req.body.email }), req.body.password, function(err, user) {
        if (err) {
            return res.render('register', { user : user, error : err.message});
        }

        passport.authenticate('local')(req, res, function () {
            res.redirect(req.session.returnTo || '/');
        });
    });
});

router.get('/login', function(req, res) {
    res.render('login', { title: "Ravie", user : req.user });
});

router.post('/login', function(req, res) {
    passport.authenticate('local', function(err, user, info) {
        if(err){
            console.log("Error");
            console.log(err);
            res.redirect("/uh-oh");
        }
        if(!user) {
            res.render('login', { title: "Ravie", error: "Username and password combination failed."});
        }
        else{
            req.logIn(user, function(err) {
                if(err){
                    console.log("Error");
                    console.log(err);
                    res.redirect("/uh-oh");
                }
                return res.redirect(req.session.returnTo || '/');
            })
        }
    })(req, res);
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect(req.session.returnTo || '/');
});


router.get(/\/ajax\/userExists\/(.+)\/?/, function(req, res) {
    User.findOne(
        {
            "username" : req.params[0]
        },
        function(err, results){
            res.send(!!results);
    });
});

router.post(/\/ajax\/groupExists/, function(req, res) {
    Group.findOne(
        {
            "url" : req.body.name
        },
        function(err, results){
            res.send(!!results);
    });
});

router.get('/ajax/getBannerImages', function(req, res, next) {
    Banner.find(
        {},
        function(err, results){
            if (err) {
                console.log("Error");
                console.log(err);
                res.redirect("/uh-oh");
            }
            res.send(results);
    });
});
router.post('/suggestion', function(req, res, next) {
    var newSuggestion = new Suggestion({
        sentiment: req.body.sentiment,
        suggestion: req.body.suggestion,
        user: req.user ? req.user.username : "anonymous" 
    });
    newSuggestion.save(function(err) {
        if (err) {
            console.log("Error");
            console.log(err);
            res.send("Uh oh!");
        }
    });
});


router.get('/mygroups', function(req, res, next) {
    req.session.returnTo = req.path;
    if(req.user){
        Group.find(
            {
                members: { $in: [req.user.username] }
            },
            "name url description",
            function(err, results){
                if (err) {
                    console.log("Error");
                    console.log(err);
                    res.redirect("/uh-oh");
                }
                res.render('mygroups', { title: "My Groups", user: req.user, groups: results });
        });
    }
    else {
        return res.redirect('login');
    }
});

router.get('/uh-oh', function(req, res, next) {
    let user = (req.user ? req.user : { username: "", email: ""}) 

    res.render('uh-oh', { title: "Ravie", user: user });
});

// Group page 
router.get(/^\/([^\/]+)\/?$/, function(req, res, next) {
    req.session.returnTo = req.path;
    let user = (req.user ? req.user : { username: "", email: ""}) 
    Group.findOne({
            "url": req.params[0]
        },
        function (err, results){
            if (err) {
                console.log("Error");
                console.log(err);
                res.redirect("/uh-oh");
            }
            if ( results !== null){

                if ( results.visibility !== "hidden" || results.members.indexOf(user.username) !== -1){
                    res.render('group', { title: results.name, group: true, currentUrl: req.params[0], user: user});
                }
                else{
                    res.render('404', { title: "Ravie", user: user });
                }
            }
            else {
                res.render('404', { title: "Ravie", user: user });
            }
    });
});
router.post(/newGroup/, function(req, res, next) {
    Group.findOne(
        {
            $or: [
                {"url" : req.body.url},
                {"name": req.body.name} 
            ]
        },
        function(err, results){
            if(!!results) {
                console.log("Error");
                console.log("Group already exists");
                res.redirect("/uh-oh");
            }
            else {
                if(!req.user){
                    console.log("Error");
                    console.log("Someone tried to make a group without logging in.");
                    res.redirect("/uh-oh");
                }
                let newUrl = req.body.name.toLowerCase().replace(/ /g, "_").replace(/[^a-z0-9_]/g,"");
                var newGroup = new Group({
                    name: req.body.name,
                    url: newUrl,
                    description: req.body.description,
                    visibility: req.body.visibility,
                    postpolicy: req.body.postpolicy,
                    owner: req.user.username,
                    admins: [req.user.username],
                    members: [req.user.username]
                });
                newGroup.save(function(err) {
                    if (err) {
                        console.log("Error");
                        console.log(err);
                        res.redirect("/uh-oh");
                    }
                });
                res.redirect(`/${newUrl}`);
            }
    });
});

router.post(/^\/(.*)\/new/, function(req, res, next) {
    let dateStart = new Date(req.body.date);
    let dateEnd = new Date(req.body.date);


    let dateRegex = /(1[012]|[1-9]):([0-5][0-9]) ([ap]m)/;
    let matchData;
    if(matchData = dateRegex.exec(req.body.timeStart)){
        // If destructing was supported I'd do this
        // let [sGarbage, sHours, sMinutes, sAMPM, ...sRest] = dateRegex.exec(req.body.timeStart) || [];
        dateStart.setHours(Number(matchData[1]) + (matchData[3] === "pm" ? 12 : 0), matchData[2]);
    }
    else{
        console.log("Error");
        console.log("Invalid date for date start");
        res.redirect("/uh-oh");
    }

    if(matchData = dateRegex.exec(req.body.timeEnd)){
        // If destructing was supported I'd do this
        // let [sGarbage, sHours, sMinutes, sAMPM, ...sRest] = dateRegex.exec(req.body.timeStart) || [];

        dateEnd.setHours(Number(matchData[1]) + (matchData[3] === "pm" ? 12 : 0), matchData[2]);
    }
    else{
        console.log("Error");
        console.log("Invalid date for date end");
        res.redirect("/uh-oh");
    }

    var newEvent = new Event({
        name: req.body.name,
        dateStart: dateStart,
        dateEnd: dateEnd,
        description: req.body.description.replace(/\n/g, "<br>"),
        banner: req.body['banner-picker'],
        location: req.body.location,
        rsvp: req.body.rsvp,
        owner: req.user.username || "anonymous",
        group: req.body.group
    });
    newEvent.save(function(err) {
        if (err) {
            console.log("Error");
            console.log(err);
            res.redirect("/uh-oh");
        }
    });
    res.redirect("/" + req.params[0]);
});

router.get(/^\/(.*)\/getEvents/, function(req, res, next) {
    var after = new Date();
    if(req.query.after){
        var after = new Date(req.query.after);
    }
    Event.find({
            group: req.params[0],
            dateEnd: {$gt: after },
        }).sort("dateEnd").exec(function(err, events){
            if (err) {
                console.log("Error");
                console.log(err);
                res.redirect("/uh-oh");
            }
            else {
                res.send(events);
            }
        });
});

// 404
router.get(/.+/, function(req, res, next) {
    let user = (req.user ? req.user : { username: "", email: ""}) 
    res.render('404', { title: "Ravie", user: user });
});

module.exports = router;
