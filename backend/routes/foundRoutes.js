const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const Found = require('../models/found')

router.post('/',async (req, res) => {
    // Our found form logic starts here
try {
    // Get user input
    const { username,email,mobile_no, itemname, property, type, url } = req.body;
    // Validate user input
    if (!(username && email)) {
        return res.status(400).send("All input is required");
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await Found.findOne({ email });

    // Create Found in our database
    const found = await Found.create({
        username,
        email, 
        mobile_no, 
        itemname, 
        property, 
        type, 
        url
    });

    // Create token
    const token = jwt.sign(
        { user_id: found._id, email },
        process.env.JWT_KEY,
        {
        expiresIn: "3h",
        }
    );
    // save found token
    found.token = token;

    // return new user
    return res.status(201).json(found);
    } catch (err) {
    console.log(err);
    }
    // Our found form logic ends here    
})

router.get('/',async (req, res) => {
    // Our get found items logic starts here
try {
    // Get user input
    const { username,email, mobile_no, itemname, property,type, url } = req.body;
  
    // Validate user input
    if (!(username && email)) {
      res.status(400).send("All input is required");
      return;
    }
    // Validate if user exist in our database
    const found = await Found.findOne({ email });
  
    if (found && email) {
      // Create token
      const token = jwt.sign(
        { user_id: found._id, email },
        process.env.JWT_KEY,
        {
          expiresIn: "3h",
        }
      );
  
      // save found token
      found.token = token;
      const user = await Found.findById(req.params.id)
      // user
      res.status(200).json(found);
    }
    return res.status(400).send("Invalid Credentials");
} catch (err) {
    console.log(err);
    return;
  }
  // Our get found items logic ends here  
});

//User Update
router.put('/update/:id',async (req, res) => {
// Our Update found item logic starts here
    try {
    // Get user input
    const { username, password, email, mobile_no, itemname, description, question, type, url } = req.body;

    // Validate user input
    if (!(username && password && email)) {
        res.status(400).send("All input is required");
        return;
    }
    // Validate if user exist in our database
    const found = await Found.findOne({ email });

    if (user && email) {
        // Create token
        const token = jwt.sign(
            { user_id: found._id, email },
            process.env.JWT_KEY,
            {
                expiresIn: "2h",
            }
        );
        // save user token
        found.token = token;
        const user = await Found.findByIdAndUpdate({_id:req.params.id})
        // user
        return res.status(200).json(user);
    }
        res.status(400).send("Invalid Credentials");
    } catch (err) {
        console.log(err);
        return;
    }
// Our update found item logic ends here
});
module.exports = router;
