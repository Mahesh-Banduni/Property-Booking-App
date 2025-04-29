const Booking = require("../models/booking.model.js");
const Property=require("../models/property.model.js");
const User= require("../models/user.model.js");
const {NotFoundError, ConflictError, BadRequestError}= require("../errors/errors.js");

const createBooking = async(userId, propertyId, bookingData) =>{
    const user = await User.findById(userId);
    if(!user){
        throw new NotFoundError("No user exists");
    }
    console.log(propertyId);
    console.log(bookingData);
    const property = await Property.findById(propertyId);
    if(!property){
        throw new NotFoundError("No property exists");
    }

    user.bookedProperties.push(propertyId);
    await user.save();

    property.currentlyAvailable="No";
    await property.save();

    const booking = new Booking();
    booking.bookedProperty= propertyId;
    booking.bookedByUser=userId;
    booking.bookTillDate=bookingData.bookTillDate;
    await booking.save();

    return property;
}

const getBookingById= async(bookingId)=>{
    const booking = await Booking.findById(bookingId);
    if(!booking){
        throw new NotFoundError("No booking exists");
    }
    return booking;
}

const getAllBookings = async()=>{
    const bookings = await Booking.find();
    if(!bookings){
        throw new NotFoundError("No bookings exists")
    }
    return bookings;
}

module.exports={createBooking, getBookingById, getAllBookings};