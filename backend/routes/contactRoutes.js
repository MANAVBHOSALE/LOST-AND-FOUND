const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const Contact = require('../models/contact');
const app = express();
const bodyParser=require('body-parser');
// import the controller file for fcuntions
app.use(bodyParser.text());
app.use(
  bodyParser.urlencoded({
      extended: false
  })
);
app.use(bodyParser.json());

router.post('/', async (req, res) => {
    // Our contact logic starts here
try {
    // Get lost input
    const { firstname, lastname, subject } = req.body;
    // Validate user input
    if (!(firstname && lastname)) {
        return res.status(400).send("All input is required");
    }

    // Create user in our database
    const user = await Contact.create({
        firstname,
        lastname, 
        subject
    });
    
    return res.json({ status: true, message: "Contact is added successfully" });

    } catch (err) {
    console.log(err);
    //next(err);
    //return res.send(err.message);
    }
    // Our lost form logic ends here    
})
module.exports = router;
