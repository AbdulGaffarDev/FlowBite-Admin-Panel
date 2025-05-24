import React, { useEffect, useRef, useState } from 'react'
import { IoClose } from "react-icons/io5";
import {useFormik} from 'formik'
import UserFormSchema from '../schemas/UserFormSchema'
import useFetch from '../hooks/useFetch';
import Alert from './Alert';


function Add_User_Form({userObj, operation, handleClose, setUpdatedData}) {
    let isUserObjFound = ((userObj != null && userObj != undefined))
    let [isValueUpdated, setIsValueUpdated] = useState(false)
    let [operationStatus, setOperationStatus] = useState(null)
    let {data, loading, error, fetchData} = useFetch()
    
    const callFetchHook = async({url, method, values}) => {
         let addingPassword;
         if(isUserObjFound){
            addingPassword = (values.newPassword === '' ? userObj.password : values.newPassword)
         }else{
            addingPassword = '12345678';
         } 
         //Here I'm not using spread operators becaz values array contains fileds like newPassword and currentPassword
         let { firstName, lastName, email, bio, position } = values;
         let updatedData = {
                firstName,
                lastName,
                email,
                bio,
                position,
                password : addingPassword, 
            }
        if(!isUserObjFound){
            let randomNumber = 88;
            let gender = 'men'; //men or women
            let country = 'Pakistan'
            updatedData.status = 'Offline'
            updatedData.country = country;
            updatedData.profilePic = `https://randomuser.me/api/portraits/${gender}/${randomNumber}.jpg`;
        }
        await fetchData({url, method, body : updatedData})
                .then(() => {
                    if(method === 'POST'){
                        setOperationStatus('added')
                    }
                    else{
                        setOperationStatus('updated');
                    }
                    //API is responding with null when user is updated or added. 
                    // If API respond with data then whole data on the page will be updated. Logic for this is written.
                    setUpdatedData(data); //Send data to the parent component
                })
                .catch(err => {
                    console.log("Something wents wrong")
                    console.log(`${method} Operation failed ${err.message}`);
                    method === 'POST' ? setOperationStatus('addFailed') : setOperationStatus('updateFailed')
                })
                setTimeout(() => {
                    setOperationStatus(null);
                    if(!error){
                        handleClose()
                    }
                }, 4000)
        
    }
    
    const {values, errors, touched, handleBlur, handleChange, handleSubmit} = useFormik({
        initialValues : {
            firstName : userObj?.firstName || "",
            lastName :  userObj?.lastName || "",
            email :  userObj?.email || "",
            position :  userObj?.position || "",
            currentPassword : "",
            newPassword : "",
            bio :  userObj?.bio || "",
        },
        validationSchema : UserFormSchema,
        onSubmit : async(values, {resetForm}) => {
                await callFetchHook(
                    {
                    url : `https://6821faa1b342dce8004c9871.mockapi.io/usersdata/users/${userObj?.id||''}`,
                    method : `${isUserObjFound ? 'PUT' : 'POST'}`,
                    values,
                    }
                )
                resetForm();
        }
    })

      //Check whether value is updated or not to diable or enable the submit button
    useEffect(()=>{
        //Set isValueUpdated true if following conditions match and userObjFound otherwise set IsValueUpdated true for add user
        if(isUserObjFound){ 
            setIsValueUpdated(
                   userObj.firstName !== values.firstName
                || userObj.lastName !== values.lastName
                || userObj.bio !== values.bio
                || userObj.position !== values.position
                || userObj.email !== values.email
                || values.currentPassword !== '' 
            )
        }
        else{
            setIsValueUpdated(true)
        }
    },[values, userObj])
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center flex-col px-5'>
        <div 
            className='sm:min-w-[200px] sm:max-w-[500px] 
                       md:min-w-[350px] md:max-w-[750px] 
                       lg:min-w-[650px] lg:max-w-[900px] 
                       h-max  bg-white text-black
                       rounded-lg shadow-2xl'
        >
            <div className='flex justify-between pt-3 pb-4 px-5 font-medium  text-gray-600  border-b-gray-300 border-b-[1px]'>
                  <h1 className='text-[20px]'>
                    {isUserObjFound ? "Edit user" : "Add new user"}
                  </h1>
                  <button 
                    className='text-2xl box-border hoverEffect'
                    onClick={handleClose}
                    >
                    <IoClose/>
                  </button>
            </div>
            <div className='py-5 px-5 mb-3 border-b-[1px] border-b-gray-300'>
                <form onSubmit={handleSubmit}>
                    <div className='md:flex lg:flex xl:flex w-full gap-4'>
                        <div className='w-[50%]'>
                            <label>First Name *</label><br />
                            <input 
                                type="text" 
                                placeholder='First Name' 
                                name='firstName'
                                value={values.firstName }
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className='border-[1px] border-gray-400 rounded-sm py-2 px-3 w-full bg-gray-50 mt-2'
                            />
                            {errors.firstName && touched.firstName && <p className='text-red-500'>{errors.firstName}</p>}
                        </div>
                        <div className='w-[50%]'>
                            <label>Last Name </label><br />
                            <input type="text" placeholder='Last Name'  name='lastName'
                                className='border-[1px] border-gray-400 rounded-sm py-2 px-3 w-full  bg-gray-50 mt-2'
                                value={values.lastName }
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.lastName && touched.lastName && <p className='text-red-500'>{errors.lastName}</p>}
                        </div>
                    </div>
                    <div className='md:flex lg:flex xl:flex gap-4 mt-4'>
                        <div className='w-[50%]'>
                            <label>Email *</label><br />
                            <input type="email" placeholder='example@company.com' name='email'
                                className='border-[1px] border-gray-400 rounded-sm py-2 px-3 w-full bg-gray-50 mt-2'
                                value={values.email }
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.email && touched.email && <p className='text-red-500'>{errors.email}</p>}
                        </div>
                        <div className='w-[50%]'>
                            <label>Position *</label><br />
                            <input type="text" placeholder='e.g. React developer' name='position'
                                className='border-[1px] border-gray-400 rounded-sm py-2 px-3 w-full bg-gray-50 mt-2'
                                value={values.position }
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.position && touched.position && <p className='text-red-500'>{errors.position}</p>}
                        </div>

                    </div>
                    {/* Display only when editing the form */}
                    {operation == 'editing' && 
                        <div className='md:flex lg:flex xl:flex gap-4 mt-4'>
                            <div className='w-[50%]'>
                                <label>Current Password</label><br />
                                <input type="password" placeholder='*******' name='currentPassword'
                                    className='border-[1px] border-gray-400 rounded-sm py-2 px-3 w-full bg-gray-50 mt-2'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.currentPassword}
                                />
                                {errors.currentPassword  && <p className='text-red-500'>{errors.currentPassword}</p>}
                            </div>
                            <div className='w-[50%]'>
                                <label>New Password</label><br />
                                <input type="password" placeholder='*******' name='newPassword'
                                    className='border-[1px] border-gray-400 rounded-sm py-2 px-3 w-full bg-gray-50 mt-2'
                                    onChange={handleChange}
                                    value={values.newPassword}
                                    onBlur={handleBlur}
                                />
                                {errors.newPassword  && <p className='text-red-500'>{errors.newPassword}</p>}
                            </div>
                        </div>
                    }
                    <div className='mt-4'>
                        <div>
                            <label>Biography </label><br />
                            <textarea name="bio" 
                                className='border-[1px] border-gray-400 rounded-sm py-2 px-3 w-full bg-gray-50 mt-2'
                                placeholder='Full stack developer. Open source contributor.'
                                rows={3} 
                                value={values.bio }
                                onChange={handleChange}
                                onBlur={handleBlur}
                            >
                            </textarea>
                            {errors.bio && touched.bio && <p className='text-red-500'>{errors.bio}</p>}
                        </div>
                    </div>
                    
                </form>
            </div>
            <div className='my-7 mx-4' >
                <button type="submit"
                        className={`px-4 py-2 rounded-lg text-white ${(operation === 'editing' && !isValueUpdated)? 'bg-gray-800':'bg-blue-700'}`}
                        disabled = {!isValueUpdated}
                        onClick={handleSubmit}
                >{isUserObjFound ? "Save all" : 'Add user' }</button>
            </div>
       </div>
         {loading && userObj &&
            <Alert 
                heading={"Updating User..."} 
                message={"Please wait while we save the changes."} 
                alertType={'normal'} 
            />
         }
         {error && operationStatus === 'updateFailed' &&
            <Alert 
                heading={"Update Failed"} 
                message={"We couldn't update the data due to a server error. Please try again later"} 
                alertType={'danger'} 
            />
         }
         {operationStatus === 'updated' &&
            <Alert 
                heading={"User Updated"} 
                message={"The selected user has been successfully updated to the system."} 
                alertType={'normal'} 
            />
         }
        {loading && !userObj && 
            <Alert 
                heading={"Adding User..."} 
                message={"Please wait while we save the new user data."} 
                alertType={'normal'} 
            />
         }
        {error && operationStatus === 'addFailed' &&
            <Alert 
                heading={"Add User Failed"} 
                message={"We couldn't add the user due to a server issue. Please try again."} 
                alertType={'danger'} 
            />
         }
        {operationStatus === 'added' &&
            <Alert 
                heading={"User Added"} 
                message={"New user has been successfully added to the system."} 
                alertType={'normal'} 
            />
         }
    </div>
  )
}

export default Add_User_Form;
