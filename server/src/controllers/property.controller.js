const propertyService = require("../services/property.service.js");

// Create a new property
const createProperty = async (req, res, next) => {
  try {
    const userId= req.user.id;
    const propertyData= req.body;
    const property = await propertyService.createProperty(userId, propertyData);
    console.info(
      "Property id:" + `${property._id}` + " has been created successfully"
    );
    res.status(201).json({
      success: true,
      data: property,
    });
  } catch (error) {
    next(error);
  }
};

// Get property by ID
const getPropertyById = async (req, res, next) => {
  try {
    const property = await propertyService.getPropertyById(req.params.id);
    res.status(200).json({
      success: true,
      data: property,
    });
  } catch (error) {
    next(error);
  }
};

// Get all property
const getAllProperties = async (req, res, next) => {
    try {
      const property = await propertyService.getAllProperties();
      res.status(200).json({
        success: true,
        data: property,
      });
    } catch (error) {
      next(error);
    }
  };

// Book Property
const bookProperty= async(req, res, next)=>{
    try {
        const userId= req.user.id;
        const propertyId = req.property.id;
        const property= await propertyService.bookProperty(userId, propertyId);
        res.status(200).json({
            success: true,
            data: property,
        })
    } catch (error) {
        next(error);
    }
}

module.exports = {
  createProperty,
  getPropertyById,
  getAllProperties,
  bookProperty
};