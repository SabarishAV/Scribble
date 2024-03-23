import React from 'react'

import Navbar from '../components/Navbar'
import Slogan from '../components/Slogan'
import AllPosts from '../components/AllPosts'
import Footer from '../components/Footer'

function Main() {
    return (
      <div className='m-0 p-0'>
        <Navbar/>
        <Slogan/>
        <AllPosts/>
        <Footer/>
      </div>
    )
  }
  
  export default Main