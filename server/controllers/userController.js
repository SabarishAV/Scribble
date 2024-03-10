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
        res.status(401).json({"message":"User already registered"})
        throw new Error("User already registered")
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
        res.status(404)
        throw new Error("User not found")
    }

    if(bcrypt.compare(userAvailable.password,password)){
        // res.status(200).json({message:"Successfully logged in"})
        console.log("Successfully logged in");
    }else{
        res.status(401).json({message:"Incorect Password"})
        throw new Error("Incorect Password")
    }

    const payload = { "id":`${userAvailable._id}`, "username":`${userAvailable.username}` };
    const secret = process.env.JWT_SECRET;
    const token = jwt.sign(payload, secret, {expiresIn:"30m"});
    res.cookie('authToken', token, { httpOnly: true, secure: true, sameSite: 'strict' }); // Recommended
    res.cookie('username', payload.username, { httpOnly: true, secure: true, sameSite: 'strict' }); // Recommended
    res.json({ message: 'Login successful', token:token });

})


module.exports = { registerUser,loginUser }