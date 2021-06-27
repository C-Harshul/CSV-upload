/* =================== 
 Server starting point
 =================== */

 const express = require("express");
 require("./db/mongoose");
 const app = express();

 app.use(express.json());
 
 const csvRoutes = require("./routes/csv");
 const crudRoutes = require("./routes/crud");
 const userRoutes = require("./routes/user");
 
 /*---------------Route to upload multiple CSV files---------------*/
 app.use("/csv", csvRoutes);
 /*---------------Route to perform CRUD operations---------------*/
 app.use("/crud", crudRoutes);
 /*---------------Route to sign up user to authenticate---------------*/
 app.use("/user", userRoutes);

 module.exports = app