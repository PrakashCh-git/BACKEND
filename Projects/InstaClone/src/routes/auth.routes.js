const express = require('express');
const Router = express.Router();
const protect = require("../middlewares/protect")


const {register,login,getmydetails,logout} = require("../controllers/authController");


Router.post("/register",register);
Router.post("/login",login);
Router.get("/me",protect,getmydetails);
Router.post("/logout",logout);



module.exports = Router;


