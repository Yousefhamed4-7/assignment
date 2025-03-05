import { useContext, useEffect, useRef, useState } from "react";
import AdminNavbar from "../Components/AdminNavbar";
import { AdminNavBarIsopened } from "../Contexts/AdminNavBarContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import { handelTicket, show, update } from "../Api/AdminApi";
import { Toaster, toast } from 'sonner';
import AdminLayout from "../Layout/AdminLayout";
import TicketStatus from "../Components/TicketStatus";

export default function AdminTicketPreviewPage()
{
    
    const {isopen} = useContext(AdminNavBarIsopened)
    
    const [ticket,setTicket] = useState([])
    const [zoom,setZoom] = useState(false)
    const ticket_id = useParams().id
    const navigate = useNavigate()
    const [status,setStatus] = useState(null)
    const [msg,setMsg] = useState(null);
    const changedStatus = useRef()
    const containerElement = useRef()


    function handelButton()
    {
        handelTicket(setMsg,ticket_id);
        navigate("/admin/dashboard");
    }

    function handelClick(e)
    {
        update(setMsg,ticket_id,{"status":changedStatus.current.value})
        setStatus(changedStatus.current.value)
        toast.success("Changed Status")
    }

    useEffect(()=>{

        if(window.innerWidth <= 530)
            {
                containerElement.current.style.flexWrap = "wrap";
            } else{
                containerElement.current.style.flexWrap = "nowrap";
            }

       

        window.addEventListener("resize",()=>{
            if(window.innerWidth <= 530)
            {
                containerElement.current.style.flexWrap = "wrap";
            } else{
                containerElement.current.style.flexWrap = "nowrap";
            }
        })


        show(setTicket,setStatus,ticket_id);

        return ()=>{
            window.removeEventListener("resize",()=>{
                console.log(window.innerWidth)
            })
        }
    },[])

    useEffect(()=>{
        if(msg)
        {
            if(msg.data?.message)
            {
                toast.info(msg.data?.message);
            }
        }
    },[msg])

    return(
        <>
       <AdminLayout>
       {(ticket.status) == 403 ?
                <h1>Unauthorized Access</h1>            
            : 
            (ticket.status == 404) ?
            <h1>Ticket Not Found</h1>
                :
                (ticket.status == 500) ?
                <h1>Something Went Wrong Try Again</h1>
                :
                <>
                
            <h1>Ticket ID: {ticket_id}</h1>

                    <div className="d-flex justify-content-around p-4" ref={containerElement}>
                    <div  className="container">
                        <h4>Ticket Title: {ticket.title}</h4>
                        <h5>Ticket Description: </h5>
                        <p>{ticket.desc}</p>
                        {ticket.status != "open" &&
                        <Link to={`/admin/dashboard/tickets/ticket/chat/${ticket.id}`} >View Chat</Link>
                        }
                    </div>

                    {ticket.status != "open" &&
                    <div className="container">
                        <div className="d-flex justify-content-between align-items-center mb-4">
                        <h6 className="fs-4">Change Ticket Status </h6>
                            <TicketStatus status={status} />
                        </div>
                        <select ref={changedStatus}  className="form-select" name="status" id="status">
                            <option   value="resolved">Resolved</option>
                            <option   value="closed">Closed</option>
                            <option  value="unresolved">Unresolved</option>
                            <option   value="ongoing">Ongoing</option>
                        </select>
                        <button onClick={(e) => handelClick(e)} className="btn btn-success mt-2">Change</button>
                    </div>
                    }

                    </div>
                    <div className="p-5">
                    {ticket.status == "open" && <button onClick={handelButton} className=" ms-auto d-block  btn btn-primary">Handel Ticket</button>}
                    </div>
                    </>
}
       </AdminLayout>
        </>
    )
}