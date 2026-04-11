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

    //Creating a protected route
    authRouter.post("/protected", (req, res) =>{
        console.log(req.cookies);

        res.status(200).json({
            message: "This is a protected route"
        })
    })

    //Creating login controller
    authRouter.post("/login", async(req,res)=>{

        //Destructuring user details
        const {email,password} = req.body;

        //Verifying the existance of the email address
        const user = await userModel.findOne({email});
        if(!user) {
            return res.status(404).json({
                message:"Email address doesn't exist"
            })
        }

        //Verifying password 
        const isPasswordCorrect = user.password === password;
        if(!isPasswordCorrect) {
            return res.status(401).json({
                message: "Invalid Password"
            })
        }

        //Creating token if credentials match
        const token = jwt.sign(
            {
                id: user._id
            },
            process.env.JWT_SECRET
        )

        //Saving token in user browser's cookies
        res.cookie("jwt_token",token);

        //Final response
        res.status(200).json({
            message: "User logged successfully",
            user
        })
    })

module.exports = authRouter;