const bookingService = require("../services/booking.service.js");

// Get booking by ID
const getBookingById = async (req, res, next) => {
  try {
    const booking = await bookingService.getBookingById(req.booking.id);
    res.status(200).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    next(error);
  }
};

// Get all booking
const getAllBookings = async (req, res, next) => {
    try {
      const booking = await bookingService.getAllBookings();
      res.status(200).json({
        success: true,
        data: booking,
      });
    } catch (error) {
      next(error);
    }
  };

// Book Booking
const createBooking= async(req, res, next)=>{
    try {
        const userId= req.user.id;
        const propertyId = req.body.propertyId;
        const bookingData= req.body;
        const booking= await bookingService.createBooking(userId, propertyId, bookingData);
        res.status(200).json({
            success: true,
            data: booking,
        })
    } catch (error) {
        next(error);
    }
}

module.exports = {
  getBookingById,
  getAllBookings,
  createBooking
};