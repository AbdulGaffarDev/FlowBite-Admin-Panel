import { useEffect, useState } from "react";
import toast from 'react-hot-toast';
import { RiDeleteBin6Fill } from "react-icons/ri";
import { useDispatch, useSelector } from 'react-redux';
import { FaEdit, FaEye, FaArrowAltCircleUp, FaArrowAltCircleDown} from "react-icons/fa";
import ViewProduct from "./modals/ViewProduct";
import useProducts from "../services/useProducts";
import { handleIsAnyModalOpen } from "../features/ui/uiSlice";
import Confirmation from "./modals/Confirmation";


function ProductsTable({setNoOfSelectedProducts, debouncedSearchTerm, setIsUsersAvailable, confirmDeleteMany, setConfirmDeleteMany}) {
    const [selectedProducts, setSelectedProducts] = useState({});
    const [dataToPrint, setDataToPrint] = useState([])
    const [hoveredBadge, setHoveredBadge] = useState(null)
    const [productToView, setProductToView] = useState(null)
    const [productToDelete, setProductToDelete] = useState(null)
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(null)
    const dispatch = useDispatch();
    const isProductFormOpen = useSelector(state => state.ui.isProductFormOpen);
    const isModalOpen = useSelector(state => state.ui.isAnyModalOpen)
    const isAnyModalOpen =   isProductFormOpen || isModalOpen; 
    const themeState = useSelector(state => state.ui.theme);

    const { createProduct, 
            getProductById, 
            updateProduct, 
            deleteProduct, 
            isSubmitting,
            isLoading,
            products,
            error
        } = useProducts()

    useEffect(() => {
        setDataToPrint(products);
    },[products])

    let handleSelectAll = (e) => {
        const isChecked = e.target.checked;
        const updatedState = {};    
        let selectedProducts = 0;
        
        dataToPrint.forEach(product => {
            updatedState[product.id] = isChecked; 
            if(isChecked){selectedProducts++}
        })

        setSelectedProducts(updatedState);
        setNoOfSelectedProducts(selectedProducts);
    }

    let handleCheckBoxChange = (e) => {
            let id = Number(e.target.id);
            let isChecked = e.target.checked;
            setNoOfSelectedProducts(prev => isChecked ? prev + 1 : prev - 1);

            setSelectedProducts(prev => ({
                ...prev, 
                [id] : isChecked
            }))
    }

     useEffect(() => {
        let filteredProducts = [];
        // Display all products when nothing in search field
        if(!debouncedSearchTerm?.trim()){
            setDataToPrint(products);
            return;
        }
        let terms = debouncedSearchTerm.split(' ');
        filteredProducts = products.filter((product) => {
                let content = `${product.name} ${product.sellPrice} ${product.stock} ${product.brand} ${product.barcode}`.toLowerCase();
                return terms.some(term => content.includes(term))
        });
        setDataToPrint(filteredProducts);
            
    }, [debouncedSearchTerm, products])

    useEffect(() => {
           setIsUsersAvailable(!(dataToPrint == null))
    }, [dataToPrint])

    const handleView = (productID) =>{
        const selectedProduct = products.find(product => product.id === productID)
        dispatch(handleIsAnyModalOpen())
        setProductToView(selectedProduct)
    }

    const handleDelete = (productID) => {
        setProductToDelete(productID)
        setIsConfirmationModalOpen(true);
        dispatch(handleIsAnyModalOpen())
    }

    const handleDeleteSingleProduct = async () => {
            const res = await deleteProduct(productToDelete);
            if(res.message){
                toast.error(res.message);
            }else{
                toast.success("Product Deleted Successfully.")
            }
            setProductToDelete(null)
    }

    const deleteMultipleProducts = async () => {
        let noOfDeletedProducts = 0;
        let noOfProductsFailedToDelete = 0;
        const selectedProductsIds = Object.entries(selectedProducts)  //gives an array of [key, value] pairs
                .filter(([key, value]) => value === true)
                .map(([key]) => Number(key));
        for(let id of selectedProductsIds){
            try{
                const res = await deleteProduct(id)
                console.log(res)
                if(res.message){
                    noOfProductsFailedToDelete++;
                }else{
                    noOfDeletedProducts++;
                }
            }catch(err){
                noOfProductsFailedToDelete++;
                console.error(`Failed to delete the product with ID ${id} : ${err}`)
            }
        }
        noOfDeletedProducts !== 0 ? toast.success(`${noOfDeletedProducts} products deleted successfully.`) : ''
        noOfProductsFailedToDelete !== 0 ? toast.error(`Failed to delete ${noOfProductsFailedToDelete} products.`) : ''; 
        setNoOfSelectedProducts(0) //Resetting NoOfSelectedProducts 
        setSelectedProducts({})//Resetting selected products
        setConfirmDeleteMany(false)    
        }
    
    //handle multiple delete
    useEffect(()=> {
        if(confirmDeleteMany){
            deleteMultipleProducts()          
        }
    },[confirmDeleteMany])

    return (
    <>
    <div className={`max-w-full min-w-max min-h-full h-full m-3 box-border ${isAnyModalOpen ? 'blurred' : ''}`}>
        {!dataToPrint && isLoading && 
                <div className='errorAndLoadMessage'>Loading Data ....</div>
        }   
        {!dataToPrint && error && 
           <div className='errorAndLoadMessage'>
                {error.message}
           </div>

        }
        {dataToPrint  &&
            <table className={`min-w-max min-h-max h-full w-full`}>
                <thead>
                    <tr className={`tableHead
                             ${themeState==='dark'? 'bg-gray-600' : 'bg-gray-200'}
                        `}>
                        <th className='px-2 py-3'>
                            <form action={'JavaScript:void(0)'}>
                                <input type="checkbox" name="selectAllProducts" id="selectAllProducts" 
                                        onChange = {handleSelectAll}
                                        className='h-[14px] w-[14px]'
                                        checked = {
                                            dataToPrint.length > 0 && dataToPrint.every(product => selectedProducts[product.id])
                                        }
                                />
                            </form>
                        </th>
                        <th className='tableHeading'>NAME</th>
                        <th className='tableHeading'>SELLING PRICE</th>
                        <th className='tableHeading'>BRAND</th>
                        <th className='tableHeading'>BARCODE</th>
                        <th className='tableHeading'>AVAILABLE QTY</th>
                        <th className='tableHeading'>ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                   {

                    dataToPrint.map((product) => (
                       <tr key={product.id} 
                           className={`border-1 border-gray-300 cursor-pointer
                             ${themeState==='dark'? 'hover:bg-gray-600' : 'hover:bg-gray-100'}`}
                           >
                        <td className='p-3 w-4 py-3'>
                            <form action={'JavaScript:void(0)'}>
                                <input type="checkbox" name="selectproduct" 
                                       id={product.id}
                                       checked={!!selectedProducts[product.id]}
                                       onChange={handleCheckBoxChange}
                                       className='h-[15px] w-[15px]'
                                />
                            </form>
                        </td>
                        <td className='p-4'>
                            <div className='flex items-center'>
                                <div>
                                    <img src={product.image} alt="Profile" 
                                         className='h-11 w-11 rounded-[50%] mx-4'
                                    />
                                </div>
                                <div>
                                    <h3 className='font-medium'>{product.name}</h3>
                                </div>
                            </div> 
                        </td>
                        <td className='p-4'>{product.sellPrice}</td>
                        <td className='p-4'>{product.brand==='' ? '_' : product.brand}</td>
                        <td className='p-4'>{product.barcode}</td>
                        <td className='p-4'>
                            <div className='flex items-center gap-2 relative'>
                                <span 
                                    className={`${hoveredBadge === product.id  ? 'visible': 'invisible'}
                                        bg-gray-400 text-white text-[13px] px-2 py-0.5 rounded-md absolute bottom-4 -left-3 
                                    `}
                                >
                                    {product.stock < 20 ? "Low Stock":'Sufficient Stock'}
                                </span>
                                <span 
                                    onMouseOver={() => setHoveredBadge(product.id)}
                                    onMouseOut={() => setHoveredBadge(null)
                                }>
                                    {product.stock < 20 ? 
                                        <FaArrowAltCircleDown className="text-red-500"/>: 
                                        <FaArrowAltCircleUp className="text-green-500"/>
                                    }
                                </span>
                                {product.stock}
                            </div>
                        </td>
                        <td 
                            className='flex gap-1 items-center content-center px-5 py-4 space-x-2 whitespace-nowrap'
                            id={product.id}
                        >
                            <button 
                              className='iconStyle bg-blue-500 hover:bg-blue-700'
                            //   onClick={() => handleOpenEditForm(product.id)}
                            >
                                <FaEdit/>
                            </button>
                            <button 
                              className='iconStyle bg-green-500 hover:bg-green-700'
                              onClick={() => handleView(product.id)}
                            >
                                <FaEye/>
                            </button>
                            <button 
                                className='iconStyle bg-red-500 hover:bg-red-700'
                                onClick={() => handleDelete(product.id)}
                                >
                                <RiDeleteBin6Fill/>
                            </button>
                        </td>

                      </tr>  
                    ))
                   } 
                </tbody>
            </table>
            }
    </div>
    {productToView && 
        <ViewProduct 
            productToView = {productToView}
            setProductToView = {setProductToView}
        />
    }
   {isConfirmationModalOpen &&
        <Confirmation 
            heading={"Delete Product"}
            message={"Are you sure you want to delete selected product?"}
            btn1Label={"Delete"}
            btn2Label={"Cancel"}
            type={"danger"}
            setIsConfirmationModalOpen={setIsConfirmationModalOpen}
            handleConfirmation={handleDeleteSingleProduct}
        /> 
   }
    </>
  )
}

export default ProductsTable;
