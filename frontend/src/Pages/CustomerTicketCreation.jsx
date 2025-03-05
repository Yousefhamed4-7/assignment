import { useEffect, useState } from "react";
import CustomerLayout from "../Layout/CustomerLayout";
import { useNavigate } from "react-router-dom";
import { create } from "../Api/CustomerApi";
import { Toaster, toast } from 'sonner';

export default function CustomerTicketCreation(){


    const [msg,setMsg] = useState(null)
    const [data,setData] = useState({
        "title": "",
        "service_type": "",
        "desc": "",
    })

    const navigate = useNavigate()

    function handelForm(e)
    {
        e.preventDefault()

        const newData = {
            ...data,
            "title": e.target.title.value,
            "desc": e.target.desc.value,
            "service_type": e.target.service_type.value,
        }
        setData({
            ...data,
            ...newData
        })
        create(setMsg,newData);

    }


    useEffect(()=>{
        if(msg)
        {
            console.log(msg);
            if(msg.response?.status == 400)
            {
                let errors = msg.Errors;
                Object.keys(errors).forEach(e=>{
                                toast.error(errors[e]);
                })
            }
            else{
                toast.success("Created Ticket");
            }
        }

    },[msg])

    return(
        <CustomerLayout>
            <Toaster />
            <h1>Create Ticket</h1>
            <form className="container" action="#" method="post" onSubmit={(e) => handelForm(e)} >
                <label className="d-none" htmlFor="customer_type">Customer Type: </label>
                <select className="d-none form-control" name="customer_type" id="Customer_type">
                    <option value={localStorage.getItem("customer_type")}>{localStorage.getItem("customer_type")}</option>
                </select>
                <label htmlFor="title">Title: </label>
                <input className="form-control" type="text" name="title" id="title" />
                <label htmlFor="desc">Desc: </label>
                <input className="form-control" type="text" name="desc" id="desc" />
                <label htmlFor="type">Type: </label>
                <select className="form-control" name="service_type" id="type">
                    {localStorage.getItem("customer_type") == "company" ? 
                    <option value="technationoffice">Technation Office</option>
                    :
                    <>
                    <option value="courier">Courier Develier</option>
                    <option value="dropoff"> Drop OFf</option>
                    </>
                    }
                </select>
                <input className="btn btn-primary mt-4" type="submit" value="Create Ticket" />
            </form>
        </CustomerLayout>
    )

}