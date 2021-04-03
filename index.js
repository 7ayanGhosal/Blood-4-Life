var request = require("request");
var express = require("express");
var app = express();
var mongoose = require("mongoose");
var nodemailer = require("nodemailer");

app.use(express.static("public"));
app.listen(process.env.PORT || 5000, process.env.IP, () => {
  console.log("Server has started");
});

//NodeMailer
var emailid = "assist.blood4life@gmail.com";
var emailpass = "bloodforlife";
var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: emailid,
    pass: emailpass,
  },
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

var otp = "00349423";
var timer = 60;
app.post("/emailVerification", async (req, res) => {
  if ((await user.findOne(req.body)) || (await hospital.findOne(req.body))) {
    res.send("Exists");
  } else {
    //1.mail otp
    //2.start timer
    var email = req.body.email;
    var mailOptions = {
      from: emailid,
      to: email,
      subject: "Account Verification",
      html: otp,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log("error in transporter :" + error);
        res.send("False");
      } else {
        res.send("True");
      }
    });
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
