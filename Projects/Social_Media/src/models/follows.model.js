const mongoose = require("mongoose");


const followsSchema = new mongoose.Schema({
    follower : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: [true,"Follower is required"]
    },
    followee : {
        type: mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:[true,"Followee is required"]
    }
})

const followsModel = mongoose.model("follows", followsSchema);

module.exports = followsModel;