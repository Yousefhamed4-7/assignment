import axios from 'axios'



const endPoint =  "http://127.0.0.1:8000/api/";


// Customer Api TOken : "Bearer 5|ujCPIJ7AivuXM8lIdSdaFCIKzQUXUOuuR7neGwOB010bde21"
// Admin Api TOken : "Bearer 4|ekwKxUVZhCJEBjvrgorigoE4tJTnaqiWJGWLJbxca5a2bdd1"


export async function login(setData,data)
{
    try {
        const response = await axios.post(endPoint + "login", data);
        console.log(response.data);
        console.log(response);
        setData(response);
    } catch (e) {
        console.log(e)
        setData(e);
    }
}


export async function register(setData,data)
{
    try {
        const response = await axios.post(endPoint + "register", data);
        console.log(response.data);
        console.log(response);
        setData(response);
    } catch (e) {
        console.log(e)
        setData(e);
    }

}

export async function logout(token)
{
    try{

        const response = await axios.get(endPoint + "logout",{
            headers:{
                "Authorization": "Bearer " + token,
            }
        });
        console.log(response.data)
        console.log(response)
    }catch(e)
    {
        console.log(e.status);
        console.log(e);
    }
    localStorage.clear() 
    

    
}


