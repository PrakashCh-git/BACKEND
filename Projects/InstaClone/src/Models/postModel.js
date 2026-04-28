const mongoose = require("mongoose");

//Post Schema
// 1.Caption
// 2.Image URL
// 3.user
// 4.likes
// 5.comments
const postSchema = new mongoose.Schema({
    caption: {
        type: String,
        trim: true,
        default: "",
        maxlength: 300,
    },
    imgURL: {
        type: String,
        required: [true, "Image url is required to create a post"]
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: [true, "UserId is required to create a post"]
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        }
    ],
    comments: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "user"
            },
            text: {
                type: String,
                trim: true
            },
            createdAt: {
                type: Date,
                default: Date.now,
            }
        }
    ],
},
{
    timestamps: true
});


const postModel = mongoose.model("posts",postSchema);

module.exports = postModel;