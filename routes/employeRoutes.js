require("dotenv").config();
const express = require("express");
const {employModel} = require("../model/employeeModel");
const employeeRouter = express.Router();
employeeRouter.use(express.json());

employeeRouter.post("/",async(req,res)=>{
    try{
        let newUser = new employModel(req.body);
        await newUser.save();
        res.status(200).send({isError: false,msg:"employee saved successfully"});
    }catch(err){
        res.status(500).send({isError: true,msg:err.message});
    }
})
employeeRouter.get("/",async(req,res)=>{
    try{
        let newUser = await employModel.find();
        res.status(200).send({isError: false,data:newUser});
    }catch(err){
        res.status(500).send({isError: true,msg:err.message});
    }
})

employeeRouter.patch("/:id",async(req,res)=>{
    try{
        await employModel.findByIdAndUpdate({_id:req.params.id},req.body);
        res.status(204).send({isError: false,msg:"employee updated successfully"});
    }catch(err){
        res.status(500).send({isError: true,msg:err.message});
    }
})
employeeRouter.delete("/:id",async(req,res)=>{
    try{
        let newUser = await employModel.findByIdAndDelete({_id:req.params.id});
        res.status(202).send({isError: false,msg:"employee deleted successfully"});
    }catch(err){
        res.status(500).send({isError: true,msg:err.message});
    }
})
module.exports = {
    employeeRouter
}