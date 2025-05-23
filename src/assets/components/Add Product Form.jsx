import React from 'react';
import { IoClose } from "react-icons/io5";


function Add_Product_Form() {
  return (
    <div className='w-[19rem] h-full bg-white z-30 absolute top-0 right-0 p-3.5 shadow-md overflow-auto'>
      <div className=' flex justify-between pt-[4px] font-medium  text-gray-600'>
        <h6>NEW PRODUCT</h6>
        <button className='text-2xl rounded box-border p-2 cursor-pointer hover:bg-gray-100'><IoClose/></button>
      </div>
      <div className='mt-2'>
        <form action="JavaScript:void(0)">
                <div>
                    <label>Name *</label><br />
                    <input type="text" placeholder='Type product name' 
                           className='border-[1px] border-gray-400 rounded-sm py-2 px-3 w-full bg-gray-50 mt-2'
                       />
                </div>
                <div className='mt-3'>
                    <label>Price *</label><br />
                    <input type="number" placeholder='$999' 
                           className='border-[1px] border-gray-400  rounded-sm py-2 px-3 w-full bg-gray-50 mt-2'
                       />
                </div>
                <div className='mt-3'>
                    <label>Technology *</label><br />
                    <select name="technology" id="technology" 
                            className='border-[1px] border-gray-400  rounded-sm py-2 px-3 w-full bg-gray-50 mt-2'
                    >
                        <option value="" disabled selected>Select category</option>
                        <option value="flowbite">Flowbite</option>
                        <option value="react">React</option>
                        <option value="angular">Angular</option>
                        <option value="vue">Vue</option>
                    </select>
                </div>
                <div className='mt-3'>
                    <label>Description</label><br />
                    <textarea name="productDescription" id="productDescription"
                              className='border-[1px] border-gray-400  rounded-sm py-2 px-3 w-full bg-gray-50 mt-2'
                               rows={4}
                               placeholder='Enter product description here'
                    >
                        
                    </textarea>
                </div>
                <div className='mt-3'>
                    <label>Discount *</label><br />
                    <select name="technology" id="technology" 
                            className='border-[1px] border-gray-400  rounded-sm py-2 px-3 w-full bg-gray-50 mt-2'
                    >
                        <option value="no">No</option>
                        <option value="10">10%</option>
                        <option value="20">20%</option>
                        <option value="30">30%</option>
                        <option value="40">40%</option>
                        <option value="50">50%</option>
                    </select>
                </div>
                <div className='mt-6 flex justify-between'>
                    <button className='w-[45%] text-white bg-blue-700 hover:bg-blue-800 rounded-lg cursor-pointer text-center py-2 px-1'>Add product</button>
                    <button 
                       className='flex items-center justify-center w-[45%]  bg-white hover:bg-blue-50 rounded-lg cursor-pointer  py-2 px-2 border border-gray-200'>
                          <IoClose/>Cancel
                    </button>
                </div>
        </form>
      </div>
    </div>
  )
}

export default Add_Product_Form;
