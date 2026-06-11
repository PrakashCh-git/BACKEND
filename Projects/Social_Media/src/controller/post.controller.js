const postModel = require("../models/post.model");
const ImageKit = require("@imagekit/nodejs")
const {toFile} = require("@imagekit/nodejs");
const jwt = require("jsonwebtoken");
const client = new ImageKit({privateKey: process.env.IMAGEKIT_PRIVATE_KEY})


async function createPost(req,res) {
    try {            
        const uploadFile = await client.files.upload({
            file: await toFile(req.file.buffer,req.file.originalname),
            fileName: req.file.originalname,
            folder: "Social_Media",
        })

        
        imageUrl = uploadFile.url;

        const post = await postModel.create({
            caption: req.body.caption,
            imgUrl: imageUrl,
            user: req.user.id,
        })



        res.status(201).json({
            message: "Image uploaded successfully",
            post,
            imageUrl: uploadFile.url,
        })

    }
    catch(error) {
        res.status(500).json({
            message: error.message,
        })
    }
}

async function getPost(req,res) {

    const userId = req.user.id;
    const posts = await postModel.find({
        user: userId
    })

    res.status(200).json({
        message: "Posts fetched successfully",
        posts
    })
}

async function getPostDetails(req,res) {

    const token = req.cookies.token;
    if(!token) {
        return res.status(401).json({
            message: "No token found"
        })
    }

    let decoded;
    try {
        decoded = jwt.verify(token,process.env.JWT_SECRET)
    }catch(err) {
        return res.status(401).json({
            message: "Invalid or expired token"
        })
    }

    const userId = decoded.id;
    const postId = req.params.postId;

    const post = await postModel.findById(postId);
    if(!post) {
        return res.status(404).json({
            message: "Post not found"
        })
    }

    const isValidUser = post.user.toString() === userId;
    if(!isValidUser) {
        return res.status(403).json({
            message: "Forbidden content"
        })
    }

    res.status(200).json({
        messgae: "Details fetched successfully",
        post
    })

}

module.exports = {
    createPost,
    getPost,
    getPostDetails,
}