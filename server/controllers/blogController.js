const asyncHandler = require("express-async-handler")

const Blog = require("../models/blogSchema")

const getAllBlogs = asyncHandler(async (req,res)=>{
    const blogs = await Blog.find({});

    if(!blogs){
        res.status(404).json({message:"Not Found"})
    }

    res.status(200).json(blogs)
    // console.log((blogs));
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
    const {title,content} = req.body
    if(!title || !content){
        res.status(400).json({message:"All fields are mandatory"})
    }
    const blog = new Blog({
        title,
        content,
        author:req.cookies.username
    })
    await blog.save()

    if(!blog){
        res.status(400).json({message:"An error occured"})
    }

    res.status(200).json(blog)
})




const updateBlog = asyncHandler(async (req,res)=>{
    const id = req.params.id;
    if(!id){
        res.status(404).json({message:"id not found"})
    }

    const updatedBlog = {
        title: req.body.title,
        content: req.body.content,
        author: req.cookies.username
    }
    if(!updatedBlog){
        res.status(404).json({message:"All fields are mandatory"})
    }

    const blog = await Blog.findByIdAndUpdate(id, updatedBlog, { new: true });
    if(!blog){
        res.status(404).json({message:"Blog not found"})
    }

    res.status(201).json({message:"Blog updated successfully",updatedBlog})
})

const deleteBlog = asyncHandler(async (req,res)=>{
    const id = req.params.id
    if(!id){
        res.status(404).json({message:"id not found"})
    }

    const deletedBlog = await Blog.findByIdAndDelete(id)
    if(!deletedBlog){
        res.status(400).json("An error occured")
    }

    res.status(201).json({message:"Blog deleted successfully",deletedBlog})
})




module.exports = { getAllBlogs,getOneBlog,createBlog,updateBlog,deleteBlog }