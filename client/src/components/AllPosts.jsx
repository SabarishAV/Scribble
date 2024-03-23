import { useState,useEffect } from "react"
import axios from 'axios'

function AllPosts(){
    const url = process.env.SERVER_URL;

    const posts = axios.get(`${url}`);
    
    return <>
    <div></div>
    </>
}



export default AllPosts