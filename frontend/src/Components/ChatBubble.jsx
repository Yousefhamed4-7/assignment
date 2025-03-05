export default function ChatBubble(props)
{
    return(
        <>
        <div className={`my-4 p-3 position-relative rounded ${props.class}`}>
            <p>
                {props.message}
            </p>
            <div className="text-end">
                <span>Date: {props.time}</span>
            </div>
            <span className={`position-absolute    ${ props.recv  ? "start-1" : ""}  ${props.class}`} style={{width:15,height:15,bottom:-5,transform:"rotate(45deg)",right: props.recv ?  "asdas10" :10 }}></span>
        </div>
        </>
    )
}