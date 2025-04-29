const express=require("express");
const server=express();
const cors=require('cors')
require("dotenv").config();
const connectDb = require("./configs/mongodb.config.js");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./configs/swagger.config.js");
const userRoutes = require("../src/routes/user.route.js");
const propertyRoutes = require("../src/routes/property.route.js");
const bookingRoutes= require("../src/routes/booking.route.js");

server.use(express.json());
server.use(
    cors({
      origin: [process.env.ORIGIN, process.env.ORIGIN1],
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"],
    })
);

connectDb();
server.use("/api/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

server.use("/api/users",userRoutes);
server.use("/api/properties",propertyRoutes);
server.use("/api/bookings",bookingRoutes);

const Port=process.env.PORT || 8080;
server.listen(Port, ()=>{
    console.log("Server is listening at port:"+Port);
    console.info(
      `Swagger Docs available at http://${process.env.SOURCE}:${Port}/api/api-docs`
    );
})