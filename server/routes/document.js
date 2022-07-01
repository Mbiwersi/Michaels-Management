var express = require('express');
var router = express.Router();

let Document = require('../models/document')

// router.all('*', function(req, res, next) {
//     if(req.session){
//         next()
//     }
//     else{
//         res.status(401).send()
//     }
// })

// Get documents based off the query params filter
router.get('/final/api/v1/properties/:pid/documents', function(req, res) {
    let url = req.url;
    let queryParams = url.split('?')[1];
    let filter = queryParams.split('=')[1];
    if(filter == 'all'){
        Document.find({userid: req.session.user._id, propertyid: req.params.pid}, (err, docs) => {
            if(err){
                console.log("ERROR finding documents")
            }
            res.json(docs);
        })
    }
    else{
        Document.find({userid: req.session.user._id, propertyid: req.params.pid, type: filter}, (err, docs) => {
            if(err){
                console.log("ERROR finding documents")
            }
            res.json(docs);
        })
    }
})

// create a document
router.post('/final/api/v1/properties/:pid/documents', function(req, res) {
    let url = req.url;
    let queryParams = url.split('?')[1];
    let t = queryParams.split('=')[1];
    Document.create({
        userid: req.session.user._id,
        propertyid: req.params.pid,
        type: t,
        notes: req.body.notes,
        date: Date.now()
    }, (err, doc) => {
        if(err){
            console.log("ERROR creating doc")
        }
        res.json(doc)
    })
})

module.exports = router;