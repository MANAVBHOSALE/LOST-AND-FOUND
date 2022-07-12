require("dotenv").config();
require("./config/auth.config").connect();
const path = require('path');
const express=require('express');
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const bodyParser=require('body-parser');
app.use(
  bodyParser.urlencoded({
      extended: false
  })
);
app.use('/images', express.static(path.join('images')));
app.use(bodyParser.text());
app.use(bodyParser.json());
app.use(cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept,Authorization"
  );
  res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE,OPTIONS');
  next();
});

const auth = require("./middlewares/authJwt");

app.post("/welcome", auth, (req, res) => {
  res.status(200).send(" WELCOME !!! ");
});

const ur=require('./routes/userRoutes')
app.use('/user',ur)

const lr=require('./routes/lostRoutes')
app.use('/lost',lr)

const fr=require('./routes/foundRoutes')
app.use('/found',fr)

const cn=require('./routes/contactRoutes')
app.use('/contact',cn)

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to LOST AND FOUND APPLICATION application." });
});

module.exports = app;

// const db='mongodb+srv://admin:admin@cluster0.jekpe.mongodb.net/LostandFound?retryWrites=true&w=majority'

// mongoose.connect(db, function(err, res)
// {
//     if(err) console.log(err);
//     console.log('Connected to Database');
// })

// var corsOptions = {
//     origin: "http://localhost:8081"
//   };
// const app = express();
// app.use('/login',ur);
// const db = require("./models");
// const Role = db.role;
// db.mongoose
//   .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   })
//   .then(() => {
//     console.log("Successfully connect to MongoDB.");
//     initial();
//   })
//   .catch(err => {
//     console.error("Connection error", err);
//     process.exit();
//   });

// function initial() {
//   Role.estimatedDocumentCount((err, count) => {
//     if (!err && count === 0) {
//       new Role({
//         name: "user"
//       }).save(err => {
//         if (err) {
//           console.log("error", err);
//         }
//         console.log("added 'user' to roles collection");
//       });
//       new Role({
//         name: "moderator"
//       }).save(err => {
//         if (err) {
//           console.log("error", err);
//         }
//         console.log("added 'moderator' to roles collection");
//       });
//       new Role({
//         name: "admin"
//       }).save(err => {
//         if (err) {
//           console.log("error", err);
//         }
//         console.log("added 'admin' to roles collection");
//       });
//     }
//   });
// }
