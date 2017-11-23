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
router.post('/userReg', function(req, res, next){
    var user = req.body;
        db.users.save(user, function(err, users){
            if(err) res.send(err);
            res.json(user);
        });
});

/*$.ajax
({
  type: "PUT",
  url: "localhost:3000/api/userEdit/",
  dataType: 'json',
  async: false,
  headers: {
    "Authorization": "Basic " + btoa(USERNAME + ":" + PASSWORD)
  },
  data: '{ "comment" }',
  success: function (){
    var json= db.users.find({"name": USERNAME});
    var pass=json.password;
    if(pass==PASSWORD)
    alert('Edite seus dados!');
  }
});*/

//Edit user
router.put('/userEdit/:id', function(req,res,next){
    var user = req.body;
    var updUser = {};
    if(user.name && user.password && user.address && user.email && user.phone){
        updUser.name = user.name;
        updUser.password = user.password;
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
