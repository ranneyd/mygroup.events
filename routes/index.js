var express = require('express');
var router = express.Router();
var Group = require('../models/group.js');
var Banner = require('../models/banner.js');


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
router.get(/^\/(.*)/, function(req, res, next) {
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
    console.log("yay, a request");
    console.log(req.body);
    res.redirect("/" + req.params[0]);
});

module.exports = router;
