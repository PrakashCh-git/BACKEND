const express = require("express"); 
const userModel = require("../models/user.model")
const authRouter = express.Router();
const jwt = require('jsonwebtoken')


authRouter.post('/register', async (req,res) =>{

    //Destrucing req.body
    const {email,name,password} = req.body;



    //Checking if the user already exist
    const existingUser = await userModel.findOne({email});
    if (existingUser) {
        return res.status(409).json({
            message: "User already exists"
        });
    }

    
    //Saving users details in database
    const user = await userModel.create({
        email,name,password
    })

    //Creating TOKEN
    const token = jwt.sign(
        {
            id: user._id,
            email: user.email
        },
        process.env.JWT_SECRET
    )

    //Saving token in user browse's cookie
    res.cookie("jwt_token", token);

    //Sending appropriate response to the user
    res.status(201).json({
        message: "User registered",
        user,
        token
    })


    
})

module.exports = authRouter;