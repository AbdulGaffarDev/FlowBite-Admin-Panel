import React, { useEffect, useRef, useState } from 'react'
import { IoClose } from "react-icons/io5";
import {useFormik} from 'formik'
import UserFormSchema from '../schemas/UserFormSchema'
import useFetch from '../hooks/useFetch';
import Alert from './Alert';
import { useSelector } from 'react-redux';


function Add_User_Form({userObj, operation, handleClose, setDataToPrint}) {
    const themeState = useSelector(state => state.ui.theme)
    let isUserObjFound = ((userObj != null && userObj != undefined))
    let [isValueUpdated, setIsValueUpdated] = useState(false)
    let [operationStatus, setOperationStatus] = useState(null)
    let {data, newUser, updatedUser, loading, error, fetchData} = useFetch()
    
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
            let randomNumber = Math.floor(1+Math.random()*100)
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
                   userObj.firstName !== values.firstName.trim()
                || userObj.lastName !== values.lastName.trim()
                || userObj.bio !== values.bio.trim()
                || userObj.position !== values.position.trim()
                || userObj.email !== values.email.trim()
                || values.currentPassword !== '' 
            )
        }
        else{
            setIsValueUpdated(true)
        }
    },[values, userObj])

     useEffect(() => {
            if(updatedUser){
                setDataToPrint(prevData => 
                            prevData.map(user => 
                                user.id === updatedUser.id ? updatedUser : user
                            ))
            }
        }, [updatedUser])
    
        useEffect(() => {
            if(newUser){
                setDataToPrint(prevData => [...prevData, newUser])
            }
        }, [newUser])
    
  return (
    <div className='userFormMainContainer'>
        <div 
            className={`userFormContainer
                        ${themeState === 'light' ? 'bg-white text-black' : 'bg-blue-950 text-white'}
                `}
        >
            <div className='flex justify-between pt-3 pb-4 px-5 font-medium  text-gray-600  border-b-gray-300 border-b-[1px]'>
                  <h1 className={`${themeState==='light' ? 'text-black' : 'text-white'} text-[20px]`}>
                    {isUserObjFound ? "Edit user" : "Add new user"}
                  </h1>
                  <button 
                    className={`closeIcon  ${themeState==='light'? 'hover:bg-gray-100':'hover:bg-blue-900'}`}
                    onClick={handleClose}
                    >
                    <IoClose className={`${themeState==='light' ? 'text-black' : 'text-white'}`}/>
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
                                className={`${themeState==='light' ? 'inputFields-light' : 'inputFields-dark'}`}
                            />
                            {errors.firstName && touched.firstName && <p className='text-red-500'>{errors.firstName}</p>}
                        </div>
                        <div className='w-[50%]'>
                            <label>Last Name </label><br />
                            <input type="text" placeholder='Last Name'  name='lastName'
                                className={`${themeState==='light' ? 'inputFields-light' : 'inputFields-dark'}`}
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
                                className={`${themeState==='light' ? 'inputFields-light' : 'inputFields-dark'}`}
                                value={values.email }
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.email && touched.email && <p className='text-red-500'>{errors.email}</p>}
                        </div>
                        <div className='w-[50%]'>
                            <label>Position *</label><br />
                            <input type="text" placeholder='e.g. React developer' name='position'
                                className={`${themeState==='light' ? 'inputFields-light' : 'inputFields-dark'}`}
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
                                    className={`${themeState==='light' ? 'inputFields-light' : 'inputFields-dark'}`}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.currentPassword}
                                />
                                {errors.currentPassword  && <p className='text-red-500'>{errors.currentPassword}</p>}
                            </div>
                            <div className='w-[50%]'>
                                <label>New Password</label><br />
                                <input type="password" placeholder='*******' name='newPassword'
                                    className={`${themeState==='light' ? 'inputFields-light' : 'inputFields-dark'}`}
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
                                className={`${themeState==='light' ? 'inputFields-light' : 'inputFields-dark'}`}
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
