import { data, Link } from "react-router-dom";
import CustomerLayout from "../Layout/CustomerLayout";
import { useEffect, useState } from "react";
import { getAll } from "../Api/CustomerApi";
import TicketStatus from "../Components/TicketStatus";

export default function CustomerDashboard()
{


    const [ticket,setTicket] = useState([]);


    useEffect(()=>{
        getAll(setTicket,"all");
    },[])


    return(
        <CustomerLayout>
            <div className=" p-4">
                <div className="d-flex justify-content-between flex-wrap">
                    <h1>Hello: {localStorage.getItem("username")}</h1>
                    <Link to="/customer/dashboard/ticket/create" className="btn btn-primary d-flex justify-content-center align-items-center">Create Ticket</Link>
                </div>
                <div className="table-responsive">                
                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th>Ticket_id</th>
                                            <th>Ticket_Title</th>
                                            <th>Ticket_Status</th>
                                            <th>technicain_id</th>
                                            <th>#</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    { ticket ? ticket.map((t) => (
                                <tr key={t.id}>
                                    <td>{t.id}</td>
                                    <td>{t.title}</td>
                                    <td><TicketStatus size="small" class="w-25" status={t.status} /></td>
                                    <td>{t.technation_id ?? "No Technation"}</td>
                                    <td>
                                        <Link to={`/customer/dashboard/tickets/ticket/${t.id}`}>View Ticket</Link>
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
        </CustomerLayout>
    )
}