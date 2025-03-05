import { useContext } from "react";
import { Link } from "react-router-dom";
import { currentPage } from "../Contexts/CurrentPageContext";

export default function NavbarLink(props)
{

    const {page,setPage} = useContext(currentPage);

    return(

    <Link onClick={() => setPage(props.to)} to={props.to} className={`${page == props.to ? "admin-link-active" : "admin-link"} text-decoration-none p-2  w-100 d-flex jusitfy-content-start align-items-center gap-3`}>
        {props.children}
    </Link>
    )

}