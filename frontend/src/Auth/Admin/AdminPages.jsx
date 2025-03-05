import { Route, Routes } from "react-router-dom";
import AdminDashBoardPage from "../../Pages/AdminDashBoardPage";
import AdminTicketsPage from "../../Pages/AdminTicketsPage";
import ErrorPage from "../../Pages/ErrorPage";
import AdminTicketPreviewPage from "../../Pages/AdminTicketPreviewPage";
import AdminChatPage from "../../Pages/AdminChatPage";

export default function AdminPages()
{

    return(
        <Routes>
            <Route path='admin/dashboard' element={<AdminDashBoardPage />}/>
            <Route path='admin/dashboard/tickets/:ticket_type' element={<AdminTicketsPage />}/>
            <Route path='admin/dashboard/tickets/ticket/:id' element={<AdminTicketPreviewPage />}/>
            <Route path='admin/dashboard/tickets/ticket/chat/:id' element={<AdminChatPage />}/>
            <Route path='/ErrorPage' element={<ErrorPage />}/>
            <Route path='*' element={<ErrorPage />}/>
        </Routes>
    )

}