const jwt = require("jsonwebtoken")
const asyncHandler = require("express-async-handler")

const validateToken = asyncHandler(async (req,res,next)=>{
    // const token = req.cookies.authToken;
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if(!token){
        res.status(401).json({"message":"Not authorized"})
    }

    const secretKey = process.env.JWT_SECRET
    const decoded = jwt.verify(token, secretKey)
    if(!decoded){
        res.status(403).json({message:"Forbidden"})
    }

    console.log("Logged in");
    next()
})

module.exports = validateToken;