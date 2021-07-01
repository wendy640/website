const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");


const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(request,response){
    response.sendFile(__dirname + "/index.html");
});
app.get("/Services", function(request,response){
    response.sendFile(__dirname + "/Services.html");
});
app.get("/Contact", function(request,response){
    response.sendFile(__dirname + "/Contact.html");
});
app.get("/Portfolio", function(request,response){
    response.sendFile(__dirname + "/Portfolio.html");
});


app.post("/Contact" , function(request,response){
 const firstName = request.body.fName;
 const lastName = request.body.lName;
 const email = request.body.mail;
 const message = request.body.message;

 console.log(firstName, lastName, email, message);

 const data = {
    members: [
        {
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName,
                MESSAGE:message,
            }
            
        }
    ]
}

const jsonData = JSON.stringify(data);

const  url = "https://us6.api.mailchimp.com/3.0/lists/dccab44dbb";

const options={
    method: "POST",
    auth: "wendy:c346bc55c2bdb123677da041e831be17-us6"
}

const req = https.request(url,options,function(res){

    if (res.statusCode === 200) {
        response.sendFile(__dirname + "/success.html");   
    }else{
        response.sendFile(__dirname + "/failure.html");
    }

    res.on("data", function(data){
        console.log(JSON.parse(data));
    })
});

req.write(jsonData);
req.end();

});

app.post("/failure", function(request, response){
    response.redirect("/")
});

app.post("/success", function(request, response){
    response.redirect("/")
});
app.post("/Service", function(request, response){
    response.redirect("/")
});





app.listen(process.env.PORT || 3000,function(){
    console.log("we are in ");
});

// ab39ed1816871f0cc1af64c2deccb7c3-us6
// not posted



