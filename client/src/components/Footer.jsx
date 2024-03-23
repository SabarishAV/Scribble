function Footer(){
    return <>
    <div className="w-screen bg-purple-500">
        <div>
            <ul className="flex justify-center items-center">
                <li className="px-2"><a href=""><i class="fa-brands fa-linkedin-in"></i></a></li>
                <li className="px-2"><a href=""><i class="fa-brands fa-instagram"></i></a></li>
                <li className="px-2"><a href=""><i class="fa-brands fa-github"></i></a></li>
                <li className="px-2"><a href="mailto:avsabarish@gmail.com"><i class="fa-regular fa-envelope"></i></a></li>
            </ul>
        </div>
        <div className="flex justify-center items-center">
            <p className="text-gray-600">Copyright &#169; 2024 My Blog. All Rights Reserved.</p>
        </div>
    </div>
    </>
}



export default Footer