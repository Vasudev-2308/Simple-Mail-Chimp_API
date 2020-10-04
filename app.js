//jshint esversion:6
const express = require("express");
const app = express();
const request = require("request");
const bodyparser = require("body-parser");
const https = require("https");


app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended:true}));
app.get("/",function(req,res){
   res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){
const firstname = req.body.fname;
const lastname = req.body.lname;
const email = req.body.mail;

const data = {

    members:[{
        email_address: email,
        status: "subscribed",
        merge_fields:{
            FNAME: firstname,
            LNAME: lastname
        }
    }]
};
const jsondata = JSON.stringify(data);

const url = "https://us2.api.mailchimp.com/3.0/lists/dd5c5c219b";
const options = {
    method:"POST",
    auth: "Vasudev:1e39216d1a9c797d1cefc8e6ef13cc9b-us2"
};


const request = https.request(url,options,function(response){
       
   if(response.statusCode == 200){
       res.sendFile(__dirname+"/sucess.html")
   }
       
   else{
    res.sendFile(__dirname+"/failure.html")
    app.post("/failure", function(req,res){
        res.redirect("/");
    });
   }
       



    response.on("data", function(data){
    
   })
   
})

request.write(jsondata);
   request.end();

});

// API :- 1e39216d1a9c797d1cefc8e6ef13cc9b-us2
// List ID :- dd5c5c219b

app.listen(process.env.PORT || 3000,function(){
    console.log("Server Running at port 3000");
})