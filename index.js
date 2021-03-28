var request = require('request')
var express = require('express');
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.listen(process.env.PORT||5000, process.env.IP, ()=>{
  console.log("Server has started");
})


app.get("/", (req, res)=>{
    res.redirect("https://www.google.com/");
});


