var express = require('express');
var passport = require('passport');
var router = express.Router();
var Group = require('../models/group.js');
var Banner = require('../models/banner.js');
var Event = require('../models/event.js');
var User = require('../models/user.js');


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Ravie', user : req.user });
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
    console.log("ayy");
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

router.get('/uh-oh', function(req, res, next) {
    res.render('uh-oh', { title: "Ravie" });
});

// Group page 
router.get(/^\/([^\/]+)\/?$/, function(req, res, next) {
    req.session.returnTo = req.path; 
    Group.find({
            "url": req.params[0]
        },
        function (err, results){
            if (err) {
                console.log("Error");
                console.log(err);
                res.redirect("/uh-oh");
            }
            if ( results.length ){
                res.render('group', { title: results[0].name, group: true, currentUrl: req.params[0], user: req.user});
            }
            else {
                res.render('404', { title: "Ravie", user : req.user });
            }
    });
});

router.post(/^\/(.*)\/new/, function(req, res, next) {
    var newEvent = new Event({
        name: req.body.name,
        date: req.body.date,
        timeStart: req.body.timeStart,
        timeEnd: req.body.timeEnd,
        description: req.body.description.replace(/\n/g, "<br>"),
        banner: req.body['banner-picker'],
        location: req.body.location,
        rsvp: req.body.rsvp,
        owner: "dustin",
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
    //var today = new Date("2/28/2016");
    Event.find({
            group: req.params[0],
            // $and: [
            //     {$or: [
            //         {date: {$gt: today}},
            //         {$and: [
            //             {date: {$gte: today}},
            //             {timeEnd: {$gte: "11:00 PM"}}
            //         ]}
            //     ]}
            // ]
        }).exec(function(err, events){
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
    res.render('404', { title: "Ravie" });
});

module.exports = router;
