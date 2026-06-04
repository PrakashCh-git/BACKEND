const express = require("express");
const Router = express.Router();
const {registerController,logInController} = require("../controller/auth.controller")

//Registe router and cotroller
Router.post("/register",registerController)

//Login route and controller
Router.post("/login",logInController)

module.exports = Router;