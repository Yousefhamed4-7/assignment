import axios from 'axios'



const endPoint =  "http://127.0.0.1:8000/api/admin/tickets";



export async function getAll(setData,ticket_type)
{
    try{

        const data = await axios.get(endPoint+ "/" +ticket_type,{
            headers:{
                "Authorization": "Bearer " + localStorage.getItem("userToken")
            }
        });
        console.log(data.data);
        console.log(data);
        setData(data.data.tickets);
    } catch (e) {
        if(e.status == 401)
        {
            localStorage.clear();
            return;
        }
        console.log(e)
        setData(e);
    }

}

export async function getInfo(setData)
{
    try{

        const data = await axios.get(endPoint + "/ticket/info/all",{
            headers:{
                "Authorization": "Bearer " + localStorage.getItem("userToken")
            }
        });
        console.log(data.data)
        console.log(data)
        setData(data.data);
    } catch (e) {
        console.log(e)
        if(e.status == 401)
        {
            localStorage.clear();
            return;
        }
        setData(e);
    }
}




// Customer Api TOken : "Bearer 5|ujCPIJ7AivuXM8lIdSdaFCIKzQUXUOuuR7neGwOB010bde21"
// Admin Api TOken : "Bearer 4|ekwKxUVZhCJEBjvrgorigoE4tJTnaqiWJGWLJbxca5a2bdd1"

// getAll("","all");
export async function show(setData,setStatus,ticket_id)
{
    try{
        const data = await axios.get(endPoint + "/show/" + ticket_id,{
            headers:{
                "Authorization": "Bearer " + localStorage.getItem("userToken"),
            }
        });
        setData(data.data.ticket);
        setStatus(data.data.ticket.status)
    }catch(e)
    {
        if(e.status == 401)
        {
            localStorage.clear();
            return;
        }
        setData(e)
    }
}


export async function update(setData,ticket_id,data)
{
    try{

        const response = await axios.patch(endPoint+"/edit/" + ticket_id,data,{
            headers:{
                "Authorization": "Bearer " + localStorage.getItem("userToken"),
            }
        })
        setData(response)
    }catch(e)
    {
        if(e.status == 401)
        {
            localStorage.clear();
            return;
        }
        setData(e)
    }

}

export async function handelTicket(setData,ticket_id) {
    try{

        const response = await axios.get(endPoint+"/ticket/"+ticket_id,{
            headers:{
                "Authorization": "Bearer " + localStorage.getItem("userToken"),
            }
        });
        setData(response)
    }catch(e)
    {
        if(e.status == 401)
        {
            localStorage.clear();
            return;
        }
        setData(e)
    }

    
}
