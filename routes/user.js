const express =require("express");
const router=express.Router();
const user=require("../models/user");
const User = require("../models/user");
router.get("/signin",(req,res)=>{
    return res.render("signin");
});
router.get("/signup",(req,res)=>{
    return res.render("signup");
});

router.post("/signin",async(req,res)=>{
    const {email,password}=req.body;
    try{
        const token=await User.matchPasswordAndGenerateToken(email,password);
    return res.cookie('token',token).redirect("/");
    }
    catch(error){
        res.render("signin",{error:"Incorrect Login or Password"});
    }
});

router.post("/signup",async(req,res)=>{
    const {fullName,email,password}=req.body;
    await user.create({
        fullName,
        email,
        password,
    });
    return res.redirect("/");
});
router.get("/logout",(req,res)=>{
    res.clearCookie('token').redirect("/");
});
module.exports=router;

