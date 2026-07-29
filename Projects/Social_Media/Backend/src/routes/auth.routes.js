const express = require("express");
const Router = express.Router();
const {registerController,logInController,getMeController} = require("../controller/auth.controller")
const identifyUser = require("../middleware/auth.controller")


//Registe router and cotroller
Router.post("/register",registerController)

//Login route and controller
Router.post("/login",logInController)

//Fetching data and controller
Router.get("/get-my-details",identifyUser,getMeController)

module.exports = Router;