import {useState, useEffect}  from 'react'
import useFetch from '../hooks/useFetch'
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import UserForm from './UserForm';
import Alert from './Alert';
import Popup from './Popup';
import { useDispatch, useSelector } from 'react-redux';
import { handlePopup } from '../features/ui/uiSlice'

function UsersTable({setNoOfSelectedUsers, debouncedSearchTerm, deleteSelectedUser, setDeleteSelectedUser, setDataToPrint, dataToPrint}) {
    const {data, loading, error, fetchData} = useFetch()
    const [selectedUsers, setSelectedUsers] = useState({});
    const [userToEdit, setUserToEdit] = useState()
    const [isEditFormOpen, setIsEditFormOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState(false)
    const [isDeleted, setisDeleted] = useState(null)
    const [wantsToDelete, setWantsToDelete] = useState(false)
    const [multipleUsersDeleted, setMultipleUsersDeleted] = useState({
                                                            noOfUsersFailedToDelete : 0,
                                                            noOfDeletedUsers : 0,
                                                            });
    const dispatch = useDispatch();
    const isPopupOpen = useSelector(state => state.ui.isPopupOpen);
    const isAlertDisplaying = useSelector(state => state.ui.isAlertDisplaying);
    const isProductFormOpen = useSelector(state => state.ui.isProductFormOpen);

    const isAnyModalOpen = isPopupOpen || isAlertDisplaying || isProductFormOpen; 
    const themeState = useSelector(state => state.ui.theme);

    useEffect(() => {
        fetchData({url : 'https://6821faa1b342dce8004c9871.mockapi.io/usersdata/users/'})
    },[])

    useEffect(() => {
        setDataToPrint(data); //Update the data in table
    }, [data])

    useEffect(() => {
        let filteredUsers = [];
        if(!debouncedSearchTerm?.trim()){
            setDataToPrint(data);
            return;
        }
        let terms = debouncedSearchTerm.split(' ');
        filteredUsers = data.filter((user) => {
                let content = `${user.firstName} ${user.lastName} ${user.email} ${user.country} ${user.bio} ${user.position}`.toLowerCase();
                return terms.some(term => content.includes(term))
        });
        setDataToPrint(filteredUsers);
            
    }, [debouncedSearchTerm, data])

    let handleCheckBoxChange = (e) => {
            let id = Number(e.target.id);
            let isChecked = e.target.checked;
            setNoOfSelectedUsers(prev => isChecked ? prev + 1 : prev - 1);

            setSelectedUsers(prev => ({
                ...prev, 
                [id] : isChecked
            }))
    }

    let handleSelectAll = (e) => {
        const isChecked = e.target.checked;
        const updatedState = {};    
        let selectedUsers = 0;
        
        dataToPrint.forEach(user => {
            updatedState[user.id] = isChecked; 
            if(isChecked){selectedUsers++}
        })

        setSelectedUsers(updatedState);
        setNoOfSelectedUsers(selectedUsers);
    }

    let handleOpenEditForm = (id) => {
        const userData = dataToPrint.find( user => user.id === id)
        setIsEditFormOpen(true);
        setUserToEdit(userData)
    }

    const handleCloseEditForm = () => {
        setIsEditFormOpen(false);
        setUserToEdit(null)
    }

    //handle single delete
    const handleDelete = (id) => {
            const userData = dataToPrint.find(user=> user.id === id)
            setUserToDelete(userData);
            setWantsToDelete(true)
            dispatch(handlePopup())
        }

     let handleDeleteSingleUser = () => {
            if(wantsToDelete){
                fetchData({
                    url : `https://6821faa1b342dce8004c9871.mockapi.io/usersdata/users/${userToDelete.id}`,
                    method : 'DELETE',
                }).then(() => {
                    setDataToPrint(prev => prev.filter(user => user.id !== userToDelete.id));
                    setUserToDelete(null);
                    setisDeleted(true);
                }).catch(err => {
                    console.error("Delete failed : ", err);
                    setUserToDelete(null)
                    setisDeleted(false)
                })
                setTimeout(() => {
                        setisDeleted(null);
                    }, 5000)
                setWantsToDelete(false);
                dispatch(handlePopup())
            }
     }

    //handle multiple delete
    useEffect(()=> {
        let noOfDeletedUsers = 0;
        let noOfUsersFailedToDelete = 0;
        if(deleteSelectedUser){
            const deletePromises = dataToPrint.filter(user => selectedUsers[user.id])
            .map(
                user => 
                    fetchData({
                        url: `https://6821faa1b342dce8004c9871.mockapi.io/usersdata/users/${user.id}`,
                        method: 'DELETE',
                    })
                    .then(() => {
                        noOfDeletedUsers++;
                        setNoOfSelectedUsers(0)
                    })
                    .catch((err) => {
                        console.log(`Unable to delete ${user.firstName} ${user.lastName} due to ${err}`);
                        console.log("user not deleted : ",data)
                        noOfUsersFailedToDelete++;

                    })
            )
            Promise.all(deletePromises)
            .then(() => {
                if(!error){
                       let deletedUsers = dataToPrint.filter(user => selectedUsers[user.id])
                       const remainingUsers = dataToPrint.filter(user =>
                            !deletedUsers.some(deleted => deleted.id === user.id)
                        );
                       setDataToPrint(remainingUsers);
                    }
                setMultipleUsersDeleted({
                    noOfDeletedUsers,
                    noOfUsersFailedToDelete,
                })
                setDeleteSelectedUser(false);
            })
        }
    },[deleteSelectedUser])
    return (
    <>
    <div className={`w-full min-h-full h-full ${isAnyModalOpen ? 'blurred' : ''}`}>
        {!dataToPrint && loading && 
                <div className='text-center mt-5 text-red-500 font-bold text-lg min-h-full h-full pb-96'>Loading Data ....</div>
        }
        {/* {data && debouncedSearchTerm && 
            <div className='text-center mt-5 text-red-400'>
               No Results found
            </div> 
        }    */}
        {error && 
           <div className='text-center mt-5 text-red-500 font-bold text-lg min-h-full h-full pb-96'>
                {error.message}
           </div>

        }
        {dataToPrint  &&
            <table className={`min-w-max min-h-max
            `}>
                <thead>
                    <tr className={`font-medium text-[14px] border-1 border-gray-300
                             ${themeState==='dark'? 'bg-gray-600' : 'bg-gray-200'}
                        `}>
                        <th className='px-2 py-3'>
                            <form action={'JavaScript:void(0)'}>
                                <input type="checkbox" name="selectAllUsers" id="selectAllUsers" 
                                        onChange = {handleSelectAll}
                                        className='h-[14px] w-[14px]'
                                        checked = {
                                            dataToPrint.length > 0 && dataToPrint.every(user => selectedUsers[user.id])
                                        }
                                />
                            </form>
                        </th>
                        <th className='font-[400] p-4 text-left'>NAME</th>
                        <th className='font-[400] p-4 text-left'>BIOGRAPHY</th>
                        <th className='font-[400] p-4 text-left'>POSITION</th>
                        <th className='font-[400] p-4 text-left'>COUNTRY</th>
                        <th className='font-[400] p-4 text-left'>STATUS</th>
                        <th className='font-[400] p-4 text-left'>ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                   {

                    dataToPrint.map((user) => (
                       <tr key={user.id} 
                           className={`border-1 border-gray-300 cursor-pointer
                             ${themeState==='dark'? 'hover:bg-gray-600' : 'hover:bg-gray-100'}`}
                           >
                        <td className='p-3 w-4 py-3'>
                            <form action={'JavaScript:void(0)'}>
                                <input type="checkbox" name="selectUser" 
                                       id={user.id}
                                       checked={!!selectedUsers[user.id]}
                                       onChange={handleCheckBoxChange}
                                       className='h-[15px] w-[15px]'
                                />
                            </form>
                        </td>
                        <td className='p-4'>
                            <div className='flex'>
                                <div>
                                    <img src={user.profilePic} alt="Profile" 
                                         className='h-11 w-11 rounded-[50%] mx-4'
                                    />
                                </div>
                                <div>
                                    <h3 className='font-medium'>{user.firstName + " " + user.lastName}</h3>
                                    <span>{user.email}</span>
                                </div>
                            </div> 
                        </td>
                        <td className='p-4 whitespace-nowrap'>{user.bio}</td>
                        <td className='p-4'>{user.position}</td>
                        <td className='p-4'>{user.country}</td>
                        <td className='p-4'>
                            <div className='flex items-center gap-2'>
                                <div
                                    className={`h-[10px] w-[10px] rounded-[50%] ${user.status === "Active" ? 'bg-green-500' : 'bg-red-500'}`}
                                >
                                </div>
                                {user.status}
                            </div>
                        </td>
                        <td 
                            className='flex gap-3 items-center content-center px-5 py-4 space-x-2 whitespace-nowrap'
                            id={user.id}
                        >
                            <button 
                              className='common-btn-style blue-btn'
                              onClick={() => handleOpenEditForm(user.id)}
                            >
                                <FaEdit/>
                                Update
                            </button>
                            <button 
                                className='common-btn-style red-btn'
                                onClick={() => handleDelete(user.id)}
                                >
                                <RiDeleteBin6Fill/>
                                Delete
                            </button>
                        </td>

                      </tr>  
                    ))
                   } 
                </tbody>
            </table>
        }
    </div>
    <div>

            {userToEdit  &&  isEditFormOpen &&
                        <UserForm  
                            operation = 'editing' 
                            userObj = {userToEdit} 
                            handleClose = {handleCloseEditForm}
                            setDataToPrint = {setDataToPrint}
                        />
            }
            {userToDelete && loading && 
                <Alert 
                    heading={"Deleting User..."} 
                    message={"Please wait while we delete the data from the server."}
                    alertType={'danger'}
                />
            }
            {isDeleted && !loading && !error && 
                <Alert 
                    heading={"User Deleted"} 
                    message={"The selected user has been successfully removed from the system."}
                    alertType={'normal'}
                />
            }
            {!isDeleted && dataToPrint &&  error && 
                <Alert 
                    heading={"Delete User Failed"} 
                    message={"Unable to delete the user due to " + error.message}
                    alertType={'danger'}
                />
            }
            {(multipleUsersDeleted.noOfDeletedUsers !== 0 || multipleUsersDeleted.noOfUsersFailedToDelete !== 0) && 
                <Alert 
                    heading={"Delete Multiple User"} 
                    message={`${multipleUsersDeleted.noOfDeletedUsers} user(s) deleted successfully 
                              ${multipleUsersDeleted.noOfUsersFailedToDelete !== 0 ? 
                                'while' + multipleUsersDeleted.noOfUsersFailedToDelete + ' user(s) not deleted successfully. Plz try again.' : '.'}`
                            }
                    alertType={'success'}
                />
            }
             {loading && deleteSelectedUser && 
                <Alert 
                     heading={"Deleting Multiple User..."} 
                     message={'Please wait while we deleting the data from the server.'}
                     alertType={'success'}
                    
                />
            }
            {wantsToDelete && 
                <Popup 
                    handleDeleteSelectedUsers = {handleDeleteSingleUser}
                    heading={"Delete User"} 
                    message={`Are you sure you want to delete selected user?`}
                    btn1Text={"Delete"}
                    btn2Text={"Cancel"}
                    showingPopupFor={'deleteIcon'}
                />
            }
        </div>
    </>
  )
}

export default UsersTable;
