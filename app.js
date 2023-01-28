const bodyParser = require("body-parser");
const express = require("express");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static('public'));   //This is to serve static files, such as the CSS
app.use(bodyParser.urlencoded({extended:true})); //This is to be able to read the input of post request forms

app.listen(3000, function(){
  console.log("Server is runing on port 3000");
})

app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req, res){
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields:
         {
            FNAME: firstName,
            LNAME: lastName
          }
      }
    ]
  }
  const jsonData = JSON.stringify(data);
  const url = "https://us21.api.mailchimp.com/3.0/lists/dff7e8076e";
  const options = {
    method: "POST",
    auth: "simeonkruger:b663b66685c963e90712c9827e25b94e-us21"
  };
  const request = https.request(url, options, function(response){
    response.on("data", function(data){
      if (response.statusCode === "200"){
        res.sendFile(__dirname + "/success.html");
      }
      else{
        res.sendFile(__dirname + "/failure.html");
      }

    })
  })
  request.write(jsonData);
  request.end();
})

app.post("/failure", function(req, res){
  res.redirect("/");
})


//API Key
//b663b66685c963e90712c9827e25b94e-us21

//Audience id:
//dff7e8076e
