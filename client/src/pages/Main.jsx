import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


import Navbar from '../components/Navbar'
import Slogan from '../components/Slogan'
import AllPosts from '../components/AllPosts'
import Footer from '../components/Footer'
import CreateBlog from '../components/CreateBlog'
import Auth from '../Auth'
import Author from '../Author'
function Main() {

  const navigate = useNavigate()

  useEffect(()=>{
    async function checkAuthor(){
      try{
        const url = import.meta.env.VITE_SERVER_URL
        const author = Author("author")
        const username = Author("username")
        const isAuthorized = await axios.post(`${url}/users/auth`,{author,username})
    }
    catch(e){
      // console.log(e);
        navigate("/")
    }
    }
    checkAuthor()
    const token = Auth()
  // console.log(token);
  if(!token){
    navigate("/")
  }
  },[])

    return (
      <div className='m-0 p-0 flex flex-col justify-between min-h-[100vh]'>
        <div>
        <Navbar/>
        <Slogan/>
        <CreateBlog/>
        <AllPosts/>
        </div>
        <div>
          <Footer/>
        </div>
      </div>
    )
  }
  
  export default Main