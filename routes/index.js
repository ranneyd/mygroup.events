var express = require('express');
var router = express.Router();
var Group = require('../models/group.js');


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Ravie' });
});

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
                console.log(results);
                res.render('group', { title: results[0].name });
            }
            else {
                res.render('notfound', { title: "Ravie" });
            }
    });
});

module.exports = router;
