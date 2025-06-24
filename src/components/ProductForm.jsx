import { useEffect, useState } from 'react'
import { useForm } from "react-hook-form"
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast';; 
import { IoClose } from "react-icons/io5";
import { GoAlert } from "react-icons/go";
import { BiLoaderCircle } from "react-icons/bi";
import useProducts from '../services/useProducts';

function ProductForm({handleClose, productToUpdate}) {
  const [data, setData]  = useState(null)
  const [dataOfProduct, setDataOfProduct] = useState({})
  const [errorWhileFetching, setErrorWhileFetching] = useState(null)
  const [preview, setPreview] = useState(null)
  const themeState = useSelector(state => state.ui.theme);
  const {register, handleSubmit, watch, setValue, 
        formState : {errors}, 
        } = useForm();

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
    if(productToUpdate){
        const getDataOfProduct = async (id) => {
            const data = await getProductById(id);
           
            if(data.err){
                setErrorWhileFetching(data)
            }else{
                setDataOfProduct(data)
            }
        }
        getDataOfProduct(productToUpdate);
    }
},[productToUpdate])

useEffect(() => {
  if (productToUpdate && dataOfProduct) {
    setValue('name', dataOfProduct.name || '')
    setValue('purchasePrice', dataOfProduct.purchasePrice || '')
    setValue('sellPrice', dataOfProduct.sellPrice || '')
    setValue('stock', dataOfProduct.stock || '')
    setValue('brand', dataOfProduct.brand || '')
    setValue('barcode', dataOfProduct.barcode || '')
    setValue('description', dataOfProduct.description || '')
    // setValue('image', dataOfProduct.image || '')
  }
}, [dataOfProduct, productToUpdate, setValue])

  const handlingSubmit = (data) => {
                            setData(data); 
                            const imageFile = data.image[0];
                            setPreview(URL.createObjectURL(imageFile));
                            console.log("Form Submitted",data);
                            if(productToUpdate){
                                const res = updateProduct(Number(productToUpdate), data)
                                // console.log(data, productToUpdate)
                                if(res.message){
                                        toast.error(res.message);
                                }else{
                                        toast.success("Product Updated Successfully.")
                                }
                            }else{
                                const res = createProduct(data)
                                if(res.message){
                                        toast.error(res.message);
                                }else{
                                        toast.success("Product Added Successfully.")
                                }
                            }
                            handleClose();
  }

  const purchasePrice = watch('purchasePrice')
  return (
    <div className='formMainContainer'>
        <div 
            className={`formContainer
                        ${themeState === 'light' ? 'bg-white text-black' : 'bg-blue-950 text-white'}
                `}
        >   
            {/* Show while loading data of product */}
            {productToUpdate && isSubmitting && 
                <div className='min-h-20 text-center'>
                    <h2 className={`font-bold text-[20px] mt-4`}>Loading Data ...</h2>
                    <div className='flex items-center justify-center pt-4 pb-6'>
                        <BiLoaderCircle 
                            className='animate-spin text-6xl text-blue-500'
                        />
                    </div>
                </div>
            }

            {/* Error Message */}
            {productToUpdate && errorWhileFetching && 
              <div className='min-h-20'>
                <div className='flex justify-between items-center p-3'>
                    <h2 className={`font-bold text-[20px]`}>Error</h2>
                    <button 
                        className={`closeIcon   
                            ${themeState==='light'? 'hover:bg-gray-100':'hover:bg-blue-900'}`}
                        onClick={handleClose}
                    >
                        <IoClose className={`${themeState==='light' ? 'text-black' : 'text-white'}`}/>
                    </button>

                </div>
                <h1  className='text-6xl flex justify-center'><GoAlert/></h1>
                <div className='text-center pt-4 pb-6'>{errorWhileFetching.message}</div>
              </div>
            }

            {(productToUpdate ? dataOfProduct && errorWhileFetching===null && !isSubmitting: true) &&   
            <>
            <div className='flex justify-between pt-3 pb-4 px-5 font-medium  text-gray-600  border-b-gray-300 border-b-[1px]'>
                <h1 className={`${themeState==='light' ? 'text-black' : 'text-white'} text-[20px]`}>
                     {productToUpdate ? "Update product"  :"Add new product"}
                </h1>
                <button 
                    className={`closeIcon  ${themeState==='light'? 'hover:bg-gray-100':'hover:bg-blue-900'}`}
                    onClick={handleClose}
                >
                    <IoClose className={`${themeState==='light' ? 'text-black' : 'text-white'}`}/>
                </button>
            </div>
            <div className={``}>
                <div className={`py-5 px-5 mb-3 ${!isSubmitting && !errorWhileFetching ? 'border-b-[1px] border-b-gray-300' : ''}`}>
                <form onSubmit={handleSubmit(handlingSubmit)} >
                    <div className='md:flex lg:flex xl:flex w-full gap-4'>
                        <div className='w-[100%]'>
                            <label>Product Name *</label><br />
                            <input 
                                type="text" 
                                placeholder='Product Name' 
                                name='name'
                                {...register('name',
                                    {
                                        required : {value : true, message : "Product name is required"},
                                        minLength : {value : 3 , message : "Enter at least 3 charcters"},
                                        maxLength : {value : 25 , message : "Enter less then 26 characters"}
                                    }
                                )}
                                className={`${themeState==='light' ? 'inputFields-light' : 'inputFields-dark'}`}
                            />
                            {errors.name && 
                            <p className='text-red-500 text-[15px]'>
                                {errors.name.message}
                            </p>}
                        </div>
                    </div>
                    <div className='md:flex lg:flex xl:flex gap-4 mt-4'>
                        <div className='w-[50%]'>
                            <label>Purchase Price *</label><br />
                            <input type="number" placeholder='Purchase Price' name='purchasePrice'
                                {...register('purchasePrice', 
                                    {required : { 
                                        value : true,
                                        message : "Purchase price is requried."
                                    },  
                                    validate : (value) => {
                                        if(parseFloat(value) <= 0){
                                            return "Purchase price must be greater then 0"
                                        }
                                        return true;
                                    }
                                    }
                                )}
                                className={`${themeState==='light' ? 'inputFields-light' : 'inputFields-dark'}`}
                            />
                            {errors.purchasePrice && 
                            <p className='text-red-500 text-[15px]'>
                                {errors.purchasePrice.message}
                            </p>}
                        </div>
                        <div className='w-[50%]'>
                            <label>Sell Price *</label><br />
                            <input type="number" placeholder='Sell Price' name='sellPrice'
                                {...register('sellPrice', 
                                    {required : {
                                        value : true,
                                        message : "Sell Price is required",
                                        },
                                    validate: (value) => {
                                        if (parseFloat(value) <= parseFloat(purchasePrice)) {
                                            return "Sell price must be greater than purchase price";
                                        }
                                        else if(parseFloat(value) <= 0){
                                            return "Sell price must be greater then 0"
                                        }
                                        return true;
                                        }
                                    }
                                    
                                )}
                                className={`${themeState==='light' ? 'inputFields-light' : 'inputFields-dark'}`}
                            />
                            {errors.sellPrice && 
                            <p className='text-red-500 text-[15px]'>
                                {errors.sellPrice.message}
                            </p>}
                        </div>
                    </div>
                    <div className='md:flex gap-4 mt-4'>
                        <div className='w-[33%]'>
                            <label>Stock *</label><br />
                            <input type="number" placeholder='Stock' name='stock'
                                {...register('stock',
                                    {required : {
                                        value : true,
                                        message : "Stock is required"
                                    }}
                                )}
                                className={`${themeState==='light' ? 'inputFields-light' : 'inputFields-dark'}`}
                            />
                            {errors.stock && 
                            <p className='text-red-500 text-[15px]'>
                                {errors.stock.message}
                            </p>}
                        </div>
                        <div className='w-[33%]'>
                            <label>Brand</label><br />
                            <input type="text" placeholder='Brand' name='brand'
                                {...register('brand')}
                                className={`${themeState==='light' ? 'inputFields-light' : 'inputFields-dark'}`}
                            />
                        </div>
                        <div className='w-[33%]'>
                            <label>Barcode *</label><br />
                            <input type="text" placeholder='Barcode'  name='barcode'
                                {...register('barcode', 
                                    {required : {
                                        value : true , 
                                        message : "Barcode is required."
                                    }, 
                                    minLength : {
                                        value : 8 ,
                                        message : 'At least 8 characters are required' 
                                    },
                                    pattern : {
                                        value : /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/,
                                        message : "Barcode must be alphanumeric"
                                        }
                                    },
                                )}
                                className={`${themeState==='light' ? 'inputFields-light' : 'inputFields-dark'}`}
                            />
                            {errors.barcode && 
                            <p className='text-red-500 text-[15px]'>
                                {errors.barcode.message}
                            </p>}
                        </div>
                    </div>
                    <div className='md:flex lg:flex xl:flex w-full gap-4 mt-4'>
                        <div className='w-[100%]'>
                            <label>Upload Image *</label><br />
                            <input 
                                type="file" 
                                placeholder='Select Image to Upload' 
                                name='image'
                                {...register('image',
                                    {required : {
                                        value : true,
                                        message : 'Product image is required'
                                    }},
                                )}
                                className={`${themeState==='light' ? 'inputFields-light' : 'inputFields-dark'}`}
                            />
                            {errors.image && 
                            <p className='text-red-500 text-[15px]'>
                                {errors.image.message}
                            </p>}
                        </div>
                    </div>
                    <div className='mt-4'>
                        <div>
                            <label>Description </label><br />
                            <textarea name="description" 
                                className={`${themeState==='light' ? 'inputFields-light' : 'inputFields-dark'}`}    
                                placeholder='Description'
                                rows={3}
                                {...register('description', {
                                    maxLength : {
                                        value : 120 ,
                                        message : 'Max characters are 120' 
                                    },
                                })}
                            >
                            </textarea>
                        </div>
                    </div>                    
                </form>
                </div>
                <div className='my-7 mx-4' >
                    <button type="submit"
                        onClick={handleSubmit(handlingSubmit)}
                        className={`blue-btn common-btn-style`}
                    >{productToUpdate ? "Update" :"Add Product"}</button>
                </div>
            </div>
            </>
            }
            
            {/* {preview && (
                <div className='mt-4 text-center'>
                    <p className='mb-2'>Image Preview:</p>
                    <img 
                    src={preview} 
                    alt="Preview" 
                    className='max-w-[200px] mx-auto rounded-md border'
                    />
                </div>
                )} */}
       </div>
    </div>
  )
}

export default ProductForm;
