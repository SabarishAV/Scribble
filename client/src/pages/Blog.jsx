import { useState,useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

import Auth from "../Auth"
import Navbar from "../components/Navbar"
import Footer from '../components/Footer'

function Blog(){
    const docURL = document.URL
    const id = docURL.split("/")[4]
    const url = import.meta.env.VITE_SERVER_URL
    
    const [data,setData] = useState()
    const navigate = useNavigate()

    useEffect(()=>{
        const fetchBlog = async ()=>{
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

    console.log(data);
    if(data){
        return <>
        <Navbar/>
        <div className='w-screen flex items-center justify-center py-5'>
            <div className='w-[60vw]'>
            <h1 className='text-4xl font-bold'>{data.title}</h1>
            <p className='pt-10'>{data.content}</p>
            <div className='p-3 mt-3'>
                <button className='text-xl py-1 px-4 border-black border-solid border-2 rounded-md hover:bg-purple-500 hover:text-white hover:border-none hover:font-bold mx-3' onClick={()=>{handleEdit(data._id)}}>Edit</button>
                <button className='text-xl py-1 px-4 border-black border-solid border-2 rounded-md hover:bg-purple-500 hover:text-white hover:border-none hover:font-bold mx-3'>Delete</button>
            </div>
            </div>
        </div>
        <div className='absolute bottom-0'>
        <Footer/>
        </div>
        </>
    }
}


export default Blog