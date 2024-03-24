import { useState,useEffect } from "react"
import axios from "axios"

import Auth from '../Auth'
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

function EditBlog(){

    const docURL = document.URL
    const id = docURL.split("/")[5]
    const url = import.meta.env.VITE_SERVER_URL

    const [data,setData] = useState()
    const [title,setTitle] = useState()
    const [content,setContent] = useState()
    // let title,content;

    useEffect(()=>{
        const fetchBlog = async ()=>{
            const token = Auth()
            const response = await axios.get(`${url}/blog/${id}`,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setData(response.data)
            if(data){
                setTitle(data.title)
                setContent(data.content)
            }
        }

        fetchBlog()
    },[])


    const handleEdit = ()=>{
        if(title || content){
            console.log(title,content);
            if(title==undefined){
                setTitle(data.title)
            }
            else if(content==undefined){
                setContent(data.content)
            }

            const formData = {
                title:title,
                content:content
            }
            console.log(formData);


        }else{
            console.log("Please edit");
        }
    }

    if(data){
        return <>
        <Navbar/>
            <div className="w-screen flex justify-center items-center flex-col py-10">
                <div className="flex flex-col justify-center items-start w-[50vw]">
                    <label htmlFor="title" className="font-black text-2xl">Title</label>
                    <textarea type="text" id="title" name="title" className="border-solid border-2 border-black w-[80%]" defaultValue={data.title} onChange={(e)=>{setTitle(e.target.value); console.log(title)}}/>
                </div>

                <div className="flex flex-col justify-center items-start w-[50vw] pt-6">
                    <label htmlFor="content" className="font-black text-2xl">Content</label>
                    <textarea type="text" id="content" name="content" className="border-solid border-2 border-black w-[80%]" defaultValue={data.content} onChange={(e)=>{setContent(e.target.value); console.log(content);}}/>
                </div>

                <div className="flex flex-col justify-center items-start w-[50vw] pt-12">
                    <div className="w-[80%] flex justify-center items-center">
                        <button className="bg-purple-500 py-2 px-4 font-bold text-white text-xl rounded-md hover:text-black hover:bg-purple-600" onClick={handleEdit}>Submit</button>
                    </div>
                </div>
                
            </div>
            <div className="absolute bottom-0">
                <Footer/>
            </div>
        </>
    }
}


export default EditBlog