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
    phone:{type:String},
    isAdmin:{
        type: Boolean,
        default: false
    },
    isDoctor:{
        type:Boolean,
        default: false
    },
    notification: {
        type: Array,
        default: []
    },
    seennotification:{
        type:Array,
        default:[]
    }
},{
    timestamps: true
})
module.exports = mongoose.model("User",userSchema)