const asyncHandler = require("express-async-handler")
const bcrypt = require("bcrypt")

const Blog = require("../models/blogSchema")

const getAllBlogs = asyncHandler(async (req,res)=>{
    const blogs = await Blog.find({});

    if(!blogs){
        res.status(404).json({message:"Not Found"})
    }

    res.status(200).json(blogs)
})



const getOneBlog = asyncHandler(async(req,res)=>{
    const id = req.params.id;
    if(!id){
        res.status(404).json({message:"id not found"})
    }

    const blog = await Blog.findOne({_id:id})
    if(!blog){
        res.status(404).json("Blog not found")
    }

    res.status(200).json(blog)
})



const createBlog = asyncHandler(async (req,res)=>{
    const {title,content,author,username} = req.body
    if(!title || !content){
        res.status(400).json({message:"All fields are mandatory"})
    }
    const blog = new Blog({
        title,
        content,
        author:username
    })
    isUserValid = await bcrypt.compare(username,author)
    if(!isUserValid){
        res.status(400).json({message:"User invalid"})
    }
    await blog.save()

    if(!blog){
        res.status(400).json({message:"An error occured"})
    }
    let message = "Blog created successfully!!"
    res.status(200).json(message)
})




const updateBlog = asyncHandler(async (req,res)=>{
    const id = req.params.id;
    if(!id){
        res.status(404).json({message:"id not found"})
    }

    let updatedBlog

    if(!req.body.title){
        updatedBlog = {
            content: req.body.content,
            author: req.body.author,
            username:req.body.username
        }
    }else if(!req.body.content){
        updatedBlog = {
            title: req.body.title,
            author: req.body.author,
            username:req.body.username
        }
    }else{
        updatedBlog = {
            title: req.body.title,
            content:req.body.content,
            author: req.body.author,
            username:req.body.username
        }
    }

    if(!updatedBlog){
        res.status(404).json({message:"All fields are mandatory"})
    }

    let isUserValid = await bcrypt.compare(updatedBlog.username,updatedBlog.author)
    if(!isUserValid){
        console.log(updatedBlog.username,updatedBlog.author);
        res.status(400).json({message:"User not valid"})
    }

    updatedBlog.author = updatedBlog.username
    const blog = await Blog.findByIdAndUpdate(id, updatedBlog, { new: true });
    if(!blog){
        res.status(404).json({message:"Blog not found"})
    }

    res.status(201).json({message:"Blog updated successfully",updatedBlog})
})

const deleteBlog = asyncHandler(async (req,res)=>{
    const id = req.params.id
    if(!id){
        res.status(404).json({message:"Id not found"})
    }

    const deletedBlog = await Blog.findByIdAndDelete(id)
    if(!deletedBlog){
        res.status(400).json("An error occured")
    }

    res.status(201).json({message:"Blog deleted successfully",deletedBlog})
})


const getMyBlog = asyncHandler(async (req,res)=>{
    let author = req.params.author
    const blogs = await Blog.find({author});
    if(!blogs){
        res.status(400).json({message:"No blogs available"})
    }
    res.status(200).json(blogs)
})




module.exports = { getAllBlogs,getOneBlog,createBlog,updateBlog,deleteBlog,getMyBlog }