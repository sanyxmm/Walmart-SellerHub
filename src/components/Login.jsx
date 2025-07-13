import React, { useState } from 'react';


export function Login({ isLoggedIn, setIsLoggedIn }) {
  const [user, setUser] = useState({ email: '', password: '' });
  const handleLogin = (e) => {
    e.preventDefault();

    if (user.email === "test@gmail.com" && user.password === "test@123") {
        localStorage.setItem('isLoggedIn', 'true');
        setIsLoggedIn(true); 
    } else {
      alert("Invalid User");
    }
  };

  return (
    <div className="h-[100vh] w-[100vw] flex items-center justify-center  bg-blue-50">
       
      <div className=" bg-white rounded-lg shadow-lg p-8 w-[25vw]">
      <div className=' pl-[7vw] '>
     <svg xmlns="http://www.w3.org/2000/svg"
     width="60" height="60"
     viewBox="0 0 540 540">       
  <path fill="#FFC220"            
        d="M368.4 246c11.3-2.3 111-48 119.8-53a42.4 42.4 0 1 0-42.5-73.5c-8.8 5.1-98.2 68.5-105.9 77.1a30 30 0 0 0-3.8 35.1 30.1 30.1 0 0 0 32.4 14.3ZM488.2 347c-8.9-5-108.5-50.7-119.8-53-13-2.7-25.9 3-32.4 14.3a30 30 0 0 0 3.8 35c7.7 8.7 97 72.1 106 77.2a42.5 42.5 0 0 0 42.4-73.5ZM269.7 346.5c-13 0-24.4 8.4-28.5 20.9-3.7 10.9-14 120-14 130.2a42.4 42.4 0 0 0 85 0c0-10.3-10.3-119.3-14-130.2a30.1 30.1 0 0 0-28.5-20.9ZM171 294c-11.2 2.3-110.9 48-119.8 53a42.4 42.4 0 1 0 42.5 73.5c8.9-5.1 98.3-68.5 106-77.1a30 30 0 0 0 3.7-35.1 30.1 30.1 0 0 0-32.3-14.3ZM93.7 119.5A42.5 42.5 0 0 0 51.2 193c9 5 108.6 50.7 119.9 53 12.9 2.7 25.8-3 32.3-14.3a30 30 0 0 0-3.8-35c-7.6-8.7-97-72.1-105.9-77.2ZM269.7 0c-23.4 0-42.4 19-42.4 42.4 0 10.3 10.2 119.3 13.9 130.2a30.1 30.1 0 0 0 28.5 20.9c13 0 24.4-8.4 28.6-20.9 3.6-10.9 13.9-120 13.9-130.2 0-23.4-19-42.4-42.5-42.4Z"/>
</svg> 
</div> 
      <h1 className='text-center font-bold text-[1.3vw]'>Sign or Create your account</h1>
     
        <form onSubmit={handleLogin}>
          <div className="mb-4 mt-4">
            <label className="block text-black-700 text-[1vw] mb-2" htmlFor="email">
              Email Address
            </label>
            <input
              className="w-full px-4 py-2  text-[1vw] border border-black rounded focus:outline-none focus:ring-2 focus:ring-black-700"
              type="email"
              id="email"
              value={user.email}
              placeholder='test@gmail.com'
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              required
              autoFocus
            />
          </div>
          <div className="mb-6">
            <label className="block text-black-700  text-[1vw] mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="w-full px-4 py-2 border border-black rounded focus:outline-none focus:ring-2 focus:ring-black"
              type="password"
              id="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder='test@123'
              required
            />
          </div>
          <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-[2vw] transition-colors"
            type="submit"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}