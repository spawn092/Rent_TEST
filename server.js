const express = require("express");
const app = express();
const mongoose = require("mongoose");
const mongo = require("mongodb");
const path = require("path");
const bodyParser = require("body-parser");
const port = process.env.port || 3000;

//database setting
var db_url =
  "mongodb+srv://admin1234:admin1234@cluster0-pxexl.mongodb.net/users?retryWrites=true&w=majority";
mongoose.connect(db_url, { useNewUrlParser: true });

mongoose.connection.on("error", function(err) {
  console.log(err);
  console.log("Could not connect to mongodb");
});

mongo.MongoClient.connect(db_url, { useNewUrlParser: true }, function(
  err,
  client
) {
  if (err) {
    console.log("Could Not Connect DB");
  } else {
    db = client.db("Test");
  }
});

//body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//setting view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//set static folder
app.use(express.static(path.join(__dirname, "public")));
//import model
const User = require("./model/user");

//router link
app.get("/", (req, res) => {
  res.render("index");
});
app.get("/about", (req, res) => {
  res.render("about");
});
app.post("/login", (req, res) => {
  let uName = req.body.username;
  let pWord = req.body.password;
  //replace the code below with validation and allow user to login
  console.log(uName);
  console.log(pWord);
  res.render("index");
});
app.post("/message", (req, res) => {
  //store this data in database
  let name = req.body.name;
  let mail = req.body.mail;
  let subject = req.body.subject;
  let msg = req.body.message;
  //replace the code below with validation
  console.log(name);
  console.log(mail);
  console.log(subject);
  console.log(msg);

  res.render("index");
});
app.get("/search", (req, res) => {
  console.log("search");
  res.render("search");
});
app.get("/signup", (req, res) => {
  console.log("signup");
  res.render("signup");
});

app.get("/apartment", (req, res) => {
  console.log("apartment");
  res.render("apartment");
});
app.post("/signup", (req, res) => {
  let fName = req.body.first_name;
  let lName = req.body.last_name;
  let email = req.body.email;
  let cNum = req.body.contact_number;
  let address = req.body.Address;
  let city = req.body.city;
  let zip = req.body.zip;
  let password = req.body.password;
  const user = new User({
    first_name: fName,
    last_name: lName,
    email: email,
    password: password,
    contact: cNum,
    address: address,
    city:city,
  });
  user.save((err,data)=>{
    if (err){
      return res.status(400);
    }else{
      console.log("success")
      res.end();
    }

  })
  //console.log(fName +","+ lName +","+ email +","+ cNum +","+ address +","+ city +","+ zip);
  //res.end();
});
app.post("/apartment" ,(req,res)=>{
  let firstName = req.body.first_name;
  let lastName = req.body.last_name;
  let house = req.body.house;
  let rent = req.body.rent;
  let address = req.body.Address;
  let city = req.body.city;
  let zip = req.body.zip;
  console.log(firstName +","+ lastName +","+ house +","+ rent +","+ address +","+ city +","+ zip);
  res.end();
})

app.listen(port, () => {
  console.log(`Application is running in ${port}`);
});
