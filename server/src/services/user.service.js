const User= require("../models/user.model.js");
const Property= require("../models/property.model.js");
const {BadRequestError, NotFoundError, ConflictError} = require("../errors/errors.js");
const hashValue = require("../utils/hashing.util.js");
const JWToken = require("../utils/token.generation.util.js");

const createUser = async(userData)=>{
    const email= userData.email;
    const exisitngUser= await User.findOne({email});
    if(exisitngUser){
        throw new ConflictError("User with email already exists");
    }
    const password=hashValue.hash(userData.password);
    const user= new User();
    user.email=userData.email;
    user.mobile=userData.mobile;
    user.name=userData.name;
    user.password=password;
    await user.save();

    const response= JWToken.generateToken(user);
    return {user, response};
}

const getUserById = async(userId) =>{
    const user= await User.findById(userId).populate('property');
    if(!user){
        throw new NotFoundError("User doesn't exist");
    }
    return(user);
}

module.exports={createUser, getUserById};