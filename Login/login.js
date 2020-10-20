const express = require("express");
const router = express.Router();

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



router.post("/student",function(req,res){
    res.sendFile(__dirname+"/student.html");    
})

router.post("/teacher",function(req,res){
    res.sendFile(__dirname+"/teacher.html");
})

router.post("/parent",function(req,res){
    res.sendFile(__dirname+"/parent.html")
})

router.post("/admin",function(req,res){
    res.sendFile(__dirname+"/admin.html")
})

module.exports=router;