 const jwt = require("jsonwebtoken");

async function identifyUser(req,res,next) {
    
    
    

    let token = req.cookies.token;

    if (!token && req.headers.authorization?.startsWith("Bearer ")) {
        token = req.headers.authorization.split(" ")[1];
    }

    if(!token) {
        return res.status(401).json({
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