import {useEffect, useState } from 'react';
import useDebounce from '../hooks/useDebounce';
import {FaHome, FaAngleRight } from "react-icons/fa";
import {IoMdInformationCircle, IoIosAdd } from "react-icons/io";
import {RiDeleteBin6Fill, RiFileDownloadFill} from "react-icons/ri";
import UsersTable from './UsersTable';
import UserForm from './UserForm';
import Popup from './Popup';
import { useDispatch, useSelector } from 'react-redux';
import { handlePopup } from '../features/ui/uiSlice'


const Users = () => {
  const [isAddUserFormOpen, setIsAddUserFormOpen] = useState(false);
  const [noOfSelectedUsers, setNoOfSelectedUsers] = useState(0);
  const [animateIcon, setAnimateIcon] = useState(false);
  const [showPopupFor, setshowPopupFor] = useState(null);
  const [searchedValue, setSearchedValue] = useState('');
  const [deleteSelectedUser, setDeleteSelectedUser] = useState(false);
  const [dataToPrint, setDataToPrint] = useState([]);
  
  const themeState = useSelector(state => state.ui.theme);
  const debouncedSearchTerm = useDebounce({ value: searchedValue, delay: 500 });
  const isPopupOpen = useSelector(state => state.ui.isPopupOpen);
  const isAlertDisplaying = useSelector(state => state.ui.isAlertDisplaying);
  const isProductFormOpen = useSelector(state => state.ui.isProductFormOpen);

  const isAnyModalOpen = isPopupOpen || isAlertDisplaying || isProductFormOpen;

  let dispatch = useDispatch();
  let handleCloseAddUserForm = () => setIsAddUserFormOpen(false)
  let handleShowInfo = () =>{
        setshowPopupFor('showInfo')
        dispatch(handlePopup())
  }
  let handleDeleteIconClick = () => {
        if(noOfSelectedUsers === 0){return}
        setshowPopupFor('deleteIcon')
        dispatch(handlePopup())
  }
  
  let handleDeleteSelectedUsers = () => {
    setDeleteSelectedUser(true)
    dispatch(handlePopup());
  }

  useEffect(()=>{
    if(noOfSelectedUsers !== 0){
      setAnimateIcon(true);
      setTimeout(()=> setAnimateIcon(false), 500);
    }
  },[noOfSelectedUsers])
  
  return (
    <>
    <div className={`flex flex-col gap-4 min-h-full h-full
                    ${isAnyModalOpen ? 'blurred' : ''}
                    ${themeState==='light'? 'bg-white':'bg-blue-950 text-white'}
      `}>
    <div className={`mt-3 ml-68 w-265`}>
      <nav>
        <ol className='flex gap-2 items-center'>
            <li>
                <div className='flex items-center gap-3 font-medium'>
                    <FaHome />
                    Home
                </div>
            </li>
            <li>
                <div className='flex items-center gap-3 font-medium'>
                    <FaAngleRight className='text-gray-500'/>
                    Users
                </div>
            </li>
            <li>
                <div className='flex items-center gap-3 font-medium text-gray-400'>
                    <FaAngleRight />
                    List
                </div>
            </li>
        </ol>
      </nav>
      <div className='w-[100%]'>
        <h1 className='text-2xl mt-3 font-medium'>All users</h1>
        <div className='mt-4 flex justify-between w-[100%]'>
          <div className='flex gap-2 w-[50%] items-center justify-between'>
              <form action="Javascript:void(0)">
                  <input type="search" name="searchUsers" placeholder='Search for users' 
                        className={`border-[1px] border-gray-300 rounded-lg px-3 py-2 bg-gray-100 w-[170%]
                                    ${themeState==='light' ? '' : 'bg-gray-800'}
                          `}
                        onChange={e => setSearchedValue(e.target.value)}
                  />
              </form>     
              <div className='flex gap-3 text-2xl text-gray-500 border-l-[1px] border-l-gray-300 pl-3'>
                  <span 
                    className={`
                        hoverEffect
                        transition-transform duration-800 ease-in-out 
                        ${noOfSelectedUsers !== 0 ? 'text-red-600' : ''} 
                        ${animateIcon ? 'scale-140 -translate-y-1' : 'scale-100 translate-y-0'}
                      `}
                    onClick={handleDeleteIconClick}
                  >
                    <RiDeleteBin6Fill/>
                  </span>
                 <span 
                    className={`
                        hoverEffect
                        transition-transform duration-800 ease-in-out 
                        ${noOfSelectedUsers !== 0 ? 'text-blue-600' : ''} 
                        ${animateIcon ? 'scale-140 -translate-y-1' : 'scale-100 translate-y-0'}
                      `}
                      onClick={handleShowInfo}
                    >
                    <IoMdInformationCircle className='text-2xl'/>
                  </span>
              </div>
          </div>
          <div className='flex gap-2 mr-4'>
              <button 
                className='flex items-center gap-2 justify-center text-white bg-blue-700 hover:bg-blue-800 rounded-lg cursor-pointer text-center py-2 px-3'
                onClick={() => setIsAddUserFormOpen(true)}
                disabled={dataToPrint!==null || dataToPrint!==0}
              >
                  <IoIosAdd className='text-[#ffffff] text-2xl' />
                  Add user
              </button>
              <button className={`flex items-center gap-2 justify-center  rounded-lg cursor-pointer py-2 px-2 border 
                      ${themeState==='dark'? 'bg-gray-700 hover:bg-gray-800 border-gray-600':'bg-white hover:bg-blue-50 border-gray-200'}
                `}>
                <RiFileDownloadFill className='text-2xl'/>
                Export
              </button>
          </div>
        </div>
      </div>
    </div>
    <div className='mt-3 ml-68 overflow-x-auto'>
      <UsersTable 
          setNoOfSelectedUsers={setNoOfSelectedUsers} 
          debouncedSearchTerm={debouncedSearchTerm}
          deleteSelectedUser={deleteSelectedUser}
          setDeleteSelectedUser={setDeleteSelectedUser}
          setDataToPrint={setDataToPrint}
          dataToPrint={dataToPrint}
        />
    </div>
    <div className='min-h-full h-full'>
      {isAddUserFormOpen && 
              <UserForm 
                handleClose={handleCloseAddUserForm} 
                operation={'addingUser'}
                setDataToPrint={setDataToPrint}
        />}
    </div>
    </div>
      {showPopupFor === "showInfo" && noOfSelectedUsers !== 0 &&
          <Popup 
            heading={"Selected Users"} 
            message={`You have selected ${noOfSelectedUsers} user(s).`}
            showingPopupFor={showPopupFor}
          />
        }
      {showPopupFor === "deleteIcon" && 
          <Popup 
            handleDeleteSelectedUsers = {handleDeleteSelectedUsers}
            heading={"Delete Users"} 
            message={`Are you sure you want to delete ${noOfSelectedUsers} users?`}
            btn1Text={"Delete"}
            btn2Text={"Cancel"}
            showingPopupFor={showPopupFor}
          />
        }
    </>
  )
}

export default Users;
