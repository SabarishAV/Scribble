import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Login(){

    const navigate = useNavigate()
    let username,password

    async function handleLogin(){
        const url = import.meta.env.VITE_SERVER_URL 
        const username = document.getElementById("username").value
        const password = document.getElementById("password").value
        const formData = {
            username : username,
            password : password
        }
        try{
            const response = axios.post(`${url}/users/login`,formData)
            navigate("/main")
        }
        catch(e){
            console.log(e);
        }
    }

    return <>
    <div className="flex justify-evenly items-center h-screen">

    <div className="h-2/3 w-1/3 rounded-lg flex flex-col items-center text-white pt-32">
    <h1 className="text-purple-500 font-mono text-7xl font-black">My Blog</h1>
        <p className="pt-10 text-xl text-purple-500">Blog like a 
        <span className="font-extrabold text-black pl-1">BOSS</span></p>
    </div>

    <div className="bg-purple-500 h-2/3 w-1/3 rounded-lg flex flex-col items-center text-white">
        <h1 className="pt-5 text-6xl font-bold">Login</h1>
        <div className="p-10">
        <label htmlFor="" className="font-bold">Username:</label> <br />
        <input type="text" id="username" name="username" className="w-96 mb-9 focus:outline-none text-black rounded-sm pl-2" /> <br />
        <label htmlFor="" className="font-bold ">Password:</label> <br />
        <input type="password" id="password" name="password" className="w-96 text-black focus:outline-none rounded-sm pl-2" />
        </div>
        <button className="bg-white text-purple-500 text-3xl p-3 rounded-md font-bold" onClick={handleLogin}>Login</button>
        <p className="pt-6">Don't have an account, <a href="/signup" className="text-black underline">signup</a></p>
    </div>



    </div>
    </>
}



export default Login