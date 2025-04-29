const express= require('express');
const router= express.Router();
const userController = require("../controllers/user.controller.js");
const auth = require("../middlewares/auth.js");

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Users Management
 */

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Register a new user
 *     description: API for user registration
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - mobile
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 description: User's name
 *               email:
 *                 type: string
 *                 description: User's email
 *               mobile:
 *                 type: string
 *                 description: User's mobile
 *               password:
 *                 type: string
 *                 description: User's password
 *     responses:
 *       201:
 *         description: User created successfully
 *       409:
 *         description: Conflict error (phone number already exists)
 *       400:
 *         description: Bad request
 */
router.post("/register", userController.createUser);

/**
 * @swagger
 * /users/details:
 *   get:
 *     summary: Get user by ID
 *     description: Retrieve a user by their ID
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: User retrieved successfully
 *       404:
 *         description: User not found
 */
router.get("/details", auth, userController.getUserById);

module.exports=router;