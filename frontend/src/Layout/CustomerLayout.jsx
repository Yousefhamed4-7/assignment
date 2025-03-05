import { useContext, useEffect, useState } from "react"
import { AdminNavBarIsopened } from "../Contexts/AdminNavBarContext"
import CustomerNavbar from "../Components/CustomerNavbar"
import { Link, useNavigate } from "react-router-dom"
import { logout } from "../Api/AuthApi"

export default function CustomerLayout({children})
{

    const {isopen} = useContext(AdminNavBarIsopened)
    
    const [zoom,setZoom] = useState(false)

    const [size,setSize] = useState("big")
    const [message,setMessage] = useState("")
    const navigation = useNavigate()

    function logoutHandeler()
        {
            let token = localStorage.getItem("userToken");
            localStorage.clear();
            navigation("/auth/login");
            logout(token);
        }

    useEffect(()=>{
        if(window.innerWidth <= 768)
            {
                setZoom(true)
                document.querySelector(".zoom-icon").style.display = "none"
                document.querySelector("nav").style.display = "flex"
                setSize("small")

            }
            else{
                document.querySelector(".zoom-icon").style.display = "block"
                document.querySelector("nav").style.display = "none"
                setZoom(false)
                setSize("big")
            }
        window.addEventListener("resize",()=>{
            if(window.innerWidth <= 768)
            {
                setZoom(true)
                document.querySelector(".zoom-icon").style.display = "none"
                document.querySelector("nav").style.display = "flex"
                setSize("small")

            }
            else{
                document.querySelector(".zoom-icon").style.display = "block"
                document.querySelector("nav").style.display = "none"
                setZoom(false)
                setSize("small")
            }
        })
            return ()=>{
                window.removeEventListener("resize",()=>{
                })
            }
    },[])


    return(
        <>
                        <div className="container-fluid m-0 " style={{height:"100vh"}}>
                            <div className="row">
                                <div className={`${isopen ? "col-md-2" : "col-md-1"}   ${zoom ? "d-none": "d-flex"}  px-0`} style={{transition:"0.2s"}}>
                                    <CustomerNavbar  class="p-2 adminNavbar"  />
                                </div>
                                <div className={`${ isopen ?  "col-md-10" : "col-md-11"} ${zoom ? "col-md-12" : "col-md-10"} px-0 `}>
                                    <div className={`bigContainer bg-primary ${size == "big" ?  "d-flex justify-content-end align-items-center pe-3 p-2 py-4" : ""}`} style={{height:"5%"}}> 


                                    <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-5" style={{display:"none"}}>
          <div className="container px-5">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                    <Link className="nav-link" to="/customer/dashboard/ticket/create">Create Ticket</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/customer/dashboard">Dashboard</Link>
                </li>
                {
                localStorage.getItem("loggedIn") ? 
                <li className="nav-item" onClick={logoutHandeler}>
                    <button className="nav-link"  >Logout</button>
                </li> 
                :
                ""
              }               
              </ul>
            </div>
          </div>
                                    </nav>

                                    <i onClick={()=> {setZoom(!zoom)}} class="zoom-icon broder-0 p-2 rounded clickable fa-solid fa-maximize"></i>
                                    </div>
                                        {children}
                                    </div>
                                </div>
                            </div>
                        </>
    )
}