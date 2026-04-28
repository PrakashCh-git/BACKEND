const express = require("express");
const Router = express.Router();
const multer = require("multer");
const upload = multer({storage:multer.memoryStorage()});

const {createPost, getPost,toggleLike,addComment,deleteComment} = require("../controllers/postController");
const protect = require("../middlewares/protect");

Router.post("/",protect,upload.single("image"),createPost);
Router.get("/",protect,getPost);
Router.post("/like/:id",protect,toggleLike);
Router.post("/comment/:id",protect,addComment);
Router.post("/deleteComment/postId/commentId",protect,deleteComment);


module.exports = Router;