const Author = (user)=>{

    function getCookie(name) {
        const cookieString = document.cookie;
        const cookies = cookieString.split(';');
        for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i].trim();
          if (cookie.startsWith(name + '=')) {
            return cookie.split('=')[1];
          }
        }
        return null;
      }

    const author = getCookie(user)
    return author
}

export default Author