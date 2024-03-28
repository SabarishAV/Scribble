import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar"
import Slogan from "../components/Slogan"
import Footer from "../components/Footer"
import MessageTemplate from "./MessageTemplate";
import Auth from "../Auth"
import Author from "../Author"

function AddBlog(){

    const navigate = useNavigate()

    const url = import.meta.env.VITE_SERVER_URL
    let author = Author("author")
    let username = Author("username")

    const [title,setTitle] = useState()
    const [content,setContent] = useState()
    const [isBlogCreated,setIsBlogCreated] = useState(false);
    const [commonError,setCommonError] = useState()

    async function handleSubmit(){
        setCommonError("")
        if(!title || !content){
            // console.log("All fields are mandatory");
            setCommonError("All fields are mandatory")
            return
        }
        const formData = {
            title,
            content,
            author,
            username
        }
        // console.log(formData);
        let token = Auth()
        let response = await axios.post(`${url}/blog/createBlog`,formData,{
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        // console.log(response);
        if(response){
            setIsBlogCreated(true)
            setTimeout(() => {
                navigate("/main")
            }, 2000);
        }
    }

    function resizeContent(){
        let contentheight = document.getElementById("content")
        contentheight.style.height = contentheight.scrollHeight+'px'
    }
    function resizeTitle(){
        let titleheight = document.getElementById("title")
        titleheight.style.height = titleheight.scrollHeight+'px'
    }
    // console.log(response);

    return <>
    {isBlogCreated?
    <MessageTemplate message="Blog created successfully!!"/>
    :
    <div className="overflow-x-hidden flex justify-between items-center flex-col min-h-[100vh]">
    <div>
    <Navbar/>
    <Slogan/>
    <div className="w-screen flex items-center justify-center flex-col py-5" >
        <div className="flex items-start justify-center flex-col w-[40vw] pt-5">
            <label htmlFor="title" className="text-3xl font-bold">Title</label>
            <textarea onChange={(e)=>{resizeTitle(); setTitle(e.target.value)}} className="w-[100%] border-black border-2 mt-2 min-h-14 p-1" name="title" id="title"></textarea>
        </div>
        <div className="flex items-start justify-center flex-col w-[40vw] pt-5">
            <label htmlFor="content" className="text-3xl font-bold">Content</label>
            <textarea onChange={(e)=>{resizeContent(); setContent(e.target.value)}} className="w-[100%] border-black border-2 mt-2 min-h-14 p-1" name="content" id="content"></textarea>
        </div>

        <div className="w-screen flex flex-col justify-center items-center p-5">
            <p className="pb-3 text-red-600 font-semibold">{commonError}</p>
            <button className="border-2 border-black py-2 px-4 text-2xl font-bold rounded-md hover:text-white hover:bg-purple-500 hover:border-transparent" onClick={()=>{handleSubmit()}}>Submit</button>
        </div>
    </div>
    </div>

    <div className="w-screen" id="footer">
        <Footer/>
    </div>

</div>}
    
    </>
}


export default AddBlog