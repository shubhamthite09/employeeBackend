const express = require('express');
const app = express();
const cors = require('cors');
require("dotenv").config();


const {authorization} = require("./middlewares/authorization");
const {userRouter} = require("./routes/userRoutes");
const {employeeRouter} = require("./routes/employeRoutes");
const {connection} = require("./config/db");

app.use(cors());
app.use("/user",userRouter);
app.use("/employee",authorization,employeeRouter);


app.listen(process.env.PORT, async()=>{
    try{
        await connection;
        console.log("connected to db");
    }catch(err){
        console.log(err);
    }
    console.log(process.env.PORT);
})