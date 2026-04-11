const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: [true,"With this email address an user already exists"],
        lowercase: true,

    },
    password: {
        type: String,
        required: true
    }
})

const userModel = mongoose.model("users",userSchema);

module.exports = userModel;