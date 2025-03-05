import {Link} from 'react-router-dom'

export default function TicketContainer(props)
{
    return(

        <div className={`ticketContainer  text-white ${props.class}`} style={{backgroundColor: props.containerColor}}>
        <div className="d-flex p-2 justify-content-between align-items-center">
            <div>
                <p className="fs-1 fw-bold">{props.number}</p>
                <p>{props.title}</p>
            </div>
            <div className=''>
            <i class="fa-regular fa-file fs-1" style={{color:"#343a40"}}></i>
            </div>
        </div>
        <Link to={props.path} style={{backgroundColor:props.linkColor}}   className='d-flex  justify-content-center w-100    align-items-center gap-1 text-decoration-none text-center text-white'>More Info <i class="fa-solid fa-circle-right"></i> </Link>
    </div>
    )
}