var request = require("request");
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.listen(process.env.PORT || 5000, process.env.IP, () => {
  console.log("Server has started");
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
