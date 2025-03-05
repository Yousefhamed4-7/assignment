import { Link, useNavigate } from "react-router-dom"
import Navbar from "../Components/Navbar"
import { useEffect, useState } from "react"
import { register } from "../Api/AuthApi"
import { Toaster, toast } from 'sonner';
export default function RegisterPage()
{

    const [data,setData] = useState({
        "name": "",
        "password": "",
        "email": "",
        "address": "",
        "customerType": "",
    });

    const [msg,setMessage] = useState(null);

    const navigate = useNavigate()

    function handelForm(e) {
        e.preventDefault();
        const newData = {
            ...data,
            name: e.target.name.value,
            password: e.target.password.value,
            email: e.target.email.value,
            address: e.target.address.value,
            customer_type: e.target.customer_type.value,
        };
        setData(newData);
        register(setMessage,newData);
        
    }

    useEffect(()=>{
        
            if(msg)
            {
                console.log(msg)
                if(msg.response?.status == 400)
                {
                    let errors = msg.response.data.Errors;
                    Object.keys(errors).forEach(e=>{
                                    toast.error(errors[e]);
                    })
                }else{
                    toast.success("Logged IN")
                    localStorage.setItem("id",msg.data.User.id)
                    localStorage.setItem("username",msg.data.User.name)
                    localStorage.setItem("userToken",msg.data.Token)
                    localStorage.setItem("customer_type",msg.data.User.customer_type)
                    localStorage.setItem("role","customer")
                    localStorage.setItem("loggedIn",true)
                    navigate("/customer/dashboard");
                }
                
            }

    },[msg])



    return(<>
    <Navbar/>
    <Toaster richColors />
        <div className="d-flex justify-content-center align-items-center" style={{backgroundColor:"#EEE",height:"100vh"}}>
            <div className="container  drop-shadow">
            <form className="form d-flex justify-center align-items-center p-5 rounded flex-column gap-3" onSubmit={(e)=> handelForm(e)} style={{backgroundColor:"#Fff"}}  method="post">
                <h3 className="fw-bold fs-2">Register</h3>
                <div className="d-flex justify-center align-items-center gap-2">
                    <div className="form-check">
                        <input required className="form-check-input" type="radio" value="individual" name="customer_type" id="single" />
                        <label className="form-check-label" htmlFor="single">Individual</label>
                    </div>
                    <div className="form-check">
                        <input required className="form-check-input" type="radio" value="company" name="customer_type" id="company" />
                        <label className="form-check-label" htmlFor="company">Company</label>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <label className="form-label" htmlFor="name">Name:</label>
                            <input required type="text" name="name" id="name" className="form-control" />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label" htmlFor="email">Email:</label>
                            <input required type="email" name="email" id="email" className="form-control" />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label" htmlFor="address">Address:</label>
                            <input required type="text" name="address" id="address" className="form-control" />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label" htmlFor="password">Password:</label>
                            <input required type="password" name="password" id="password" className="form-control" />
                        </div>
                    </div>
                <input  type="submit" value="Sign Up" className="btn btn-primary w-100 mt-5" />
                </div>
                <p className="text-center">Already have an account? <Link to="/auth/login">Login</Link></p>
            </form>
            </div> 
        </div>
    </>
    )
}