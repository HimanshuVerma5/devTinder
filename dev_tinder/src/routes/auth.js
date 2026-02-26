const express=require("express");
const authRouter=express.Router();
const User=require("../models/user");
const bcrypt=require('bcrypt');
const {validateSignUpData}=require("../utils/validation");

authRouter.post("/signup",async(req,res)=>{
    try{
        //validate the data
        validateSignUpData(req);
        const{firstName,lastName,emailId,password}=req.body;
    //Encrypt the password
    const passwordHash=await bcrypt.hash(password,10);
    console.log(passwordHash);
        //creating the nre instance of the User Model
        const user=new User({
            firstName,
            lastName,
            emailId,
            password:passwordHash,
        });
       await user.save();
    res.send("User Added succesfully "); 
    } catch(err){
        res.status(400).send("Error saving the user"+ err.message);
    }
    
});
authRouter.post("/login",async(req,res)=>{
    
    try{
        const{emailId,password}=req.body;
        const user=await User.findOne({emailId:emailId});
     if(!user){
        throw new Error("EmailID is not present in our DB");
     }
   const isPassWordValid=await user.validatePassword(password);

     if(isPassWordValid){
        const token=await user.getJWT();
        //console.log(token);
      res.cookie("token", token, {
  httpOnly: true,
  sameSite: "lax",
  secure: false, // localhost pe false hi rahe
  maxAge: 24 * 60 * 60 * 1000, // 1 day
});

       res.send(`${user.firstName} Logged in successfully`);

     }else{
        throw new Error("password is not valid");
     }
    }catch(err){
        res.status(400).send("Error: "+err.message);
    }
});
authRouter.post("/logout",async (req,res)=>{
    res.cookie("token",null,{
        expires:new Date(Date.now()),
    });
  res.send("LogOut succesfuly");   
});

module.exports=authRouter;