import React, { useState } from 'react'
import {FaHome, FaAngleRight } from "react-icons/fa";
import {IoMdInformationCircle, IoIosAdd } from "react-icons/io";
import {RiDeleteBin6Fill, RiFileDownloadFill} from "react-icons/ri";
import ProductsTable from './ProductsTable';
import ProductForm from './ProductForm';
import handleProductForm from '../../features/ui/uiSlice'
import { useDispatch, useSelector } from 'react-redux';

function Products() {
  const dispatch = useDispatch()
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
                        E-commerce
                    </div>
                </li>
                <li>
                    <div className='flex items-center gap-3 font-medium text-gray-400'>
                        <FaAngleRight />
                        Products
                    </div>
                </li>
            </ol>
          </nav>
          <div className='w-[100%]'>
            <h1 className='text-2xl mt-3 font-medium'>All Products</h1>
            <div className='mt-4 flex justify-between w-[100%]'>
              <div className='flex gap-2 w-[50%] items-center justify-between'>
                  <form action="Javascript:void(0)">
                      <input type="search" name="searchUsers" placeholder='Search for products' 
                            className='border-[1px] border-gray-300 rounded-lg px-3 py-2 bg-gray-100 w-[170%]'
                      />
                  </form>     
                  <div className='flex gap-3 text-2xl text-gray-500 border-l-[1px] border-l-gray-300 pl-3'>
                      <span 
                        className={`
                            hoverEffect
                          `}
                      >
                        <RiDeleteBin6Fill/>
                      </span>
                     <span 
                        className={`
                            hoverEffect
                            transition-transform duration-800 ease-in-out 
                          `}
                        >
                        <IoMdInformationCircle className='text-2xl'/>
                      </span>
                  </div>
              </div>
              <div className='flex gap-2 mr-4'>
                  <button 
                    className='flex items-center gap-2 justify-center text-white bg-blue-700 hover:bg-blue-800 rounded-lg cursor-pointer text-center py-2 px-3'
                    onClick={() => {
                      console.log("Working")
                      dispatch(handleProductForm());
                    }}
                  >
                      <IoIosAdd className='text-[#ffffff] text-2xl' />
                      Add Product
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
            <ProductsTable />
        </div>
        {useSelector(state => state.ui.isProductFormOpen) && 
         <ProductForm />
        }
        </div>
  )
}

export default Products;