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
                res.render('group', { title: results[0].name, group: true, currentUrl: req.params[0] });
            }
            else {
                res.render('404', { title: "Ravie" });
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
    var today = new Date("2/28/2016");
    Event.find({
            group: req.params[0],
            $and: [
                {$or: [
                    {date: {$gt: today}},
                    {$and: [
                        {date: {$gte: today}},
                        {timeEnd: {$gte: "11:00 PM"}}
                    ]}
                ]}
            ]
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
