import { useState } from 'react'
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux'; 
import { handleProductForm } from '../features/ui/uiSlice'
import { useForm } from "react-hook-form"

function ProductForm() {
  const [data, setData]  = useState(null)
  const [preview, setPreview] = useState(null)
  const dispatch = useDispatch();
  const themeState = useSelector(state => state.ui.theme);
  const {register, handleSubmit, watch, 
        formState : {errors}, 
        } = useForm()

  const handlingSubmit = (data) => {
                            setData(data) 
                            const imageFile = data.productImage[0]
                            setPreview(URL.createObjectURL(imageFile))
                            console.log("Form Submitted",data);
  }
  console.log(errors)
  const purchasePrice = watch('purchasePrice')
  return (
    <div className='formMainContainer'>
        <div 
            className={`formContainer
                        ${themeState === 'light' ? 'bg-white text-black' : 'bg-blue-950 text-white'}
                `}
        >
            <div className='flex justify-between pt-3 pb-4 px-5 font-medium  text-gray-600  border-b-gray-300 border-b-[1px]'>
                  <h1 className={`${themeState==='light' ? 'text-black' : 'text-white'} text-[20px]`}>
                     Add new product
                  </h1>
                  <button 
                    className={`closeIcon  ${themeState==='light'? 'hover:bg-gray-100':'hover:bg-blue-900'}`}
                    onClick={() => dispatch(handleProductForm())}
                    >
                    <IoClose className={`${themeState==='light' ? 'text-black' : 'text-white'}`}/>
                  </button>
            </div>
            <div className='py-5 px-5 mb-3 border-b-[1px] border-b-gray-300'>
                <form onSubmit={handleSubmit(handlingSubmit)}>
                    <div className='md:flex lg:flex xl:flex w-full gap-4'>
                        <div className='w-[100%]'>
                            <label>Product Name *</label><br />
                            <input 
                                type="text" 
                                placeholder='Product Name' 
                                name='productName'
                                {...register('productName',
                                    {
                                        required : {value : true, message : "Product name is required"},
                                        minLength : {value : 3 , message : "Enter at least 3 charcters"},
                                        maxLength : {value : 15 , message : "Enter less then 16 characters"}
                                    }
                                )}
                                className={`${themeState==='light' ? 'inputFields-light' : 'inputFields-dark'}`}
                            />
                            {errors.productName && 
                            <p className='text-red-500 text-[15px]'>
                                {errors.productName.message}
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
                            <input type="number" placeholder='Stock' name='purchasePrice'
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
                            <input type="number" placeholder='Brand' name='brand'
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
                                        value : /^[a-zA-Z0-9]+$/,
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
                                name='productImage'
                                {...register('productImage',
                                    {required : {
                                        value : 'true',
                                        message : 'Product image is required'
                                    }},
                                )}
                                className={`${themeState==='light' ? 'inputFields-light' : 'inputFields-dark'}`}
                            />
                            {errors.productImage && 
                            <p className='text-red-500 text-[15px]'>
                                {errors.productImage.message}
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
                                {...register('description')}
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
                >Add Product</button>
            </div>
            {preview && (
                <div className='mt-4 text-center'>
                    <p className='mb-2'>Image Preview:</p>
                    <img 
                    src={preview} 
                    alt="Preview" 
                    className='max-w-[200px] mx-auto rounded-md border'
                    />
                </div>
                )}
       </div>
    </div>
  )
}

export default ProductForm;
