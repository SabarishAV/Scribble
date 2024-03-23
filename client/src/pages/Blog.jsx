import { useState,useEffect } from 'react'
import axios from 'axios'

import Auth from "../Auth"
import Navbar from "../components/Navbar"

function Blog(){
    const docURL = document.URL
    const id = docURL.split("/")[4]
    const url = import.meta.env.VITE_SERVER_URL
    
    const [data,setData] = useState()

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

    console.log(data);
    if(data){
        return <>
        <Navbar/>
        <div className='w-screen bg-yellow-300 flex items-center justify-center'>
            <div className='w-[40vw] bg-green-400'>
            <h1>{data.title}</h1>
            <p>{data.content}</p>
            </div>
        </div>
        </>
    }
}


export default Blog