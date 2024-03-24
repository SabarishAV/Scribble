import React,{ useEffect,useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

import Auth from "../Auth"

function AllPosts(){
    const url = import.meta.env.VITE_SERVER_URL
    const [data,setData] = useState();
    const navigate = useNavigate();



    useEffect(()=>{

        const fetchPosts = async ()=>{
            const token = Auth();
            let response = await axios.get(`${url}/blog/blogs`,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setData(response.data)
        }

        fetchPosts()
    },[])
    // console.log(data);

    function goToBlog(item){
        navigate(`/blog/${item._id}`)
    }

   if(data){
    return <>
    <div className='flex items-start justify-around flex-col w-screen my-3'>
    {data.map((item) => (
                <div key={item._id} className='my-2 p-2 mx-auto border-solid border-black border-2 w-[90vw] border-l-transparent border-r-transparent'  onClick={()=>{goToBlog(item)}}>
                    <p className='text-xs text-gray-400'>Author: {item.author}</p>
                    <h2 className='font-extrabold text-2xl'>{item.title}</h2>
                    <p className='w-100 text-wrap'>{item.content}</p>
                </div>
            ))}
    </div>
    </>
   }
}



export default AllPosts