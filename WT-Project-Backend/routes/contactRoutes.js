const express = require('express');
const router = express.Router();
const contact = require('../models/contact')
// import the controller file for fcuntions

router.post('/', (req, res) => {
    const { firstname,lastname,country,subject} = req.body
    try {
        contact.insertMany({firstname,lastname,country,subject })
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
