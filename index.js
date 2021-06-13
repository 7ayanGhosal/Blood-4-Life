var request = require("request");
var axios = require("axios");
var jwt = require("jsonwebtoken");
var expressjwt = require("express-jwt");
// var cors = require("cors");

var express = require("express");
var app = express();
var mongoose = require("mongoose");
var nodemailer = require("nodemailer");
var faker = require("faker");
const { json } = require("body-parser");

//ENVIRONMENT VARIABLES
var emailid;
var emailpass;
var mongoURI;
var restAPIKey;
var clientID;
var clientSecret;
var token;

var i = 0;

if (process.env.NODE_ENV !== "production") {
  var keys = require("./keys/dev");
  emailid = keys.emailID;
  emailpass = keys.password;
  mongoURI = keys.mongoURI;
  restAPIKey = keys.MMIrestAPIkey;
  clientID = keys.MMIclientID;
  clientSecret = keys.MMIclientSecret;
} else {
  emailid = process.env.EMAIL;
  emailpass = process.env.PASSWORD;
  mongoURI = process.env.MONGOURI;
  restAPIKey = process.env.RESTAPIKEY;
  clientID = process.env.CLIENTID;
  clientSecret = process.env.CLIENTSECRET;
}

var changeToken = () => {
  if (process.env.NODE_ENV === "production") {
    var size = 6;
    i = (i + 1) % size;
    if (i === 0) {
      restAPIKey = process.env.RESTAPIKEY;
      clientID = process.env.CLIENTID;
      clientSecret = process.env.CLIENTSECRET;
    } else if (i === 1) {
      restAPIKey = process.env.RESTAPIKEY1;
      clientID = process.env.CLIENTID1;
      clientSecret = process.env.CLIENTSECRET1;
    } else if (i === 2) {
      restAPIKey = process.env.RESTAPIKEY2;
      clientID = process.env.CLIENTID2;
      clientSecret = process.env.CLIENTSECRET2;
    } else if (i === 3) {
      restAPIKey = process.env.RESTAPIKEY3;
      clientID = process.env.CLIENTID3;
      clientSecret = process.env.CLIENTSECRET3;
    } else if (i === 4) {
      restAPIKey = process.env.RESTAPIKEY4;
      clientID = process.env.CLIENTID4;
      clientSecret = process.env.CLIENTSECRET4;
    } else {
      restAPIKey = process.env.RESTAPIKEY5;
      clientID = process.env.CLIENTID5;
      clientSecret = process.env.CLIENTSECRET5;
    }

    axios
      .post(
        "https://outpost.mapmyindia.com/api/security/oauth/token?grant_type=client_credentials&client_id=" +
          clientID +
          "&client_secret=" +
          clientSecret,
        {}
      )
      .then(
        (res) => {
          token = res.data.access_token;
          axios.defaults.headers.common = { Authorization: `bearer ${token}` };
        },
        (error) => {
          console.log(error);
        }
      );
  }
};

var jtoken = ""; //jwt token
var jwtCheck = null; //jwt checker
var secret = "";
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
// app.use(cors());

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

//Mongoose
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

var userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  age: Number,
  gender: String,
  birthday: Date,
  bloodGroup: String,
  rhFactor: String,
  reqDonor: Boolean,
  location: Object,
  notifications: Array,
  seen: Number,
  avatar: Number,
});

var hospitalSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  bloodStock: Object,
  location: Object,
});

var campSchema = new mongoose.Schema({
  name: String,
  email: String,
  location: Object,
  eventName: String,
  eventDate: Date,
  eventStartTime: String,
  eventEndTime: String,
  eventDescription: String,
});

var msgSchema = new mongoose.Schema({
  name: String,
  email: String,
  msg: String,
});

//------------------------------------------------MODEL
var user = mongoose.model("User", userSchema);
var hospital = mongoose.model("Hospital", hospitalSchema);
var camp = mongoose.model("Camp", campSchema);
var msg = mongoose.model("Message", msgSchema);

var otp = String(Math.floor(Math.random() * 89999 + 10000));
// var userToken = String(Math.floor(Math.random() * 89999 + 10000));
var timer = 60;

function Distance(lat1, lat2, lon1, lon2) {
  lon1 = (lon1 * Math.PI) / 180;
  lon2 = (lon2 * Math.PI) / 180;
  lat1 = (lat1 * Math.PI) / 180;
  lat2 = (lat2 * Math.PI) / 180;

  // Haversine formula
  let dlon = lon2 - lon1;
  let dlat = lat2 - lat1;
  let a =
    Math.pow(Math.sin(dlat / 2), 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon / 2), 2);

  let c = 2 * Math.asin(Math.sqrt(a));
  let r = 6371;

  return c * r;
}

//MapMyIndia
revgeocodeUrl =
  "https://apis.mapmyindia.com/advancedmaps/v1/" + restAPIKey + "/rev_geocode?";
geocodeUrl = "https://atlas.mapmyindia.com/api/places/geocode?";
axios
  .post(
    "https://outpost.mapmyindia.com/api/security/oauth/token?grant_type=client_credentials&client_id=" +
      clientID +
      "&client_secret=" +
      clientSecret,
    {}
  )
  .then(
    (res) => {
      token = res.data.access_token;
      axios.defaults.headers.common = { Authorization: `bearer ${token}` };
    },
    (error) => {
      console.log(error);
      changeToken();
    }
  );

//ELOC from LAT - LONG
app.get("/map/getEloc/:lat/:lng", (req, Res) => {
  revgeocodeUrl =
    "https://apis.mapmyindia.com/advancedmaps/v1/" +
    restAPIKey +
    "/rev_geocode?";
  geocodeUrl = "https://atlas.mapmyindia.com/api/places/geocode?";

  axios
    .get(revgeocodeUrl + "lat=" + req.params.lat + "&lng=" + req.params.lng)
    .then(
      (res) => {
        axios
          .get(geocodeUrl + "address=" + res.data.results[0].formatted_address)
          .then(
            (res) => {
              Res.send(res.data.copResults.eLoc);
            },
            (err) => {
              console.log(err);
              changeToken();
            }
          );
      },
      (err) => {
        console.log(err);
        changeToken();
      }
    );
});

app.get("/map/suggest/:location", (req, res) => {
  revgeocodeUrl =
    "https://apis.mapmyindia.com/advancedmaps/v1/" +
    restAPIKey +
    "/rev_geocode?";
  geocodeUrl = "https://atlas.mapmyindia.com/api/places/geocode?";
  var url =
    "https://atlas.mapmyindia.com/api/places/search/json?query=" +
    req.params.location;
  axios.get(url).then(
    (Res) => {
      res.send(Res.data.suggestedLocations);
    },
    (err) => {
      changeToken();
      res.send(err);
    }
  );
});
app.get("/map/eloc/:eloc", (req, res) => {
  revgeocodeUrl =
    "https://apis.mapmyindia.com/advancedmaps/v1/" +
    restAPIKey +
    "/rev_geocode?";
  geocodeUrl = "https://atlas.mapmyindia.com/api/places/geocode?";

  var url =
    "https://apis.mapmyindia.com/advancedmaps/v1/" +
    restAPIKey +
    "/place_detail?place_id=" +
    req.params.eloc;
  axios.get(url).then(
    (Res) => {
      res.send({
        lat: Res.data.results[0].latitude,
        long: Res.data.results[0].longitude,
        poi: Res.data.results[0].poi,
        street: Res.data.results[0].street,
        subSubLocality: Res.data.results[0].subSubLocality,
        subLocality: Res.data.results[0].subLocality,
        locality: Res.data.results[0].locality,
        village: Res.data.results[0].village,
        district: Res.data.results[0].district,
        subDistrict: Res.data.results[0].subDistrict,
        city: Res.data.results[0].city,
        state: Res.data.results[0].state,
        pincode: Res.data.results[0].pincode,
        address:
          (Res.data.results[0].poi != ""
            ? Res.data.results[0].poi + ", "
            : "") +
          (Res.data.results[0].street != ""
            ? Res.data.results[0].street + ", "
            : "") +
          (Res.data.results[0].subSubLocality != ""
            ? Res.data.results[0].subSubLocality + ", "
            : "") +
          (Res.data.results[0].subLocality != ""
            ? Res.data.results[0].subLocality + ", "
            : "") +
          (Res.data.results[0].locality != ""
            ? Res.data.results[0].locality + ", "
            : "") +
          (Res.data.results[0].village != ""
            ? Res.data.results[0].village + ", "
            : "") +
          (Res.data.results[0].district != ""
            ? Res.data.results[0].district + ", "
            : "") +
          (Res.data.results[0].subDistrict != ""
            ? Res.data.results[0].subDistrict + ", "
            : "") +
          (Res.data.results[0].city != ""
            ? Res.data.results[0].city + ", "
            : "") +
          (Res.data.results[0].state != ""
            ? Res.data.results[0].state + ", "
            : "") +
          (Res.data.results[0].pincode != ""
            ? Res.data.results[0].pincode + " "
            : ""),
      });
    },
    (err) => {
      changeToken();
      res.send(err);
    }
  );
});

app.post("/emailVerification", async (req, res) => {
  otp = String(Math.floor(Math.random() * 89999 + 10000));
  if ((await user.findOne(req.body)) || (await hospital.findOne(req.body))) {
    res.send("Exists");
  } else {
    //1.mail otp
    //2.start timer
    var email = req.body.email;
    var mailOptions = {
      from: emailid,
      to: email,
      subject: "Account Verification OTP- " + otp,
      html:
        `<!doctype html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
              .box-1{
                padding: 5px;
                background-color: rgba(0,191,255, 0.8);
              }
              .box-2{
                padding: 10px;
                background-color: rgba(255,239,213,0.6);
                border-radius: 15px;
              }
              .logo{
                width: 200px;
                max-width: 100%;
                border-radius: 15px;
              }
              .otp{
                color: tomato;
                font-size: 1.5rem;
              }
              .white{
                background-color: white;
                border-radius: 15px;
              }
              .l-img{
                width: 30px;
                height: 30px;
                border-radius: 50%;
              }
              .links{
                color: rgba(0,0,0,0);
              }
          </style>
      </head>
      <body>
        <div class = "box-1">
          <div class="white">
            <div class= "box-2">
            <a href="https://blood-4-life.herokuapp.com/">
              <img src="https://cdn.discordapp.com/attachments/824856858850230304/845243908354080768/unknown.png" class="logo"/>
            </a>
            <br/><br/>
              <p>
                  Hi,
                  <br/>
                  Thank You for choosing Blood4Life!.
                  <br/>
                  <br/>
                  <span class="otp">` +
        otp +
        `</span> is the OTP for your Blood4Life account verification. <br/>Please do not share it with anyone to ensure account security.
              </p>
              <h5 class="footer">
                  Best wishes,
                  <br/>
                  Team Blood4Life
              </h5>
              <p>
                Follow Us: 
              </p>
              <a href="https://www.facebook.com/assist.blood4life" class="links">
                <img src="https://cdn3.iconfinder.com/data/icons/capsocial-round/500/facebook-512.png" class="l-img"/>
              </a>
              <a href="https://twitter.com/Blood4life12" class="links">
                <img src="https://cdn3.iconfinder.com/data/icons/social-media-circle/512/circle-twitter-512.png" class="l-img"/>
              </a>
              <a href="https://www.instagram.com/assist.blood4life" class="links">
                <img src="https://cdn3.iconfinder.com/data/icons/2018-social-media-logotypes/1000/2018_social_media_popular_app_logo_instagram-512.png" class="l-img"/>
              </a>
            </div>
          </div>
        </div>
      </body>
    </html>`,
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

app.post("/otpVerification", (req, res) => {
  OTP = req.body.otp;
  if (otp === OTP) {
    res.send("True");
  } else {
    res.send("False");
  }
});

app.post("/signup", async (req, res) => {
  // await changeToken();
  if (req.body.isHospital)
    newHospital = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.pass,
      location: req.body.location,
      bloodStock: {
        "A+": 0,
        "A-": 0,
        "B+": 0,
        "B-": 0,
        "AB+": 0,
        "AB-": 0,
        "O+": 0,
        "O-": 0,
      },
    };
  else
    newUser = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.pass,
      age: req.body.age,
      gender: req.body.gender,
      bloodGroup: req.body.bloodGroup,
      rhFactor: req.body.rhFactor,
      reqDonor: req.body.reqDonor,
      location: req.body.location,
      seen: 0,
    };

  if (
    (await user.findOne({ email: req.body.email })) ||
    (await hospital.findOne({ email: req.body.email }))
  ) {
    console.log("This email id already exists! Use another id or sign in.");
  } else {
    if (!req.body.isHospital) {
      await user.create(newUser, (err, newuser) => {
        if (err) {
          res.send(false);
        } else {
          res.send(true);
        }
      });
    } else {
      await hospital.create(newHospital, (err, newhosp) => {
        if (err) {
          res.send(false);
        } else {
          res.send(true);
        }
      });
    }
  }
});

app.post("/login", async (req, res) => {
  // await changeToken();
  secret = req.header("x-forwarded-for") || req.socket.remoteAddress;
  var account = null;
  account = await user.findOne({
    email: req.body.email,
    password: req.body.pass,
  });

  if (!account)
    account = await hospital.findOne({
      email: req.body.email,
      password: req.body.pass,
    });

  if (!account) {
    //Acccount not found
    res.send(false);
  } else {
    account.password = "";
    if (account.name) {
      jtoken = jwt.sign({ email: account.email, isHospital: true }, secret, {
        expiresIn: "30 days",
      });
      account.password = "";
      await camp.find({ email: req.body.email }, async (err, foundCamps) => {
        await foundCamps.sort((a, b) => {
          var d_a = new Date(a.eventDate);
          var h_a = parseInt(a.eventStartTime[0] + a.eventStartTime[1]);
          var m_a = parseInt(a.eventStartTime[3] + a.eventStartTime[4]);
          d_a.setHours(h_a, m_a, 0);
          var d_b = new Date(b.eventDate);
          var h_b = parseInt(b.eventStartTime[0] + b.eventStartTime[1]);
          var m_b = parseInt(b.eventStartTime[3] + b.eventStartTime[4]);
          d_b.setHours(h_b, m_b, 0);
          return d_b - d_a;
        });
        Account = {
          data: account,
          event: foundCamps,
          token: jtoken,
        };
        secret = "";
        res.send(Account);
      });
    } else {
      jtoken = jwt.sign({ email: account.email, isHospital: false }, secret, {
        expiresIn: "30 days",
      });
      var maxDis = 50; //50km max distance
      var events = [];
      account.password = "";
      await camp.find({}, async (err, foundCamps) => {
        await foundCamps.forEach((camp) => {
          var distance = Distance(
            camp.location.latitude,
            account.location.latitude,
            camp.location.longitude,
            account.location.longitude
          );
          distance = distance.toFixed(3);
          if (distance <= maxDis) {
            events.push(camp);
          }
        });
        await events.sort((a, b) => {
          var d_a = new Date(a.eventDate);
          var h_a = parseInt(a.eventStartTime[0] + a.eventStartTime[1]);
          var m_a = parseInt(a.eventStartTime[3] + a.eventStartTime[4]);
          d_a.setHours(h_a, m_a, 0);
          var d_b = new Date(b.eventDate);
          var h_b = parseInt(b.eventStartTime[0] + b.eventStartTime[1]);
          var m_b = parseInt(b.eventStartTime[3] + b.eventStartTime[4]);
          d_b.setHours(h_b, m_b, 0);
          return d_b - d_a;
        });
        Account = { data: account, event: events, token: jtoken };
        secret = "";
        res.send(Account);
      });
    }
  }
});

app.post("/resetprofile", (req, res) => {
  var account = null;
  if (req.body.isHospital) account = hospital;
  else account = user;
  account.findOneAndUpdate(
    { email: req.body.email },
    {
      $set: {
        name: req.body.name,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        bloodGroup: req.body.bloodGroup,
        rhFactor: req.body.rhFactor,
        reqDonor: req.body.reqDonor,
        age: req.body.age,
        gender: req.body.gender,
        birthday: req.body.birthday,
        location: req.body.location,
        bloodStock: req.body.bloodStock,
        avatar: req.body.avatar,
      },
    },
    (err, updatedUser) => {
      if (err) {
        console.log(err);
        res.send(false);
      } else res.send(true);
    }
  );
});

app.post("/resetPass/sendOTP", async (req, res) => {
  otp = String(Math.floor(Math.random() * 89999 + 10000));
  if (
    (await user.findOne({ email: req.body.email })) ||
    (await hospital.findOne({ email: req.body.email }))
  ) {
    //1.mail otp
    //2.start timer
    var email = req.body.email;
    var mailOptions = {
      from: emailid,
      to: email,
      subject:
        "Blood4Life:- " +
        otp +
        " is your verification code for Password Reset ",
      html:
        `<!doctype html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
              .box-1{
                padding: 5px;
                background-color: rgba(0,191,255, 0.8);
              }
              .box-2{
                padding: 10px;
                background-color: rgba(255,239,213,0.6);
                border-radius: 15px;
              }
              .logo{
                width: 200px;
                max-width: 100%;
                border-radius: 15px;
              }
              .otp{
                color: tomato;
                font-size: 1.5rem;
              }
              .white{
                background-color: white;
                border-radius: 15px;
              }
              .l-img{
                width: 30px;
                height: 30px;
                border-radius: 50%;
              }
              .links{
                color: rgba(0,0,0,0);
              }
          </style>
      </head>
      <body>
        <div class = "box-1">
          <div class="white">
            <div class= "box-2">
            <a href="https://blood-4-life.herokuapp.com/">
              <img src="https://cdn.discordapp.com/attachments/824856858850230304/845243908354080768/unknown.png" class="logo"/>
            </a>
            <br/><br/>

              <p>
                  Hi,
                  <br/>
                  You are just 1 step away from resetting your password.
                  <br/>
                  <span class="otp">` +
        otp +
        `</span> is the OTP for your Blood4Life account. <br/>Please do not share it with anyone to ensure account security.
              </p>
              <h5 class="footer">
                  Best wishes,
                  <br/>
                  Team Blood4Life
              </h5>
              <p>
                Follow Us: 
              </p>
              <a href="https://www.facebook.com/assist.blood4life" class="links">
                <img src="https://cdn3.iconfinder.com/data/icons/capsocial-round/500/facebook-512.png" class="l-img"/>
              </a>
              <a href="https://twitter.com/Blood4life12" class="links">
                <img src="https://cdn3.iconfinder.com/data/icons/social-media-circle/512/circle-twitter-512.png" class="l-img"/>
              </a>
              <a href="https://www.instagram.com/assist.blood4life" class="links">
                <img src="https://cdn3.iconfinder.com/data/icons/2018-social-media-logotypes/1000/2018_social_media_popular_app_logo_instagram-512.png" class="l-img"/>
              </a>
            </div>
          </div>
        </div>
      </body>
    </html>`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log("error in transporter :" + error);
        res.send("false");
      } else {
        res.send("true");
      }
    });
  } else {
    res.send("doesnotexist");
  }
});

app.post("/resetPass/otpVerification", async (req, res) => {
  // await changeToken();
  secret = req.header("x-forwarded-for") || req.socket.remoteAddress;
  if (req.body.otp === otp) {
    user.findOneAndUpdate(
      { email: req.body.email },
      { $set: { password: req.body.password } },
      (err, foundUser) => {
        if (err) {
          res.send("error");
        } else {
          if (!foundUser) {
            hospital.findOneAndUpdate(
              { email: req.body.email },
              { $set: { password: req.body.password } },
              (err, foundHospital) => {
                if (err) {
                  res.send("error");
                } else {
                  if (!foundHospital) {
                    res.send("error");
                  } else {
                    jtoken = jwt.sign(
                      { email: foundHospital.email, isHospital: true },
                      secret,
                      {
                        expiresIn: "30 days",
                      }
                    );
                    foundHospital.password = "";
                    var response = {
                      account: foundHospital,
                      token: jtoken,
                    };
                    secret = "";
                    res.send(response);
                  }
                }
              }
            );
          } else {
            jtoken = jwt.sign(
              { email: foundUser.email, isHospital: false },
              secret,
              {
                expiresIn: "30 days",
              }
            );
            foundUser.password = "";
            var response = {
              account: foundUser,
              token: jtoken,
            };
            secret = "";
            res.send(response);
          }
        }
      }
    );
  } else {
    res.send("InvalidOTP");
  }
});

// Get User Points
app.get("/get/users", (req, res) => {
  user.find({}, { location: 1 }, (err, foundUser) => {
    if (err) console.log(err);
    else {
      var userPoints = [];
      for (var i = 0; i < foundUser.length; i++) {
        userPoints.push({
          lat: foundUser[i].location.latitude,
          lng: foundUser[i].location.longitude,
        });
      }
      res.send(userPoints);
    }
  });
});
// Get Hosp Points
app.get("/get/hospitals", (req, res) => {
  hospital.find({}, { location: 1 }, (err, foundHosp) => {
    if (err) console.log(err);
    else {
      var hospitalPoints = [];
      for (var i = 0; i < foundHosp.length; i++) {
        hospitalPoints.push({
          lat: foundHosp[i].location.latitude,
          lng: foundHosp[i].location.longitude,
        });
      }
      // console.log(hospitalPoints);
      res.send(hospitalPoints);
    }
  });
});

//Blood stock updater route
app.post("/hospital/updatestock", (req, res) => {
  hospital.findOneAndUpdate(
    { email: req.body.email },
    {
      $set: {
        bloodStock: {
          ["A+"]: req.body.bloodStock["A+"],
          ["B+"]: req.body.bloodStock["B+"],
          ["AB+"]: req.body.bloodStock["AB+"],
          ["O+"]: req.body.bloodStock["O+"],
          ["A-"]: req.body.bloodStock["A-"],
          ["B-"]: req.body.bloodStock["B-"],
          ["AB-"]: req.body.bloodStock["AB-"],
          ["O-"]: req.body.bloodStock["O-"],
        },
      },
    },
    (err, foundHosp) => {
      if (err) {
        res.send("Error occured " + err);
      } else {
        res.send(foundHosp);
      }
    }
  );
});
// HOSPITAL CREATE BLOOD CAMP
app.post("/hospital/organiseCamp", (req, res) => {
  // console.log(req.body);
  camp.create(req.body, (err, newCamp) => {
    if (err) {
      console.log(err);
      res.send(false);
    } else {
      res.send(req.body);
    }
  });
});

// QR Code Get request
app.get("/hospital/qr/:email", (req, res) => {
  hospital.findOne({ email: req.params.email }, (err, foundHosp) => {
    if (err) {
      res.send("Error occured " + err);
    } else {
      var data = {
        name: foundHosp.name,
        email: foundHosp.email,
        location: foundHosp.location,
      };
      res.send(data);
    }
  });
});

// NOTIFICATION ROUTES
app.get("/getNotifications/:email", (req, res) => {
  secret = req.header("x-forwarded-for") || req.socket.remoteAddress;
  jwtCheck = expressjwt({
    secret: secret,
    algorithms: ["HS256"],
  });
  var authorization = req.headers.authorization.split(" ")[1];
  // console.log(authorization);
  // console.log(secret);
  var decoded;
  try {
    decoded = jwt.verify(authorization, secret);
  } catch (e) {
    return res.send("unauthorized");
  }
  // Decoded is a circular object, so please follow the steps blindly
  var cache = [];
  JSON.stringify(decoded, (key, value) => {
    if (typeof value === "object" && value !== null) {
      if (cache.includes(value)) return;
      cache.push(value);
    }
    return value;
  });
  // console.log(cache[0].email);
  var email = cache[0].email;
  var isHospital = cache[0].isHospital;
  if (req.params.email === email) {
    user.findOne({ email: req.params.email }, (err, foundUser) => {
      if (err) res.send(false);
      else {
        foundUser.seen = foundUser.notifications.length;
        foundUser.save();
        res.send(foundUser.notifications);
      }
    });
  } else res.send(401).send("NOT AUTHORIZED!!!");
});

app.delete("/clearNotifications/:email", (req, res) => {
  secret = req.header("x-forwarded-for") || req.socket.remoteAddress;
  jwtCheck = expressjwt({
    secret: secret,
    algorithms: ["HS256"],
  });
  var authorization = req.headers.authorization.split(" ")[1];
  // console.log(authorization);
  // console.log(secret);
  var decoded;
  try {
    decoded = jwt.verify(authorization, secret);
  } catch (e) {
    return res.send("unauthorized");
  }
  // Decoded is a circular object, so please follow the steps blindly
  var cache = [];
  JSON.stringify(decoded, (key, value) => {
    if (typeof value === "object" && value !== null) {
      if (cache.includes(value)) return;
      cache.push(value);
    }
    return value;
  });
  // console.log(cache[0].email);
  var email = cache[0].email;
  var isHospital = cache[0].isHospital;
  if (req.params.email === email) {
    user.findOne({ email: req.params.email }, (err, foundUser) => {
      if (err) res.send(false);
      else {
        foundUser.seen = 0;
        foundUser.notifications = [];
        foundUser.save();
        res.send(true);
      }
    });
  } else res.status(401).send("NOT AUTHORIZED!!!");
});

app.delete("/deleteNotifications/:i/:email", (req, res) => {
  secret = req.header("x-forwarded-for") || req.socket.remoteAddress;
  jwtCheck = expressjwt({
    secret: secret,
    algorithms: ["HS256"],
  });
  var authorization = req.headers.authorization.split(" ")[1];
  // console.log(authorization);
  // console.log(secret);
  var decoded;
  try {
    decoded = jwt.verify(authorization, secret);
  } catch (e) {
    return res.send("unauthorized");
  }
  // Decoded is a circular object, so please follow the steps blindly
  var cache = [];
  JSON.stringify(decoded, (key, value) => {
    if (typeof value === "object" && value !== null) {
      if (cache.includes(value)) return;
      cache.push(value);
    }
    return value;
  });
  // console.log(cache[0].email);
  var email = cache[0].email;
  var isHospital = cache[0].isHospital;
  if (req.params.email === email) {
    user.findOne({ email: req.params.email }, (err, foundUser) => {
      foundUser.notifications.splice(parseInt(req.params.i, 10), 1);
      foundUser.seen = foundUser.notifications.length;
      foundUser.save();
      res.send(foundUser.notifications);
    });
  } else res.status(401).send("NOT AUTHORIZED!!!");
});

app.get("/remove/:email", (req, res) => {
  user.deleteOne({ email: req.params.email }, (err, usr) => {
    if (err) res.send("Error from backend");
    else {
      if (!usr) {
        hospital.deleteOne({ email: req.params.email });
      }
      res.send("account deleted!");
    }
  });
});

app.post("/hospital/fake", (req, res) => {
  hospital.create(req.body, (err, newHosp) => {
    if (err) console.log(err);
    else return true;
  });
});

app.post("/user/fake", (req, res) => {
  user.create(req.body, (err, newUser) => {
    if (err) console.log(err);
    else return true;
  });
});

app.post("/emergency", (req, res) => {
  Hosp = [];
  hospital.find({}, (err, Hospitals) => {
    if (err) console.log(err);
    else {
      for (var i = 0; i < Hospitals.length; i++) {
        var distance = Distance(
          Hospitals[i].location.latitude,
          req.body.location.latitude,
          Hospitals[i].location.longitude,
          req.body.location.longitude
        );
        distance = distance.toFixed(3);
        Hosp.push({
          name: Hospitals[i].name,
          email: Hospitals[i].email,
          bloodStock: Hospitals[i].bloodStock,
          location: Hospitals[i].location,
          distance: distance,
        });
      }
      Hosp.sort((a, b) => {
        return a.distance - b.distance;
      });
      var i = 0;
      for (i = 0; i < Hosp.length; i++) {
        if (Hosp[i].distance > 200) break;
      }
      // console.log(Hosp.slice(0, i));
      res.send(Hosp.slice(0, i));
    }
  });
});

app.post("/requestBlood/hospitals", (req, res) => {
  Hosp = [];
  var bloodType =
    req.body.details.bloodGroup +
    (req.body.details.rhFactor === "Positive" ? "+" : "-");
  hospital.find({}, (err, Hospitals) => {
    if (err) console.log(err);
    else {
      for (var i = 0; i < Hospitals.length; i++) {
        var distance = Distance(
          Hospitals[i].location.latitude,
          req.body.location.latitude,
          Hospitals[i].location.longitude,
          req.body.location.longitude
        );
        distance = distance.toFixed(3);

        if (
          Hospitals[i].bloodStock[bloodType] > 0 &&
          parseFloat(distance) < parseInt(req.body.details.maxDistance) &&
          Hospitals[i].email !== req.body.details.contact
        ) {
          Hosp.push({
            name: Hospitals[i].name,
            email: Hospitals[i].email,
            bloodStock: Hospitals[i].bloodStock,
            location: Hospitals[i].location,
            distance: distance,
          });
        }
      }
      Hosp.sort((a, b) => {
        return a.distance - b.distance;
      });
      res.send(Hosp);
    }
  });
});

app.post("/requestBlood/user", (req, res) => {
  var User = [];
  var emails = [];
  var reqBloodType =
    req.body.details.bloodGroup +
    (req.body.details.rhFactor === "Positive" ? "+" : "-");

  user.find({}, (err, Users) => {
    if (err) console.log(err);
    else {
      for (var i = 0; i < Users.length; i++) {
        var userBloodType =
          Users[i].bloodGroup + (Users[i].rhFactor === "Positive" ? "+" : "-");
        var distance = Distance(
          Users[i].location.latitude,
          req.body.location.latitude,
          Users[i].location.longitude,
          req.body.location.longitude
        );
        distance = distance.toFixed(3);
        if (
          reqBloodType === userBloodType &&
          Users[i].reqDonor &&
          parseFloat(distance) < parseInt(req.body.details.maxDistance)
        ) {
          User.push({
            name: Users[i].firstName + " " + Users[i].lastName,
            email: Users[i].email,
            bloodGroup: Users[i].bloodGroup,
            rhFactor: Users[i].rhFactor,
            location: Users[i].location,
            distance: distance,
          });
          emails.push(Users[i].email);
        }
      }
      var address = "";
      if (req.body.location.poi) address += req.body.location.poi + ", ";
      if (req.body.location.street) address += req.body.location.street + ", ";
      if (req.body.location.subSubLocality)
        address += req.body.location.subSubLocality + ", ";
      if (req.body.location.subLocality)
        address += req.body.location.subLocality + ", ";
      if (req.body.location.locality)
        address += req.body.location.locality + ", ";
      if (req.body.location.village)
        address += req.body.location.village + ", ";
      if (req.body.location.district)
        address += req.body.location.district + ", ";
      if (req.body.location.subDistrict)
        address += req.body.location.subDistrict + ", ";
      if (req.body.location.city) address += req.body.location.city + ", ";
      if (req.body.location.state) address += req.body.location.state + ", ";
      if (req.body.location.pincode) address += req.body.location.pincode;
      var mailBody =
        "<h4>This is a donation request  on behalf of " +
        req.body.details.name +
        " </h4><h5>Someone is in need of " +
        reqBloodType +
        " blood. Please consider donating.</h5></<br/>" +
        "Email address of the hospital:- " +
        req.body.details.contact +
        "<br/>Address:- " +
        address;
      var mailOptions = {
        from: emailid,
        bcc: emails,
        subject: "IMPORTANT!! Blood Donation Request!!",
        html: mailBody,
        html:
          `<!doctype html>
          <html>
            <head>
              <meta charset="utf-8">
              <style>
                    .box-1{
                      padding: 5px;
                      background-color: rgba(0,191,255, 0.8);
                    }
                    .box-2{
                      padding: 10px;
                      background-color: rgba(255,239,213,0.6);
                      border-radius: 15px;
                    }
                    .logo{
                      width: 200px;
                      max-width: 100%;
                      border-radius: 15px;
                    }
                    .white{
                      background-color: white;
                      border-radius: 15px;
                    }
                    .l-img{
                      width: 30px;
                      height: 30px;
                      border-radius: 50%;
                    }
                    .links{
                      color: rgba(0,0,0,0);
                    }
                    .highlight{
                      color: tomato;
                      font-size: 1.2rem;
                    }
                    .address{
                      color: tomato;
                      font-size: 0.8rem;
                    }
                    
                </style>
            </head>
            <body>
              <div class = "box-1">
                <div class="white">
                  <div class= "box-2">
                  <a href="https://blood-4-life.herokuapp.com/">
                    <img src="https://cdn.discordapp.com/attachments/824856858850230304/845243908354080768/unknown.png" class="logo"/>
                  </a>
            <br/><br/>

                    <p>
                        Hi,
                        <br/>
                        This is a donation request  on behalf of <span class="highlight">` +
          req.body.details.name +
          `</span>.
                        <br/>
                        Someone is in need of
                        <span class="highlight">` +
          reqBloodType +
          `</span>
                        blood.<br/> Please consider donating.<br/>
                        <br/>
                        Email address of the hospital:-
                        <span class="email">` +
          req.body.details.contact +
          `</span>
                        <br/>
                        <br/>
                        Address:-
                        <i class="address">` +
          address +
          `</i>
                        <br/>
                        <br/>
                        Your kindness can save lives. 
                    </p>
                    <h5 class="footer">
                        Best wishes,
                        <br/>
                        Team Blood4Life
                    </h5>
                    <p>
                      Follow Us: 
                    </p>
                    <a href="https://www.facebook.com/assist.blood4life" class="links">
                      <img src="https://cdn3.iconfinder.com/data/icons/capsocial-round/500/facebook-512.png" class="l-img"/>
                    </a>
                    <a href="https://twitter.com/Blood4life12" class="links">
                      <img src="https://cdn3.iconfinder.com/data/icons/social-media-circle/512/circle-twitter-512.png" class="l-img"/>
                    </a>
                    <a href="https://www.instagram.com/assist.blood4life" class="links">
                      <img src="https://cdn3.iconfinder.com/data/icons/2018-social-media-logotypes/1000/2018_social_media_popular_app_logo_instagram-512.png" class="l-img"/>
                    </a>
                  </div>
                </div>
              </div>
            </body>
          </html>`,
      };

      transporter.sendMail(mailOptions);
      var currDonor;
      var today = new Date();
      today.setMinutes(today.getMinutes());

      User.forEach(async (donor) => {
        currDonor = await user.findOne({ email: donor.email });
        currDonor.notifications.push({
          type: "Donation Request",
          body: {
            bloodGroup: req.body.details.bloodGroup,
            rhFactor: req.body.details.rhFactor,
            location: req.body.location,
            date: today.getDate(),
            month: today.getMonth() + 1,
            year: today.getFullYear(),
            hour: today.getHours(),
            min: today.getMinutes(),
          },
        });

        await currDonor.save();
      });
      res.send({ count: User.length });
    }
  });
});

// app.get("/registerIP", (req, res) => {
//   jwtCheck = expressjwt({
//     secret: req.header("x-forwarded-for") || req.socket.remoteAddress,
//   });
// });

app.get("/infoRestore", async (req, res) => {
  // await changeToken();
  secret = req.header("x-forwarded-for") || req.socket.remoteAddress;
  jwtCheck = expressjwt({
    secret: secret,
    algorithms: ["HS256"],
  });
  var authorization = req.headers.authorization.split(" ")[1];
  // console.log(authorization);
  // console.log(secret);
  var decoded;
  try {
    decoded = jwt.verify(authorization, secret);
  } catch (e) {
    return res.send("unauthorized");
  }
  // Decoded is a circular object, so please follow the steps blindly
  var cache = [];
  JSON.stringify(decoded, (key, value) => {
    if (typeof value === "object" && value !== null) {
      if (cache.includes(value)) return;
      cache.push(value);
    }
    return value;
  });
  // console.log(cache[0].email);
  var email = cache[0].email;
  var isHospital = cache[0].isHospital;
  if (isHospital) {
    hospital.findOne({ email: email }, (err, foundHosp) => {
      foundHosp.password = "";
      camp.find({ email: email }, async (err, foundCamps) => {
        await foundCamps.sort((a, b) => {
          var d_a = new Date(a.eventDate);
          var h_a = parseInt(a.eventStartTime[0] + a.eventStartTime[1]);
          var m_a = parseInt(a.eventStartTime[3] + a.eventStartTime[4]);
          d_a.setHours(h_a, m_a, 0);
          var d_b = new Date(b.eventDate);
          var h_b = parseInt(b.eventStartTime[0] + b.eventStartTime[1]);
          var m_b = parseInt(b.eventStartTime[3] + b.eventStartTime[4]);
          d_b.setHours(h_b, m_b, 0);
          return d_b - d_a;
        });

        var Account = { data: foundHosp, event: foundCamps };
        res.send(Account);
      });
    });
  } else {
    user.findOne({ email: email }, (err, foundUser) => {
      var events = [];
      foundUser.password = "";
      camp.find({}, async (err, foundCamps) => {
        await foundCamps.forEach((camp) => {
          var distance = Distance(
            camp.location.latitude,
            foundUser.location.latitude,
            camp.location.longitude,
            foundUser.location.longitude
          );
          distance = distance.toFixed(3);
          var maxDis = 50;
          if (distance <= maxDis) {
            events.push(camp);
          }
        });
        await events.sort((a, b) => {
          var d_a = new Date(a.eventDate);
          var h_a = parseInt(a.eventStartTime[0] + a.eventStartTime[1]);
          var m_a = parseInt(a.eventStartTime[3] + a.eventStartTime[4]);
          d_a.setHours(h_a, m_a, 0);
          var d_b = new Date(b.eventDate);
          var h_b = parseInt(b.eventStartTime[0] + b.eventStartTime[1]);
          var m_b = parseInt(b.eventStartTime[3] + b.eventStartTime[4]);
          d_b.setHours(h_b, m_b, 0);

          return d_b - d_a;
        });
        var Account = { data: foundUser, event: events };
        res.send(Account);
      });
    });
  }
});

app.post("/contactUs", (req, res) => {
  msg.create(
    { name: req.body.name, email: req.body.email, msg: req.body.msg },
    (err, m) => {
      if (err) res.send(false);
      else res.send(true);
    }
  );
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
} else app.use(express.static("public"));

app.listen(process.env.PORT || 5000, process.env.IP, () => {
  console.log("Server has started");
});
