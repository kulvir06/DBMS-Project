const express = require("express");
const app = express();

//connecting to database
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
//

//accessing various routes

const homepage = require("./homepage/homepage.js");
const login = require("./Login/login.js");
const student = require("./student/student.js");
const teacher = require("./teacher/teacher.js");
const parent = require("./parent/parent.js");
const admin = require("./admin/admin.js")
//enabling routes with required tags
app.use("/homepage",homepage)
app.use("/login",login);
app.use("/account/student",student);
app.use("/account/teacher",teacher);
app.use("/account/parent",parent);
app.use("/account/admin",admin)
app.listen(3000,function(){
    console.log("Server is running on port 3000!!");
})





app.get("/",function(req,res){
    res.write("<b>welcome to backend<br>establishing connection with the database......<br><br><br><br><br> Connection Successful!!</b>");
    res.send();
})
app.post("/",function(req,res){
    res.write("<b>welcome to backend<br>establishing connection with the database......<br><br><br><br><br> Connection Successful!!</b>");
    res.send();
})
