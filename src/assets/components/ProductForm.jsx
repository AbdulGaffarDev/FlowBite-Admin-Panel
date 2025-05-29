import React, { useEffect, useRef, useState } from 'react'
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux'; 
import handleProductForm from '../../features/ui/uiSlice'


function ProductForm() {
    
  const dispatch = useDispatch();

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center flex-col px-5'>
        <div 
            className='sm:min-w-[200px] sm:max-w-[500px] 
                       md:min-w-[350px] md:max-w-[750px] 
                       lg:min-w-[650px] lg:max-w-[900px] 
                       bg-white text-black
                       max-h-[85vh] overflow-auto 
                       rounded-lg shadow-2xl'
        >
            <div className='flex justify-between pt-3 pb-4 px-5 font-medium  text-gray-600  border-b-gray-300 border-b-[1px]'>
                  <h1 className='text-[20px]'>
                     Add new product
                  </h1>
                  <button 
                    className='text-2xl box-border hoverEffect'
                    onClick={() => dispatch(handleProductForm())}
                    >
                    <IoClose/>
                  </button>
            </div>
            <div className='py-5 px-5 mb-3 border-b-[1px] border-b-gray-300'>
                <form>
                    <div className='md:flex lg:flex xl:flex w-full gap-4'>
                        <div className='w-[100%]'>
                            <label>Product Name *</label><br />
                            <input 
                                type="text" 
                                placeholder='Product Name' 
                                name='productName'
                                className='border-[1px] border-gray-400 rounded-sm py-2 px-3 w-full bg-gray-50 mt-2'
                            />
                        </div>
                    </div>
                    <div className='md:flex lg:flex xl:flex gap-4 mt-4'>
                        <div className='w-[50%]'>
                            <label>Purchase Price *</label><br />
                            <input type="number" placeholder='Purchase Price' name='purchasePrice'
                                className='border-[1px] border-gray-400 rounded-sm py-2 px-3 w-full bg-gray-50 mt-2'
                            />
                        </div>
                        <div className='w-[50%]'>
                            <label>Sell Price *</label><br />
                            <input type="number" placeholder='Sell Price' name='sellPrice'
                                className='border-[1px] border-gray-400 rounded-sm py-2 px-3 w-full bg-gray-50 mt-2'
                            />
                        </div>
                    </div>
                    <div className='md:flex lg:flex xl:flex gap-4 mt-4'>
                        <div className='w-[33%]'>
                            <label>Stock *</label><br />
                            <input type="number" placeholder='Purchase Price' name='purchasePrice'
                                className='border-[1px] border-gray-400 rounded-sm py-2 px-3 w-full bg-gray-50 mt-2'
                            />
                        </div>
                        <div className='w-[33%]'>
                            <label>Brand</label><br />
                            <input type="number" placeholder='Brand' name='brand'
                                className='border-[1px] border-gray-400 rounded-sm py-2 px-3 w-full bg-gray-50 mt-2'
                            />
                        </div>
                        <div className='w-[33%]'>
                            <label>Barcode *</label><br />
                            <input type="text" placeholder='Barcode'  name='barcode'
                                className='border-[1px] border-gray-400 rounded-sm py-2 px-3 w-full  bg-gray-50 mt-2'
                            />
                        </div>
                    </div>
                    <div className='md:flex lg:flex xl:flex w-full gap-4 mt-4'>
                        <div className='w-[100%]'>
                            <label>Upload Image *</label><br />
                            <input 
                                type="file" 
                                placeholder='Select Image to Upload' 
                                name='productImage'
                                className='border-[1px] border-gray-400 rounded-sm py-2 px-3 w-full bg-gray-50 mt-2'
                            />
                        </div>
                    </div>
                    <div className='mt-4'>
                        <div>
                            <label>Description </label><br />
                            <textarea name="description" 
                                className='border-[1px] border-gray-400 rounded-sm py-2 px-3 w-full bg-gray-50 mt-2'
                                placeholder='Description'
                                rows={3}
                            >
                            </textarea>
                        </div>
                    </div>                    
                </form>
            </div>
            <div className='my-7 mx-4' >
                <button type="submit"
                        className={`blue-btn common-btn-style`}
                >Add Product</button>
            </div>
       </div>
    </div>
  )
}

export default ProductForm;
