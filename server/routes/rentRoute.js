var express = require('express');
var router = express.Router();

let Rent = require('../models/rent');
let Properties = require('../models/property')
let Document = require('../models/document')

// router.all('*', function(req, res, next) {
//     if(req.session){
//         next()
//     }
//     else{
//         res.status(401).send()
//     }
// })

// Creates a succuessfull rent payment
router.post('/final/api/v1/properties/:pid/rent', function(req, res) {
    Properties.findByIdAndUpdate(req.params.pid, 
        {$push: {rentPayments : {
            month: req.body.month,
            paid: req.body.paid
        }}}, (err, rent) =>{
            res.json(rent)
        }
    )
    Document.create({
        userid: req.session.user._id,
        propertyid: req.params.pid,
        type: "Rent",
        notes: req.body.notes,
        date: Date.now()
    }, (err, doc) => {
        if(err){
            console.log("ERROR Making doc")
        }
    })
})

// GET the rent payment of a property
router.get('/final/api/v1/properties/:pid/rent', function(req, res) {
  let url = req.url;
  let queryParams = url.split('?')[1];
  let qmonth = queryParams.split('=')[1];
  Rent.findOne({userid: req.session.user._id, propertyid: req.params.pid, month: qmonth},
    (err, rent) => {
        if(err){
            console.log(err)
            res.json({})
        }
        else{
            // console.log(rent)
            res.json(rent)
        }
    })
})

// router.post('/final/api/v1/properties/:pid/rent', function(req, res) {
//     Rent.create({
//         userid: req.session.user._id,
//         propertyid: req.params.pid,
//         month: req.body.month,
//         paid: req.body.paid
//     }, (err, rent) => {
//         if(err) {
//             console.log("ERROR creating rent")
//         }
//         console.log(rent)
//         res.json(rent)
//     })
// })

module.exports = router;