import { Route, Routes } from "react-router-dom";
import ErrorPage from "../../Pages/ErrorPage";
import CustomerDashboard from "../../Pages/CustomerDashboard";
import CustomerTicketPreview from "../../Pages/CustomerTicketPreview";
import CustomerChatPage from "../../Pages/CustomerChatPage";
import CustomerTicketCreation from "../../Pages/CustomerTicketCreation";

export default function CustomerPages()
{
    return(
        <Routes>
            <Route path='/customer/dashboard' element={<CustomerDashboard />}/>
            <Route path='/customer/dashboard/tickets/ticket/:ticket_id' element={<CustomerTicketPreview />}/>
            <Route path='/customer/dashboard/tickets/ticket/chat/:ticket_id' element={<CustomerChatPage />}/>
            <Route path='/customer/dashboard/ticket/create' element={<CustomerTicketCreation />}/>
            <Route path='*' element={<ErrorPage />}/>
        </Routes>
    )
} 