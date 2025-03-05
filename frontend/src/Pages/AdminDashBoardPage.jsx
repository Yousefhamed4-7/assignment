import AdminNavbar from "../Components/AdminNavbar";
import { useContext,useEffect,useState } from "react";
import { AdminNavBarIsopened } from "../Contexts/AdminNavBarContext";
import TicketContainer from "../Components/TicketContainer";
import {  getInfo } from "../Api/AdminApi";
import AdminLayout from "../Layout/AdminLayout";

export default function AdminDashBoardPage()
{
    const {isopen} = useContext(AdminNavBarIsopened)

    const [zoom,setZoom] = useState(false)
    const [tickets,setTickets] = useState([])
    console.log(tickets)

    useEffect(()=>{
        if(window.innerWidth <=768){
            setZoom(true)
            document.querySelector(".zoom-icon").style.visibility = "hidden"
        }
        window.addEventListener("resize",()=>{
            if(window.innerWidth <= 768)
            {
                setZoom(true)
                document.querySelector(".zoom-icon").style.visibility = "hidden"
            }
            else{
                setZoom(false)
                document.querySelector(".zoom-icon").style.visibility = ""
            }
        })
        
        getInfo(setTickets,"all")
        
        return ()=>{
            window.removeEventListener("resize",()=>{
                console.log(window.innerWidth)
            })
        }




    },[])

    return(
        <>
        <AdminLayout>
        <h1>DashBoard</h1>
                    <div className="container">
                        <div className="row gap-4 justify-content-around">
                            <TicketContainer class="col-md-3 p-0 " number={tickets.all + tickets.open} path="/admin/dashboard/tickets/all"  title="All Tickets" containerColor="#007bff"  linkColor="#006ee5" />
                            <TicketContainer class="col-md-3 p-0 " number={tickets.open} path="/admin/dashboard/tickets/open"  title="New Tickets" containerColor="#6c757d" linkColor="#616970" />
                            <TicketContainer class="col-md-3 p-0 " number={tickets.resolved} path="/admin/dashboard/tickets/resolved"  title="Resolved Tickets" containerColor="#28a745" linkColor="#24963e" />
                            <TicketContainer class="col-md-3 p-0 " number={tickets.ongoing} path="/admin/dashboard/tickets/ongoing"  title="In Process Tickets" containerColor="#17a2b8" linkColor="#1591a5" />
                            <TicketContainer class="col-md-3 p-0 " number={tickets.unresolved} path="/admin/dashboard/tickets/unresolved"  title="On Hold Tickets" containerColor="#ffc107" linkColor="#e5ad06" />
                            <TicketContainer class="col-md-3 p-0 " number={tickets.closed} path="/admin/dashboard/tickets/closed"  title="Closed Tickets" containerColor="#e51717" linkColor="#a51500" />
                        </div>
                    </div>
        </AdminLayout>
        </>
    )
}