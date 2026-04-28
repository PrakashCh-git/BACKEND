const jwt = require("jsonwebtoken");
const userModel = require("../Models/userSchema");

module.exports = async (req,res,next) => {
    const token = req.cookies?.token;

    if(!token) {
        return res.status(401).json({
            message: "Not authenticated"
        })
    }

    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);

        const user = await userModel.findById(decoded.userId);

        if(!user) {
            return res.status(401).json({
                success:false,
                message:"User not found"
            })
        }

        req.user = user;
        next();
    }
    catch(err) {
        return res.status(401).json({
            success:false,
            message: "Invalid token"
        })
    }
}