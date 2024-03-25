import React from 'react'

import Navbar from '../components/Navbar'
import Slogan from '../components/Slogan'
import AllPosts from '../components/AllPosts'
import Footer from '../components/Footer'
import CreateBlog from '../components/CreateBlog'

function Main() {
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