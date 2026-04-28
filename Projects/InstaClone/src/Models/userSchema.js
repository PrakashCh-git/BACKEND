const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const crypto = require('crypto');


//username
//password
//email
//bio
//profile_img
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,"Please enter the name"]
    },
    userName: {
        type: String,
        required: [true,"Please enter username"],
        unique: [true,"Username has already been taken"],
        lowercase: true,
        trim: true,
    },
    email: {
        type: String,
        requred: [true, "Enter you email address"],
        unique: true,
        lowercase: true,
        trim: true,
        validate: [validator.isEmail, "Please enter a valid email address"],
    },
    password: {
        type: String,
        required: [true, "Please enter password"],
        minlength: 6,
        select: false,
    },
    bio: {
        type: String,
        default: "",
    },
    profilePic : {
        url: {
            type: String,
            default: "https://ik.imagekit.io/fz6j0quib/default-avatar-profile-icon-vector-social-media-user-image-182145777.webp",
        },  
    },
    following: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
        },
    ],
    follower: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
        }
    ]
},
{
    timestamps: true
}
)

userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return;
    
    this.password = await bcrypt.hash(this.password,12);
})

userSchema.methods.comparePassword = async function(enterPassword) {
    return await bcrypt.compare(enterPassword, this.password);
}


const userModel = mongoose.model("user",userSchema); 

module.exports = userModel;
