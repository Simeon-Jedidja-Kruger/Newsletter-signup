const bodyParser = require("body-parser");
const express = require("express");
const request = require("request");

const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));

app.listen(3000, function(){
  console.log("Server is runing on port 3000");
})

app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req, res){
  const firstName = req.body.firstName;
  console.log("The first name is: " + firstName);
  res.sendFile(__dirname + "/success.html");
})
