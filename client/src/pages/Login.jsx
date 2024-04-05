import { useState } from 'react';
import axios, { AxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'
import MessageTemplate from './MessageTemplate';
import "../index.css"

function Login(){

    const [isLoggedIn,setIsLoggedIn] = useState(false)
    const [usernameError,setUsernameError] = useState()
    const [passwordError,setPasswordError] = useState()
    const [commonError,setCommonError] = useState()

    function setCookie(name, value) {
        const date = new Date();
        date.setTime(date.getTime() + 1 * 1 * 60 * 60 * 1000);
        let expires = `expires=${date.toUTCString()}`;
        document.cookie = `${name}=${value};${expires};path=/`;
      }


      
      
    const navigate = useNavigate()

    async function handleLogin(){
        const url = import.meta.env.VITE_SERVER_URL 
        const username = document.getElementById("username").value
        const password = document.getElementById("password").value
        const formData = {
            username : username,
            password : password
        }
        try{
            const response = await axios.post(`${url}/users/login`,formData)
            // console.log(response);
            setCookie("authToken",response.data.token)
            setCookie("author",response.data.author)
            setCookie("username",username)
            setIsLoggedIn(true)
            setTimeout(() => {
                navigate("/main")
            }, 2000);
        }
        catch(e){
            console.log(response);
            if(e.response.data.message==="User not found"){
                setUsernameError("User not found")
            }
            else if(e.response.data.message==="Incorect Password"){
                setCommonError("Username and Password is not matching")
            }
            else if(e.code=="ERR_BAD_REQUEST"){
                setCommonError("All fields are mandatory")
            }
        }
    }

    return <>
   {isLoggedIn?
   <MessageTemplate message="Logged In"/>
   :
   <div id='container-div' className="flex justify-evenly items-center h-screen">

   <div id='text-container' className="h-2/3 w-1/3 rounded-lg flex flex-col items-center text-white pt-32">
   <h1 className="text-purple-500 font-mono text-7xl font-black">My Blog</h1>
       <p className="pt-10 text-xl text-purple-500">Blog like a 
       <span className="font-extrabold text-black pl-1">BOSS</span></p>
   </div>

   <div id='form-container' className="bg-purple-500 h-2/3 w-1/3 rounded-lg flex flex-col items-center text-white">
       <h1 className="pt-5 text-6xl font-bold">Login</h1>
       <div id='form-inner-container' className="p-10">
       <label htmlFor="username" className="font-bold">Username:</label> <br />
       <input type="text" id="username" name="username" className="font-semibold w-96 focus:outline-none text-black rounded-sm pl-2" onChange={()=>{setUsernameError("")}} autoComplete='true'/> <br />
       <p id='username-error' className='mb-9 text-sm font-semibold text-red-600'>{usernameError}</p>
       <label htmlFor="password" className="font-bold ">Password:</label> <br />
       <input type="password" id="password" name="password" className="font-semibold w-96 text-black focus:outline-none rounded-sm pl-2" onChange={()=>{setPasswordError("")}}/>
       <p id='password-error' className='font-semibold text-red-600 text-sm'>{passwordError}</p>
       </div>
       <button className="bg-white text-purple-500 text-3xl p-3 rounded-md font-bold" onClick={()=>{handleLogin(); setCommonError("")}}>Login</button>
       <p className='pt-3 text-sm text-red-600 font-semibold'>{commonError}</p>
       <p className="pt-6">Don't have an account, <a href="/signup" className="text-black underline">signup</a></p>
   </div>



   </div>}
    </>
}



export default Login