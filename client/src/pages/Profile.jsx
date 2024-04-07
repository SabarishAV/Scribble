import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Navbar from "../components/Navbar"
import Slogan from "../components/Slogan"
import Author from "../Author";
import Auth from "../Auth";
import Footer from "../components/Footer";
import MessageTemplate from "./MessageTemplate";


function Profile(){

    const [currentPassword,setCurrentPassword] = useState()
    const [newPassword,setNewPassword] = useState()
    const [confirmPassword,setConfirmPassword] = useState()

    const [isPasswordChanged,setIsPasswordChanged] = useState()

    const navigate = useNavigate()
    const url = import.meta.env.VITE_SERVER_URL

    const [messageOption,setMessageOption] = useState()

    useEffect(()=>{
        async function authorize(){
            try{
                const author = Author("author")
                const username = Author("username")
                const isAuthorized = await axios.post(`${url}/users/auth`,{author,username})
            }
            catch{
                navigate("/")
            }
        }
        authorize()
    },[])
    const username = Author("username")

    function changeDisplay(value){
        document.getElementById("change-password").style.display = value;
    }

    const handleSubmit = async ()=>{
        if(!currentPassword || !newPassword || !confirmPassword){
            console.log("All firlds are mandatory");
            return
        }

        if(newPassword!==confirmPassword){
            console.log("Both passwords must be same");
            return
        }

        if(newPassword===currentPassword){
            console.log("Current password and new password must not be the same");
            return
        }

        const formData = {
            username,
            currentPassword,
            newPassword
        }
        const token = Auth()
        const response = await axios.post(`${url}/users/changepassword`,formData,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        if(!response){
            console.log("Error");
            return
        }

        // messageOption = "Password updated successfully"
        setMessageOption("Password updated successfully")
        setIsPasswordChanged(true)
        // console.log("Password updated successfully!!");
        setTimeout(()=>{
            navigate("/main")
        },2000)
    }

    function logOut(){
        document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        // messageOption = "Logged out successfully"
        setMessageOption("Log out")
        setIsPasswordChanged(true)
        setTimeout(()=>{
            navigate("/main")
        },2000)
    }

    return <>
    {isPasswordChanged?
    <MessageTemplate message={messageOption}/>
    :
    <div className="flex min-h-[100vh] justify-between flex-col">
    <div>
        <Navbar/>
        <Slogan/>
        <div className="w-screen flex justify-center items-center py-10">
            <div className="w-[50%]">
                <div className="flex flex-col pb-5">
                    <label className="text-2xl font-bold pb-2">Username:</label>
                    <input value={username} type="text" readOnly/>
                </div>
                <div className="flex">
                    <div className="flex flex-col w-[50%]">
                        <label className="text-2xl font-bold pb-2">Password:</label>
                        <input value="xxxxxxxx" type="text" readOnly/>
                    </div>
                    <button className="m-auto border-black border-2 px-4 py-3 rounded-md text-lg font-semibold hover:text-white hover:border-transparent hover:bg-purple-500" onClick={()=>{changeDisplay("flex")}}>Change Password</button>
                </div>
                <button className=" mt-7 px-4 py-3 rounded-md text-lg font-bold bg-purple-500 text-white border-2 border-transparent hover:text-black hover:bg-white hover:border-black" onClick={()=>{logOut()}}>Log Out</button>
            </div>
            <div id="change-password" className="w-screen h-screen absolute hidden justify-center items-center">
                <div className="relative flex flex-col justify-center items-center w-[30%] border-black border-2 rounded-md p-7 bg-purple-400">
                    <div className="flex flex-col items-start w-[100%] px-4">
                        <label htmlFor="current-password" className="text-lg font-bold">Current Password:</label>
                        <input type="password" id="current-password" name="current-password" className="w-[100%]" onChange={(e)=>{setCurrentPassword(e.target.value)}}/>
                    </div>
                    <div className="flex flex-col w-[100%] items-start px-4">
                        <label htmlFor="new-password" className="text-lg font-bold">New Password:</label>
                        <input type="password" id="new-password" name="new-password" className="w-[100%]" onChange={(e)=>{setNewPassword(e.target.value)}}/>
                    </div>
                    <div className="flex flex-col w-[100%] items-start px-4">
                        <label htmlFor="confirm-password" className="text-lg font-bold">Confirm Password:</label>
                        <input type="password" id="confirm-password" name="confirm-password" className="w-[100%]" onChange={((e)=>{setConfirmPassword(e.target.value)})}/>
                    </div>
                    <button className="border-black border-2 px-4 py-2 rounded-md text-lg font-bold mt-4 hover:bg-white hover:border-transparent" onClick={()=>{handleSubmit()}}>Submit</button>
                    <i className="fa-solid fa-x absolute top-5 right-5 cursor-pointer" onClick={()=>{changeDisplay("none")}}></i>
                </div>
            </div>
        </div>
    </div>
    <div>
        <Footer/>
    </div>
    </div>}
    </>
}

export default Profile