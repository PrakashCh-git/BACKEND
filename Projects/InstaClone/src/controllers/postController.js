const postModel = require("../Models/postModel");

const imagekit = require("../utils/imagekit");



//CREATING POST
exports.createPost = async (req,res) => {   
    try{
        //1.Convert the buffer->base64
        const fileBase64 = req.file.buffer.toString("base64");

        //2. Upload to ImageKit
        const response = await imagekit.upload({
            file:fileBase64,
            fileName: Date.now()+'-'+req.file.originalname,
            folder: "/posts"
        })

        //3. get url
        const imageUrl = response.url;

        //4. Save in DB
        const post = await postModel.create({
            caption: req.body.caption,
            imgURL: imageUrl,
            user: req.user._id  

        })

        //Sending response
        res.status(201).json({
            message: "post created",
            post
        })

    }
    catch(err) {
        console.log(err)
        res.status(500).json({
            message:"Eroor uploading image"
        })
    }
}


//Geting All Posts
exports.getPost = async (req,res) => {
    try {
        const posts = await postModel.find()
        .populate("user", "name userName profilePic")
        .sort({createdAt: -1});

        res.status(200).json({
            success: true,
            count: posts.length,
            posts
        });
    }
    catch(err) {    
        console.log("GET POSTS ERROR:", err);
        res.status(400).json({
            success: false,
            message: "Eroor fething posts"
        })
    }
}


//TOGGLING LIKE
exports.toggleLike = async (req,res) => {

    try {
        //Getting the post where like or unlike is performed
        const post = await postModel.findById(req.params.id);

        if(!post) {
            return res.status(404).json({
                success: false,
                message: "Page not found"
            })
        }

        //Getting user id
        const userId = req.user._id;

        //Checking if the post is already liked
        const isLiked = post.likes.includes(userId);

        //If liked already
        if(isLiked) {
            const newLikes = [];

            for(let i = 0; i<post.likes.length; i++) {
                const id = post.likes[i];

                if(id.toString()!==userId.toString()) {
                    newLikes.push(id);
                }
            }
            post.likes = newLikes;
        }//If not liked
        else {
            post.likes.push(userId);
        }

        await post.save();


        res.status(200).json({
            success: true,
            message: isLiked? "Post Unliked":"Post Liked",
            likesCount: post.likes.count
        })
    }
    catch(err) {
        console.log("Like error!",err);

        res.status(500).json({
            success: false,
            message: "Error toggling like"
        })
    }
}

//ADDING COMMENT
exports.addComment = async (req,res) => {
    try {
        //Extracting comments's text
        const {text} = req.body;
        if(!text) {
            return res.send(400).json({
                success: false,
                message: "comment can't be empty"
            })
        }

        //Getting Post
        const post = postModel.findById(req.params.id);
        if(!post) {
            return res.status(404).json({
                success:false,
                message:"Post not found"
            })
        }


        //Creating Comment 
        const comment = {
            user: req.user._id,
            text
        }
        
        //Adding comment
        post.comments.push(comment);

        //Saving post document
        await post.save();

        //Sending response
        res.status(200).json({
            success: true,
            message: "comment added",
            comments: post.comments
        });
    }
    catch(err) {
        console.log("Error commenting",err);
        res.status(500).json({
            success: false,
            message: "Erro adding comments"
        })
    }
}

//DELETE COMMENT
exports.deleteComment = async (req,res) => {
    try {
        //Getting the post
        const post = postModel.findById(req.params.postId);
        if(!post) {
            return res.send(400).json({
                success: false,
                message: "Page not found"
            })
        }
        

        //Getting comment
        const comment = post.comment.id(req.params.commentId);
        if(!comment) {
            return res.status(400).json({
                success: false,
                message: "Comment not found"
            })
        }

        //Only user can delete the comment 
        if(comment.user.toString()!==req.user._id.toString()){
            return res.status(403).json({
                success: false,
                message: "Not Authorised"
            })
        }
        

        //Deleting the comment and Saving the changes
        comment.deleteOne();
        await post.save();


        res.status(200).json({
            success: true,
            message: "Comment delted successfully"
        })
    }
    catch(err) {
        console.log("Error deleting comment",err);
        res.status(500).json({
            success: false,
            message: "Error deleting comment"
        })
    }
}