import { useEffect,useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

import Author from "../Author"
import Auth from "../Auth"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

const MyBlogs = ()=>{

    const [data,setData] = useState()

    const url = import.meta.env.VITE_SERVER_URL

    const navigate = useNavigate()

    useEffect(()=>{

        const fetchPosts = async ()=>{

            try{
                const author = Author("author")
                const username = Author("username")
                const isAuthorized = await axios.post(`${url}/users/auth`,{author,username})
            }
            catch(e){
                // navigate("/")
                console.error(e);
            }

            const username = Author("username")
            const token = Auth();
            let response = await axios.get(`${url}/blog/blogs/${username}`,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setData(response.data)
        }

        fetchPosts()
    },[])

    // console.log(data);

    if(data){
        return <>
        <div className="min-h-[100vh] flex flex-col justify-between">
        <div>
            <Navbar/>
            <div className='flex items-start justify-around flex-col w-screen my-3'>
                {data.map((item) => (
                <div key={item._id} className='my-2 p-2 mx-auto border-solid border-black border-2 w-[90vw] border-l-transparent border-r-transparent hover:cursor-pointer'  onClick={()=>{navigate(`/blog/${item._id}`)}}>
                    <h2 className='font-extrabold text-2xl'>{item.title}</h2>
                    <p className='w-100 text-wrap'>{item.content}</p>
                </div>
               ))}
            </div>
        </div>
        <div>
            <Footer/>
        </div>
        </div>
        </>
    }
}


export default MyBlogs