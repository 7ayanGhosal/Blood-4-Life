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
  notifications: Array,
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
var userToken = String(Math.floor(Math.random() * 89999 + 10000));
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
var token = 0;
var restAPIKey =
  // "8ao7pqx5ep643nfhux7fl9h6cj88n1u7"; //self.master
  // "pn9guga52xq8e3glz6srj7uc88j2nj8o"; //blood4life
  // "vnho6si4yv1ihymphyrzczd936i61hyw"; //shadow
  // "dxyg9yvopbpjt1zh39asi1hneipg9thl"; //master
  // "oymmpwqkf6ucxplv8xglbxvsz5t4cu6c"; //patra1
// "f4slxwqq1r5kh7tmv2blz68hrvsf275g"; //patra2
// "gn53n3t9ljaldc39tonzt7brfwojehwt"; //tevoh10810@dghetian.com
"41bnkkt2m448pnteqzx3zrga1jcmw9dd"; //fake //yebola9356@dghetian.com
// "nx9uj21rwlp2i3gpserelqc9jk15utmh"; //yasak76551@dghetian.com
// "6qvauko?d2jwn7t1x933o9dzi5puy6wzn"; //konaga1595@animex98.com
// "5p3qejd1aust5syjm6hqxvky3gcse6hu"; //hepira8629@dghetian.com
// "ugtsuizcadlynqjtb7q2zcxf3qtrxh7r"; //malop41024@animex98.com
// "zmjykodsd1stc2jzp9k7ukq43b2drm4r"; //jadega5571@animex98.com *
// "6oee76fnz1354fikljkevh9m3u9zs9ka"; //refij11914@dghetian.com
var clientID =
  // "33OkryzDZsKud94n0RHNubvOQuBX7plQb60OBebv_UOx9JOq4JbkK0S8MUesdAh9tDIgn3vlhbmifnFmxOPXT_eGXRLvbW95PhT5nywtJlxtZcL0fvC6kw==";
  // "33OkryzDZsIp57EdobRSGBgU1AKXUvmrcTQf4DIdgUg6rz7sXgypeWXwiJ_v6i3MjFWKWwGxNBFWSYki4X6sSrWuX_UhE-KXCK4mWrkuXG402yNV7skqYw==";
  // "33OkryzDZsI5Z0x8-JhQ2Edr12Q9KLeyxboyCw3eYfoogkdg2Hcchz4-RI2aCtvafZkKFclB8eiSkTHzwFknbuoTnESgxegYnH84zNd6wzvcv52N4pPeCQ==";
  // "33OkryzDZsJ1Xuc-qlxykreisPt9C12OUEamMuQDqKrTSA0ex3IcKJF7Ty4UDTICZnP-0EjIoFs5fcHbx6hvME-9ayO2OZYseV8Q2DTKWLqM6D7aYrnyQw==";
  // "33OkryzDZsIxyJnU5Dq3RHxwahAUX51pfdoAFm7zG_zPzrufmmfPzIcIzVMkVwb5gQCiFc_Lgp9KANt3mU3g71CFAaXBvC5nTuiHqmyIqE4-Tmj779fUHA=="; //patra1
// "33OkryzDZsIfGlUo6y0W-b-v0_R3xyHCINIJYPpjOE9yKkUNqH4T4uvhQL8PqaefiEdkgM7klj1Hd1wreawAmAfyyE-nPgGCa_PE8eMviR6dvxT1Ihc9kA==";
// "33OkryzDZsKQ2VqmmE2NUNXJMxcHojkZMGJHas-GLu3IKbThgT2kIGh7QXGe8lSoZ9yvsvB6BI_ZfeGBEa8t-dBeMUxVuhAQ3k_ySGMKnQWbPFc0CSLAyA==";
"33OkryzDZsJkys1CEXUKT4-iDtRexzoJfl4ZvqbXnLyYqUhuA_bnVxdEwInJ3FnTSXHeNPKAAGavOR4tK3yuF3lYX7UhrNG6dXkmRKkxoyC6LXe9UHFshQ=="; //fake
// "33OkryzDZsLgaX8WXOgT0OvRImhfkXNasjteBwVHofwZBDubQpO3YuZPig3io-kf6SefVgjqUvqlbhKdg0FV9VUFatukSuyzAg6Czp9DxJiWda1KMROR6w==";
// "33OkryzDZsLzTQwobsB?dpbrgKgmmeGTgs7bH7iw0Qjo1DnoaF3nVJlAer13ywvopksH-lQOeQM1mm-ENbPVS3DOOaCd_iCp33BXmyWmZvH9-CbdXVmiDYA==";
// "33OkryzDZsLAwn2f0kKGSwr8fXWYjR5bbn-fYVdLo1Qtl96mLcu8S3o8AqTrgX3j7bccoH2Evmx60UdRhFChjMo7nw3EcXxZKPWz6_cI0jsp3JKIee5npA==";
// "33OkryzDZsKCAEV4TZ3WxzuVBHgZDRu5bd7OVzQhUa2P3Ko2WH8y7X8VsIQZ-XCle1fGXvhDbJXDIIoyExDy-OKCrAmbLEpTmtCx2txFmfEEebRelvvJ8A==";
// "33OkryzDZsIwqjE40QCnFxJK436IzckSW-0-TNIqB05ygPsmbs5GHGz7xeey4dcrQlrnVMklK7te-HIiv8IopPeOS6wbz2IYPQJULvaJw3k="; //*
// "33OkryzDZsJyPUR_3XLlRNwL79j27h00rGWcQ2bx4iWtiyjyau-2-3rgHNoP7IXyYM5oxVucopjwOUNPSeHyF8Bnxp5-yUO79qtopXkwSlnJC97uoQsLiw==";
var clientSecret =
  // "lrFxI-iSEg-zO4DQYfnrt3fVbtkxTr847H5outlqQmJHu__AEHKeeXlkkELCOpGN3gtIe-lEzwRbIsYdmPpLPGG3ZiQs8PCwY-JenzFK_CZAK38D0B9dWVA-C4FjcCxc";
  // "lrFxI-iSEg-4SAEyHH3N8Yr5o0Mq_TDDx1BKe1gnOlV-5wchHPK_P2uo7msJ6olzITexNmJ9C4M0PgBBPQfUUaAOgpYVTNRHcOlv0ABYKg1fp72eCZP3dhgXTeZu9_bI";
  // "lrFxI-iSEg-zO4DQYfnrt24sc7s5VbE72wYjFxjWkhoQjrvP6aG8G8qr0lacNQx2utb4WWnv_K0Jy45plKKWFN-55t-6k4C3ZzQxDau6CuU7DJc-lLXcK3I-IkHQmRHF";
  // "lrFxI-iSEg_XoGoVnWmmSWrjUoJE0Zo4uufY7hCXP5OFHOkXa5xLOh3UyhyC0CPyX9L0N5MLhoIP9w4q7ArSu-b-ZGMGSMMMghAY3pWRNw7qAHrZh9zloy9ZequrPxoJ";
  // "lrFxI-iSEg8fgRD_vMjNSnLNbwY7GOZ_HaTmUcjnmy8R9FTv2ldK9OlrVSwX1ndkHKoLOSrnurIsNdWX8NunJ4XW7m4Sd9SI6NLXXeTWFpfeAnBQc5MFWgKtDloVI3tA"; //patra1
// "lrFxI-iSEg8fgRD_vMjNSoxRqR5oJ7zJlyNaXYy7nwxLccpUjvSfG_3IYGICS2uGliB45v-CjEZz1V-DrZgQM0VtEp26DwYL-3ylKSDtXO_GyZk0nx60dsZIz1Ae7byb";
// "lrFxI-iSEg-vcLPoNWhItCgU0vjdUcvuj6aezWzsYbZpU4J1Abuthj2zhy11bDPlZcZsMe__SJbfm9Htp25Xhp7mxkyY9Kh4my8gWhSortVnLEeZHyxG_GRtzNpEnkiR";
"lrFxI-iSEg9s2lXDr-67wP5xDwte_oZVI79HMDTqUdI_olgHdmGcuB5HMRrYgHlbxQ-0-ZOPNnCO3NNdIzyxwZFkakP1Mg1UiIzcrG8CHhuYzjPaHMq13oMgu4qjWFTd"; //fake
// "lrFxI-iSEg9s2lXDr-67wEB10ObwcqZwf6Ki4G2ZQDucH_IS98KdMZnPWsXjsdHDXK7WnAY48Wqr1b3i0pf2vZVs2ZdKS1QA1nHXL5d41t-mV2Q_yq9YeXhagaEg6ABg";
// "lrFxI-iSEg9s2lXDr-67wPg9L-?d_VoZCa1pttcqa9-lCUSkdR_axf0F0VQUP60h7Pum10rLa7brYRluLwoA19RuYFlr_ZV0rz_DgjAVPH5tSGmgbrLTIACSfxaNi4Gol";
// "lrFxI-iSEg9s2lXDr-67wKBkJ66du_ZXkmh7E2vP6Db92fkBbzXd4ulP76mhG-n_JYihKEh33WLldeyyoZOM5yTqfQcokWYFt1FpN4oz6nB0ugkgfOLcOwWylzH49Ep_";
// "lrFxI-iSEg9s2lXDr-67wC1GdARt3ydr3DJGrbQW7llusXiBaAhi7B5mvrVZkqXZ3TcA6snEfLPeps8dQ80DERVgGznKeQ4v4UmQzCBrNvwT-RN6dDzW9qELy8f3jkPo";
// "lrFxI-iSEg9s2lXDr-67wOsewZc_GqpRk2zQcvGtWOhi3kd8WR72eR_El2jF55zC0pSicXULk9q1L7XN35Gfj4bI-osA5DOBnjKxYxolmwu_0L8dWtNfzw=="; //*
// "lrFxI-iSEg9s2lXDr-67wIvEQXNojVrm0yn8VsPvB6mmjSWReTM4WLz7NUwEs2KUA-cAFoTA4zcONbdqR_j5UtecAI24tT7FBrqgPd8_yn_POQbgyKMwT4TSwsuZp1M1";
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
        (Res.data.results[0].poi != "" ? Res.data.results[0].poi+", ":"")
                +
                (Res.data.results[0].street != "" ? Res.data.results[0].street+", ":"")
                +
                (Res.data.results[0].subSubLocality != "" ? Res.data.results[0].subSubLocality+", ":"")
                +
                (Res.data.results[0].subLocality != "" ? Res.data.results[0].subLocality+", ":"")
                +
                (Res.data.results[0].locality != "" ? Res.data.results[0].locality+", ":"")
                +
                (Res.data.results[0].village != "" ? Res.data.results[0].village+", ":"")
                +
                (Res.data.results[0].district != "" ? Res.data.results[0].district+", ":"")
                +
                (Res.data.results[0].subDistrict != "" ? Res.data.results[0].subDistrict+", ":"")
                +
                (Res.data.results[0].city != "" ? Res.data.results[0].city+", ":"")
                +
                (Res.data.results[0].state != "" ? Res.data.results[0].state+", ":"")
                +
                (Res.data.results[0].pincode != "" ? Res.data.results[0].pincode+" ":""),
          
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
        Account = { data: account, event: foundCamps, token: userToken };
        res.send(Account);
      });
    } else {
      var maxDis = 50; //50km max distance
      var events = [];
      account.password = "";
      await camp.find({}, (err, foundCamps) => {
        foundCamps.forEach((camp) => {
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
        Account = { data: account, event: events, token: userToken };
        res.send(Account);
      });
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

app.get("/getNotifications/:token/:email", (req, res) => {
  if (userToken != req.params.token) {
    res.send(False);
  } else {
    user.findOne({ email: req.params.email }, (err, foundUser) => {
      if (err) res.send(False);
      else {
        res.send(foundUser.notifications);
      }
    });
  }
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
      var address =
        req.body.location.poi +
        ", " +
        req.body.location.street +
        ", " +
        req.body.location.subSubLocality +
        ", " +
        req.body.location.subLocality +
        ", " +
        req.body.location.locality +
        ", " +
        req.body.location.village +
        ", " +
        req.body.location.district +
        ", " +
        req.body.location.subDistrict +
        ", " +
        req.body.location.city +
        ", " +
        req.body.location.state +
        ", " +
        req.body.location.pincode;
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
        subject: "Blood Donation Request",
        html: mailBody,
      };

      transporter.sendMail(mailOptions);
      var currDonor;
      User.forEach(async (donor) => {
        currDonor = await user.findOne({ email: donor.email });
        currDonor.notifications.push({
          type: "Donation Request",
          body: {
            bloodGroup: req.body.details.bloodGroup,
            rhFactor: req.body.details.rhFactor,
            location: req.body.location,
            date: new Date().getDate(),
            month: new Date().getMonth(),
            year: new Date().getYear(),
            hour: new Date().getHours(),
            min: new Date().getMinutes()
          },
        });
        await currDonor.save();
      });
      res.send({ count: User.length });
    }
  });
});


// user.find({}, (err, foundUser)=>{
//   foundUser.forEach((usr)=>{
//     usr.notifications = [];
//     usr.save();
//   })
// })


if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
} else app.use(express.static("public"));

app.listen(process.env.PORT || 5000, process.env.IP, () => {
  console.log("Server has started");
});
