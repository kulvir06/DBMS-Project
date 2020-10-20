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

//const options = "<br><form method=\"POST\"><button formaction=\"http://localhost:3000/account/student/details\">Check your details</button><br><br><button formaction=\"http://localhost:3000/account/student/tutor_info\">Tutor Information</button><br><br><button formaction=\"http://localhost:3000/account/student/subject_list\">Subject</button><br><br><button formaction=\"http://localhost:3000/account/student/marks\">Marks</button><br><br><button formaction=\"http://localhost:3000/account/student/coaching_details\">Coaching Details</button><br><br><button formaction=\"http://localhost:3000/account/student/password_change\">Forgot/Change password</button><br><br></form>"

//global variables
var userName;
var pass;

//landing page for student login
router.post("/",function(req,res){    
 userName = String(req.body.Username);
 pass = String(req.body.Password);

var sql="select * from admin where username = "+mysql.escape(userName)+"and password = "+mysql.escape(pass);   
con.query(sql,function(err,result,fields){
    if(err) throw err;
    
    console.log(result);
    if(result.length===0)
    {
        res.sendFile(__dirname+"/error.html");
    }
    else
    {
        //var fname = String(result[0].first_name);
        res.sendFile(__dirname+"/terminal.html")//res.write("<div><style>"+style_body+style_heading+"</style><h1>How are you "+fname+"?</h1>"+options+"<p>To log out simply close the tab.</p></div>")           
    }              
})   
})

router.post("/new_admin_registeration",function(req,res){
    res.sendFile(__dirname+"/new_user.html")
    
})

router.post("/sign_up",function(req,res){
    var sql_code_gen = "select count(coaching_code) as num from coaching;"
    var code;
    con.query(sql_code_gen,function(err,result,fields){
        console.log(result[0].num);
        code = parseInt(result[0].num+1001);
        console.log(code);
    })
    var sql1;
    var new_username = req.body.Username;
    var new_pass1 = req.body.Password1;
    var new_pass2 = req.body.Password2;
    var city = req.body.city;
    var contact = req.body.contact;
    var coaching = req.body.coaching;
    var address = req.body.address;

    var sql_username_check="select * from admin where username = "+mysql.escape(new_username)+";";
    con.query(sql_username_check,function(err,result,fields){
        console.log(code);
        sql1 = "insert into coaching values ("+(code)+","+mysql.escape(city)+","+(contact)+","+mysql.escape(coaching)+","+mysql.escape(address)+");";
        if(err) throw err;
        
        if(result.length!=0)
        res.send("enter diferent username");
        else if(new_pass1!=new_pass2)
        res.send("passwords did not match")
        con.query(sql1,function(err,result,fields){
            if(err) throw err;// res.sendFile(__dirname+"/signUp_error.html");
            else {
                var sql_insert = "insert into admin values ("+mysql.escape(new_username)+","+mysql.escape(new_pass1)+","+code+");";
                con.query(sql_insert,function(err,result,fields){
                    if(err) throw err;//res.sendFile(__dirname+"/signUp_error.html")
                    res.send("<form method=\"post\"><button formaction=\"/homepage\">ReLogin</button></form>")
                })
            }
        })  
    })
   

})

router.post("/query_result",function(req,res){
    var sql = (req.body.query)
    console.log(sql.substring(0,1).toLowerCase());
    if(sql.substring(0,1).toLowerCase()==="d"||sql.substring(0,1).toLowerCase()==="t") res.send("This query requires special access")
    else{
        con.query(sql,function(err,result,fields){
        if(err) res.send(err);
        res.send(result);

    })
}
    
})

module.exports = router;