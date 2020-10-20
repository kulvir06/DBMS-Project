const { Router } = require("express");
const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser');

const app = express();

router.use(bodyParser.urlencoded({extended: true}));
router.use(express.json());

//connection to database
const mysql = require("mysql");

var con = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"password",
    database: "project_db_coaching_center"
})

con.connect(function(err){
    if(err) throw err;
    console.log("connected");
})
//connection to db code ends


//styles
const style_body ="body {    margin: 0;    padding: 0;    width: 100%;    height: 100%;    background: #2c3e50;    font-family: 'Montserrat', sans-serif;    font-size: 16px;  } body {  display: -webkit-box;    display: flex;    flex-wrap: wrap;    justify-content: space-around;    -webkit-box-align: center;            align-items: center;    align-content: center;  }   h1 {    color: #f1c40f;    font-size: 4rem;    text-transform: uppercase;    display: block;    width: 100%;    text-align: left;  } @media screen and (max-width: 600px) {    h1 {      font-size: 3rem;    }  }    p {    color: #f1c40f;    font-size: 1.2rem;    width: 100%;    padding: 20px;    text-align: left;  } h3{color: #f1c40f;font-size:30px;    display: block;width: 100%;    text-align: left;}"
//const style_body = "body { background: url(\"https://s3-us-west-2.amazonaws.com/s.cdpn.io/38816/image-from-rawpixel-id-2210775-jpeg.jpg\") center center no-repeat; background-size: cover;    width: 100vw;    height: 100vh;    display: grid;    align-items: center;    justify-items: center;  }"
const style_heading = "";//"h1 {color:  #1abc9c;font-size: 4rem;text-transform: uppercase;display: block;width: 100%;text-align: left;font-family: 'Montserrat', sans-serif;}</style>"


//buttons
const options="<br><p><form method=\"POST\"><button formaction=\"http://localhost:3000/account/parent/details\">Check your details</button><br><button formaction=\"http://localhost:3000/account/parent/ward_details\">Check ward details</button><br><button formaction=\"http://localhost:3000/account/parent/subject_list   \">Course List</button><br><button formaction=\"http://localhost:3000/account/parent/tutor_info  \">Tutor details</button><br><button formaction=\"http://localhost:3000/account/parent/marks\">Check Marks</button><br><button formaction=\"http://localhost:3000/account/parent/coaching_details  \">Coaching Details</button><br><button formaction=\"http://localhost:3000/account/parent/password_change\">Change/Forgot Password</button></form></p>"



//global varibales to be used in all functions
var userName;
var pass;


//landing page for parent login
router.post("/",function(req,res){    
    userName = String(req.body.Username);
    pass = String(req.body.Password);
    console.log(userName);
    console.log(pass);

    var sql="select * from parent where username = "+mysql.escape(userName)+"and password = "+mysql.escape(pass);   
    con.query(sql,function(err,result,fields){
        if(err) throw err;
        
        console.log(result);
        if(result.length===0)
        {
            res.sendFile(__dirname+"/error.html");
        }
        else
        {
            var fname = String(result[0].first_name);
            res.write("<div><style>"+style_body+style_heading+"</style><h1>How are you "+fname+"?"+options+"</h1><p>To log out simply close the tab.</p></div>")  
                  
        }      

        
    })
})  

    

//check details
router.post("/details",function(req,res){
    var username = userName;
    var password = pass;
    
    var sql="select * from parent where username = "+mysql.escape(username)+"and password = "+mysql.escape(password); 
     con.query(sql,function(err,result,fields){
         if(err) throw err;
         var dob = String(result[0].DOB);
         dob = dob.substring(0,15)
         res.write("<div><style>"+style_body+style_heading+"</style><h3><b>Username : </b>"+result[0].username+"<br><b>First Name : </b>"+result[0].first_name+"<br><b>Last Name : </b>"+result[0].last_name+"<br><b>Address : </b>"+result[0].address+"<br><b>Contact : </b>"+result[0].contact+"</h3></div>")
     })
})


//check ward details
router.post("/ward_details",function(req,res){
    var username = userName;
    var password = pass;
    
    var sql="select * from student where username in (select student_username from parent where username ="+mysql.escape(username)+");"; 
     con.query(sql,function(err,result,fields){
         if(err) throw err;
         var dob = String(result[0].DOB);
         dob = dob.substring(0,15)
         res.write("<div><style>"+style_body+style_heading+"</style><h3><b>Username : </b>"+result[0].username+"<br><b>First Name : </b>"+result[0].first_name+"<br><b>Last Name : </b>"+result[0].last_name+"<br><b>Gender : </b>"+result[0].gender+"<br><b>Address : </b>"+result[0].address+"<br><b>Contact : </b>"+result[0].contact+"<br><b>Date of Birth : </b>"+dob+"</h3></div>")
         
     })
})

//different style
const trial_style="html, body {    margin: 0;    padding: 0;    width: 100%;    height: 100%;    background: #2c3e50;    font-family: 'Montserrat', sans-serif;    font-size: 16px;  } p{    color: #f1c40f;    font-size: 1.2rem;    width: 100%;    padding: 20px;    text-align: left;  }"


//subject or course list
router.post("/subject_list",function(req,res){
    res.write("<div><style>"+style_body+"</style><form method=\"POST\"><button formaction=\"http://localhost:3000/account/parent/mathematics\">Mathematics</button><br><br><button formaction=\"http://localhost:3000/account/parent/physics\">Physics</button><br><br><button formaction=\"http://localhost:3000/account/parent/chemistry\">Chemistry</button><br><br><button formaction=\"http://localhost:3000/account/parent/biology\">Biology</button></form></div>")
})


//mathematics
router.post("/mathematics",function(req,res){
    var username = userName;
    var password = pass;
    res.write("<div><style>"+trial_style+"</style><p>To search for a particular chapter/book press Ctrl+F and type in the dialogue box.</p></div>")

    var sql =" select * from mathematics where coaching_code in (select coaching_code from student where username in (select student_username from parent where username="+mysql.escape(username)+"));";
    con.query(sql,function(err,result,fields){
        if(err) throw err;
        console.log(result)
        var len = result.length;
        for(var i = 0;i<len;i++){
            res.write("<div><style>"+trial_style+"</style><p>"+(i+1)+". &#8287;<b>Chapter Name :</b>  &#8287;"+result[i].chapter+" &#8287; &#8287; &#8287; <b>Reference Book : </b> &#8287; "+result[i].book+"<br></p></div>") //res.write("<div><style>"+trial_style+"</style><p>"+result[i].chapter+" "+result[i].book+"<br></p></div>")
        }
        res.send();
    })
    
})


//physics
router.post("/physics",function(req,res){
    var username = userName;
    var password = pass;
       
    res.write("<div><style>"+trial_style+"</style><p>To search for a particular chapter/book press Ctrl+F and type in the dialogue box.</p></div>")
    var sql =" select * from physics where coaching_code in (select coaching_code from student where username in (select student_username from parent where username="+mysql.escape(username)+"));";
    con.query(sql,function(err,result,fields){
        if(err) throw err;
        console.log(result)
        var len = result.length;
        for(var i = 0;i<len;i++){
            res.write("<div><style>"+trial_style+"</style><p>"+(i+1)+". &#8287;<b>Chapter Name :</b>  &#8287;"+result[i].chapter+" &#8287; &#8287; &#8287; <b>Reference Book : </b> &#8287; "+result[i].book+"<br></p></div>") //res.write("<div><style>"+trial_style+"</style><p>"+result[i].chapter+" "+result[i].book+"<br></p></div>")
        }
        res.send();
    })
    
})


//chemistry
router.post("/chemistry",function(req,res){
    var username = userName;
    var password = pass;
    res.write("<div><style>"+trial_style+"</style><p>To search for a particular chapter/book press Ctrl+F and type in the dialogue box.</p></div>")

    var sql =" select * from chemistry where coaching_code in (select coaching_code from student where username in (select student_username from parent where username="+mysql.escape(username)+"));";
    con.query(sql,function(err,result,fields){
        if(err) throw err;
        console.log(result)
        var len = result.length;
        for(var i = 0;i<len;i++){
            res.write("<div><style>"+trial_style+"</style><p>"+(i+1)+". &#8287;<b>Chapter Name :</b>  &#8287;"+result[i].chapter+" &#8287; &#8287; &#8287; <b>Reference Book : </b> &#8287; "+result[i].book+"<br></p></div>") //res.write("<div><style>"+trial_style+"</style><p>"+result[i].chapter+" "+result[i].book+"<br></p></div>")
        }
        res.send();
    })
    
})


//biology
router.post("/biology",function(req,res){
    var username = userName;
    var password = pass;
       
    res.write("<div><style>"+trial_style+"</style><p>To search for a particular chapter/book press Ctrl+F and type in the dialogue box.</p></div>")
    var sql =" select * from biology where coaching_code in (select coaching_code from student where username in (select student_username from parent where username="+mysql.escape(username)+"));";
    con.query(sql,function(err,result,fields){
        if(err) throw err;
        console.log(result)
        var len = result.length;
        for(var i = 0;i<len;i++){
            res.write("<div><style>"+trial_style+"</style><p>"+(i+1)+". &#8287;<b>Chapter Name :</b>  &#8287;"+result[i].chapter+" &#8287; &#8287; &#8287; <b>Reference Book : </b> &#8287; "+result[i].book+"<br></p></div>") 
        }
        res.send();
    })
    
})


//coaching details
router.post("/coaching_details",function(req,res){
    var username = userName;
    var password = pass;

    var sql = "select * from coaching where coaching_code in (select coaching_code from student where username in (select student_username from parent where username = "+mysql.escape(username)+"));";
    con.query(sql,function(err,result,fields){
        if(err) throw err;
        res.write("<div><style>"+style_body+"</style><p><h3>Institute Name: "+result[0].coaching_name+"<br>City: "+result[0].city+"<br>Address: "+result[0].address+"<br>Contact: "+result[0].contact+"</h3></p></div>");
        res.send();
    })
})


//tutor info
router.post("/tutor_info",function(req,res){
    var username = userName;
    var password = pass;
    res.write("<div><style>"+trial_style+"</style><p>To search for a faculty/subject press Ctrl+F and type in the dialogue box.</p></div>")
    var sql = "select first_name,last_name,subject,contact from teacher where coaching_code in (select coaching_code from student where username in (select student_username from parent where username =  "+mysql.escape(username)+"));";
    con.query(sql,function(err,result,fields){
        if(err) throw err;
        console.log(123);
        var len = (result.length);
        for(var i = 0;i<len;i++){
            res.write("<div><style>"+trial_style+"</style><p>"+(i+1)+". <b>Name : </b>"+result[i].first_name+" "+result[i].last_name+"&#8287; &#8287; <b>Subject : </b>"+result[i].subject+"&#8287; &#8287; <b>Contact : </b>"+result[i].contact+"</p></div>")
        }
        res.send()
    })
})


//marks
router.post("/marks",function(req,res){
    var username  = userName;
    var password = pass;

    var sql = "select * from marks where student_username in (select student_username from parent where username = "+mysql.escape(username)+");";
    con.query(sql,function(err,result,fields){
        if(err) throw err;
        console.log(result)
        var len=result.length;
        for(var i=0;i<len;i++){
            if(result[i].biology===null)
            res.write("<div><style>"+style_body+"</style><p><h3>Student Username = "+result[i].student_username+"<br>Test Number = "+result[i].test_no+"<br>Physics = "+result[i].physics+"<br>Chemistry = "+result[i].chemistry+"<br>Mathematics = "+result[i].mathematics+"</h3></p></div>");
            else
            res.write("<div><style>"+style_body+"</style><p><h3>Test Number = "+result[i].test_no+"<br>Physics = "+result[i].physics+"<br>Chemistry = "+result[i].chemistry+"<br>Biology = "+result[i].biology+"</h3></p></div>");

        }
        res.send()
    })
})


//chnage password

router.post("/password_change",function(req,res){
    res.sendFile(__dirname+"/changePasswordParent.html");
})

router.post("/password_change_report",function(req,res){
    var pass1 = String(req.body.newPassword)
    var pass2 = String(req.body.confirmPassword)
    console.log(pass1);
    console.log(pass2);
    if(pass1===pass2){
        var sql = "update parent set password  = "+mysql.escape(pass1)+"where username = "+mysql.escape(userName)+";"
        con.query(sql,function(err,result,fields){
            if(err) throw err;
            console.log('password changed');
        })
        res.write("<div><style>"+style_body+"</style><p><b>Password Changed Successfully</b><br><form method=\"post\">&#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; <button formaction=\"http://localhost:3000/login/parent\">Re-Login</button></form></p></div>")

    }    
    else
    res.write("<div><style>"+style_body+"</style><p><b>Passwords did not match. Re-try!!</b><form method=\"post\">&#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; <button formaction=\"http://localhost:3000/login/parent\">Re-Try</button></form></p></div>")
    res.send();
})





module.exports = router;