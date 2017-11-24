var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://pixeldb:admin@ds115446.mlab.com:15446/pixeldb',['users'])

router.get('/', function(req, res, next){
    res.render('index.html');
});


module.exports = router;