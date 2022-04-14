const express = require('express');
const router = express.Router();
const lost = require('../models/lost')
// import the controller file for fcuntions

router.post('/', (req, res) => {
    const {name,email,mobile_no, itemname, description, question, type, url } = req.body
    try {
        lost.insertMany({ name,email,mobile_no,itemname, description, question, type, url })
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
        lost.find({})
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
