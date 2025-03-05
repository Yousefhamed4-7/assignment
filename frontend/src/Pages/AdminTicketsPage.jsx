import { useContext, useEffect, useState } from "react";
import { useParams,useNavigate, Link } from "react-router-dom";
import AdminNavbar from "../Components/AdminNavbar";
import TicketContainer from "../Components/TicketContainer";
import { AdminNavBarIsopened } from "../Contexts/AdminNavBarContext";
import { getAll } from "../Api/AdminApi";
import AdminLayout from "../Layout/AdminLayout";
import TicketStatus from '../Components/TicketStatus'

export default function AdminTicketsPage()
{
        const {isopen} = useContext(AdminNavBarIsopened)
    

        const [ticket,setTicket] = useState([]);
        console.log(ticket)
        const [zoom,setZoom] = useState(false)
        const ticket_type = useParams().ticket_type
        const navigate = useNavigate()
    
        useEffect(()=>{
            console.log("Running ")
            if(window.innerWidth <=768){
                setZoom(true)
                document.querySelector(".zoom-icon").style.visibility = "hidden"
            }
            if(!(["open","all","unresolved","resolved","ongoing","closed"].includes(ticket_type)))
            {
                navigate("/ErrorPage")
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

            getAll(setTicket,ticket_type);

            return ()=>{
                window.removeEventListener("resize",()=>{
                    console.log(window.innerWidth)
                })
            }
        },[ticket_type])


    return(
        <>
       <AdminLayout>
       <h1>Tickets: {ticket_type}</h1>
                           <div className="container">
                            <div className="table-responsive">

                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th>Ticket_id</th>
                                            <th>Ticket_Title</th>
                                            <th>Ticket_Status</th>
                                            <th>Customer_id</th>
                                            <th>#</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    { ticket ? ticket.map((t) => (
                                <tr key={t.id}>
                                    <td>{t.id}</td>
                                    <td>{t.title}</td>
                                    <td> <TicketStatus status={t.status} size="small"/> </td> 
                                    <td>{t.customer_id ?? "null"}</td>
                                    <td>
                                        <Link to={`/admin/dashboard/tickets/ticket/${t.id}`}>View Ticket</Link>
                                    </td>
                                </tr>
                            )) : 
                            <tr>
                                <td colSpan={5}>No Data Found</td>
                            </tr>
                            }
                                    </tbody>
                                </table>
                            </div>
                           </div>
       </AdminLayout>
        </>
    )
}