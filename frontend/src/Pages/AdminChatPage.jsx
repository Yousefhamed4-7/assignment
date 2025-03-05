import { useContext, useEffect, useRef, useState } from "react"
import { AdminNavBarIsopened } from "../Contexts/AdminNavBarContext"
import { useNavigate, useParams } from "react-router-dom"
import AdminNavbar from "../Components/AdminNavbar"
import ChatBubble from "../Components/ChatBubble"
import { getAll, send } from "../Api/ChatApi"
import {toast,Toaster} from 'sonner'
import AdminLayout from "../Layout/AdminLayout"



export default function AdminChatPage()
{
    const {isopen} = useContext(AdminNavBarIsopened)
    
    const [zoom,setZoom] = useState(false)
    const ticket_id = useParams().id
    const navigate = useNavigate()

    const [messages,setMessages] = useState([]);
    const [message,setMessage] = useState(null)
    const [user,setUser] = useState("")
    const chatBox = useRef()


    function handelForm(e)
    {
        e.preventDefault()
        let d = new Date();
        const message = e.target.message.value
        e.target.message.value = ""
        toast.success("Message Sent")
        send(setMessage,ticket_id,message);
    }


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


        window.Echo.private(`Ticket.${ticket_id}`).listen("MessageSend",(e) => {
            setMessages((prev) => [...prev,e.message])
          });
        
        console.log(chatBox.current)


        
        getAll(setUser,setMessages,ticket_id);
        return ()=>{
            window.removeEventListener("resize",()=>{
                console.log(window.innerWidth)
            })
            window.Echo.leaveChannel('Ticket.' + ticket_id); 
        }
    },[])

    useEffect(()=>{
        chatBox.current.scrollTop = chatBox.current.scrollHeight

    })

    return(
         <>
             <AdminLayout>
             <h1>Chatting With: {localStorage.getItem("role") == "customer" ? user.technation_name : user.customer_name}</h1>
                            <div className="container p-3" style={{height: "calc(100vh - 100px)"}}>
                                <div className="chatBox border border-1 h-75 p-2 pt-3 "ref={chatBox} style={{scrollBehavior: "smooth"}}>
                                    {messages.map((message)=>
                                {
                                    let date  =  new Date(message.created_at)
                                    if(message.sender_id == localStorage.getItem("id"))
                                    {
                                        return <ChatBubble key={message.id} message={message.message} time={ date.toLocaleDateString() + " "+ date.toLocaleTimeString()}  class="bg-info text-white m-1" />
                                    
                                    }else{
                                        
                                     return <ChatBubble key={message.id} message={message.message} time={ date.toLocaleDateString() + " "+ date.toLocaleTimeString()}  class="bg-warning  m-1" recv={true} />
                                    }
                                    })}

                                </div>
                                    <form className="d-flex mt-4"  method="post" onSubmit={(e) => handelForm(e)}>
                                        <input className="form-control" type="text" name="message" id="text" placeholder="Text: " />
                                        <input type="submit" className="btn btn-primary" value="Send" />
                                    </form>
                            </div>
             </AdminLayout>
                </>
    )
}