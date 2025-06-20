import  {useState, useEffect} from 'react'
import {FaHome, FaAngleRight } from "react-icons/fa";
import {IoMdInformationCircle, IoIosAdd } from "react-icons/io";
import {RiDeleteBin6Fill, RiFileDownloadFill} from "react-icons/ri";
import ProductsTable from './ProductsTable';
import ProductForm from './ProductForm';
import useDebounce from '../hooks/useDebounce';
import { useDispatch, useSelector } from 'react-redux';
import { handleIsAnyModalOpen, handleProductForm } from '../features/ui/uiSlice'
import Confirmation from './modals/Confirmation';
import Message from './modals/Message';

function Products() {
  const dispatch = useDispatch()
  const [noOfSelectedProducts, setNoOfSelectedProducts] = useState(0)
  const [searchedValue, setSearchedValue] = useState('');
  const [animateIcon, setAnimateIcon] = useState(false);
  const [isUsersAvailable, setIsUsersAvailable] = useState(false)
  const [deleteMultipleProducts, setDeleteMultipleProducts] = useState(false)
  const [confirmDeleteMany, setConfirmDeleteMany] = useState(false)
  const [showSelectionInfo, setShowSelectionInfo] = useState(false)

  const debouncedSearchTerm = useDebounce({ value: searchedValue, delay: 500 });
  const isProductFormOpen = useSelector((state) => state.ui.isProductFormOpen);
  const isModalOpen = useSelector(state => state.ui.isAnyModalOpen)
  const themeState = useSelector(state => state.ui.theme);
  const isAnyModalOpen =  isProductFormOpen || isModalOpen; 

  useEffect(()=>{
    if(noOfSelectedProducts !== 0){
      setAnimateIcon(true);
      setTimeout(()=> setAnimateIcon(false), 500);
    }
  },[noOfSelectedProducts])

  const handleDeleteIconClick = () => {
          if(noOfSelectedProducts === 0){return}
          setDeleteMultipleProducts(true)
          dispatch(handleIsAnyModalOpen())
    }
  
  const handleShowInfo = () => {
    if(noOfSelectedProducts === 0){return}
    setShowSelectionInfo(true)
    dispatch(handleIsAnyModalOpen())
  }
  return (
    <>
     <div className={`flex flex-col gap-4 min-h-full h-full
                    ${themeState==='light'? 'bg-white':'bg-blue-950 text-white'}
      `}>
        <div className={`mt-3 ml-68 w-265
                    ${isAnyModalOpen ? 'blurred' : ''}
      `}>
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
                           onChange={e => setSearchedValue(e.target.value)} 
                           className={`border-[1px] border-gray-300 rounded-lg px-3 py-2 bg-gray-100 w-[170%]
                                    ${themeState==='light' ? '' : 'bg-gray-800'}
                          `}
                      />
                  </form>     
                  <div className='flex gap-3 text-2xl text-gray-500 border-l-[1px] border-l-gray-300 pl-3'>
                      <span 
                        className={`
                          hoverEffect
                          transition-transform duration-800 ease-in-out 
                          ${noOfSelectedProducts !== 0 ? 'text-red-600' : ''} 
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
                          ${noOfSelectedProducts !== 0 ? 'text-blue-600' : ''} 
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
                    className='actionBtn text-white bg-blue-700 hover:bg-blue-800 px-3'
                    onClick={() => { dispatch(handleProductForm())}}
                    disabled={!isUsersAvailable}
                  >
                      <IoIosAdd className='text-[#ffffff] text-2xl' />
                      Add Product
                  </button>
                  <button className={`actionBtn 
                      ${themeState==='dark'? 'bg-gray-700 hover:bg-gray-800 border-gray-600':'bg-white hover:bg-blue-50 border-gray-200'}
                  `}>
                    <RiFileDownloadFill className='text-2xl'/>
                    Export
                  </button>
              </div>
           </div>
          </div>
        </div>
        <div className='mt-3 ml-68 overflow-x-auto h-full'>
            <ProductsTable 
              setNoOfSelectedProducts = {setNoOfSelectedProducts}
              debouncedSearchTerm={debouncedSearchTerm}
              setIsUsersAvailable = {setIsUsersAvailable}
              confirmDeleteMany = {confirmDeleteMany}
              setConfirmDeleteMany = {setConfirmDeleteMany}
            />
        </div>
        </div>
        {isProductFormOpen && 
         <ProductForm />
        }
        {deleteMultipleProducts &&
        <Confirmation 
            heading={"Delete Multiple Products"}
            message={`Are you sure you want to delete ${noOfSelectedProducts} products?`}
            btn1Label={"Delete"}
            btn2Label={"Cancel"}
            type={"danger"}
            setIsConfirmationModalOpen={setDeleteMultipleProducts}
            handleConfirmation={() => setConfirmDeleteMany(true)}
        /> 
        }
        {showSelectionInfo && 
        <Message 
          heading={"Selected Products"}
          message={`You have selected ${noOfSelectedProducts} products.`}
          onClose={() => setShowSelectionInfo(false)}
          type={'normal'}
          />
        }
        </>
  )
}

export default Products;