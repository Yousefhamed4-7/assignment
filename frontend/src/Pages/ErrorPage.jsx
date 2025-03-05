import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"

export default function ErrorPage()

{
    const navigate = useNavigate()
    const role = localStorage.getItem("role")
    const path =  role ? role == "admin" ? "/admin/dashboard" : "/customer/dashboard" : "/auth/login" 
    return (
        <>
        <div className="d-flex justify-content-center align-items-center text-center flex-column font-sans" style={{height:"100vh"}}>
            <h1>Error No Page Has This Link</h1>
            <button className="btn btn-primary" onClick={()=> {navigate(path)}}>Go Back</button>
        </div>
        </>
    )
}