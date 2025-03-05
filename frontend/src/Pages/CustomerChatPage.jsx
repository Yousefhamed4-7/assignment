import { useEffect, useRef, useState } from "react";
import ChatBubble from "../Components/ChatBubble";
import CustomerLayout from "../Layout/CustomerLayout";
import { useParams } from "react-router-dom";
import {toast,Toaster} from 'sonner'
import { getAll, send } from "../Api/ChatApi";

export default function CustomerChatPage()
{
    const ticket_id = useParams().ticket_id

    const [messages,setMessages] = useState([]);
    const [message,setMessage] = useState(null)
    const [user,setUser] = useState("")
    const [inital,setIntial] = useState(true);
    const chatBox = useRef()


    function handelForm(e)
    {
        e.preventDefault()
        const message = e.target.message.value 
        e.target.message.value = ""
        toast.success("Message Sent")
        send(setMessage,ticket_id,message);
    }


     useEffect(()=>{
            getAll(setUser,setMessages,ticket_id);
            console.log("running us effect")
            window.Echo.private(`Ticket.${ticket_id}`).listen("MessageSend",(e) => {
                console.log(e.message);
                setMessages((prev) => [...prev,e.message])
              });

              chatBox.current.scollTop = chatBox.current.scrollHeight

              return ()=>{
                window.Echo.leaveChannel('Ticket.' + ticket_id);
              }
        },[])

        useEffect(()=>{
            chatBox.current.scrollTop = chatBox.current.scrollHeight
    
        })

    return(
        <CustomerLayout>
            <Toaster richColors/>
              <h1>Chatting With: {localStorage.getItem("role") == "customer" ? user.technation_name : user.customer_name}</h1>
                                        <div className="container p-3" style={{height: "calc(100vh - 100px)"}}>
                                            <div className="chatBox border border-1 h-75 p-2 pt-3 "ref={chatBox} style={{scrollBehavior: "smooth"}}>
                                                {messages.map((message,index)=>
                                                                                {
                                                                                    let date  =  new Date(message.created_at)
                                                                                    if(message.sender_id == localStorage.getItem("id"))
                                                                                    {
                                                                                        return <ChatBubble key={index} message={message.message} time={ date.toLocaleDateString() + " "+ date.toLocaleTimeString()}  class="bg-info text-white m-1" />
                                                                                    
                                                                                    }else{
                                                                                        
                                                                                     return <ChatBubble key={index} message={message.message} time={ date.toLocaleDateString() + " "+ date.toLocaleTimeString()}  class="bg-warning  m-1" recv={true} />
                                                                                    }
                                                                                    })}
                                                
                                            </div>
                                                <form className="d-flex mt-4"  method="post" onSubmit={(e) => handelForm(e)}>
                                                    <input className="form-control" type="text" name="message" id="text" placeholder="Text: " />
                                                    <input type="submit" className="btn btn-primary" value="Send" />
                                                </form>
                                        </div>
        </CustomerLayout>
    )
}