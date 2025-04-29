const mongoose = require("mongoose");

const propertySchema=new mongoose.Schema({
    propertyCode:{type: String, required: true, unique: true},
    name: {type: String, required: true},
    location: {type: String, required: true},
    rentPricePerDay: {type: String},
    currentlyAvailable: {type: String, enum: ["Yes","No"], default:"Yes"},
    images: {type: [String]}
},{timestamps: true});

const Property=new mongoose.model('Property', propertySchema);
module.exports=Property;


