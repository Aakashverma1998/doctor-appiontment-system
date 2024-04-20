const User = require("../models/user")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const helper = require("../utils/helper")
const userRegister = async(req,res)=>{
    try{
        let emailMatch = await User.findOne({
            email: req.body.email
        });
        const hashedPassword = await bcrypt.hash(req.body.password,10)
        if (emailMatch) {
            return res.status(200).json({
                success : false,
                message: "User Exist Please Login !"
            });
        }
        const user = User({
            name: req.body.name,
            email:req.body.email,
            password : hashedPassword
        })
        let response = await user.save();
        delete response.password
        return res.status(201).json({
            success : true,
            msg: "USER REGISTER SUCCESSFULLY.",
            data: response
        });
    }catch(err){
            return res.json(helper.showInternalServerErrorResponse("Internal server error"));
    }
}

const login = async (req, res) => {
    try {
        let user = await User.findOne({
            email: req.body.email
        });
        if (user) {
            let passwordMatch = await bcrypt.compare(req.body.password, user.password);
            if (passwordMatch) {
                let token = jwt.sign({
                    _id: user._id.toString()
                }, process.env.secret_key, {
                    expiresIn: "1h"
                })
                user.tokens.push({ token })
                await user.save()
                res.status(201).json({
                    success : true,
                    message: "Login Success",
                    data: user,
                    token

                });
            } else {
                return res.json({success : false,message:"Invalid Email or Password !"});
            };
        } else {
            return res.json({success : false,message:"Invalid Email or Password !"})  ;
        };
    } catch (err) {
        console.log(err);
        return res.json(helper.showInternalServerErrorResponse("Internal server error"));

    };
}

const getUser = async(req,res)=>{
    try{
        const userData = await User.findOne({_id:req.user._id})
        delete userData.password
        if(!userData){
            return res.status(200).send({message:'User not Found', success:false})
        }
        return res.status(200).send({success:true, data:userData})
    }catch(err){
        console.log(err);
        return res.json(helper.showInternalServerErrorResponse("Internal server error"));
    }
}

module.exports = {
    userRegister,
    login,
    getUser
}