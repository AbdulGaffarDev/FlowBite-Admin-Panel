import React from 'react';
import { FaSearch } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { AiFillAppstore } from "react-icons/ai";
import { IoMoonSharp } from "react-icons/io5";

function Navbar() {
  return (
    <>
    <div className='drop-shadow-black bg-white w-full fixed top-0 z-20 min-h-12 border-y-[1px] border-gray-300 flex items-center justify-between p-3'>
        <div className='flex'>
          <div className='flex items-center pl-2'>
            <img src='./logo.svg' alt="Logo" className='p-2'/>
            <h1 className='font-medium text-2xl p-2'>Flowbite</h1>
          </div>
          <div className='flex items-center ml-17 m-0 '>
            <form action='Javascript:void(0)' className='flex'>
              <input type="search" name="search" placeholder='Search' className='border-1 border-gray-400 rounded p-1 min-h-8 w-70' />
              <button type="submit" className='border-1 border-gray-400 rounded min-h-8 px-2 py-1 ml-1 box-border'><FaSearch /></button>
            </form>
          </div>
        </div>
        <div className='flex gap-[4px]'>
          <div className='rounded box-border text-2xl p-2 cursor-pointer hover:bg-gray-100'>
            <IoIosNotifications  />
          </div>
          <div className='rounded box-border text-2xl p-2 cursor-pointer hover:bg-gray-100'>
            <AiFillAppstore />
          </div>
          <div className='rounded box-border text-2xl p-2 cursor-pointer hover:bg-gray-100'>
            <IoMoonSharp />
          </div>
        </div>
    </div>
    </>
  )
}

export default Navbar;