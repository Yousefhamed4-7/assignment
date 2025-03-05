import { createContext,useState } from "react";

export const currentPage = createContext("")



export default function CurrentPageContextProvioder({children})
{
    const [page,setPage] = useState("")

    return(
        <currentPage.Provider value={{page,setPage}}>
            {children}
        </currentPage.Provider>
    )
}