const express = require("express");
const router = express.Router();
const validateToken = require("../middleware/validateTokenHandler")

const {registerUser,loginUser} = require("../controllers/userController")

router.post("/register",registerUser);
router.post("/login",loginUser);
router.get("/login",validateToken,(req,res)=>{
    res.status(200).json({message:"Already logged in"})
})


module.exports = router