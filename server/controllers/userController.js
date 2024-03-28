const asyncHandler = require("express-async-handler")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/userSchema")

const registerUser = asyncHandler(async (req,res)=>{
    const {username, email, password} = req.body;
    if(!username || !email || !password){
        res.status(401).json({"message":"All fields are mandatory"})
        throw new Error("All fields are mandatory")
    }

    const userAvailabe = await User.findOne({email})
    if(userAvailabe){
        res.status(401).json({"message":"Already registered with this email"})
        throw new Error("Already registered with this email")
    }

    const usernanmeExists = await User.findOne({username})
    if(usernanmeExists){
        res.status(403).json({message:"Username already taken"})
        throw new Error("Username already taken")
    }

    const hashedPassword = await bcrypt.hash(password,10);
    const user = await User.create({
        username,
        email,
        password:hashedPassword
    })

    if(!user){
        res.status(401).json({"message":"User not found!!"})
        throw new Error("User not found!!")
    }

    res.status(200).json({"message":"User created successfully"})

    // const payload = { "id":"user._id", "username":"user.username" };
    // const secret = process.env.JWT_SECRET;
    // const token = jwt.sign(payload, secret, {expiresIn:"30m"});
    // res.cookie('authToken', token, { httpOnly: true, secure: true, sameSite: 'strict' }); // Recommended
    // res.json({ message: 'Login successful' });
})



const loginUser = asyncHandler(async (req,res)=>{
    const { username,password } = req.body;

    if(!username || !password){
        res.status(401)
        throw new Error("Both fields are mandatory")
    }

    const userAvailable = await User.findOne({username})
    if(!userAvailable){
        res.status(404).json({"message":"User not found"})
        throw new Error("User not found")
    }

    if(await bcrypt.compare(password,userAvailable.password)){
        // res.status(200).json({message:"Successfully logged in"})
        console.log("Successfully logged in");
    }else{
        res.status(401).json({message:"Incorect Password"})
        throw new Error("Incorect Password")
    }

    const payload = { "id":`${userAvailable._id}`, "username":`${userAvailable.username}` };
    const secret = process.env.JWT_SECRET;
    const token = jwt.sign(payload, secret, {expiresIn:"30m"});
    const author = await bcrypt.hash(userAvailable.username,10)
    res.cookie('authToken', token, { httpOnly: true, secure: true, sameSite: 'strict' });
    res.cookie('username', payload.username, { httpOnly: true, secure: true, sameSite: 'strict' });
    res.json({ message: 'Login successful', token:token,author:author });

})

const authUser = asyncHandler(async (req,res)=>{
    const { username,author } = req.body
    const isAuthorized = await bcrypt.compare(username,author)
    const userAvailabe = await User.findOne({username})
    if(!isAuthorized || !userAvailabe){
        res.status(400).json({message:"User not authorized"})
    }
    res.status(200).json({message:isAuthorized})
})


const changePassword = asyncHandler(async (req,res)=>{
    const { username,currentPassword,newPassword } = req.body
    if(!username || !currentPassword || !newPassword){
        res.status(404).json({message:"All fields mandatory"})
        throw new Error("All fields mandatory")
    }

    const userAvailable = await User.findOne({username})
    if(!userAvailable){
        res.status(400).json({message:"User not found"})
        throw new Error("User not found")
    }

    const passwordCheck = await bcrypt.compare(currentPassword,userAvailable.password)
    if(!passwordCheck){
        res.status(403).json({message:"Wrong Password"})
        throw new Error("Wrong password")
    }

    const hashedNewPassword = await bcrypt.hash(newPassword,10)
    userAvailable.password=hashedNewPassword
    const isPasswordUpdated = await userAvailable.save()
    if(!isPasswordUpdated){
        res.status(400).json({message:"Server error"})
        throw new Error("Server error")
    }
    res.status(200).json({message:"Password updated successfully"})
})


module.exports = { registerUser,loginUser,authUser,changePassword }