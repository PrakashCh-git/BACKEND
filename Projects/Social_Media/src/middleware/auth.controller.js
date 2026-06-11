 const jwt = require("jsonwebtoken");

async function identifyUser(req,res,next) {
    const token = req.cookies.token;
    if(!token) {
        return res.status(404).json({
            message: "Not authorised"
        })
    }

    let decoded;

    try{
        decoded = jwt.verify(token,process.env.JWT_SECRET)
    }
    catch(err) {
        return res.status(401).json({
            message: "use not authorised"
        })
    }

    req.user = decoded;
    next();
}

module.exports = identifyUser;