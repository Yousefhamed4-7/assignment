import axios from 'axios';

const endPoint = "http://127.0.0.1:8000/api/chat";



export async function getAll(setUser,setData,ticket_id)
{
    // const token = localStorage.getItem("token");
    // http://127.0.0.1:8000/api/chat/21
    try{

        const data = await axios.get(endPoint + "/" + ticket_id,{
            headers:{
                "Authorization": "Bearer " + localStorage.getItem("userToken"),
            }
        }) 
        console.log(data.data)
        console.log(data)
        setData(data.data.Chat)
        setUser(data.data)
    }catch(e)
    {
        console.log(e)
        if(e.status == 401)
        {
            localStorage.clear()
        }
        setData(e)
    }
}


export async function send(setData,ticket_id,message)
{
    try{

        const data = await axios.post(endPoint + "/create/" + ticket_id,{
            "message": message
        },{
            headers:{
                "Authorization": "Bearer " + localStorage.getItem("userToken"),
                "Accept": "application/json"
            }
        });
        console.log(data)
        setData(data)
    }catch(e)
    {
        console.log(e)
        if(e.status == 401)
        {
            localStorage.clear()
        }
        setData(e)

    }
}



