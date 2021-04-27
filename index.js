var request = require("request");
var axios = require("axios");

var express = require("express");
var app = express();
var mongoose = require("mongoose");
var nodemailer = require("nodemailer");

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

//MapMyIndia
var token = 0;
var restAPIKey = "vnho6si4yv1ihymphyrzczd936i61hyw";
// "dxyg9yvopbpjt1zh39asi1hneipg9thl";
var clientID =
  "33OkryzDZsI5Z0x8-JhQ2Edr12Q9KLeyxboyCw3eYfoogkdg2Hcchz4-RI2aCtvafZkKFclB8eiSkTHzwFknbuoTnESgxegYnH84zNd6wzvcv52N4pPeCQ==";
// "33OkryzDZsJ1Xuc-qlxykreisPt9C12OUEamMuQDqKrTSA0ex3IcKJF7Ty4UDTICZnP-0EjIoFs5fcHbx6hvME-9ayO2OZYseV8Q2DTKWLqM6D7aYrnyQw==";
var clientSecret =
  "lrFxI-iSEg-zO4DQYfnrt24sc7s5VbE72wYjFxjWkhoQjrvP6aG8G8qr0lacNQx2utb4WWnv_K0Jy45plKKWFN-55t-6k4C3ZzQxDau6CuU7DJc-lLXcK3I-IkHQmRHF";
// "lrFxI-iSEg_XoGoVnWmmSWrjUoJE0Zo4uufY7hCXP5OFHOkXa5xLOh3UyhyC0CPyX9L0N5MLhoIP9w4q7ArSu-b-ZGMGSMMMghAY3pWRNw7qAHrZh9zloy9ZequrPxoJ";
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

app.get("/suggest/:location", (req, res) => {
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
app.get("/eloc/:eloc", (req, res) => {
  var url =
    "https://apis.mapmyindia.com/advancedmaps/v1/" +
    restAPIKey +
    "/place_detail?place_id=" +
    req.params.eloc;
  axios.get(url).then(
    (Res) => {
      console.log(Res.data.results[0]);
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
  zip: Number,
  city: String,
  address: String,
  bloodGroup: String,
  rhFactor: String,
  reqDonor: Boolean,
});

var hospitalSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  zip: Number,
  city: String,
  address: String,
  bloodStock: Object,
});

//------------------------------------------------MODEL
var user = mongoose.model("User", userSchema);
var hospital = mongoose.model("Hospital", hospitalSchema);

var otp = String(Math.floor(Math.random() * 89999 + 10000));
var timer = 60;
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
      zip: req.body.zip,
      city: req.body.city,
      address: req.body.addr,
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
    account.password = "";
    res.send(account);
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
        address: req.body.address,
        city: req.body.city,
        zip: req.body.zip,
        bloodGroup: req.body.bloodGroup,
        rhFactor: req.body.rhFactor,
        reqDonor: req.body.reqDonor,
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
  user.find({}, {});
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

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
} else app.use(express.static("public"));

app.listen(process.env.PORT || 5000, process.env.IP, () => {
  console.log("Server has started");
});
