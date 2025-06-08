import  {useState} from 'react'

function useFetch(  ) {
   
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null)
    const [updatedUser, setUpdatedUser] = useState(null)
    const [newUser, setNewUser] = useState(null)

        const fetchData = async ({url, method = 'GET', body = null}) => {
            setLoading(true);
            setError(null);
            try{
                let response = await fetch(url, {
                    method,
                    headers : {'Content-Type' : 'application/json'},
                    body : body ? JSON.stringify(body) : null
                });
                if(!response.ok){
                    console.log("Something wents wrong.")
                    console.log("Error status : " + response.status)
                }
                const result = await response.json();
                if(method === 'GET'){
                    setData(result)
                }
                else if(method === 'PUT' || method === 'PATCH'){
                    setUpdatedUser(result);;
                }
                else if(method ==="POST"){
                    setNewUser(result);
                }
            }catch(err){
                console.log(err)
                setError(err)
            }finally{
                setLoading(false);
            }
        }

  return ({data, newUser, updatedUser, loading, error, fetchData})
}

export default useFetch;
