import React from 'react'
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector} from 'react-redux';
import { handlePopup } from '../../features/ui/uiSlice'

function Popup({heading, showingPopupFor, message, btn1Text, btn2Text, handleDeleteSelectedUsers }) {
 
  let dispatch = useDispatch();
const isPopupOpen = useSelector((state) => state.ui.isPopupOpen);

if(!isPopupOpen){return null}
  
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center flex-col'>
      <div className='h-max w-90  bg-white rounded-xl shadow-2xl px-5 py-4 relative text-center'>
          <span 
            onClick={() => dispatch(handlePopup())}
          >
            <IoClose className='absolute right-1 top-1 font-extrabold text-5xl hoverEffect hover:text-red-500'/>
          </span>
          <h1
            className={`font-bold text-2xl ${showingPopupFor === 'deleteIcon' ? 'text-red-600' : 'text-blue-700'}`}
          >
            {heading}
          </h1>
          <p className={`py-3 ${showingPopupFor === 'deleteIcon' ? 'text-red-600' : 'text-blue-700'}`}>
            {message}
          </p> 
          <div className='flex items-center justify-evenly mt-2'>
            {btn1Text && 
              <button className={`common-btn-style px-3 ${btn1Text === "Delete" ? 'red-btn' : '' }`}
                      onClick={btn1Text === "Delete" ? handleDeleteSelectedUsers :  () => {}}
              >
                {btn1Text}
              </button>}  
            {btn2Text && 
              <button className={`common-btn-style px-3 ${btn2Text === "Cancel" ? 'normal-btn' : '' }`}
                      onClick={() => btn2Text === "Cancel" ? dispatch(handlePopup()) :  null}
               >
                {btn2Text}
              </button>
            }  
          </div>
          
      </div>
    </div>
  )
}

export default Popup
