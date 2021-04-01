var request = require("request");
var express = require("express");
var app = express();
var mongoose = require("mongoose");

app.use(express.static("public"));
app.listen(process.env.PORT || 5000, process.env.IP, () => {
  console.log("Server has started");
});

//instead of body-parser
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
//----

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

//Mongoose
mongoose.connect(
  "mongodb+srv://Group16:bloodforlife@blood4life.i6agz.mongodb.net/Blood4LifeDB?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

var userSchema = new mongoose.Schema({
  name: String,
  surname: String,
  email: String,
  password: String,
  birthday: Date,
  zip: Number,
  city: String,
  address: String,
  bloodGroup: String,
  donor: Boolean,
});

var hospitalSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  zip: Number,
  city: String,
  address: String,
  bloodGroup: Object,
});

//------------------------------------------------MODEL
var user = mongoose.model("User", userSchema);
var hospital = mongoose.model("Hospital", hospitalSchema);

app.get("/", (req, res) => {
  res.redirect("https://www.google.com/");
});

app.post("/emailVerification", async (req, res) => {
  console.log(req.body);
  if (
    (await user.findOne(req.body.email)) ||
    (await hospital.findOne(req.body.email))
  ) {
    res.send("This email id already exists! Use another id or sign in.");
  } else {
    //1.mail otp
    res.send(req.body.email);
  }
});

app.post("/signup", async (req, res) => {
  newUser = {
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email,
    password: req.body.password,
    birthday: req.body.dob,
    zip: req.body.zip,
    city: req.body.city,
    address: req.body.addr,
    bloodGroup: req.body.bg,
    donor: req.body.donor,
  };
  newHospital = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    zip: req.body.zip,
    city: req.body.city,
    address: req.body.addr,
    bloodGroup: req.body.bg,
  };

  if (
    (await user.findOne(req.body.email)) ||
    (await hospital.findOne(req.body.email))
  ) {
    document.alert("This email id already exists! Use another id or sign in.");
  } else {
    if (req.body.isPerson) {
      await user.create(newUser, (err, newuser) => {
        if (err) {
          alert("error in user creation!!");
        } else {
          alert("New user successfully added");
        }
      });
    } else {
      await hospital.create(newHospital, (err, newhosp) => {
        if (err) {
          alert("error in hospital creation!!");
        } else {
          alert("New Hospital successfully added");
        }
      });
    }
  }
});

app.post("/login", (req, res) => {
  res.redirect("https://www.google.com/");
});
