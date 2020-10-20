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

//style sheet for res.write()
  const style_body ="body {    margin: 0;    padding: 0;    width: 100%;    height: 100%;    background: #2c3e50;    font-family: 'Montserrat', sans-serif;    font-size: 16px;  } body {  display: -webkit-box;    display: flex;    flex-wrap: wrap;    justify-content: space-around;    -webkit-box-align: center;            align-items: center;    align-content: center;  }   h1 {    color: #f1c40f;    font-size: 4rem;    text-transform: uppercase;    display: block;    width: 100%;    text-align: left;  } @media screen and (max-width: 600px) {    h1 {      font-size: 3rem;    }  }    p {    color: #f1c40f;    font-size: 1.2rem;    width: 100%;    padding: 20px;    text-align: left;  } h3{color: #f1c40f;font-size:30px;    display: block;width: 100%;    text-align: left;}"
    // const style_body="body { background: url(\"https://s3-us-west-2.amazonaws.com/s.cdpn.io/38816/image-from-rawpixel-id-2210775-jpeg.jpg\") center center no-repeat; background-size: cover;    width: 100vw;    height: 100vh;    display: grid;    align-items: center;    justify-items: center;  }"
const style_heading =""; //"h1 {color:  #1abc9c;font-size: 4rem;text-transform: uppercase;display: block;width: 100%;text-align: left;font-family: 'Montserrat', sans-serif;}" 
//

const options = "<br><form method=\"POST\"><button formaction=\"http://localhost:3000/account/student/details\">Check your details</button><br><br><button formaction=\"http://localhost:3000/account/student/tutor_info\">Tutor Information</button><br><br><button formaction=\"http://localhost:3000/account/student/subject_list\">Subject</button><br><br><button formaction=\"http://localhost:3000/account/student/marks\">Marks</button><br><br><button formaction=\"http://localhost:3000/account/student/coaching_details\">Coaching Details</button><br><br><button formaction=\"http://localhost:3000/account/student/password_change\">Forgot/Change password</button><br><br></form>"

//global variables
var userName;
var pass;

//landing page for student login
router.post("/",function(req,res){    
     userName = String(req.body.Username);
     pass = String(req.body.Password);
    console.log(userName);
    console.log(pass);

    var sql="select * from Student where username = "+mysql.escape(userName)+"and password = "+mysql.escape(pass);   
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
            res.write("<div><style>"+style_body+style_heading+"</style><h1>How are you "+fname+"?</h1>"+options+"<p>To log out simply close the tab.</p></div>")           
        }              
    })   
})

//student details
router.post("/details",function(req,res){
    var username = userName;
    var password = pass;
    
    var sql="select * from Student where username = "+mysql.escape(username)+"and password = "+mysql.escape(password); 
     con.query(sql,function(err,result,fields){
         if(err) throw err;
         var dob = String(result[0].DOB);
         dob = dob.substring(0,15)
         res.write("<div><style>"+style_body+style_heading+"</style><h3><b>Username : </b>"+result[0].username+"<br><b>First Name : </b>"+result[0].first_name+"<br><b>Last Name : </b>"+result[0].last_name+"<br><b>Gender : </b>"+result[0].gender+"<br><b>Address : </b>"+result[0].address+"<br><b>Contact : </b>"+result[0].contact+"<br><b>Date of Birth : </b>"+dob+"</h3></div>")
     })
})

//trying with different styles
const trial_style="html, body {    margin: 0;    padding: 0;    width: 100%;    height: 100%;    background: #2c3e50;    font-family: 'Montserrat', sans-serif;    font-size: 16px;  } p{    color: #f1c40f;    font-size: 1.2rem;    width: 100%;    padding: 20px;    text-align: left;  }"

//Tutor details
router.post("/tutor_info",function(req,res){
    var username = userName;
    var password = pass;
    res.write("<div><style>"+trial_style+"</style><p>To search for a faculty/subject press Ctrl+F and type in the dialogue box.</p></div>")
    var sql = "select first_name,last_name,subject,contact from teacher where coaching_code in (select coaching_code from student where username= "+mysql.escape(username)+")";
    con.query(sql,function(err,result,fields){
        if(err) throw err;
        var len = (result.length);
        for(var i = 0;i<len;i++){
            res.write("<div><style>"+trial_style+"</style><p>"+(i+1)+". <b>Name : </b>"+result[i].first_name+" "+result[i].last_name+"&#8287; &#8287; <b>Subject : </b>"+result[i].subject+"&#8287; &#8287; <b>Contact : </b>"+result[i].contact+"</p></div>")
        }
    })
})

//SUBJECT LIST
router.post("/subject_list",function(req,res){
    res.write("<div><style>"+style_body+"</style><form method=\"POST\"><button formaction=\"http://localhost:3000/account/student/mathematics\">Mathematics</button><br><br><button formaction=\"http://localhost:3000/account/student/physics\">Physics</button><br><br><button formaction=\"http://localhost:3000/account/student/chemistry\">Chemistry</button><br><br><button formaction=\"http://localhost:3000/account/student/biology\">Biology</button></form></div>")
})
//MATHEMATICS
//table style
const table_style = "table{font-family: arial, sans-serif;    border-collapse: collapse;    width: 100%;}td, th {border: 1px solid #dddddd;text-align: left;padding: 8px;}tr:nth-child(even) {background-color: #dddddd;}"
// const blank_space = "&#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287;" 
// const blank_space1 = "&#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287;" 


router.post("/mathematics",function(req,res){
    var username = userName;
    var password = pass;
      
    var sql = "select chapter,book from mathematics where coaching_code in (select coaching_code from student where username = "+mysql.escape(username)+")";
    con.query(sql,function(err,result,fields){
        if(err) throw err;
        console.log(result)
        var len = result.length;
        res.write("<div><style>"+trial_style+"</style><p>To search for a particular chapter/book press Ctrl+F and type in the dialogue box.</p></div>")
        for(var i = 0;i<len;i++){
            res.write("<div><style>"+trial_style+"</style><p>"+(i+1)+". &#8287;<b>Chapter Name :</b>  &#8287;"+result[i].chapter+" &#8287; &#8287; &#8287; <b>Reference Book : </b> &#8287; "+result[i].book+"<br></p></div>")  
            // res.write("<div><style>"+trial_style+"</style><p>"+result[i].chapter+blank_space1+result[i].book+"<br></p></div>")
            //res.write("<div><style>"+trial_style+"</style><table border=\"1\" width = \"100%\"><tr><td>"+result[i].chapter+"</td><td>"+result[i].book+"</td></tr></table></div>")
        }
        
        res.send();
    })
    
})


//physics
router.post("/physics",function(req,res){
    var username = userName;
    var password = pass;
    res.write("<div><style>"+trial_style+"</style><p>To search for a particular chapter/book press Ctrl+F and type in the dialogue box.</p></div>")
       

    var sql = "select chapter,book from physics where coaching_code in (select coaching_code from student where username = "+mysql.escape(username)+")";
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


//chemistry
router.post("/chemistry",function(req,res){
    var username = userName;
    var password = pass;
    res.write("<div><style>"+trial_style+"</style><p>To search for a particular chapter/book press Ctrl+F and type in the dialogue box.</p></div>")
       

    var sql = "select chapter,book from chemistry where coaching_code in (select coaching_code from student where username = "+mysql.escape(username)+")";
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


//biology
router.post("/biology",function(req,res){
    var username = userName;
    var password = pass;
    res.write("<div><style>"+trial_style+"</style><p>To search for a particular chapter/book press Ctrl+F and type in the dialogue box.</p></div>")

    var sql = "select chapter,book from biology where coaching_code in (select coaching_code from student where username = "+mysql.escape(username)+")";
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


//marks
router.post("/marks",function(req,res){
    var username  = userName;
    var password = pass;

    var sql = "select * from marks where student_username = "+mysql.escape(username)+";";
    con.query(sql,function(err,result,fields){
        if(err) throw err;
        console.log(result)
        var len=result.length;
        for(var i=0;i<len;i++){
            if(result[i].biology===null)
            res.write("<div><style>"+style_body+"</style><p><h3>Test Number = "+result[i].test_no+"<br>Physics = "+result[i].physics+"<br>Chemistry = "+result[i].chemistry+"<br>Mathematics = "+result[i].mathematics+"</h3></p></div>");
            else
            res.write("<div><style>"+style_body+"</style><p><h3>Test Number = "+result[i].test_no+"<br>Physics = "+result[i].physics+"<br>Chemistry = "+result[i].chemistry+"<br>Biology = "+result[i].biology+"</h3></p></div>");

        }
        res.send()
    })
})


//coaching details
router.post("/coaching_details",function(req,res){
    var username = userName;
    var password = pass;

    var sql = "select * from coaching where coaching_code in (select coaching_code from student where username = "+mysql.escape(username)+");";
    con.query(sql,function(err,result,fields){
        if(err) throw err;
        res.write("<div><style>"+style_body+"</style><p><h3>Institute Name: "+result[0].coaching_name+"<br>City: "+result[0].city+"<br>Address: "+result[0].address+"<br>Contact: "+result[0].contact+"</h3></p></div>");
        res.send();
    })
})

//change password

router.post("/password_change",function(req,res){
    res.sendFile(__dirname+"/changePassword.html");
})

router.post("/password_change_report",function(req,res){
    var pass1 = String(req.body.newPassword)
    var pass2 = String(req.body.confirmPassword)
    console.log(pass1);
    console.log(pass2);
    if(pass1===pass2){
        var sql = "update student set password  = "+mysql.escape(pass1)+"where username = "+mysql.escape(userName)+";"
        con.query(sql,function(err,result,fields){
            if(err) throw err;
            console.log('password changed');
        })
        res.write("<div><style>"+style_body+"</style><p><b>Password Changed Successfully</b><br><form method=\"post\">&#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; <button formaction=\"http://localhost:3000/login/student\">Re-Login</button></form></p></div>")

    }    
    else
    res.write("<div><style>"+style_body+"</style><p><b>Passwords did not match. Re-try!!</b><form method=\"post\">&#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; <button formaction=\"http://localhost:3000/login/student\">Re-Try</button></form></p></div>")
    res.send();
})






module.exports = router;

//.btn {    box-sizing: border-box;    -webkit-appearance: none;       -moz-appearance: none;            appearance: none;    background-color: transparent;    border: 2px solid #e74c3c;    border-radius: 0.6em;    color: #e74c3c;    cursor: pointer;    display: -webkit-box;    display: flex;    align-self: center;    font-size: 1rem;    font-weight: 400;    line-height: 1;    margin: 20px;    padding: 1.2em 2.8em;    text-decoration: none;    text-align: center;    text-transform: uppercase;    font-family: 'Montserrat', sans-serif;    font-weight: 700;  }  .btn:hover, .btn:focus {    color: #fff;    outline: 0;  }.second {    border-radius: 3em;    border-color: #1abc9c;    color: #fff;    background-image: -webkit-gradient(linear, left top, right top, from(rgba(26, 188, 156, 0.6)), color-stop(5%, rgba(26, 188, 156, 0.6)), color-stop(5%, #1abc9c), color-stop(10%, #1abc9c), color-stop(10%, rgba(26, 188, 156, 0.6)), color-stop(15%, rgba(26, 188, 156, 0.6)), color-stop(15%, #1abc9c), color-stop(20%, #1abc9c), color-stop(20%, rgba(26, 188, 156, 0.6)), color-stop(25%, rgba(26, 188, 156, 0.6)), color-stop(25%, #1abc9c), color-stop(30%, #1abc9c), color-stop(30%, rgba(26, 188, 156, 0.6)), color-stop(35%, rgba(26, 188, 156, 0.6)), color-stop(35%, #1abc9c), color-stop(40%, #1abc9c), color-stop(40%, rgba(26, 188, 156, 0.6)), color-stop(45%, rgba(26, 188, 156, 0.6)), color-stop(45%, #1abc9c), color-stop(50%, #1abc9c), color-stop(50%, rgba(26, 188, 156, 0.6)), color-stop(55%, rgba(26, 188, 156, 0.6)), color-stop(55%, #1abc9c), color-stop(60%, #1abc9c), color-stop(60%, rgba(26, 188, 156, 0.6)), color-stop(65%, rgba(26, 188, 156, 0.6)), color-stop(65%, #1abc9c), color-stop(70%, #1abc9c), color-stop(70%, rgba(26, 188, 156, 0.6)), color-stop(75%, rgba(26, 188, 156, 0.6)), color-stop(75%, #1abc9c), color-stop(80%, #1abc9c), color-stop(80%, rgba(26, 188, 156, 0.6)), color-stop(85%, rgba(26, 188, 156, 0.6)), color-stop(85%, #1abc9c), color-stop(90%, #1abc9c), color-stop(90%, rgba(26, 188, 156, 0.6)), color-stop(95%, rgba(26, 188, 156, 0.6)), color-stop(95%, #1abc9c), to(#1abc9c));    background-image: linear-gradient(to right, rgba(26, 188, 156, 0.6), rgba(26, 188, 156, 0.6) 5%, #1abc9c 5%, #1abc9c 10%, rgba(26, 188, 156, 0.6) 10%, rgba(26, 188, 156, 0.6) 15%, #1abc9c 15%, #1abc9c 20%, rgba(26, 188, 156, 0.6) 20%, rgba(26, 188, 156, 0.6) 25%, #1abc9c 25%, #1abc9c 30%, rgba(26, 188, 156, 0.6) 30%, rgba(26, 188, 156, 0.6) 35%, #1abc9c 35%, #1abc9c 40%, rgba(26, 188, 156, 0.6) 40%, rgba(26, 188, 156, 0.6) 45%, #1abc9c 45%, #1abc9c 50%, rgba(26, 188, 156, 0.6) 50%, rgba(26, 188, 156, 0.6) 55%, #1abc9c 55%, #1abc9c 60%, rgba(26, 188, 156, 0.6) 60%, rgba(26, 188, 156, 0.6) 65%, #1abc9c 65%, #1abc9c 70%, rgba(26, 188, 156, 0.6) 70%, rgba(26, 188, 156, 0.6) 75%, #1abc9c 75%, #1abc9c 80%, rgba(26, 188, 156, 0.6) 80%, rgba(26, 188, 156, 0.6) 85%, #1abc9c 85%, #1abc9c 90%, rgba(26, 188, 156, 0.6) 90%, rgba(26, 188, 156, 0.6) 95%, #1abc9c 95%, #1abc9c 100%);    background-position: 0 0;    background-size: 100%;    -webkit-transition: background 300ms ease-in-out;    transition: background 300ms ease-in-out;  }  .second:hover {    background-position: 100px;  }</style>"