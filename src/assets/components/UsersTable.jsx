import React,{useState, useEffect}  from 'react'
import useFetch from '../hooks/useFetch'
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import Add_User_Form from './Add User Form';
import Alert from './Alert';

function UsersTable({setNoOfSelectedUsers, noOfSelectedUsers, debouncedSearchTerm, setUpdatedData, updatedData, deleteSelectedUser, setDeleteSelectedUser}) {
    let {data, loading, error, fetchData} = useFetch()
    let [selectedUsers, setSelectedUsers] = useState({});
    let [userToEdit, setUserToEdit] = useState()
    let [isEditFormOpen, setIsEditFormOpen] = useState(false);
    let [dataToPrint, setDataToPrint] = useState([]);
    let [userToDelete, setUserToDelete] = useState(false)
    let [isDeleted, setisDeleted] = useState(null)
    let [multipleUsersDeleted, setMultipleUsersDeleted] = useState({
                                                            noOfUsersFailedToDelete : 0,
                                                            noOfDeletedUsers : 0,
                                                            });
    
    useEffect(() => {
        fetchData({url : 'https://6821faa1b342dce8004c9871.mockapi.io/usersdata/users/'})
    },[])

    useEffect(() => {
        setDataToPrint(data); //Update the data in table
    }, [data])

    useEffect(() =>{
        if(updatedData){
            setDataToPrint(prev => 
                prev.map(user => (user.id === updatedData.id ? updatedData : user))
            )
        }
    },[updatedData]);
   

    useEffect(() => {
        let filteredUsers = [];
        if(!debouncedSearchTerm.trim()){
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
            isChecked ? noOfSelectedUsers++ : noOfSelectedUsers--;
            setNoOfSelectedUsers(noOfSelectedUsers)

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

    let handleOpenEditForm = (e) => {
        const id = e.target.parentNode.id;
        const userData = dataToPrint.find( user => user.id === id)
        setIsEditFormOpen(true);
        setUserToEdit(userData)
    }

    const handleCloseEditForm = () => {
        setIsEditFormOpen(false);
        setUserToEdit(null)
    }

    //handle single delete
    const handleDelete = (e) => {
        const id = e.target.parentNode.id;
        const userData = dataToPrint.find(user=> user.id === id)
        setUserToDelete(userData);
        fetchData({
            url : `https://6821faa1b342dce8004c9871.mockapi.io/usersdata/users/${id}`,
            method : 'DELETE',
        }).then(() => {
            setDataToPrint(prev => prev.filter(user => user.id !== id));
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
    <div className={`w-full`}>
        {!dataToPrint && loading && 
                <div className='text-center mt-5 text-red-500 font-bold text-lg'>Loading Data ....</div>
        }
        {/* {data && debouncedSearchTerm && 
            <div className='text-center mt-5 text-red-400'>
               No Results found
            </div> 
        }    */}
        {error && 
           <div className='text-center mt-5 text-red-500 font-bold text-lg'>
                {error.message}
           </div>

        }
        {dataToPrint  &&
            <table className='min-w-max w-full'>
                <thead>
                    <tr className='font-medium text-[14px] bg-gray-200 border-1 border-gray-300'>
                        <td className='px-2 py-3'>
                            <form action={'JavaScript:void(0)'}>
                                <input type="checkbox" name="selectAllUsers" id="selectAllUsers" 
                                        onChange = {handleSelectAll}
                                        className='h-[14px] w-[14px]'
                                        checked = {
                                            dataToPrint.length > 0 && dataToPrint.every(user => selectedUsers[user.id])
                                        }
                                />
                            </form>
                        </td>
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
                       <tr key={user.id} className='border-1 border-gray-300 hover:bg-gray-100'>
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
                              onClick={handleOpenEditForm}
                            >
                                <FaEdit/>
                                Update
                            </button>
                            <button 
                                className='common-btn-style red-btn'
                                onClick={handleDelete}
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
        <div>

            {userToEdit  &&  isEditFormOpen &&
                        <Add_User_Form  
                            operation = 'editing' 
                            userObj = {userToEdit} 
                            handleClose = {handleCloseEditForm}
                            setUpdatedData = {setUpdatedData} 
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
            {!isDeleted &&  error && 
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
        </div>
       
    </div>
  )
}

export default UsersTable;
