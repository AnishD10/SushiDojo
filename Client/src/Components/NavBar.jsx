import React, { useState, useContext, useRef, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import Login from './Login'
import Register from './Register'
import { AuthContext } from '../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faCartShopping, faUser, faShoppingCart, faPerson, faUserCircle } from '@fortawesome/free-solid-svg-icons';

const NavBar = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const { setIsLoggedIn , isLoggedIn, user, setUser } = useContext(AuthContext);
  // Logout handler
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setShowProfile(false);
  };
  const [showProfile, setShowProfile] = useState(false);
  const profileRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfile(false);
      }
    }
    if (showProfile) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showProfile]);
  return (
    <>
  <div className="w-full bg-[black] h-20 md:h-32 flex flex-col md:flex-row md:justify-between justify-center items-center font-poppins px-2 sm:px-4 md:px-16  ">
  <div className='text-[#F5C000] font-candal text-[18px] sm:text-[20px] md:text-[24px] select-none mb-1  md:mb-0'>Logo</div>
  <div className='text-[#F5C000] w-full md:w-200 flex flex-wrap md:flex-nowrap justify-center md:justify-evenly items-center select-none text-[12px] sm:text-[14px] md:text-[18px] gap-2 md:gap-0 mb-1 md:mb-0'>
          <NavLink to="/" className={({ isActive }) => `nav-underline${isActive ? ' nav-underline-active' : ''}`}>Home</NavLink>
          <NavLink to="/About" className={({ isActive }) => `nav-underline${isActive ? ' nav-underline-active' : ''}`}>About</NavLink>
          <NavLink to="/Location" className={({ isActive }) => `nav-underline${isActive ? ' nav-underline-active' : ''}`}>Location</NavLink>
          <NavLink to="/Kitchen" className={({ isActive }) => `nav-underline${isActive ? ' nav-underline-active' : ''}`}>Kitchen</NavLink>
          <NavLink to="/Book" className={({ isActive }) => `nav-underline${isActive ? ' nav-underline-active' : ''}`}>Book</NavLink>
        </div>
  <div className='text-[yellow] w-full md:w-auto flex justify-center md:justify-evenly items-center select-none gap-2 md:gap-4'>
          {!isLoggedIn ? (
            <>
              <button className='rounded-full bg-[#F5C000] text-[white] h-10 sm:h-12 md:h-16 w-20 sm:w-28 md:w-32 nav-btn text-[12px] sm:text-[16px] md:text-[18px]' onClick={() => setShowLogin(true)}>Login</button>
              <button className='rounded-full bg-[#F5C000] text-[white] h-10 sm:h-12 md:h-16 w-20 sm:w-28 md:w-32 nav-btn text-[12px] sm:text-[16px] md:text-[18px]' onClick={() => setShowRegister(true)}>Sign Up</button>
            </>
          ) : (
            <>
              
              <div className='w-full md:w-132 flex justify-center gap-2 sm:gap-4 md:gap-16 items-center text-[white]'>
           {/* Star Icon */}
           <FontAwesomeIcon icon={faStar} className='text-[20px] sm:text-[28px] md:text-[32px] text-[#f5c000]' />
           {/* Cart Icon */}
           <FontAwesomeIcon icon={faShoppingCart} className='text-[20px] sm:text-[28px] md:text-[32px]' />
            {/* Profile */}
            <div className='relative flex items-center'>
              <div className='bg-[#29282b] h-12 sm:h-16 md:h-20 w-32 sm:w-40 md:w-72 flex justify-center gap-1 sm:gap-2 md:gap-[20px] items-center rounded-full px-1 sm:px-2'>
                <h1
                  className='text-[10px] sm:text-[14px] md:text-[24px] max-w-[60px] sm:max-w-[90px] md:max-w-[160px] truncate'
                  title={user?.name || "Profile"}
                >
                  {user?.name || "Profile"}
                </h1>
                <button
                  className='focus:outline-none'
                  onClick={() => setShowProfile((prev) => !prev)}
                  aria-label="Show profile dropdown"
                >
                  <FontAwesomeIcon icon={faUserCircle} className='text-[20px] sm:text-[32px] md:text-[48px]' />
                </button>
              </div>
              {showProfile && (
                <div ref={profileRef} className='absolute right-0 top-16 z-50 flex flex-col items-center' style={{ minWidth: '300px' }}>
                  {/* Arrow */}
                  <div className="w-0 h-0 border-l-[16px] border-l-transparent border-r-[16px] border-r-transparent border-b-[16px] border-b-[#f4f4f4] mb-[-4px]" />
                  <div className='bg-[#f4f4f4] rounded-2xl shadow-lg p-6 w-80 flex flex-col items-center animate-fade-in'>
                    <FontAwesomeIcon icon={faUserCircle} className='text-[80px] text-[#bdbdbd] mb-2' />
                    <h2 className='text-[2rem] font-Poppins mb-2 text-black'>{user?.name || 'Profile'}</h2>
                    <div className='w-full flex flex-col gap-2 mb-2'>
                      <div className='flex items-center justify-between w-full'>
                        <span className='font-semibold text-black'>Email</span>
                        <span className='text-gray-700 text-sm'>{user?.email || 'example@email.com'}</span>
                        <span className='text-gray-400 cursor-pointer ml-2'>✎</span>
                      </div>
                      <div className='flex items-center justify-between w-full'>
                        <span className='font-semibold text-black'>Address</span>
                        <span className='text-gray-700 text-sm'>{user?.address || 'Address'}</span>
                        <span className='text-gray-400 cursor-pointer ml-2'>✎</span>
                      </div>
                    </div>
                    <button className='text-black underline text-sm mb-4'>Change Password</button>
                    <button
                      className='w-full bg-[#F5C000] text-white rounded-full py-3 text-lg font-semibold transition hover:bg-yellow-500'
                      onClick={handleLogout}
                    >
                      Log Out
                    </button>
                  </div>
                </div>
              )}
            </div>
              </div>
            </>
           
          )}
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