import "../index.css"

function Navbar() {

  function handleMenuBtn(){
    document.getElementById("menu-btn").style.display = "none"
    document.getElementById("close-menu-btn").style.display = "block"
    document.getElementById("nav-links").style.display = "flex"
  }

  function handleCloseMenuBtn(){
    document.getElementById("menu-btn").style.display = "block"
    document.getElementById("close-menu-btn").style.display = "none"
    document.getElementById("nav-links").style.display = "none"
  }

    return (
      <>
      <nav className="bg-purple-500 text-black px-4 py-2 flex justify-between">
  <div className="flex items-center">
    <a href="/main" className="text-xl font-bold font-mono">Scribble</a>
  </div>
  <ul id="nav-links" className="hidden md:flex space-x-7 font-mono">
    <li>
      <a href="/main" className="hover:text-white">Home</a>
    </li>
    <li>
      <a href="/blog/myblogs" className="hover:text-white">Your Blogs</a>
    </li>
    <li>
      <a href="/profile" className="hover:text-white">Profile</a>
    </li>
  </ul>
  <div id="menu-btn" className="absolute top-0 right-2 text-3xl cursor-pointer hidden" onClick={()=>{handleMenuBtn()}}><i className="fa-solid fa-bars"></i></div>
  <div id="close-menu-btn" className="absolute top-0 right-2 text-xl cursor-pointer hidden" onClick={()=>{handleCloseMenuBtn()}}><i className="fa-solid fa-x"></i></div>
</nav>

      </>
    )
}

export default Navbar