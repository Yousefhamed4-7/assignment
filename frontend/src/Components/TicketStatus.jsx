import { useEffect, useState } from "react";

export default function TicketStatus(props)
{
    const [statusColor,setStatusColor] = useState("")
    const [textColor,setTextColor] = useState("")
    useEffect(()=>{
        switch(props.status)
        {
            case "ongoing":
                setStatusColor("lime")
                setTextColor("white")
            break;
            case "closed":
                setStatusColor("#e51717")
                setTextColor("white")
            break;
            case "resolved":
               setStatusColor("green")
               setTextColor("white")
            break;
            case "unresolved":
                setStatusColor("#ffc107")
                setTextColor("black")
            break;
            case "open":
                setStatusColor("#009688")
                setTextColor("white")
            break;
        }
    })

    return(
    <>
    {
    props.size == "small" ?
    <div className={`text-center px-1 py-2 rounded`} style={{backgroundColor: statusColor,color: textColor,minWidth:"25%",width:"80px"}}>
            <span className="fw-bold">{props.status}</span>
        </div>
    :
        <div className={`text-center px-4 py-3 rounded`} style={{backgroundColor: statusColor,color: textColor}}>
            <span className="fw-bold">{props.status}</span>
        </div>
        }
    </>
)

}