const express=require('express');
const User=require('../models/User');
const jwt=require('jsonwebtoken');
const {protect}=require('../middleware/authMiddleware');


const router=express.Router();

//@route POST/api/auth/signup 
//register a new user 
//access public 
router.post("/signup",async(req,res)=>{
    const {name,email,password}=req.body;

    try{
        //Registeration logic 
       let user=await User.findOne({email});
       if (user) return res.status(400).json({message:"User already exists"});
       user = new User({name,email,password});
       await user.save();

       const payload={user:{id:user._id}}
       jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:"40h"},(err,token)=>{
        if (err) throw err;

        //Send the user and token in response;

        res.status(201).json({
            user:{
                _id:user._id,
                name:user.name,
                email:user.email,
                role:user.role,
            },
            token,
        })
       })

       
    }catch(error){
        console.log(error);
        res.status(500).send("Sever Error");

    }
})  

//@route POST/api/auth/login 
//login a new user 
//access public 

router.post("/login",async(req,res)=>{
    const {email,password}=req.body;

    try{
        let user=await User.findOne({email});
        if (!user) return res.status(400).json({message:"Invalid Credentials"});
        const isMatch=await user.matchPassword(password);

        if (!isMatch) return res.status(400).json({message:"Invalid credentials"})
        
            const payload={user:{id:user._id}}
       jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:"40h"},(err,token)=>{
        if (err) throw err;

        //Send the user and token in response;

        res.json({
            user:{
                _id:user._id,
                name:user.name,
                email:user.email,
               
            },
            token,
        })
       })

    }catch(error){
        console.error(error);
        res.status(500).send("Server Error")
        

    }
})


module.exports=router;