const Property= require("../models/property.model.js");
const User= require("../models/user.model.js");
const {BadRequestError, NotFoundError, ConflictError} = require("../errors/errors.js");
const generatePropertyCode = async()=> {
    let id;
    do {
      id = Math.floor(100000000 + Math.random() * 900000000);
    } while (id % 10 === 0);
    return id;
  }

const createProperty = async(userId, propertyData)=>{
    var propertyCodeString='PBA';
    let propertyCode=0;
    let propertyCodeCheck=[];
    do {
        propertyCode = await generatePropertyCode();
    
        // Check if the generated property code already exists
        propertyCodeCheck = await Product.find({ propertyCode });
    } while (propertyCodeCheck.length > 0); // Repeat if the property code already exists


    const user= await userService.getUserById(userId);
    // Ensure the user has the 'admin' role
    if (user.role !== 'Admin') {
        throw new BadRequestError('Only admins can create propertys');
    }

    const property= new Property();
    property.propertyCode=propertyCodeString+propertyCode;
    property.name=propertyData.name;
    property.location=propertyData.location;
    property.rentPerDay=propertyData.rentPerDay;
    property.currentlyAvailable = "Yes";
    property.images="";
    await property.save();

    return property;
}

const getPropertyById= async(propertyId)=>{
    const property = await Property.findById(propertyId);
    if(!property){
        throw new NotFoundError("No property exists");
    }
    return property;
}

const getAllProperties = async()=>{
    const properties = await Property.find();
    if(!properties){
        throw new NotFoundError("No properties exists")
    }
    return properties;
}


module.exports={createProperty, getPropertyById, getAllProperties};
