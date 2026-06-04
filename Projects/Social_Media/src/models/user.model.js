const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        unique: [true, "Username already exist"],
        required: [true, "Username is required"],
    },
    email: {
        type:String,
        unique: [true,"email already exists"],
        required: [true,"Please enter email"]
    },
    password: {
        type: String,
        required: [true,"Please enter the passwrod"],
    },
    bio: String,
    profileImg: {
        type: String,
        default:"https://ik.imagekit.io/fz6j0quib/default-avatar-profile-icon-vector-social-media-user-image-182145777.webp?updatedAt=1776080435372"
    }
})

const userModel = mongoose.model("user",userSchema);

module.exports = userModel;