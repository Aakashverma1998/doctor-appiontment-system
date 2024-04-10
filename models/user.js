const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    name:{type:String},
    email:{type:String},
    password:{type:String},
    tokens: [{
        token: {
            type: String,
            require: true
        }
    }],
},{
    timestamps: true
})
module.exports = mongoose.model("User",userSchema)