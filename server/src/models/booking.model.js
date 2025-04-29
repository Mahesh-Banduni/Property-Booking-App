const mongoose = require("mongoose");

const bookingsSchema=new mongoose.Schema({
    bookedProperty: {
        type:mongoose.Schema.Types.ObjectId, 
        ref: "User" 
    },
    bookedTillDate: {
        type: Date
    },
    bookedByUser: {
        type:mongoose.Schema.Types.ObjectId, 
        ref: "User" 
      },
},{timestamps: true});

const Booking= new mongoose.model('Booking', bookingsSchema);
module.exports=Booking;


