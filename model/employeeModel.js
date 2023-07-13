const mongoose = require("mongoose");

const employSchema = mongoose.Schema({
    First_Name:{type:String, required:true},
    Last_Name:{type:String, required:true},
    Email:{type:String, required:true},
    Department:{type:String,enum:["Marketing","Tech","Operations"] ,required:true},
    Salary:{type:Number, required:true},
});

const employModel = mongoose.model("employ",employSchema);

module.exports = {
    employModel
}