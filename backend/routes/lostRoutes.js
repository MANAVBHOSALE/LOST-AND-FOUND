const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const Lost = require('../models/lost');
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
      cb(null,'images');
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
    // Our lost form logic starts here
try {
    // Get lost input
    const { email, mobile_no, itemname, description, question, type } = req.body;
    // Validate user input
    if (!(itemname && email)) {
        return res.status(400).send("All input is required");
    }
    if(!req.file) {
        return res.status(500).send({ message: 'Upload fail'});
    } else {
        url = 'http://localhost:4001/images/' + req.file.filename;
        //const url = req.protocol + '://' + req.get('host')
        //const url = req.file.path
        // Create Lost in our database
        const lost = await Lost.create({
            email, 
            mobile_no, 
            itemname, 
            description, 
            question, 
            type, 
            url
        });
        lost.save().then(result => {
          console.log(result);
          res.status(201).json({
            message: "lost data is been saved successfully!",
            userCreated: {
              email : result.email, 
              mobile_no: result.mobile_no,
              itemname : result.itemname,
              description: result.description,
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
        const oldUser = await Lost.findOne({ email });
        // Create token
        const token = jwt.sign(
          { user_id: lost._id, email },
          process.env.JWT_KEY,
          {
          expiresIn: "3h",
          }
        );
        // save lost token
        lost.token = token;

        // return new lost item
        //return res.json({ status: true, token: token, message: "Lost item is added successfully" });
    }
    //return res.json({ status: true, message: "Lost item is added successfully" });

    } catch (err) {
    console.log(err);
    //next(err);
    //return res.send(err.message);
    }
    // Our lost form logic ends here    
})

router.get('/',async (req, res) => {
    // Our get lost items logic starts here
try {
    // Get lost input
    const { email, mobile_no, itemname, description, question, type } = req.body;
  
    // Validate lost input
    // if (!(email)) {
    //   res.status(400).send("All input is required");
    //   return;
    // }
    // Validate if lost exist in our database
    // const lost = await Lost.findOne({ email });
  
    // if (lost) {
    //   // Create token
    //   const token = jwt.sign(
    //     { user_id: lost._id, email },
    //     process.env.JWT_KEY,
    //     {
    //       expiresIn: "3h",
    //     }
    //   );
  
    //   // save lost token
    //   lost.token = token;
    //   const user = await Lost.findById(req.params.id);
    //   // lost
    //   return res.status(200).json(lost);
    // }
    Lost.find({})
      .exec(function(err, lost){
        if(err){
          //console.log("Error Retrieving the lost Data.");
          return res.status(400).send("Invalid Credentials");
        }
        else{
          return res.json(lost);
        }
      });
  } catch (err) {
    console.log(err);
    return;
  }
  // Our get lost items logic ends here  
});

//User Update
router.put('/update/:id',async (req, res) => {
// Our Update lost item logic starts here
    try {
      // Get lost input
      const { email } = req.body;

      // Validate user input
      if (!(email)) {
          res.status(400).send("All input is required");
          return;
      }
      // Validate if lost exist in our database
      const lost = await Lost.findOne({ email });

      if (user && email) {
          // Create token
          const token = jwt.sign(
            { user_id: lost._id, email },
            process.env.JWT_KEY,
            {
                expiresIn: "2h",
            }
          );
          // save lost token
          lost.token = token;
          const user = await Lost.findByIdAndUpdate({_id:req.params.id})
          // lost
          return res.status(200).json(user);
      }
      return  res.status(400).send("Invalid Credentials");
    } catch (err) {
        console.log(err);
        return;
    }
// Our update lost item logic ends here
});
module.exports = router;
