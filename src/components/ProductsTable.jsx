
// import {useState, useEffect}  from 'react'
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { useDispatch, useSelector } from 'react-redux';


function ProductsTable() {
    // const [selectedUsers, setSelectedUsers] = useState({});
    const dispatch = useDispatch();
    // const isPopupOpen = useSelector(state => state.ui.isPopupOpen);
    // const isAlertDisplaying = useSelector(state => state.ui.isAlertDisplaying);
    const isProductFormOpen = useSelector(state => state.ui.isProductFormOpen);

    const isAnyModalOpen =   isProductFormOpen; 
    const themeState = useSelector(state => state.ui.theme);

   
    return (
    <>
    <div className={`w-full min-h-full h-full m-3 box-border ${isAnyModalOpen ? 'blurred' : ''}`}>
        {/* {!dataToPrint && loading && 
                <div className='errorAndLoadMessage'>Loading Data ....</div>
        }   
        {error && 
           <div className='errorAndLoadMessage'>
                {error.message}
           </div>

        } */}
        {/* {dataToPrint  && */}
            <table className={`min-w-max min-h-max w-full`}>
                <thead>
                    <tr className={`tableHead
                             ${themeState==='dark'? 'bg-gray-600' : 'bg-gray-200'}
                        `}>
                        <th className='px-2 py-3'>
                            <form action={'JavaScript:void(0)'}>
                                <input type="checkbox" name="selectAllUsers" id="selectAllUsers" 
                                        // onChange = {handleSelectAll}
                                        className='h-[14px] w-[14px]'
                                        
                                />
                            </form>
                        </th>
                        <th className='tableHeading'>NAME</th>
                        <th className='tableHeading'>Selling Price</th>
                        <th className='tableHeading'>Barcode</th>
                        <th className='tableHeading'>Available QTY</th>
                        <th className='tableHeading'>ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                   {/* {

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
                                </div>
                            </div> 
                        </td>
                        <td className='p-4 whitespace-nowrap'>{user.sellingPrice}</td>
                        <td className='p-4'>{user.barcode}</td>
                        <td className='p-4'>
                            <div className='flex items-center gap-2'>
                                <div
                                    className={`h-[10px] w-[10px] rounded-[50%] ${user.status === "Active" ? 'bg-green-500' : 'bg-red-500'}`}
                                >
                                </div>
                                {user.availableQTY}
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
                   }  */}
                </tbody>
            </table>
    </div>
    </>
  )
}

export default ProductsTable;
