import "../index.css"

const MessageTemplate = (props)=>{
    return <>
    <div className="bg-purple-500 h-[100vh] w-[100vw] flex justify-center items-center z-10 animated-content">
        <h1 className="text-white text-5xl font-black font-mono">{props.message}</h1>
    </div>
    </>
}

export default MessageTemplate