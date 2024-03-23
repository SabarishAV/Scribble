function Navbar() {
    return (
      <>
      <nav className="bg-purple-500 text-black px-4 py-2 flex justify-between">
  <div className="flex items-center">
    <a href="/" className="text-xl font-bold font-mono">My Blog</a>
  </div>
  <ul className="hidden md:flex space-x-4 font-mono">
    <li>
      <a href="/" className="hover:text-gray-400">Home</a>
    </li>
    <li>
      <a href="/about" className="hover:text-gray-400">About</a>
    </li>
    <li>
      <a href="/contact" className="hover:text-gray-400">Contact</a>
    </li>
  </ul>
</nav>

      </>
    )
}

export default Navbar