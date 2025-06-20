import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector} from 'react-redux';
import { handleIsAnyModalOpen } from "../../features/ui/uiSlice";

function Message({heading, message, onClose, type}) {
 //type must be danger or normal
let dispatch = useDispatch();
const themeState = useSelector(state => state.ui.theme);
  
const handleClose = () => {
    dispatch(handleIsAnyModalOpen()) //For Blur effect
    onClose(false)
}

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center flex-col'>
      <div className={`h-max w-90 rounded-xl shadow-2xl px-5 py-4 relative text-center
                  ${themeState === 'dark' ? 'bg-blue-950 shadow-sm shadow-gray-100' : 'bg-white'}
        `}>
          <span 
            onClick={handleClose}
          >
            <IoClose className={`absolute right-1 top-1 font-extrabold text-5xl  h-8 w-8 mt-1 mr-1 cursor-pointer rounded-sm p-1
                  ${themeState === 'dark' ? 'hover:bg-blue-900 text-white' : 'hover:bg-gray-100 text-black'}
              `}/>
          </span>
          <h1
            className={`font-bold text-2xl ${type === 'danger' ? 'text-red-600' : 'text-blue-700'}`}
          >
            {heading}
          </h1>
          <p className={`py-3 ${themeState !== 'dark' ? type === 'danger' ? 'text-red-600' : 'text-blue-700' : 'text-white'}`}>
            {message}
          </p> 
      </div>
    </div>
  )
}

export default Message;
