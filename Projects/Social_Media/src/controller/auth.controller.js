const userModel = require("../models/user.model")
const crypto = require("crypto")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")


async function registerController(req,res) {
    try{
            const {email, userName, password, bio, profileImg} = req.body;
    
            //Does the use exist with the email or userName?
            const isUserAlreadyExist = await userModel.findOne({
                $or : [{email:email},{userName:userName}]
            });
            if(isUserAlreadyExist) {
                return res.status(409).json({
                    message: "User already exist with" + (isUserAlreadyExist.email===email? "the email" : "the userName")
                })
            }
    
    
            //Hasing the password
            const hash = await bcrypt.hash(password,10);
    
            //Creating the user
            const user = await userModel.create({
                userName : userName,
                email : email,
                bio : bio,
                profileImg: profileImg,
                password : hash
            })
    
    
            //Creating token
            const token = jwt.sign({
                id: user._id
            },process.env.JWT_SECRET,
            {expiresIn: "1d"}
            )
    
            res.cookie("token",token);
    
            res.status(201).json({
                message: "User Registered successfully",
                user: {
                    email: user.email,
                    userName: user.userName,
                    bio: user.bio,
                    profileImg: user.profileImg
                }
            })
            }
            catch(err) {
                console.log(err);
            }
}

async function logInController(req,res) {
    try{
            const {userName, email, password} = req.body;

        //Checking if the user already exist or not
        const doesUserExist = await userModel.findOne({
            $or:[{email:email},{userName:userName}]
        })
        if(!doesUserExist) {
            return res.status(401).json({
                message: "No user exist with this username or email address"
            })
        }

        

        //Comparing the passwords if they are the same or not
        const doPasswordsMatch = await bcrypt.compare(password,doesUserExist.password)

        //If passwords do not match 
        if(!doPasswordsMatch) {
            return res.status(401).json({
                message: "Wrong password : Unauthorized access"
            })
        }

        const token = jwt.sign(
            {id:doesUserExist._id},
            process.env.JWT_SECRET,
            {expiresIn: "1d"}
        )


        res.cookie("token",token);

        res.status(200).json({
            message: "User logged in successfully",
            user: {
                token:token,
                userName : doesUserExist.userName,
                email: doesUserExist.email,
                bio : doesUserExist.bio,
                profileImg : doesUserExist.profileImg
            }
        })
    }
    catch(err) {
        console.log(err)
    }
}

module.exports = {
    registerController,
    logInController
}