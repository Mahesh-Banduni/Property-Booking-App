const express= require('express');
const router= express.Router();
const bookingController = require("../controllers/booking.controller.js");
const auth = require("../middlewares/auth.js");

/**
 * @swagger
 * tags:
 *   name: Bookings
 *   description: Bookings Management
 */

/**
 * @swagger
 * /bookings/create:
 *   post:
 *     summary: Create a new booking
 *     description: API for booking creation
 *     tags:
 *       - Bookings
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - propertyId
 *               - bookingData
 *             properties:
 *               propertyId:
 *                 type: string
 *                 description: Property's Id
 *               bookTillDate:
 *                 type: string
 *                 description: Booked Till Date
 *     responses:
 *       201:
 *         description: Booking created successfully
 *       400:
 *         description: Bad request
 */
router.post("/create", auth, bookingController.createBooking);

/**
 * @swagger
 * /bookings/{id}:
 *   get:
 *     summary: Get booking by ID
 *     description: Retrieve a booking by their ID
 *     tags:
 *       - Bookings
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Booking retrieved successfully
 *       404:
 *         description: Booking not found
 */
router.get("/:id", bookingController.getBookingById);

/**
 * @swagger
 * /bookings/:
 *   get:
 *     summary: Get all booking
 *     description: Retrieve all booking
 *     tags:
 *       - Bookings
 *     responses:
 *       200:
 *         description: Bookings successfully
 *       404:
 *         description: Bookings not found
 */
router.get("/", bookingController.getAllBookings);

module.exports=router;