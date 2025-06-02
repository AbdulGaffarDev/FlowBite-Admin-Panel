import React  from 'react'

function ProductsTable() {
  
    return (
    <div className={`w-full`}>
            <table className='min-w-max w-full'>
                <thead>
                    <tr className='font-medium text-[14px] bg-gray-200 border-1 border-gray-300'>
                        <th className='px-2 py-3'>
                            <form action={'JavaScript:void(0)'}>
                                <input type="checkbox" name="selectAllUsers" id="selectAllUsers" 
                                        className='h-[14px] w-[14px]'
                                />
                            </form>
                        </th>
                        <th className='font-[400] p-4 text-left'>NAME</th>
                        <th className='font-[400] p-4 text-left'>Selling Price</th>
                        <th className='font-[400] p-4 text-left'>Available QTY</th>
                        <th className='font-[400] p-4 text-left'>ACTIONS</th>
                    </tr>
                </thead>
            </table> 
    </div>
  )
}

export default ProductsTable;
