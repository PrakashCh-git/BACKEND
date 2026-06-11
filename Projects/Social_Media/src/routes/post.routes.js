const express = require("express");
const Router = express.Router();
const postController = require("../controller/post.controller")
const multer = require("multer");
const upload = multer({storage:multer.memoryStorage()});
const identifyUser = require("../middleware/auth.controller")



Router.post("/",upload.single("image"),identifyUser,postController.createPost);
Router.get("/",identifyUser,postController.getPost);
Router.get("/details/:postId",identifyUser,postController.getPostDetails)


module.exports = Router;
