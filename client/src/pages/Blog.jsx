import { useState,useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

import Auth from "../Auth"
import Author from "../Author"
import Navbar from "../components/Navbar"
import Footer from '../components/Footer'

function Blog(){
    const docURL = document.URL
    const id = docURL.split("/")[4]
    const url = import.meta.env.VITE_SERVER_URL
    const username = Author("username")
    
    const [data,setData] = useState()
    const navigate = useNavigate()

    useEffect(()=>{

        const fetchBlog = async ()=>{
            try{
                const author = Author("author")
                const username = Author("username")
                const isAuthorized = await axios.post(`${url}/users/auth`,{author,username})
            }
            catch{
                navigate("/")
            }
            const token = Auth()
            const response = await axios.get(`${url}/blog/${id}`,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setData(response.data)
        }

        fetchBlog()
    },[])

    const handleEdit = (id)=>{
        navigate(`/blog/edit/${id}`);
    }

    const handleDelete = async (id)=>{
        const token = Auth()
        const response = await axios.delete(`${url}/blog/${id}`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        if(response){
            console.log("Blog deleted");
            navigate("/main")
        }else{
            console.log("Error occured");
        }
    }

    // console.log(data);
    if(data){
        return <>
        <div className='min-h-[100vh] flex flex-col justify-between'>
        <div>
        <Navbar/>
        <div className='w-screen flex items-center justify-center py-5'>
            <div className='w-[60vw]'>
            <h1 className='text-4xl font-bold'>{data.title}</h1>
            <p className='pt-10'>{data.content}</p>
            {data.author==username?<div className='p-3 mt-3'>
                <button className='text-xl py-1 px-4 border-black border-solid border-2 rounded-md hover:bg-purple-500 hover:text-white hover:border-none hover:font-bold mx-3' onClick={()=>{handleEdit(data._id)}}>Edit</button>
                <button className='text-xl py-1 px-4 border-black border-solid border-2 rounded-md hover:bg-purple-500 hover:text-white hover:border-none hover:font-bold mx-3' onClick={()=>{handleDelete(data._id)}}>Delete</button>
            </div>:""}
            </div>
        </div>
        </div>
        <div>
        <Footer/>
        </div>
        </div>
        </>
    }
}


export default Blog