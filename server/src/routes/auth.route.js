const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller.js");

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User login
 *     description: API for user login
 *     tags:
 *       - User Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email
 *               password:
 *                 type: string
 *                 description: User's password
 *     responses:
 *       200:
 *         description: Login done and verify otp in next step
 *       401:
 *         description: Unauthorized (Invalid credentials)
 */
router.post("/login", authController.loginUser);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: User logout
 *     description: API for user logout
 *     tags:
 *       - User Authentication
 *     responses:
 *       200:
 *         description: Logout successful
 */
router.post("/logout", authController.logoutUser);

module.exports = router;