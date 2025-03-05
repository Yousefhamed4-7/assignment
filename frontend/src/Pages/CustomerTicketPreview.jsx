import { Link, useParams } from "react-router-dom";
import CustomerLayout from "../Layout/CustomerLayout";
import { useEffect, useState } from "react";
import { show } from "../Api/CustomerApi";
import TicketStatus from "../Components/TicketStatus";

export default function CustomerTicketPreview()
{

    const ticket_id = useParams().ticket_id


    const [ticket,setTicket] = useState([])

    useEffect(()=>{
        console.log("hello")

        show(setTicket,ticket_id);

        window.Echo.channel("status").listen("StatusChecker",(e) => {
            setTicket(e.Ticket)
          });
      
      
          return () => {
            window.Echo.leaveChannel('status'); // Important: Clean up on unmount
          };
    },[ticket.status])


    return(
        <CustomerLayout>
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
                           <div className="container">
                            <div className="d-flex justify-content-between">
                                <div>

                            <h4>Ticket Title: {ticket.title}</h4>
                            <h5>Ticket Description: </h5>
                            <p>{ticket.desc}</p>
                            {ticket.technation_id &&
                            <Link to={`/customer/dashboard/tickets/ticket/chat/${ticket_id}`} >View Chat</Link>
                        }
                        </div>
                            <div>
                                <TicketStatus status={ticket.status} />
                            </div>
                            </div>
                            </div>
                        </>
                        }
        </CustomerLayout>
    )
}