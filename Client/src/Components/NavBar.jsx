import React, { useState, useContext, useRef, useEffect } from 'react'
import axios from 'axios';
import { NavLink } from 'react-router-dom'
import Login from './Login'
import Register from './Register'
import { AuthContext } from '../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faCartShopping, faUser, faShoppingCart, faPerson, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import SushiDojo from '../assets/SushiDojo.svg'

const NavBar = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const { setIsLoggedIn , isLoggedIn, user, setUser, showNameInNav, setShowNameInNav } = useContext(AuthContext);
  // Inline edit states
  const [editName, setEditName] = useState(false);
  const [editEmail, setEditEmail] = useState(false);
  const [editAddress, setEditAddress] = useState(false);
  const [nameInput, setNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [addressInput, setAddressInput] = useState("");
  // Save name
  const handleSaveName = async () => {
    setLoading(true); setError("");
    try {
      const res = await axios.put(`http://localhost:3000/api/users/update-name/${user._id}`, { name: nameInput });
      setUser({ ...user, name: res.data.data.name });
      setEditName(false);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update name");
    } finally { setLoading(false); }
  };
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  // Password modal
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordMsg, setPasswordMsg] = useState("");

  // Logout handler
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setShowProfile(false);
  };

  // Save email
  const handleSaveEmail = async () => {
    setLoading(true); setError("");
    try {
      const res = await axios.put(`http://localhost:3000/api/users/update-email/${user._id}`, { email: emailInput });
      setUser({ ...user, email: res.data.data.email });
      setEditEmail(false);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update email");
    } finally { setLoading(false); }
  };
  // Save address
  const handleSaveAddress = async () => {
    setLoading(true); setError("");
    try {
      const res = await axios.put(`http://localhost:3000/api/users/update-address/${user._id}`, { address: addressInput });
      setUser({ ...user, address: res.data.data.address });
      setEditAddress(false);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update address");
    } finally { setLoading(false); }
  };
  // Save password
  const handleChangePassword = async (e) => {
    e.preventDefault();
    setLoading(true); setPasswordMsg("");
    try {
      const res = await axios.put(`http://localhost:3000/api/users/update-password/${user._id}`, { oldPassword, newPassword });
      setPasswordMsg("Password updated successfully");
      setOldPassword(""); setNewPassword("");
      setTimeout(() => setShowPasswordModal(false), 1000);
    } catch (err) {
      setPasswordMsg(err.response?.data?.message || "Failed to update password");
    } finally { setLoading(false); }
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
  <div className="w-full h-20 md:h-32 flex flex-col md:flex-row md:justify-between justify-center items-center font-poppins px-2 sm:px-4 md:px-16 select-none " style={{background: 'linear-gradient(90deg, #7C1D25 0%, #151618 100%)'}}>
  <img src={SushiDojo} alt="Sushi Dojo Logo" className='h-32 w-auto select-none mb-1 md:mb-0' />
  <div className='text-white w-full md:w-200 flex flex-wrap md:flex-nowrap justify-center md:justify-evenly items-center select-none text-[12px] sm:text-[14px] md:text-[18px] gap-2 md:gap-0 mb-1 md:mb-0'>
          <NavLink to="/" className={({ isActive }) => `nav-underline${isActive ? ' nav-underline-active' : ''}`}>Home</NavLink>
          <NavLink to="/About" className={({ isActive }) => `nav-underline${isActive ? ' nav-underline-active' : ''}`}>About</NavLink>
          <NavLink to="/Location" className={({ isActive }) => `nav-underline${isActive ? ' nav-underline-active' : ''}`}>Location</NavLink>
          <NavLink to="/Kitchen" className={({ isActive }) => `nav-underline${isActive ? ' nav-underline-active' : ''}`}>Kitchen</NavLink>
          <NavLink to="/Book" className={({ isActive }) => `nav-underline${isActive ? ' nav-underline-active' : ''}`}>Book</NavLink>
        </div>
  <div className='text-[yellow] w-full md:w-auto flex justify-center md:justify-evenly items-center select-none gap-2 md:gap-4'>
          {!isLoggedIn ? (
            <>
              <button className='rounded-full bg-[#7C1D25] text-white h-10 sm:h-12 md:h-16 w-20 sm:w-28 md:w-32 nav-btn text-[12px] sm:text-[16px] md:text-[18px]' onClick={() => setShowLogin(true)}>Login</button>
              <button className='rounded-full bg-[#7C1D25] text-white h-10 sm:h-12 md:h-16 w-20 sm:w-28 md:w-32 nav-btn text-[12px] sm:text-[16px] md:text-[18px]' onClick={() => setShowRegister(true)}>Sign Up</button>
            </>
          ) : (
            <>
              
              <div className='w-full md:w-132 flex justify-center gap-2 sm:gap-4 md:gap-16 items-center text-[white]'>
           {/* Star Icon */}
           <FontAwesomeIcon icon={faStar} className='text-[20px] sm:text-[28px] md:text-[32px] text-[#7C1D25]' />
           {/* Cart Icon */}
           <FontAwesomeIcon icon={faShoppingCart} className='text-[20px] sm:text-[28px] md:text-[32px]' />
            {/* Profile */}
            <div className='relative flex items-center'>
                <div className={`bg-[#F7F5F3] border border-[#7C1D25] h-12 sm:h-16 md:h-20 flex items-center rounded-full shadow-md transition-all duration-200 px-2 ${showNameInNav && user?.name ? 'min-w-[120px] sm:min-w-[160px] md:min-w-[220px]' : 'w-12 sm:w-16 md:w-20 justify-center'}`}> 
                  {showNameInNav && user?.name && (
                    <span className='text-[#151618] font-semibold text-[10px] sm:text-[14px] md:text-[20px] px-2 truncate max-w-[70px] sm:max-w-[100px] md:max-w-[140px] text-left' title={user.name}>{user.name}</span>
                  )}
                  <button
                    className='focus:outline-none flex items-center justify-center'
                    onClick={() => setShowProfile((prev) => !prev)}
                    aria-label="Show profile dropdown"
                  >
                    <FontAwesomeIcon icon={faUserCircle} className='text-[28px] sm:text-[36px] md:text-[48px] text-[#7C1D25]' />
                  </button>
                </div>
                {showProfile && (
                <div ref={profileRef} className='absolute right-0 top-16 z-50 flex flex-col items-center' style={{ minWidth: '300px' }}>
                  {/* Arrow */}
                  <div className="w-0 h-0 border-l-[16px] border-l-transparent border-r-[16px] border-r-transparent border-b-[16px] border-b-[#F7F5F3] mb-[-4px]" />
                  <div className='bg-[#F7F5F3] text-[#151618] rounded-2xl shadow-lg p-6 w-80 flex flex-col items-center animate-fade-in border border-[#7C1D25]'>
                    <FontAwesomeIcon icon={faUserCircle} className='text-[80px] text-[#7C1D25] mb-2' />
                    <div className='flex items-center justify-center mb-2'>
                      {editName ? (
                        <>
                          <input
                            className='border border-[#7C1D25] rounded px-1 text-[1.5rem] font-Poppins w-40 text-[#151618] bg-[#F7F5F3]'
                            value={nameInput}
                            onChange={e => setNameInput(e.target.value)}
                            disabled={loading}
                          />
                          <button className='text-green-600 ml-1' onClick={handleSaveName} disabled={loading}>✔</button>
                          <button className='text-red-500 ml-1' onClick={() => setEditName(false)} disabled={loading}>✖</button>
                        </>
                      ) : (
                        <>
                          <h2 className='text-[2rem] font-Poppins text-[#151618]'>{user?.name || 'Profile'}</h2>
                          <span className='text-gray-400 cursor-pointer ml-2' onClick={() => { setEditName(true); setNameInput(user?.name || ""); }}>✎</span>
                        </>
                      )}
                    </div>
                    <div className='w-full flex flex-col gap-2 mb-2'>
                      <div className='flex items-center justify-between w-full'>
                        <span className='font-semibold text-[#151618]'>Email</span>
                        {editEmail ? (
                          <>
                            <input
                              className='border border-[#7C1D25] rounded px-1 text-sm w-32 text-[#151618] bg-[#F7F5F3]'
                              value={emailInput}
                              onChange={e => setEmailInput(e.target.value)}
                              disabled={loading}
                            />
                            <button className='text-green-600 ml-1' onClick={handleSaveEmail} disabled={loading}>✔</button>
                            <button className='text-red-500 ml-1' onClick={() => setEditEmail(false)} disabled={loading}>✖</button>
                          </>
                        ) : (
                          <>
                            <span className='text-gray-700 text-sm'>{user?.email || 'example@email.com'}</span>
                            <span className='text-gray-400 cursor-pointer ml-2' onClick={() => { setEditEmail(true); setEmailInput(user?.email || ""); }}>✎</span>
                          </>
                        )}
                      </div>
                      <div className='flex items-center justify-between w-full'>
                        <span className='font-semibold text-[#151618]'>Address</span>
                        {editAddress ? (
                          <>
                            <input
                              className='border border-[#7C1D25] rounded px-1 text-sm w-32 text-[#151618] bg-[#F7F5F3]'
                              value={addressInput}
                              onChange={e => setAddressInput(e.target.value)}
                              disabled={loading}
                            />
                            <button className='text-green-600 ml-1' onClick={handleSaveAddress} disabled={loading}>✔</button>
                            <button className='text-red-500 ml-1' onClick={() => setEditAddress(false)} disabled={loading}>✖</button>
                          </>
                        ) : (
                          <>
                            <span className='text-gray-700 text-sm'>{user?.address || 'Address'}</span>
                            <span className='text-gray-400 cursor-pointer ml-2' onClick={() => { setEditAddress(true); setAddressInput(user?.address || ""); }}>✎</span>
                          </>
                        )}
                      </div>
                    </div>
                    <button className='text-[#7C1D25] underline text-sm mb-4 font-semibold' onClick={() => setShowPasswordModal(true)}>Change Password</button>
                    <div className='flex items-center gap-2 mb-4'>
                      <input
                        type='checkbox'
                        id='showNameInNavToggle'
                        checked={showNameInNav}
                        onChange={e => setShowNameInNav(e.target.checked)}
                        className='accent-[#7C1D25] h-4 w-4 rounded border border-[#7C1D25] cursor-pointer'
                      />
                      <label htmlFor='showNameInNavToggle' className='text-sm cursor-pointer select-none'>Show Name in Profile</label>
                    </div>
                    {error && <div className='text-red-500 text-xs mb-2'>{error}</div>}
                {/* Password Modal */}
                {showPasswordModal && (
                  <div className='fixed inset-0 z-50 flex items-center justify-center' style={{backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)'}}>
                    <div className='bg-[#F7F5F3] rounded-xl p-6 w-80 flex flex-col items-center relative text-[#151618] border border-[#7C1D25] shadow-2xl'>
                      <button className='absolute top-2 right-3 text-xl text-[#7C1D25]' onClick={() => setShowPasswordModal(false)}>×</button>
                      <h3 className='text-lg font-bold mb-2 text-[#7C1D25]'>Change Password</h3>
                      <form className='w-full flex flex-col gap-2' onSubmit={handleChangePassword}>
                        <input
                          type='password'
                          className='border border-[#7C1D25] rounded px-2 py-1 text-[#151618] bg-[#F7F5F3]'
                          placeholder='Old Password'
                          value={oldPassword}
                          onChange={e => setOldPassword(e.target.value)}
                          required
                        />
                        <input
                          type='password'
                          className='border border-[#7C1D25] rounded px-2 py-1 text-[#151618] bg-[#F7F5F3]'
                          placeholder='New Password'
                          value={newPassword}
                          onChange={e => setNewPassword(e.target.value)}
                          required
                        />
                        <button type='submit' className='bg-[#7C1D25] text-white rounded-full py-2 mt-2' disabled={loading}>Update</button>
                        {passwordMsg && <div className='text-center text-sm mt-1 text-[#7C1D25]'>{passwordMsg}</div>}
                      </form>
                    </div>
                  </div>
                )}
                    <button
                      className='w-full bg-[#7C1D25] text-white rounded-full py-3 text-lg font-semibold transition hover:bg-[#a32c36]'
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