const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const app = express();
const router = express.Router();

//const { authJwt } = require("../middlewares");
//const controller = require("../controllers/user.controller");
// import the controller file for functions

// importing user context
const User = require("../models/user");

const bodyParser=require('body-parser');

app.use(bodyParser.text());
app.use(
  bodyParser.urlencoded({
      extended: false
  })
);
app.use(bodyParser.json());
// Add User
router.post('/register',async (req, res) => {
// Our addStudent logic starts here
try {
    // Get user input
    const { username, password, email } = req.body;
    // Validate user input
    if (!(username && password && email)) {
        return res.status(400).send("All input is required");
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await User.findOne({ email });

    if (oldUser) {
        return res.status(409).send("User Already Exist. Please Login");
    }

    //Encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const user = await User.create({
        username,
        password: encryptedPassword,
        email
    });

    // Create token
    const token = jwt.sign(
        { user_id: user._id, username },
        process.env.JWT_KEY,
        {
        expiresIn: "3h",
        }
    );
    // save user token
    user.token = token;

    // return new user
    //return res.status(201).json(user);
    res.send({success : "Successfully added new user", status : 200 });
    } catch (err) {
    console.log(err);
    }
    // Our register logic ends here
});

router.post('/login', async (req,res) =>{
    // Our login logic starts here
try {
    // Get user input
    const email  = req.body.email;
    const password = req.body.password;
    console.log(email);
    console.log(password);
    //console.log(username);
    // Validate user input
    if (!(password && email)) {
      return res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.JWT_KEY,
        {
          expiresIn: "3h",
        }
      );

      // save user token
      user.token = token;
      return res.json({ status: true, token: token, message: "Login successfully" });
    }
    //console.log(req.body);
    // user
    //return res.status(200).json(user);
    //res.send({success : "Successfully logged in", status : 200 });
    return res.status(400).send("Invalid Credentials");
  } catch (err) {
    res.json({ status: false, message: "Auth failed 4" });
  }
  // Our login logic ends here
})

//User Update
router.put('/update/:id',async (req, res) => {
  // Our Update logic starts here
  try {
    // Get user input
    const { username, password, email } = req.body;

    // Validate user input
    if (!(username && password && email)) {
      res.status(400).send("All input is required");
      return;
    }
    // Validate if user exist in our database
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
          process.env.JWT_KEY,
          {
            expiresIn: "2h",
          }
    );
      // save user token
      user.token = token;
      const user = await User.findByIdAndUpdate({_id:req.params.id}, {$set:{password : await bcrypt.hash(password, 10)},  username, email})
      // user
      return res.status(200).json(user);
    }
    res.status(400).send("Invalid Credentials");
  } catch (err) {
      console.log(err);
      return;
    }
  // Our update logic ends here
});

//Get Result
router.get('/',async (req, res) => {
  // Our user logic starts here
  try {
    // Get user input
    const { username, password } = req.body;
  
    // Validate user input
    if (!(username && password)) {
      res.status(400).send("All input is required");
      return;
    }
    // Validate if user exist in our database
    const user = await User.findOne({ username });
  
    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, username },
        process.env.JWT_KEY,
        {
          expiresIn: "3h",
        }
      );
  
      // save user token
      user.token = token;
      const user = await User.findById(req.params.id)
      // user
      res.status(200).json(user);
    }
    return res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
    return;
  }
  // Our user logic ends here
});
module.exports = router;
