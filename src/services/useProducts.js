import { useState } from "react";
import useSWR from 'swr'
import axios from 'axios'

const API_URL = "https://6821faa1b342dce8004c9871.mockapi.io/usersdata/products";

const fetcher = url => axios.get(url).then(res => res.data);

function useProducts() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    
    //fetches all products
    const {data : products, error, isLoading, mutate } = useSWR(API_URL, fetcher)

    //fetches single product by id
    const getProductById = async (id) => {
        try{
            setIsSubmitting(true);
            const res = await axios.get(`${API_URL}/${id}`)
            const data = res.data
            return data;
        }catch(err){
            console.error("Error occures while fetching single product" , err)
            return {err : true, message : 'Failed to fetch product.'};
        }finally{
            setIsSubmitting(false)
        }
    }

    //create product
    const createProduct = async(product) => {
        try{
            setIsSubmitting(true);
            const res = await axios.post(API_URL, product)
            return res.data
        }catch(err){
            console.log("Error occoured while adding new product", err);
            return {err : true, message : 'Failed to add new product'};
        }finally{
            mutate()
            setIsSubmitting(false)
        }
    }

    //update product
    const updateProduct = async(id ,updatedProduct) => {
        try{
            setIsSubmitting(true);
            const res = await axios.put(`${API_URL}/${id}`, updatedProduct)
            const data = res.data;
            return data;
        }catch(err){
            console.error("Error occured while updating the product", err)
            return {err : true, message : 'Failed to update product'};
        }finally{
            mutate()
            setIsSubmitting(false)
        }
    }

    //delete product
    const deleteProduct = async(id) => {
        try{
            setIsSubmitting(true);
            const res = await axios.delete(`${API_URL}/${id}`)
            const data = res.data
            return data;
        }catch(err){
            console.error("Error ocurred while deleting the products ", err)
            return {err : true, message : 'Failed to delete product'};
        }finally{
            mutate()
            setIsSubmitting(false)
        }
    }

  return {
    createProduct, 
    getProductById, 
    updateProduct, 
    deleteProduct, 
    isSubmitting,
    isLoading,
    products,
    error
  }
}

export default useProducts;
