const userModel = require("../Models/userSchema");
const jwt = require("jsonwebtoken");



//Send token
const sendToken = async(user,res) => {
    //Creating token
    const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: "1d"},);

    //Saving that token in user's browser
    res.cookie("token",token);

    //Sending rsponse after creating or registering a user
    const safeUser = {
        _id: user._id,
        name: user.name,
        email:user.email,
        userName: user.userName,
        profilePic: user.profilePic,
        bio: user.bio
    }
    res.status(201).json({
        message: "successful",
        safeUser
    })
}


//Register Controller
exports.register = async(req,res) => {
    const {name,email,userName,password,bio} = req.body;

    //Checking if userName or email already exist
    const doesUserExist = await userModel.findOne({
        $or : [
            {userName},
            {email}
        ]
    });
    if(doesUserExist) {
        const field = [];

        if(doesUserExist.email===email) field.push("email");
        if(doesUserExist.userName==userName) field.push("userName");

        return res.status(409).json({
            message: `user already exist with this ${field.join(",")}`
        })
    }

    //creating a user using the provided credentials
    const user  = await userModel.create({name,email,userName,password,bio});

    sendToken(user,res);
}


//LogIn Controller
exports.login = async(req,res) => {
    try {
        const {email,userName,password} = req.body;

        //Validating Input
        if((!email && !userName) || !password) {
            return res.status(400).json({
                message: "Provide email or username and password"
            })
        }

        //Checking if user exist
        const user = await userModel.findOne({
            $or : [{email: email},{userName : userName}]
        }).select("+password");

        if(!user) {
            return res.status(400).json({
                message: "Invalid credentials"
            })
        }

        //Comparing password
        const isMatched = await user.comparePassword(password);
        if(!isMatched) {
            return res.status(401).json({
                message: "Invalid credentials"
            });
        }

        //send Token
        sendToken(user,res);
    }
    catch(err) {
        res.status(500).json({
            message: "Server Error",
            error: err.message
        });
    }
}


//Get my details
exports.getmydetails = async (req,res) => {
    res.status(200).json({success: true, user: req.user});
}

//Logout handler
exports.logout = async(req,res) => {
    res.cookie("token", "", {expires: new Date(0)});
    res.status(200).json({ success: true, message: "Logged out" });
}