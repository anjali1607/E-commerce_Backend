
require('dotenv').config()
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const ExpressValidator = require('express-validator');
const cors = require("cors");
const morgan = require("morgan");


const authRoutes = require("./routes/auth")
const userRoutes = require("./routes/user")
const categoryRoutes = require("./routes/category")
const productRoutes = require("./routes/product")

// Database connection
mongoose.connect(process.env.DATABASE,
 {useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true} 
 ).then(()=>{
 console.log("DB CONNECTED")});


//Middelware:
 app.use(morgan('dev'));
 app.use(bodyParser.json());
 app.use(cookieParser());
 app.use(ExpressValidator());
 app.use(cors());
//  app.use(bodyParser.urlencoded({ extended: true }));




 //My routes
 app.use("/api", authRoutes);
 app.use("/api", userRoutes);
 app.use("/api", categoryRoutes);
 app.use("/api", productRoutes);




//port:
 const port = process.env.PORT || 8000;
//Starting a server:
 app.listen(port, () =>{
 console.log(`App is running at port ${port}`)
});
