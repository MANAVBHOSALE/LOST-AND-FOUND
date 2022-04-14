const express = require('express');
const router = express.Router();
const found = require('../models/found')
// import the controller file for fcuntions

router.post('/', (req, res) => {
    const {name,email,mobile_no, itemname, property,type, url } = req.body
    try {
        found.insertMany({name,email,mobile_no, itemname, property,type, url })
            .then((data) => {
                return res.json({
                    "status": "OK",
                     data
                })
            })
    }
    catch(err){
        return res.json(
            {
                "status":"error",
                 err
            }
        )
    }    
})

router.get('/', (req, res) => {
    try {
        found.find({})
            .then((data) => {
                return res.json({
                    "status": "OK",
                     data
                })
            })
    }
    catch(err){
        return res.json(
            {
                "status":"error",
                 err
            }
        )
    }    
})


module.exports = router;
