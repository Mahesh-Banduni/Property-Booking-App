const express= require('express');
const router= express.Router();
const propertyController = require("../controllers/property.controller.js");
const auth = require("../middlewares/auth.js");

/**
 * @swagger
 * tags:
 *   name: Properties
 *   description: Properties Management
 */

/**
 * @swagger
 * /properties/create:
 *   post:
 *     summary: Create a new property
 *     description: API for property registration
 *     tags:
 *       - Properties
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - location
 *             properties:
 *               name:
 *                 type: string
 *                 description: Property's name
 *               location:
 *                 type: string
 *                 description: property's location
 *     responses:
 *       201:
 *         description: Property created successfully
 *       400:
 *         description: Bad request
 */
router.post("/create", propertyController.createProperty);

/**
 * @swagger
 * /properties/{id}:
 *   get:
 *     summary: Get property by ID
 *     description: Retrieve a property by their ID
 *     tags:
 *       - Properties
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Property retrieved successfully
 *       404:
 *         description: Property not found
 */
router.get("/:id", propertyController.getPropertyById);

/**
 * @swagger
 * /properties/:
 *   get:
 *     summary: Get all property
 *     description: Retrieve all property
 *     tags:
 *       - Properties
 *     responses:
 *       200:
 *         description: Properties successfully
 *       404:
 *         description: Properties not found
 */
router.get("/", propertyController.getAllProperties);

module.exports=router;