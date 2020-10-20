const express = require("express");
const router = express.Router();



router.get("/",function(req,res){
    res.sendFile(__dirname+"/homepage.html")
})

router.post("/",function(req,res){
    res.sendFile(__dirname+"/homepage.html")
})

module.exports = router;