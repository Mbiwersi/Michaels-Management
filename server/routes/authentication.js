var express = require('express');
let User = require('../models/user');
var router = express.Router();

function erorr() {
    res.status(402).json();
}

router.all('*', function(req, res, next) {
    if(req.session){
        next()
    }
    else{
        res.status(401).send()
    }
})

router.post('/logout', function( req, res, next ) {
 req.session.regenerate( function(err) { // create a new session id
    res.json( { msg : 'ok' } );
  } );
});

router.post('/login', function (req, res) {
    req.session.regenerate((err) => {
        if (err) {
            erorr()
        } else {
            let username = req.body.username || '';
            let password = req.body.password || '';

            User.findOne({email: username, password: password}, (err, user) => {
                if (err || !user){
                    res.json({});
                } else {
                    req.session.user = user;
                    let userNoPassword = {
                        _id: user._id,
                        first_name: user.first_name,
                        last_name: user.last_name,
                        email: user.email
                    };

                    res.json(userNoPassword);
                }
            })
        }
    })
});

router.post('/register', function(req, res) {
    User.create({
        first_name : req.body.first_name,
        last_name : req.body.last_name,
        email: req.body.email,
        password: req.body.password,
        admin : req.body.admin
    }, (err, user) => {
        if(err){
            res.json(err)
        }
        res.json(user)
    })
})

// Middleware to see if the user can make admin changes
router.all('*/admin', function(req, res, next) {
    User.findById({_id: req.session.user._id}, (err, user) => {
        if(user){
            if(user.admin){
                next()
            }
            else{
                res.status(401).send({responce: 'unauthorized'})
            }
        }
        else{
            res.json(err)
        }
    })
})

// Get all users
router.get('/final/api/v1/users/admin', function(req, res) {
    User.find({}, (err, users) => {
        let us = [];
        users.forEach(user => {
            let userNoPassword = {
                _id: user._id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                admin: user.admin
            };
            us.push(userNoPassword)
        })
        res.json(us)
    })
})

// Get the logged in user
router.get('/final/api/v1/user', function(req, res) {
    User.findById({_id: req.session.user._id}, (err, user) => {
        let userNoPassword = {
            _id: user._id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            admin: user.admin
        };
        res.json(userNoPassword)
    })
})

// Edit user properties
router.put('/final/api/v1/users/:uid/edit', function(req, res) {
    User.findByIdAndUpdate({_id: req.session.user._id},
         {first_name: req.body.first_name, last_name: req.body.last_name, email: req.body.email},
         {new: true},
         (err, user) => {
             res.json(user)
         })
})

// Update a user to be an Admin or a user
router.put('/final/api/v1/users/:uid/admin', function(req, res) {
    User.findByIdAndUpdate({_id: req.params.uid}, {admin: req.body.admin}, {
        new: true
    }, (err, user) => {
        res.json(user)
    })
})

router.delete('/final/api/v1/users/:uid/admin', function(req, res) {
    if(req.params.uid != req.session.user._id){
        User.deleteOne({_id: req.params.uid}, (err, d) => {
            if(d){
                res.status(204).send();
            }
        })
    }
    else{
        res.status(400).send();
    }
})
    

module.exports = router;
