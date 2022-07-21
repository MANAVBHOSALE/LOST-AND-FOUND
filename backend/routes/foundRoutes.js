const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const Found = require('../models/found');
var multer  = require('multer');
const bodyParser=require('body-parser');
const path = require('path');
const app = express();
app.use(bodyParser.text());
app.use(
  bodyParser.urlencoded({
      extended: false
  })
);
app.use(bodyParser.json());
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      //cb(null, path.join(__dirname,'./images'));
      cb(null,'imagesfound');
    },
    filename: (req, file, cb) => {
      console.log(file);
      var filetype = '';
      if(file.mimetype === 'image/gif') {
        filetype = 'gif';
      }
      if(file.mimetype === 'image/png') {
        filetype = 'png';
      }
      if(file.mimetype === 'image/jpeg') {
        filetype = 'jpg';
      }
      if(file.mimetype === 'image/jpg') {
        filetype = 'jpg';
      }
      cb(null, 'image-' + Date.now() + '.' + filetype);
    }
});

var upload = multer({storage: storage,limits: {
        // Setting Image Size Limit to 2MBs
        fileSize: 2000000
    }
});

router.post('/', upload.single('url'), async (req, res) => {
    // Our found form logic starts here
try {
    // Get user input
    const { itemname, question, type } = req.body;
    // Validate user input
    if (!(itemname)) {
        return res.status(400).send("All input is required");
    }

    // check if user already exist
    // Validate if user exist in our database
    //const oldUser = await Found.findOne({ email });
    if(!req.file) {
        return res.status(500).send({ message: 'Upload fail'});
    } else {
        url = 'http://localhost:4001/imagesfound/' + req.file.filename;
        //const url = req.protocol + '://' + req.get('host')
        //const url = req.file.path
        // Create Lost in our database
        const found = await Found.create({
            itemname,
            question, 
            type, 
            url
        });
        found.save().then(result => {
          console.log(result);
          res.status(201).json({
            message: "found data is been saved successfully!",
            userCreated: {
              itemname : result.itemname,
              question: result.question,
              type: result.type,
              url : result.url
            }
          })
        }).catch(err => {
          console.log(err),
            res.status(500).json({
              error: err
            });
        })
        // check if user already exist
        // Validate if user exist in our database
        //const oldUser = await Found.findOne({ email });
        // Create token
        const token = jwt.sign(
          { user_id: lost._id, email },
          process.env.JWT_KEY,
          {
          expiresIn: "3h",
          }
        );
        // save lost token
        found.token = token;

        // return new lost item
        //return res.json({ status: true, token: token, message: "Lost item is added successfully" });
    }

    // return new user
    //return res.status(201).json(found);
    } catch (err) {
    console.log(err);
    }
    // Our found form logic ends here    
})

router.get('/',async (req, res) => {
    // Our get found items logic starts here
try {
    // Get Found input
    const { itemname, question, type, url } = req.body;
  
    // Validate user input
    // if (!(itemname)) {
    //   res.status(400).send("All input is required");
    //   return;
    // }
    // // Validate if user exist in our database
    // const found = await Found.findOne({ email });
  
    // if (found) {
    //   // Create token
    //   const token = jwt.sign(
    //     { user_id: found._id, email },
    //     process.env.JWT_KEY,
    //     {
    //       expiresIn: "3h",
    //     }
    //   );
  
    //   // save found token
    //   found.token = token;
    //   const user = await Found.findById(req.params.id)
    //   // user
    //   res.status(200).json(found);
    // }
    Found.find({})
      .exec(function(err, found){
        if(err){
          //console.log("Error Retrieving the lost Data.");
          return res.status(400).send("Invalid Credentials");
        }
        else{
          return res.json(found);
        }
      });
    //return res.status(400).send("Invalid Credentials");
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
    const { itemname, question, type, url } = req.body;

    // Validate user input
    if (!(itemname)) {
        res.status(400).send("All input is required");
        return;
    }
    // Validate if user exist in our database
    const found = await Found.findOne({ email });

    if (found) {
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
