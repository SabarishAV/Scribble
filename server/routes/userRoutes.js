const express = require("express");
const router = express.Router();
const validateToken = require("../middleware/validateTokenHandler")

const {registerUser,loginUser,authUser,changePassword} = require("../controllers/userController")

router.post("/register",registerUser);
router.post("/login",loginUser);
router.get("/login",validateToken,(req,res)=>{
    res.status(200).json({message:"Already logged in"})
})
router.post("/auth",authUser)
router.post("/changepassword",validateToken,changePassword)


module.exports = router