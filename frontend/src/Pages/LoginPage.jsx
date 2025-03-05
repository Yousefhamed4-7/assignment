import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../Api/AuthApi";
import { toast, Toaster } from "sonner";

export default function LoginPage()
{

    const [data,setData] = useState({
        "email": "",
        "password":"",
    })

    const [msg,setMsg] = useState(null)

    const navigate = useNavigate()


    function handelForm(e)
    {
        e.preventDefault()
        // localStorage.setItem("loggedIn",true)
        const newData = 
        {
            ...data,
            email:e.target.email.value,
            password:e.target.password.value
        } 
        login(setMsg,newData);
        setData((prev) => ({...prev,...newData}));
    }

    useEffect(()=>{
        if(msg)
            {
                console.log(msg)
                if(msg.response?.status == 400)
                {
                    toast.error(msg.response.data.desc);
                }else{
                    toast.success("Logged IN")
                    localStorage.setItem("id",msg.data.data.id)
                    localStorage.setItem("username",msg.data.data.name)
                    localStorage.setItem("userToken",msg.data.Token)
                    localStorage.setItem("role",msg.data.role)
                    localStorage.setItem("loggedIn",true)
                    if(msg.data.role == "customer")
                    {
                        localStorage.setItem("customer_type",msg.data.data.customer_type)
                        navigate("/customer/dashboard");
                    }
                    else{
                        navigate("/admin/dashboard");
                    }
                }
                
            }


    },[msg])


    return(
        <>
        <Navbar/>
        <Toaster  richColors/>
        <div className="d-flex justify-content-center align-items-center" style={{backgroundColor:"#EEE",height:"100vh"}}>
            <div className="container  drop-shadow">
            <form className="form d-flex justify-center align-items-center p-5 rounded flex-column gap-3" onSubmit={handelForm} style={{backgroundColor:"#Fff"}}  method="post">
                <h3 className="fw-bold fs-2">Login</h3>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <label className="form-label" htmlFor="email">Email:</label>
                            <input onChange={(e)=> {setData({...data,email:e.target.value})}} required type="email" name="email" id="email" className="form-control" />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label" htmlFor="password">Password:</label>
                            <input onChange={(e)=> {setData({...data,password:e.target.value})}} required type="password" name="password" id="password" className="form-control" />
                        </div>
                    </div>
                <input  type="submit" value="Login" className="btn btn-primary w-100 mt-5" />
                </div>
                <p className="text-center">Don't have an account? <Link to="/auth/register">Register</Link></p>
            </form>
            </div> 
        </div>
        </>
    )
}