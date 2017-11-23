var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://pixeldb:admin@ds115446.mlab.com:15446/pixeldb',['users'])

router.get('/', function(req, res, next){
    res.render('index.html');
});

//Can edit only this user
function btnLogin(){
    var name = document.getElementById('nameL').value;
    var pass = document.getElementById('passL').value;
    db.users.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err,user){
        if((name==user.name) && (pass == user.password)){
            res.json(user);
        }
    });
};
/*
function btnEdit(){
    db.users.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err,user){
        if(user.name!=name){
            res.send(err);
        }else{
            window.location.href = "http://localhost:3000/api/userEdit/";
        }
    });
}*/

module.exports = router;