require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const {userModel} = require("../model/userModel");
const bcrypt = require("bcrypt");
const userRouter = express.Router();
userRouter.use(express.json());

userRouter.post("/reg",async(req,res)=>{
    try{
        req.body.password = await bcrypt.hash(req.body.password,2);
        let newUser = new userModel(req.body);
        await newUser.save();
        res.status(201).send({isError: false,msg:"user saved successfully"});
    }catch(err){
        res.status(500).send({isError: true,msg:err.message});
    }
})
userRouter.post("/log",async(req,res)=>{
    try{
        const findUser = await userModel.findOne({email:req.body.email});
        if(await bcrypt.compare(req.body.password,findUser.password)){
            const token = await jwt.sign({email:findUser.email},process.env.secret); 
            res.status(201).send({isError: false,token,});
        }else{
            res.status(401).send({isError: true,msg:"wrong password"});
        }
    }catch(err){
        res.status(500).send({isError: true,msg:err.message});
    }
})

module.exports = {
    userRouter
}