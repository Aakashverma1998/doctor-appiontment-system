const express = require("express")
const app = express()
const cors = require('cors');
const morgan = require("morgan")
const dotenv = require("dotenv").config()
const PORT = process.env.PORT || 8000
const mongodb = require("./config/db")

app.use(morgan("dev"))
app.use(express.json())
app.use(cors());
require("./routes/mainRoutes")(app)
app.get("/healthcheck",(req,res)=>{
    res.send("hello world")
})

mongodb().then(()=>{
    app.listen(PORT, ()=>{
        console.log(`server is running on port: ${PORT}`);
    }) 
})
