import { useState,useRef, useEffect,useContext } from "react"
import { AdminNavBarIsopened } from "../Contexts/AdminNavBarContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import NavbarLink from './NavbarLink';
import { logout } from "../Api/AuthApi";

export default function CustomerNavbar(props)
{

    const navigation = useNavigate()

    const {isopen,setIsopen} = useContext(AdminNavBarIsopened)
    const nav = useRef()
    function handelNav()
    {
        if(isopen)
        {
            nav.current.querySelector(".admin-nav-bar  img").classList.remove("w-25")
            nav.current.querySelector(".admin-nav-bar  img").classList.add("rounded-circle","bg-white")
            nav.current.querySelector(".admin-nav-bar  img").classList.add("w-50")
            nav.current.querySelectorAll(".admin-nav-bar  > div")[1].querySelectorAll("a").forEach((e) => {e.classList.remove("justify-content-start")})
            nav.current.querySelectorAll(".admin-nav-bar  > div")[1].querySelectorAll("a").forEach((e) => {e.classList.add("justify-content-center")})

            nav.current.querySelectorAll(".admin-nav-bar  > div")[0].classList.remove("justify-content-start")
            nav.current.querySelectorAll(".admin-nav-bar  > div")[0].classList.add("justify-content-center")
            nav.current.querySelectorAll("p").forEach((e) => {
                e.style.display = "none"
            })
        }
        else{
            nav.current.querySelector(".admin-nav-bar  img").classList.remove("w-50")
            nav.current.querySelector(".admin-nav-bar  img").classList.add("w-25")
            nav.current.querySelector(".admin-nav-bar  img").classList.remove("rounded-circle","bg-white")
            nav.current.querySelectorAll(".admin-nav-bar  > div")[1].querySelectorAll("a").forEach((e) => {e.classList.remove("justify-content-center")})
            nav.current.querySelectorAll(".admin-nav-bar  > div")[1].querySelectorAll("a").forEach((e) => {e.classList.add("justify-content-start")})
            nav.current.querySelectorAll(".admin-nav-bar  > div")[0].classList.remove("justify-content-center")
            nav.current.querySelectorAll(".admin-nav-bar  > div")[0].classList.add("justify-content-start")
            nav.current.querySelectorAll("p").forEach((e) => {
                e.style.display = "flex"
            })
            nav.current.querySelector("p").style.display = "block"
        }
        setIsopen(!isopen)
    }

    function logoutHandeler()
    {
        let token = localStorage.getItem("userToken");
        localStorage.clear();
        navigation("/auth/login");
        logout(token);
    }



    return(
        <div ref={nav} className={`admin-nav-bar position-relative ${props.class}`} style={{backgroundColor:"#343a40",color:"#bdc7cf",height:"100vh",overflow:"hidden",transition:"0.5s"}}>
            <p className="border-bottom pb-4 mt-4 text-center fw-bold fs-5">Welcome Back</p>
            <div className="d-flex justify-content-start align-items-center gap-4 border-bottom pb-3">
                <img className="image w-25" src="/UserImage.png" alt="admin photo" />
                <p className="m-0">  {localStorage.getItem("username")}</p>
            </div>
            <div className="d-flex flex-column align-items-center justify-content-start gap-1 mt-3">
                <NavbarLink to="/customer/dashboard">
                <i class="fa-solid fa-chart-line"></i>
                <p className="m-0">DashBoard</p>
                </NavbarLink>
                <NavbarLink to="/customer/dashboard/ticket/create">
                    <i class="fa-solid fa-plus"></i>
                    <p className="m-0">Create Ticket</p>
                </NavbarLink>
                <span onClick={logoutHandeler}  className="admin-link   p-2  w-100 d-flex jusitfy-content-start align-items-center gap-3">
                    <p className="m-0">Log Out</p>
                </span>
            </div>
            <div className="position-absolute" style={{right:5,bottom:30}}>
                <i onClick={handelNav} class={`fs-3 fa-regular fa-square-caret-${isopen ? "right" : "left"}`}></i>
            </div>
        </div>
    )
}