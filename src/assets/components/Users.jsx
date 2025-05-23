import {useEffect, useState } from 'react';
import useDebounce from '../hooks/useDebounce';
import {FaHome, FaAngleRight } from "react-icons/fa";
import {IoMdInformationCircle, IoIosAdd } from "react-icons/io";
import {RiDeleteBin6Fill, RiFileDownloadFill} from "react-icons/ri";
import UsersTable from './UsersTable';
import Add_User_Form from './Add User Form';
import Popup from './Popup';
import { useDispatch, useSelector } from 'react-redux';
import { handlePopup } from '../../redux/uiSlice'


const Users = () => {
  let [isAddUserFormOpen, setIsAddUserFormOpen] = useState(false);
  let [noOfSelectedUsers, setNoOfSelectedUsers] = useState(0)
  let [animateIcon, setAnimateIcon] = useState(false)
  let [showPopupFor, setshowPopupFor] = useState(null)
  let [searchedValue, setSearchedValue] = useState('')
  let [updatedData, setUpdatedData] = useState()
  
  

  const debouncedSearchTerm = useDebounce({ value: searchedValue, delay: 500 });

  let dispatch = useDispatch();
  let handleCloseAddUserForm = () => setIsAddUserFormOpen(false)
  let handleShowInfo = () =>{
        console.log("No Of users selected : " , noOfSelectedUsers)
        setshowPopupFor('showInfo')
  }
  let handleDeleteIconClick = () => {
        console.log("Delete Icon clicked.")
        if(noOfSelectedUsers === 0){return}
        setshowPopupFor('deleteIcon')
  }
  
  let handleDeleteSelectedUsers = () => {
    console.log("Handling delete all users")
    dispatch(handlePopup())
  }

  useEffect(()=>{
    if(noOfSelectedUsers !== 0){
      setAnimateIcon(true);
      setTimeout(()=> setAnimateIcon(false), 500);
    }
  },[noOfSelectedUsers])
  
  return (
    <div className='flex flex-col gap-4'>
    <div className='mt-3 ml-68 w-265 '>
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
                        className='border-[1px] border-gray-300 rounded-lg px-3 py-2 bg-gray-100 w-[170%]'
                        onChange={e => setSearchedValue(e.target.value)}
                  />
              </form>     
              <div className='flex gap-3 text-2xl text-gray-500 border-l-[1px] border-l-gray-300 pl-3'>
                  {/* <span><IoIosSettings/></span> */}
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
                  {/* <span><BsThreeDotsVertical/></span> */}
              </div>
          </div>
          <div className='flex gap-2 mr-4'>
              <button 
                className='flex items-center gap-2 justify-center text-white bg-blue-700 hover:bg-blue-800 rounded-lg cursor-pointer text-center py-2 px-3'
                onClick={() => setIsAddUserFormOpen(true)}
              >
                  <IoIosAdd className='text-[#ffffff] text-2xl' />
                  Add user
              </button>
              <button className='flex items-center gap-2 justify-center bg-white hover:bg-blue-50 rounded-lg cursor-pointer py-2 px-2 border border-gray-200'>
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
          noOfSelectedUsers={noOfSelectedUsers} 
          debouncedSearchTerm={debouncedSearchTerm}
          setUpdatedData={setUpdatedData}
          updatedData={updatedData}
        />
    </div>
    <div>
      {isAddUserFormOpen && 
              <Add_User_Form 
                handleClose={handleCloseAddUserForm} 
                operation={'addingUser'}
                setUpdatedData={setUpdatedData}
        />}
    </div>
       {showPopupFor === "showInfo" && 
          <Popup 
            heading={"Selected Users"} 
            message={`You have selected ${noOfSelectedUsers} users.`}
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
    </div>
  )
}

export default Users;
