var request = require("request");
var axios = require("axios");

var express = require("express");
var app = express();
var mongoose = require("mongoose");
var nodemailer = require("nodemailer");
var faker = require("faker");

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

//------------------------------------------------MODEL
var user = mongoose.model("User", userSchema);
var hospital = mongoose.model("Hospital", hospitalSchema);
var camp = mongoose.model("Camp", campSchema);

var otp = String(Math.floor(Math.random() * 89999 + 10000));
var timer = 60;

//MapMyIndia
var token = 0;
var restAPIKey =
  //  "8ao7pqx5ep643nfhux7fl9h6cj88n1u7"; //self.master
  // "pn9guga52xq8e3glz6srj7uc88j2nj8o"; //blood4life
  // "vnho6si4yv1ihymphyrzczd936i61hyw"; //shadow
  // "dxyg9yvopbpjt1zh39asi1hneipg9thl"; //master
  // "oymmpwqkf6ucxplv8xglbxvsz5t4cu6c"; //patra1
  "f4slxwqq1r5kh7tmv2blz68hrvsf275g"; //patra2
var clientID =
  // "33OkryzDZsKud94n0RHNubvOQuBX7plQb60OBebv_UOx9JOq4JbkK0S8MUesdAh9tDIgn3vlhbmifnFmxOPXT_eGXRLvbW95PhT5nywtJlxtZcL0fvC6kw==";
  // "33OkryzDZsIp57EdobRSGBgU1AKXUvmrcTQf4DIdgUg6rz7sXgypeWXwiJ_v6i3MjFWKWwGxNBFWSYki4X6sSrWuX_UhE-KXCK4mWrkuXG402yNV7skqYw==";
  // "33OkryzDZsI5Z0x8-JhQ2Edr12Q9KLeyxboyCw3eYfoogkdg2Hcchz4-RI2aCtvafZkKFclB8eiSkTHzwFknbuoTnESgxegYnH84zNd6wzvcv52N4pPeCQ==";
  // "33OkryzDZsJ1Xuc-qlxykreisPt9C12OUEamMuQDqKrTSA0ex3IcKJF7Ty4UDTICZnP-0EjIoFs5fcHbx6hvME-9ayO2OZYseV8Q2DTKWLqM6D7aYrnyQw==";
  // "33OkryzDZsIxyJnU5Dq3RHxwahAUX51pfdoAFm7zG_zPzrufmmfPzIcIzVMkVwb5gQCiFc_Lgp9KANt3mU3g71CFAaXBvC5nTuiHqmyIqE4-Tmj779fUHA=="; //patra1
  "33OkryzDZsIfGlUo6y0W-b-v0_R3xyHCINIJYPpjOE9yKkUNqH4T4uvhQL8PqaefiEdkgM7klj1Hd1wreawAmAfyyE-nPgGCa_PE8eMviR6dvxT1Ihc9kA==";
var clientSecret =
  // "lrFxI-iSEg-zO4DQYfnrt3fVbtkxTr847H5outlqQmJHu__AEHKeeXlkkELCOpGN3gtIe-lEzwRbIsYdmPpLPGG3ZiQs8PCwY-JenzFK_CZAK38D0B9dWVA-C4FjcCxc";
  // "lrFxI-iSEg-4SAEyHH3N8Yr5o0Mq_TDDx1BKe1gnOlV-5wchHPK_P2uo7msJ6olzITexNmJ9C4M0PgBBPQfUUaAOgpYVTNRHcOlv0ABYKg1fp72eCZP3dhgXTeZu9_bI";
  // "lrFxI-iSEg-zO4DQYfnrt24sc7s5VbE72wYjFxjWkhoQjrvP6aG8G8qr0lacNQx2utb4WWnv_K0Jy45plKKWFN-55t-6k4C3ZzQxDau6CuU7DJc-lLXcK3I-IkHQmRHF";
  // "lrFxI-iSEg_XoGoVnWmmSWrjUoJE0Zo4uufY7hCXP5OFHOkXa5xLOh3UyhyC0CPyX9L0N5MLhoIP9w4q7ArSu-b-ZGMGSMMMghAY3pWRNw7qAHrZh9zloy9ZequrPxoJ";
  // "lrFxI-iSEg8fgRD_vMjNSnLNbwY7GOZ_HaTmUcjnmy8R9FTv2ldK9OlrVSwX1ndkHKoLOSrnurIsNdWX8NunJ4XW7m4Sd9SI6NLXXeTWFpfeAnBQc5MFWgKtDloVI3tA"; //patra1
  "lrFxI-iSEg8fgRD_vMjNSoxRqR5oJ7zJlyNaXYy7nwxLccpUjvSfG_3IYGICS2uGliB45v-CjEZz1V-DrZgQM0VtEp26DwYL-3ylKSDtXO_GyZk0nx60dsZIz1Ae7byb";
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
    }
  );

//ELOC from LAT - LONG
app.get("/map/getEloc/:lat/:lng", (req, Res) => {
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
            }
          );
      },
      (err) => {
        console.log(err);
      }
    );
});

app.get("/map/suggest/:location", (req, res) => {
  var url =
    "https://atlas.mapmyindia.com/api/places/search/json?query=" +
    req.params.location;
  axios.get(url).then(
    (Res) => {
      res.send(Res.data.suggestedLocations);
    },
    (err) => {
      res.send(err);
    }
  );
});
app.get("/map/eloc/:eloc", (req, res) => {
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
          Res.data.results[0].poi +
          Res.data.results[0].street +
          Res.data.results[0].subSubLocality +
          Res.data.results[0].subLocality +
          Res.data.results[0].locality +
          Res.data.results[0].village +
          Res.data.results[0].district +
          Res.data.results[0].subDistrict +
          Res.data.results[0].city +
          Res.data.results[0].state +
          Res.data.results[0].pincode,
      });
    },
    (err) => {
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

app.post("/otpVerification", (req, res) => {
  OTP = req.body.otp;
  if (otp == OTP) {
    res.send("True");
  } else {
    res.send("False");
  }
});

app.post("/signup", async (req, res) => {
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
    if (account.name) {
      account.password = "";
      await camp.find({ email: req.body.email }, (err, foundCamps) => {
        Account = { data: account, event: foundCamps };
        res.send(Account);
      });
    } else {
      account.password = "";
      Account = { data: account, event: {} };
      res.send(Account);
    }
  }
});

app.post("/resetprofile", (req, res) => {
  // console.log(req.body);
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
      subject: "Password Reset OTP",
      html: otp,
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
                    res.send(foundHospital);
                  }
                }
              }
            );
          } else {
            res.send(foundUser);
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

// app.get("/hospital/getEvents/:email", (req, res) => {
//   camp.find({ email: req.params.email }, (err, foundCamps) => {
//     res.send(foundCamps);
//   });
// });

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

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
} else app.use(express.static("public"));

app.listen(process.env.PORT || 5000, process.env.IP, () => {
  console.log("Server has started");
});
