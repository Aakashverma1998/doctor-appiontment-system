const jwt = require("jsonwebtoken")
const dotenv = require("dotenv").config();
const User = require("../models/user")
const auth = async(req,res,next)=>{
    try{
        const token = req.header('Authorization').replace("Bearer ","")
        const decoded = jwt.verify(token,process.env.secret_key)
        const user = await User.findOne({_id:decoded._id, "tokens.token":token})
        if(!user){
            throw new Error()
        }
        req.token = token
        req.user = user
        next()
    }catch(err){
        return res.status(401).json({"success":false,"error":"Please authenticate"})

    }
   
}


module.exports = auth