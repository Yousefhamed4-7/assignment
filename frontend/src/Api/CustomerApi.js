import axios from 'axios'



const endPoint =  "http://127.0.0.1:8000/api/customer/tickets";



export async function getAll(setData,ticket_type)
{
    try{

        const data = await axios.get(endPoint+ "/" +ticket_type,{
            headers:{
                "Authorization": "Bearer " + localStorage.getItem("userToken")
            }
        });
        console.log(data.data)
        console.log(data)
        setData(data.data.tickets)
    }catch(e)
    {
        if(e.status == 401)
        {
            localStorage.clear()
            return;
        }
        console.log(data.data)
        console.log(data)
        setData(e)
    }

}


export async function show(setData,ticket_id)
{
    try{

        const data = await axios.get(endPoint + "/show/" + ticket_id,{
            headers:{
                "Authorization": "Bearer " + localStorage.getItem("userToken"),
            }
        });
        console.log(data.data)
        console.log(data)
        setData(data.data.ticket)
    }catch(e)
    {
        console.log(e)
        console.log(e)
        if(e.status == 401)
        {
            localStorage.clear()
            return;
        }
        setData(e);
    }
}



export async function create(setData,data)
{
    try{

        const response = await axios.post(endPoint + "/create",data,{
            "headers":{
                "Authorization": "Bearer " + localStorage.getItem("userToken"),
            }
        });
        setData(response);
    }catch(e)
    {
        if(e.status == 401)
        {
            localStorage.clear()
            return;
        }
        setData(e)
    }
}
