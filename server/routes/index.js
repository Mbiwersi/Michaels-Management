var express = require('express');
const { rmSync } = require('fs');
var router = express.Router();
var path = require('path');

let Property = require('../models/property')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200).send()
});

// Get all users properties
router.get('/final/api/v1/properties', function(req, res) {
  Property.find({userid: req.session.user._id},
    (err, properties) => {
      if(err){
        alert("ERROR getting properties")
      }
      res.json(properties);
    })
})

// Create a new property for user
router.post('/final/api/v1/properties/create', function(req, res,) {
  Property.create({
    userid : req.session.user._id,
    address: req.body.address,
    lat: req.body.lat,
    long: req.body.long,
    monthly_rent : req.body.monthly_rent,
    monthly_cost : req.body.monthly_cost,
    num_bed : req.body.num_bed,
    num_bath: req.body.num_bath,
    image: req.body.image,
    owned_since: req.body.owned_since,
    purchase_price: req.body.purchase_price
  }, (err, prop) => {
    if(err){
      res.json(err);
    }
    // console.log(prop);
    res.json(prop);
  })
})

// Get the lat add Long cords
router.get('/MichaelsManagement/api/v1/properties/cords', function(req, res) {
  let url = req.url;
  let queryParams = url.split('?')[1];
  let addr = queryParams.split('=')[1];
  console.log(`Router addr param: ${addr}`);
  $.ajax({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${addr}&key=AIzaSyCTqhGk8JaIg-FouzFEByv1UHpTf1k3f1I`,
    method: 'GET',
    success: function(data) {
      console.log(data)
      res.send(data)
    },
    error: function(xhr, status, errorThrown){
      console.log(errorThrown)

    }

  })
})

router.get('/final/api/v1/properties/:pid/picture', (req, res ) => {
  let filename = path.join(pictureFolder, req.params.pid);
  res.set( 'Content-Type', `image/${meta.extension}` );
  res.sendFile( filename );
})

// Update a property
router.put(`/final/api/v1/properties/:pid/update`, function(req, res) {
  Property.findOneAndUpdate({_id: req.params.pid, userid: req.session.user._id},
    {
      address: req.body.address,
      lat: req.body.lat,
      long: req.body.long,
      monthly_rent : req.body.monthly_rent,
      monthly_cost : req.body.monthly_cost,
      num_bed : req.body.num_bath,
      num_bath: req.body.num_bed,
      owned_since: req.body.owned_since,
      purchase_price: req.body.purchase_price
    },
    {new: true},
    (err, prop) => {
      res.json(prop)
    })
})


router.delete('/final/api/v1/properties/:pid', function(req, res) {
  Property.deleteOne({_id : req.params.pid}, (err) => {
    if( err ) {
      return res.json({success: false, msg: 'Cannot remove item'});
    }
    res.json({success: true, msg: 'User deleted.'});
  })
})

router.get('/final/api/v1/properties/:pid', function(req, res) {
  Property.findOne({_id: req.params.pid, userid: req.session.user._id}, (err, prop) => {
    if(err){
      console.log("ERROR: could not find property")
    }
    res.json(prop)
  })
})

module.exports = router;
