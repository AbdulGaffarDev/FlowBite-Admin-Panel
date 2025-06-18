import { useSelector, useDispatch } from "react-redux";
import { IoClose } from "react-icons/io5";
import { handleIsAnyModalOpen } from "../../features/ui/uiSlice";

function ViewProduct({productToView, setProductToView}) {
    const themeState = useSelector(state => state.ui.theme);
    const dispatch = useDispatch()

    const closeModal = () => {
        dispatch(handleIsAnyModalOpen())
        setProductToView(null)
    }
  return (
    <div className='formMainContainer'>
        <div 
            className={`formContainer
                        ${themeState === 'light' ? 'bg-white text-black' : 'bg-blue-950 text-white'}
                `}
        >
            <div className='flex justify-between pt-3 pb-4 px-5 font-medium  text-gray-600  border-b-gray-300 border-b-[1px]'>
                <h1 className={`${themeState==='light' ? 'text-black' : 'text-white'} text-[20px]`}>
                    View Product Details
                </h1>
                <button 
                    className={`closeIcon  ${themeState==='light'? 'hover:bg-gray-100':'hover:bg-blue-900'}`}
                    onClick={closeModal}
                >
                    <IoClose className={`${themeState==='light' ? 'text-black' : 'text-white'}`}/>
                              </button>
            </div>
            <div className="flex">
                <div className="w-[35%] mt-4 px-6 py-4">
                    <img src={productToView.image} alt="Product Image" />
                    {/* <img src="img" alt="Barcode" /> */}
                </div>
                <div className="w-[65%]">
                    <div className="flex w-full mt-4">
                        <div className="w-1/2">
                            <h3 className="text-gray-400">Product Name</h3>
                            <p className="font-medium">{productToView.name}</p>
                        </div>
                        <div className="w-1/2">
                            <h3 className="text-gray-400">Barcode</h3>
                            <p className="font-medium">{productToView.barcode}</p>
                        </div>
                    </div>
                    <div className="flex w-full mt-4">
                        <div className="w-1/2">
                            <h3 className="text-gray-400">Brand</h3>
                            <p className="font-medium">{productToView.brand === '' ? '_' : productToView.brand}</p>
                        </div>
                        <div className="w-1/2">
                            <h3 className="text-gray-400">Available Quantity</h3>
                            <p>{productToView.stock}</p>
                        </div>
                    </div>
                    <div className="flex w-full mt-4">
                        <div className="w-1/2">
                            <h3 className="text-gray-400">Purchase Price</h3>
                            <p className="font-medium">{productToView.purchasePrice}</p>
                        </div>
                        <div className="w-1/2">
                            <h3 className="text-gray-400">Sell Price</h3>
                            <p className="font-medium">{productToView.sellPrice}</p>
                        </div>
                    </div>
                    <div className=" w-full mt-4 pb-5 pr-5">
                        <h3 className="text-gray-400">Description</h3>
                        <p className="font-normal">{productToView.description}</p>
                    </div>
                </div>
            </div>
            
            <div className=" border-t-gray-300 border-t-[1px] py-3 flex justify-end">
                <button className="px-4 py-2 rounded-md red-btn relative mr-6"
                        onClick={closeModal}
                >
                    Close
                    </button>
            </div>
        </div>
    </div>
  )
}

export default ViewProduct
