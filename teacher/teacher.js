const { Router } = require("express");
const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser');

const app = express();

router.use(bodyParser.urlencoded({extended: true}));
router.use(express.json());

//connection to database
const mysql = require("mysql");

//const style_body ="body {    margin: 0;    padding: 0;    width: 100%;    height: 100%;    background: #2c3e50;    font-family: 'Montserrat', sans-serif;    font-size: 16px;  } body {  display: -webkit-box;    display: flex;    flex-wrap: wrap;    justify-content: space-around;    -webkit-box-align: center;            align-items: center;    align-content: center;  }   h1 {    color: #f1c40f;    font-size: 4rem;    text-transform: uppercase;    display: block;    width: 100%;    text-align: left;  } @media screen and (max-width: 600px) {    h1 {      font-size: 3rem;    }  }    p {    color: #f1c40f;    font-size: 1.2rem;    width: 100%;    padding: 20px;    text-align: left;  } h3{color: #f1c40f;font-size:30px;    display: block;width: 100%;    text-align: left;}"


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
// const style_body = "body { background: url(\"https://s3-us-west-2.amazonaws.com/s.cdpn.io/38816/image-from-rawpixel-id-2210775-jpeg.jpg\") center center no-repeat; background-size: cover;    width: 100vw;    height: 100vh;    display: grid;    align-items: center;    justify-items: center;  }"
// const style_heading = "h1 {color:  #1abc9c;font-size: 4rem;text-transform: uppercase;display: block;width: 100%;text-align: left;font-family: 'Montserrat', sans-serif;}</style>"

const style_body ="body {    margin: 0;    padding: 0;    width: 100%;    height: 100%;    background: #2c3e50;    font-family: 'Montserrat', sans-serif;    font-size: 16px;  } body {  display: -webkit-box;    display: flex;    flex-wrap: wrap;    justify-content: space-around;    -webkit-box-align: center;            align-items: center;    align-content: center;  }   h1 {    color: #f1c40f;    font-size: 4rem;    text-transform: uppercase;    display: block;    width: 100%;    text-align: left;  } @media screen and (max-width: 600px) {    h1 {      font-size: 3rem;    }  }    p {    color: #f1c40f;    font-size: 1.2rem;    width: 100%;    padding: 20px;    text-align: left;  } h3{color: #f1c40f;font-size:30px;    display: block;width: 100%;    text-align: left;}"
const style_heading="";
const trial_style="html, body {    margin: 0;    padding: 0;    width: 100%;    height: 100%;    background: #2c3e50;    font-family: 'Montserrat', sans-serif;    font-size: 16px;  } p{    color: #f1c40f;    font-size: 1.2rem;    width: 100%;    padding: 20px;    text-align: left;  }"

const option1 ="<br><br><form method=\"post\"><button formaction=\"http://localhost:3000/account/teacher/details\">Check your details</button><br>";
const option2 ="<button formaction=\"http://localhost:3000/account/teacher/update_marks\">Update marks</button><br>";
const option3 ="<button formaction=\"http://localhost:3000/account/teacher/update_books\">Update Reference Books</button><br>";
const option5 = "<button formaction=\"http://localhost:3000/account/teacher/password_change\">Forgot/Change password</button></form>"
const option4 = "<button formaction=\"http://localhost:3000/account/teacher/coaching_details\">Coaching Details</button><br>"

//defining global variables
var userName;
var pass;
var subject;
//landing page for teachers
router.post("/",function(req,res){
    userName = String(req.body.Username);
    pass = String(req.body.Password);
    console.log(userName);
    console.log(pass);

    var sql="select * from teacher where username = "+mysql.escape(userName)+"and password = "+mysql.escape(pass);   
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
            subject = String(result[0].subject)
            res.write("<div><style>"+style_body+"</style><h1>How are you "+fname+"?"+option1+option2+option3+option4+option5+"</h1></div>")  
                  
        }       

        
    })   

})
//

//get own details
router.post("/details",function(req,res){
    var username = userName;
    var password = pass;
    
    var sql="select * from teacher where username = "+mysql.escape(username)+"and password = "+mysql.escape(password); 
     con.query(sql,function(err,result,fields){
         if(err) throw err;
         var dob = String(result[0].DOB);
         dob = dob.substring(0,15)
         res.write("<div><style>"+style_body+style_heading+"</style><h3><b>Username : </b>"+result[0].username+"<br><b>First Name : </b>"+result[0].first_name+"<br><b>Last Name : </b>"+result[0].last_name+"<br><b>Gender : </b>"+result[0].gender+"<br><b>Address : </b>"+result[0].address+"<br><b>Contact : </b>"+result[0].contact+"<br></h3></div>")
     })
})

//coaching details
router.post("/coaching_details",function(req,res){
    var username = userName;
    var password = pass;

    var sql = "select * from coaching where coaching_code in (select coaching_code from teacher where username = "+mysql.escape(username)+");";
    con.query(sql,function(err,result,fields){
        if(err) throw err;
        res.write("<div><style>"+style_body+"</style><p><h3>Institute Name: "+result[0].coaching_name+"<br>City: "+result[0].city+"<br>Address: "+result[0].address+"<br>Contact: "+result[0].contact+"</h3></p></div>");
        res.send();
    })
})

//update marks
router.post("/update_marks",function(req,res){
    res.sendFile(__dirname+"/marks.html")    
})
//
router.post("/uploaded",function(req,res){
    var student_username = req.body.stu_username;
    var marks = parseInt(req.body.marks);
    var test_no=parseInt(req.body.test_no)
    var sql = "update marks set "+(subject)+" = "+(marks)+" where student_username = "+mysql.escape(student_username)+"and test_no = "+(test_no)+";";
    var sql_check = "select * from student where username = "+mysql.escape(student_username)+";";
    con.query(sql_check,function(err,result,fields){
        if(err) throw err;
        if(result.length===0) res.send("WRONG USERNAME ENTERED");
        else
        {
            con.query(sql,function(err,result,fields){
                if(err) throw err;
                res.send("MARKS UPDATED")
            })
        }
    })
})
//
router.post("/marks",function(req,res){
    var username = String(userName);
    var sql;
    sql = "select * from marks where substring(student_username,4,4) = "+mysql.escape(username.substring(3))+"or substring(student_username,5,4) = "+mysql.escape(username.substring(3))+" order by test_no;"
    con.query(sql,function(err,result,fields){
        if(err) throw err;
        console.log(result)
        var len=result.length;
        for(var i=0;i<len;i++){
            if(result[i].biology===null)
            res.write("<div><style>"+trial_style+"</style><p>Student = "+result[i].student_username+"<br>Test Number = "+result[i].test_no+"<br>Physics = "+result[i].physics+"<br>Chemistry = "+result[i].chemistry+"<br>Mathematics = "+result[i].mathematics+"</p></div>");
            else
            res.write("<div><style>"+trial_style+"</style><p>Student = "+result[i].student_username+"<br>Test Number = "+result[i].test_no+"<br>Physics = "+result[i].physics+"<br>Chemistry = "+result[i].chemistry+"<br>Biology = "+result[i].biology+"</p></div>");

        }
        res.send()
    })
})

//reference books
router.post("/update_books",function(req,res){
    
    res.sendFile(__dirname+"/books.html")    
})
//
router.post("/booklist",function(req,res){
    var sql = "select * from "+(subject)+" where coaching_code in (select coaching_code from teacher where username = "+mysql.escape(userName)+");";
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
//
router.post("/uploaded_books",function(req,res){
    var chapter_name = req.body.chapter;
    var book_name = req.body.book;
    var sql_check = "select * from "+subject+ " where chapter = "+mysql.escape(chapter_name)+";";
    var sql = "update "+subject+" set book = "+mysql.escape(book_name)+" where chapter = "+mysql.escape(chapter_name)+" and coaching_code in (select coaching_code from teacher where username = "+mysql.escape(userName)+");";
    con.query(sql_check,function(err,result,fields){
        if(err) throw err;
        if(result.length===0) res.send("WRONG CHAPTER NAME ENTERED")
        else{
            con.query(sql,function(err,result,fields){
                if(err) throw err;
                res.send("REFERNCE BOOK UPDATED")
            })
        }
    })
})

router.post("/password_change",function(req,res){
    res.sendFile(__dirname+"/changePasswordTeacher.html");
})

router.post("/password_change_report",function(req,res){
    var pass1 = String(req.body.newPassword)
    var pass2 = String(req.body.confirmPassword)
    console.log(pass1);
    console.log(pass2);
    if(pass1===pass2){
        var sql = "update teacher set password  = "+mysql.escape(pass1)+"where username = "+mysql.escape(userName)+";"
        con.query(sql,function(err,result,fields){
            if(err) throw err;
            console.log('password changed');
        })
        res.write("<div><style>"+style_body+"</style><p><b>Password Changed Successfully</b><br><form method=\"post\">&#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; <button formaction=\"http://localhost:3000/login/teacher\">Re-Login</button></form></p></div>")

    }    
    else
    res.write("<div><style>"+style_body+"</style><p><b>Passwords did not match. Re-try!!</b><form method=\"post\">&#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; &#8287; <button formaction=\"http://localhost:3000/login/teacher\">Re-Try</button></form></p></div>")
    res.send();
})

//
module.exports = router;