const express = require('express');
const router = express.Router();
const user = require('../models/user')
// import the controller file for fcuntions

router.post('/',(req,res)=>
{
    
    const username=req.body.username;
    const password=req.body.password;
    user.find(
        {
            username:username
        }
    ).lean().exec((err,result)=>
    {
        if(err){
            res.json({
                "status":"error"
            })
            throw err;
        }
        else{
            console.log(result);
            if(result[0].password==password)
            {
                res.json({
                   "Status":"Ok" 
                })
            }
            else{
                {
                    res.json({
                       "Status":"Error" 
                    })
                }
            }
        }
    })
})
module.exports = router;
