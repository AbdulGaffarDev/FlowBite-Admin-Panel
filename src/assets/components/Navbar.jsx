import React, { useEffect } from 'react';
import { FaSearch } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { AiFillAppstore } from "react-icons/ai";
import { IoMoonSharp, IoSunny  } from "react-icons/io5";
import { toggleTheme, setTheme } from '../../features/ui/uiSlice';
import { useSelector, useDispatch } from 'react-redux';

function Navbar() {
  let themeState = useSelector((state) => state.ui.theme);
  const dispatch = useDispatch()
  const isAnyModalOpen = useSelector(state => state.ui.isPopupOpen) || useSelector(state => state.ui.isAlertDisplaying) || useSelector(state => state.ui.isProductFormOpen) 


  useEffect(() => {
     const localThemeState = JSON.parse(localStorage.getItem('themeState'))
     if(localThemeState===null){
      dispatch(setTheme('light'))
     }else{
      dispatch(setTheme(localThemeState.themeState))
     }
  }, [])

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
    localStorage.setItem('themeState',JSON.stringify({themeState : (themeState === 'light' ? 'dark' : 'light')}))
  }
  return (
    <>
    <div className={`w-full fixed top-0 z-20 min-h-12 border-y-[1px] flex items-center justify-between p-3
                    ${themeState === 'light' ? 'navContainer-light' : 'navContainer-dark'}
                    ${isAnyModalOpen ? 'blurred' : ''}
      `}>
        <div className='flex'>
          <div className='flex items-center pl-2'>
            <img src='./logo.svg' alt="Logo" className='p-2'/>
            <h1 className={`logoStyle 
                   ${themeState === 'light' ? 'text-black' : 'text-white'}
              `}>Flowbite</h1>
          </div>
          <div className='flex items-center ml-17 m-0 relative'>
            <form action='Javascript:void(0)' className='flex'>
              <input type="search" name="search" placeholder='Search' 
                     className={`border-1 border-gray-400 rounded-2xl p-1 pl-10 pr-3 min-h-8 w-70
                                ${themeState === 'light' ? 'text-black placeholder-gray-400' : 'text-white shadow-sm shadow-gray-100'}
                     `} />
              <button type="submit" 
                      className={`absolute flex top-4 left-3
                                 ${themeState === 'light' ? 'text-black' : 'text-white'}
                      `}>
                        <FaSearch />
              </button>
            </form>
          </div>
        </div>
        <div className='flex gap-[4px]'>
          <div className={`navIcon ${themeState === 'light' ? 'text-black' : 'text-white'}`}>
            <IoIosNotifications  />
          </div>
          <div className={`navIcon ${themeState === 'light' ? 'text-black' : 'text-white'}`}>
            <AiFillAppstore />
          </div>
          <div className={`navIcon ${themeState === 'light' ? 'text-black' : 'text-white'}`}
               onClick={handleToggleTheme}
          >
            {themeState === 'light' ?<IoMoonSharp /> : <IoSunny />}
          </div>
        </div>
    </div>
    </>
  )
}

export default Navbar;