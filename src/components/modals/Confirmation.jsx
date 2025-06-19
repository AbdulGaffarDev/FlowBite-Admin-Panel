import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector} from 'react-redux';
import { handleIsAnyModalOpen } from "../../features/ui/uiSlice";

function Confirmation({heading, message, btn1Label, btn2Label , setIsConfirmationModalOpen, handleConfirmation, type}) {
 //type must be danger or normal
let dispatch = useDispatch();
const themeState = useSelector(state => state.ui.theme);
  
const handleClose = () => {
    dispatch(handleIsAnyModalOpen()) //For Blur effect
    setIsConfirmationModalOpen(false)
}

const handleConfirm = () => {
  dispatch(handleIsAnyModalOpen())
  handleConfirmation()
  setIsConfirmationModalOpen(false)
}
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center flex-col'>
      <div className={`h-max w-90 rounded-xl shadow-2xl px-5 py-4 relative text-center
                  ${themeState === 'dark' ? 'bg-blue-950 shadow-sm shadow-gray-100' : 'bg-white'}
        `}>
          <span 
            onClick={handleClose}
          >
            <IoClose className='absolute right-1 top-1 font-extrabold text-5xl hoverEffect hover:text-red-500'/>
          </span>
          <h1
            className={`font-bold text-2xl ${type === 'danger' ? 'text-red-600' : 'text-blue-700'}`}
          >
            {heading}
          </h1>
          <p className={`py-3 ${type === 'danger' ? 'text-red-600' : 'text-blue-700'}`}>
            {message}
          </p> 
          <div className='flex items-center justify-evenly mt-2'>
            {btn1Label && 
              <button className={`common-btn-style px-3 ${type === 'danger' ? 'red-btn' : 'blue-btn' }`}
                      onClick={handleConfirm}
              >
                {btn1Label}
              </button>}  
            {btn2Label && 
              <button className={`common-btn-style px-3 text-black  normal-btn`}
                      onClick={handleClose}
               >
                {btn2Label}
              </button>
            }  
          </div>
          
      </div>
    </div>
  )
}

export default Confirmation
