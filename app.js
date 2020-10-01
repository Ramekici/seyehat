const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const path = require('path');


const users = require('./routes/api/users');
const veriler = require('./routes/api/veriler');
const gazeteler = require('./routes/api/gazeteler');
const tarih = require('./routes/api/tarih');
const category = require('./routes/api/category');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use("/images", express.static(path.join("images")));

//app.use("/", express.static(path.join(__dirname, "client/src")));

app.use(express.static(path.join(__dirname, 'public')));

const db = require('./config/config').mongoURI;
mongoose.connect(process.env.MONGODB_URI || db, { useNewUrlParser: true, 
  useUnifiedTopology:true, useFindAndModify: false})
                    .then(()=> console.log("mongo db connected"))
                    .catch ((err)=> console.log(err));

app.use((req, res, next)=>{
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers",
  "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.setHeader("Access-Control-Allow-Methods",
  "GET, POST, PATCH, DELETE, OPTIONS, PUT");
  next();
})


app.use('/api/users', users);
app.use('/api/veriler', veriler);
app.use('/api/gazeteler', gazeteler);
app.use('/api/tarih',tarih);
app.use('/api/category', category);



// Serve static assets if in production
if (process.env.NODE_ENV === "production") {

  // Set static folder
  // All the javascript and css files will be read and served from this folder
  app.use(express.static("client/build"));

  // index.html for all page routes  html or routing and naviagtion
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./client", "build", "index.html"));
  });
}



module.exports = app;
