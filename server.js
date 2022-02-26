const express=require("express");
const bodyParser=require("body-parser");
const https=require("https");
const app=express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

app.get("/",function(request,response){
    response.sendFile(__dirname+"/index.html");
});
app.post("/",function(request,response){
    const fname=request.body.fname;
    const lname=request.body.lname;
    const email=request.body.email;
    var mydata={
        members:[{
            email_address:email,
            status:"subscribed",
            merge_fields:{
                FNAME:fname,
                LNAME:lname
            }
        }]
    };
    var JSONdata=JSON.stringify(mydata);
    const url="https://us14.api.mailchimp.com/3.0/lists/list_id";
    const options={
        method:"POST",
        auth:"Shubham:apikey"
    }
    const req=https.request(url,options,function(res){
        if(res.statusCode==200) 
        response.sendFile(__dirname+"/success.html");
        else response.sendFile(__dirname+"/failure.html");
        
    })

    app.post("/tryagain",function(request,response){
        response.redirect("/");
    });
    req.write(JSONdata);
    req.end();
});

app.listen(process.env.PORT || 3000,function(){
    console.log("listening");
});
