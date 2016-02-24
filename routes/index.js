var express = require('express');
var router = express.Router();
var Group = require('../models/group.js');
var Banner = require('../models/banner.js');
var Event = require('../models/event.js');


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Ravie' });
});
router.get('/ajax/getBannerImages', function(req, res, next) {
    Banner.find(
        {},
        function(err, results){
            if (err) {
                console.log("Error");
                console.log(err);
            }
            res.send(results);
    });
});

// Group page 
router.get(/^\/([^\/]+)/, function(req, res, next) {
    Group.find({
            "url": req.params[0]
        },
        function (err, results){
            if (err) {
                console.log("Error");
                console.log(err);
            }
            if ( results.length ){
                res.render('group', { title: results[0].name, group: true, currentUrl: req.params[0] });
            }
            else {
                res.render('notfound', { title: "Ravie" });
            }
    });
});

router.post(/^\/(.*)\/new/, function(req, res, next) {
    console.log(req.body);
    var newEvent = new Event({
        name: req.body.name,
        date: req.body.date,
        timeStart: req.body.timeStart,
        timeEnd: req.body.timeEnd,
        description: req.body.description,
        banner: req.body['banner-picker'],
        location: req.body.location,
        rsvp: req.body.rsvp,
        owner: "dustin",
        group: req.group
    });
    newEvent.save(function(err) {
        if (err) throw err;
    });
    res.redirect("/" + req.params[0]);
});

router.get(/^\/(.*)\/getEvents/, function(req, res, next) {
    Event.find({
            group: req.params[0]
        }).limit(10).exec(function(err, events){
            if (err) {
                console.log("Error");
                console.log(err);
            }
            else {
                res.send(events);
            }
        });
});

module.exports = router;
