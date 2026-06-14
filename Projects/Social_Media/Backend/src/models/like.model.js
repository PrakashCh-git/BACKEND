const { default: mongoose } = require("mongoose");
const monsgoose = require("mongoose");

const likeSchema = new mongoose.Schema({
    post:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "posts",
        required: [true, "Post is required in order to like it"]
    },
    user: {
        type:mongoose.Schema.Types.ObjectId,
        ref: "users",
        require: [true, "Fool you obviously need an user to like a post"]
    }
},{
    timestamps:true
})

likeSchema.index({post:1,user:1},{unique:true});
const likeModel = mongoose.model("like",likeSchema);

module.exports = likeModel;
