function Navbar() {
    return (
      <>
      <nav class="bg-gray-800 text-white px-4 py-2 flex justify-between">
  <div class="flex items-center">
    <a href="/" class="text-xl font-bold">My Blog</a>
  </div>
  <ul class="hidden md:flex space-x-4">
    <li>
      <a href="/" class="hover:text-gray-400">Home</a>
    </li>
    <li>
      <a href="/about" class="hover:text-gray-400">About</a>
    </li>
    <li>
      <a href="/contact" class="hover:text-gray-400">Contact</a>
    </li>
  </ul>
</nav>

      </>
    )
}

export default Navbar