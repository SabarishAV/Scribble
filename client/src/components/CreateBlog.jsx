import { useNavigate } from "react-router-dom"

function CreateBlog(){
    const navigate = useNavigate()
    return <>
    <div className="w-screen flex justify-center items-center pt-7 pb-3">
        <div className="w-[90vw]">
            <div className="flex border-black border-2 max-w-min whitespace-nowrap p-3 hover:border-transparent hover:bg-purple-500 hover:text-white hover:cursor-pointer" onClick={()=>{navigate("/blog/addblog")}}>
                <h2 className="text-xl font-bold pr-2">Create Blog</h2>
                <i className="fa-regular fa-pen-to-square text-xl font-bold"></i>
            </div>
        </div>
    </div>
    </>
}



export default CreateBlog