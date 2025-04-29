const mongoose = require("mongoose");

const userSchema=new mongoose.Schema({
    name: {type: String},
    email: {type: String, unique:true, required: true},
    mobile: {type: String, maxlength:10, minlength:7, unique:true, required: true},
    password: {type: String},
    role: {type: String, enum:["USER","ADMIN"], default:"USER"},
    bookedProperties: {type: [String]}
},{timestamps: true});

const User= new mongoose.model('User', userSchema);
module.exports=User;


