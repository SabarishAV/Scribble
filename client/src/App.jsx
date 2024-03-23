import React from 'react';
import { Routes, Route } from "react-router-dom";


import Main from "./pages/Main";
import Login from "./pages/Login"
import Signup from './pages/Signup';

function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
    <Route path="/main" element={<Main />} />
    </Routes>
    </>
  )
}

export default App
