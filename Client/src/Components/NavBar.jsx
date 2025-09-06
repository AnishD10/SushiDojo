import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import Login from './Login'
import Register from './Register'
const NavBar = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  return (
    <>
      <div className="W-Full bg-[black] h-32 flex justify-between items-center font-poppins px-20">
        <div className='text-[#F5C000] font-candal text-[24px] select-none'>Logo</div>
        <div className='text-[#F5C000]  h-full w-200 flex justify-evenly items-center select-none'>
          <NavLink to="/" className={({ isActive }) => `nav-underline${isActive ? ' nav-underline-active' : ''}`}>Home</NavLink>
          <NavLink to="/About" className={({ isActive }) => `nav-underline${isActive ? ' nav-underline-active' : ''}`}>About</NavLink>
          <NavLink to="/Location" className={({ isActive }) => `nav-underline${isActive ? ' nav-underline-active' : ''}`}>Location</NavLink>
          <NavLink to="/Kitchen" className={({ isActive }) => `nav-underline${isActive ? ' nav-underline-active' : ''}`}>Kitchen</NavLink>
          <NavLink to="/Book" className={({ isActive }) => `nav-underline${isActive ? ' nav-underline-active' : ''}`}>Book</NavLink>
        </div>
        <div className='text-[yellow] h-full w-72 flex justify-evenly items-center select-none'>
          <button className='rounded-full bg-[#F5C000] text-[white] h-16 w-32 nav-btn' onClick={() => setShowLogin(true)}>Login</button>
          <button className='rounded-full bg-[#F5C000] text-[white] h-16 w-32 nav-btn' onClick={() => setShowRegister(true)}>Sign Up</button>
        </div>
      </div>
      <Login 
        isOpen={showLogin} 
        onClose={() => setShowLogin(false)} 
        onRegisterClick={() => {
          setShowLogin(false);
          setShowRegister(true);
        }}
      />
      <Register isOpen={showRegister} onClose={() => setShowRegister(false)} />
    </>
  )
}
export default NavBar