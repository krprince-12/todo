const express=require('express');
const dotenv=require('dotenv').config();
const router=require('./routers/app.router')
const dataBase=require("./Database/DataBase")

const app=express();
app.use(express.json());
app.use("/api/todo",router)
app.get('/',(req,res)=>{
    res.send("messages");
});
dataBase()
app.listen(process.env.PORT,()=>{
console.log("server is connected");

})