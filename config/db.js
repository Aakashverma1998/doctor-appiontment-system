const mongoose = require("mongoose")
const connectdb = async() =>{
    try{
        mongoose.connect("mongodb://localhost:27017/doctor-Appointmoent-System").then(()=>{
            console.log("database connected..");
        }).catch((err)=>{
            console.log(err);
        })

    }catch(err){
        process.exit(1)
    }
  

}

module.exports = connectdb