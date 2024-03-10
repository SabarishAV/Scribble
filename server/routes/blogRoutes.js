const express = require("express");
const router = express.Router();

const validateToken = require("../middleware/validateTokenHandler")
const { getAllBlogs,getOneBlog,createBlog,updateBlog,deleteBlog } = require("../controllers/blogController")

router.get("/blogs",validateToken,getAllBlogs)
router.get("/:id",validateToken,getOneBlog)
router.post("/createBlog",validateToken,createBlog)
// router.put("/:id",validateToken,updateBlog)
// router.delete("/:id",validateToken,deleteBlog)


module.exports = router