import useSWR from 'swr' 
import axios from 'axios'

const fetcher = (url) => axios.get(url).then(res => res.data)
const url ='https://6821faa1b342dce8004c9871.mockapi.io/usersdata/products'
function useProducts() {
  const {data, error, isLoading} = useSWR(url, fetcher)

  if(error) console.log("Cannot load products due to " , error);
  
  return {error, data, isLoading} 
}

export default useProducts
