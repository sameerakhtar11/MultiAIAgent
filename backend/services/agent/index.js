import "dotenv/config"
import express from "express"
import connectDB from "./config/db.js"
import { router } from "./graph/router.js"

const port=process.env.PORT;

const app=express()
app.use(express.json())
app.use("/",router)
app.get("/",(req,res)=>{
    res.json({message:"Hello from Agent"});
})

app.listen(port,()=>{
    console.log(`agent started at ${port}`)
    connectDB()
})
