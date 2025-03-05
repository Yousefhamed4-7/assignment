import { createContext, useState } from "react";

export const  AdminNavBarIsopened = createContext(true)



export default function AdminNavBarProvidor({children})
{
    const [isopen,setIsopen] = useState(true)

    return(
        <AdminNavBarIsopened.Provider value={{isopen,setIsopen}}>
            {children}
        </AdminNavBarIsopened.Provider>
    )
}