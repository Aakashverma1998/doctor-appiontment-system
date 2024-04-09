module.exports = function(app){
        //Customer Route....
        const user = require("./userRoute")
        app.use("/api/v1/user",user)
        //Product Route.....
        // const doctor = require("./doctorRoute")
        // app.use("/api/v1/doctor",doctor)
}