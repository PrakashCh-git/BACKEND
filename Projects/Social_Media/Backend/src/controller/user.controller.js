const followsModel = require("../models/follows.model");
const userModel = require("../models/user.model");



async function followUserController(req,res) {
    const followerUserName = req.user.userName;  
    const followeeUserName = req.params.userName;

    //Checking if the followee exists
    const doesFolloweeExist = await userModel.findOne({userName:followeeUserName});
    if(!doesFolloweeExist) {
        return res.status(404).json({
            message:"Followee doesn't exist"
        })
    }

    //Checking if the user already follow the followee
    const alreadyFollow = await followsModel.findOne({
        follower:followerUserName,
        followee:followeeUserName 
    })
    if(alreadyFollow) {
        return res.status(409).json({
            message: `Already following ${followeeUserName}`
        })
    }

    const followRecord = await followsModel.create({
        follower: followerUserName,
        followee: followeeUserName,
    })

    res.status(201).json({
        message: `You are now following ${followRecord.followee}`,
        follow: followRecord
    })
}

async function unfollowUserController(req,res) {
    const followerUserName = req.user.userName;
    const followeeUserName = req.params.userName;

    //Checking if the user already follow the followee
    const isUserFollowing = await followsModel.findOne({
        follower: followeeUserName,
        followee: followeeUserName
    })
    if(!isUserFollowing) {
        return res.status(200).json({
            message:"You are not following the user"
        })
    }

    await followsModel.findByIdAndDelete(isUserFollowing._id);

    res.status(200).json({
        message: `You have unfollowed ${followeeUserName}`
    })
}


module.exports = {
    followUserController,
    unfollowUserController
}