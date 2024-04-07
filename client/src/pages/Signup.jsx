import { useState } from "react";
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import MessageTemplate from "./MessageTemplate";
import "../index.css"

function Signup(){

    const [isSignedUp,setIsSignedUp] = useState(false)
    const [usernameError,setUsernameError] = useState()
    const [commonError,setCommonError] = useState()
    const [emailError,setEmailError] = useState()

    const navigate = useNavigate()

    let username,email,password
    const url = import.meta.env.VITE_SERVER_URL

    async function HandleSignUp(){
        try{
            username = document.getElementById("username").value
        email = document.getElementById("email").value
        password = document.getElementById("password").value
        const formData = {
            username:username,
            email:email,
            password:password
        }
        const register = await axios.post(`${url}/users/register`,formData)
        // console.log("Sign Up successfull");
        setIsSignedUp(true)
        setTimeout(() => {
            navigate("/")
        }, 2000);
        }
        catch(e){
            console.log(e.response.data.message);
            if(e.response.data.message==="Username already taken"){
                setUsernameError("Username already exists")
            }
            if(e.response.data.message==="All fields are mandatory"){
                setCommonError("All fields are mandatory")
            }
            if(e.response.data.message==="Already registered with this email"){
                setEmailError("Already registered with this email")
            }
        }
    }

    return <>
    {isSignedUp?
    <MessageTemplate message="User created successfully"/>
    :
    <div id="container-div" className="flex justify-evenly items-center h-screen">

<div id="text-container" className="h-2/3 w-1/3 rounded-lg flex flex-col items-center text-white pt-32">
<h1 className="text-purple-500 font-mono text-7xl font-black">Scribble</h1>
    <p className="pt-10 text-xl text-purple-500">Your blogging
    <span className="font-extrabold text-black pl-1">PARTNER</span></p>
</div>

<div id="form-container" className="bg-purple-500 h-2/3 w-1/3 rounded-lg flex flex-col items-center text-white">
    <h1 className="pt-5 text-6xl font-bold">Sign Up</h1>
    <div id="form-inner-container" className="p-10">
    <div className="mb-9 relative">
    <label htmlFor="" className="font-bold">Username:</label> <br />
    <input type="text" id="username" name="username" className="font-semibold w-96 focus:outline-none text-black rounded-sm pl-2" onChange={()=>{setUsernameError("")}}/> <br />
    <p className="font-semibold text-red-600 absolute">{usernameError}</p>
    </div>
    <div className="relative mb-9">
    <label htmlFor="" className="font-bold">Email:</label> <br />
    <input type="email" id="email" name="email" className="font-semibold w-96 focus:outline-none text-black rounded-sm pl-2" onChange={()=>{setEmailError("")}}/>
    <p className="absolute font-semibold text-center text-red-600">{emailError}</p>
    </div>
     
    <label htmlFor="" className="font-bold ">Password:</label> <br />
    <input type="password" id="password" name="password" className="font-semibold w-96 text-black focus:outline-none rounded-sm pl-2" />
    <div className="w-[100%] flex justify-center">
    <p className="absolute font-semibold text-center text-red-600">{commonError}</p>
    </div>
    </div>
    <button className="bg-white text-purple-500 text-3xl p-3 rounded-md font-bold" onClick={()=>{HandleSignUp(); setCommonError("")}}>Sign Up</button>
    <p className="pt-6">Don't have an account, <a href="/" className="text-black underline">login</a></p>
</div>



</div>}
    </>
}



export default Signup