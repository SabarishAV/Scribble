import Navbar from "../components/Navbar"
import Slogan from "../components/Slogan"
import Footer from "../components/Footer"

function AddPost(){

    function resizeContent(){
        let contentheight = document.getElementById("content")
        contentheight.style.height = contentheight.scrollHeight+'px'
    }
    function resizeTitle(){
        let titleheight = document.getElementById("title")
        titleheight.style.height = titleheight.scrollHeight+'px'
    }

    return <>
    <div className="overflow-x-hidden flex justify-between items-center flex-col min-h-[100vh]">
        <div>
        <Navbar/>
        <Slogan/>
        <div className="w-screen flex items-center justify-center flex-col py-5" >
            <div className="flex items-start justify-center flex-col w-[40vw] pt-5">
                <label htmlFor="title" className="text-3xl font-bold">Title</label>
                <textarea onChange={()=>{resizeTitle()}} className="w-[100%] border-black border-2 mt-2 min-h-14 p-1" name="title" id="title"></textarea>
            </div>
            <div className="flex items-start justify-center flex-col w-[40vw] pt-5">
                <label htmlFor="content" className="text-3xl font-bold">Content</label>
                <textarea onChange={()=>{resizeContent()}} className="w-[100%] border-black border-2 mt-2 min-h-14 p-1" name="content" id="content"></textarea>
            </div>

            <div className="w-screen flex justify-center items-center p-5">
                <button className="border-2 border-black py-2 px-4 text-2xl font-bold rounded-md hover:text-white hover:bg-purple-500 hover:border-transparent">Submit</button>
            </div>
        </div>
        </div>

        <div className="w-screen" id="footer">
            <Footer/>
        </div>

    </div>
    
    </>
}


export default AddPost