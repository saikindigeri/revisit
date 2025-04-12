const jwt=require('jsonwebtoken')
const User=require('../models/User');

//middleware to protect routes 

const protect=async(req,res,next)=>{
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")
){
    try{
        token=req.headers.authorization.split(" ")[1];
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        console.log(decoded)
        req.user=await User.findById(decoded.user.id).select("-password"); //Exclude password 
        next();

    }catch(error){
        console.error("Token verification fialed");
        res.status(401).json({message:"Not authorized, token fialed"})
        
    }
}else{
    res.status(401).json({message:"Not authorized, no token provided"})

}
};


module.exports=protect