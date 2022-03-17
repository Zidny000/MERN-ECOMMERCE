const app = require("./app");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database")
const serverless = require("serverless-http")


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
// const server = app.listen(process.env.PORT,()=>{
//     console.log(`The server is running at http://localhost:${process.env.PORT}`)
// })

//netlify
const server = module.exports.handler = serverless(app)



//Unhandled Promise Rejection
process.on("unhandledRejection",err=>{
    console.log(`Error: ${err.message}`)
    console.log(`Shutting down the server dut to unhandled promise rejection`)
    server.close(()=>{
        process.exit(1)
    })
})