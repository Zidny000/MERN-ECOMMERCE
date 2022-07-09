const app = require("./app");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cloudinary = require("cloudinary").v2
const connectDatabase = require("./config/database")

//Handling Uncaught Error
process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.message}`)
    console.log(`Shutting down the server dut to uncaught error`)
    process.exit(1)
})

//config
dotenv.config({path:"backend/config/config.env"})

//Connect to database
connectDatabase()


cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET

})


const server = app.listen(process.env.PORT,()=>{
    console.log(`The server is running at http://localhost:${process.env.PORT}`)
})

//Unhandled Promise Rejection
process.on("unhandledRejection",err=>{
    console.log(`Error: ${err.message}`)
    console.log(`Shutting down the server dut to unhandled promise rejection`)
    server.close(()=>{
        process.exit(1)
    })
})