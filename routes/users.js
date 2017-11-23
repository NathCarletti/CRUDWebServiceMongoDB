var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://pixeldb:admin@ds115446.mlab.com:15446/pixeldb',['users'])

//Get all users
router.get('/users', function(req, res, next){
    db.users.find(function(err, users){
        if(err) res.send(err);
        res.json(users);
    });
});

//get single
router.get('/users/:id', function(req, res, next){
    db.users.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err,user){
        if(err){res.send(err)}
        res.json(user);
    });
});

//Register user
router.post('/users', function(req, res, next){
    var user = req.body;
    if(!user.name||(user.pass + '')){
        res.status(400);
        res.json({
            "error" :"Informações inválidas!!!"
        });
    }else{
        db.users.save(user, function(err, users){
            if(err) res.send(err);
            res.json(users);
        });
    }
});

//Edit user
router.put('/userEdit/:id', function(req,res,next){
    var user = req.body;
    var updUser = {};
    if(user.name && user.pass && user.address && user.email && user.phone){
        updUser.name = user.name;
        updUser.pass = user.pass;
        updUser.address = user.address;
        updUser.email = user.email;
        updUser.phone = user.phone;
    }
        if(!updUser){
            res.status(400);
            res.json({"error":"Informações inválidas!!!"});
        }else{
            db.users.update({_id: mongojs.ObjectId(req.params.id)}, updUser,{},
             function(err,user){
                if(err){res.send(err)}
                res.json(user);
            });
        }
});

module.exports = router;
