const express = require("express");
const Router = express.Router();
const identifyUser = require("../middleware/auth.controller");
const userController = require("../controller/user.controller")

Router.post("/follow/:userName",identifyUser,userController.followUserController);
Router.post("/unfollow/:userName",identifyUser,userController.unfollowUserController);



module.exports = Router;
