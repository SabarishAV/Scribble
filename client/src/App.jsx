import React from 'react';
import { Routes, Route } from "react-router-dom";


import Main from "./pages/Main";
import Login from "./pages/Login"
import Signup from './pages/Signup';
import Blog from './pages/Blog'
import EditBlog from './pages/EditBlog';

function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path="/main" element={<Main />} />
      <Route path="/blog/:id" element={<Blog />} />
      <Route path="/blog/edit/:id" element={<EditBlog />} />
    </Routes>
    </>
  )
}

export default App
