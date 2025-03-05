import { Route, Routes } from "react-router-dom";
import LandingPage from "../Pages/LandingPage";
import LoginPage from "../Pages/LoginPage";
import RegisterPage from "../Pages/RegisterPage";
import ErrorPage from "../Pages/ErrorPage";

export default function UnauthorizedPages()
{

    return(
        <Routes>
            <Route path='/' element={<LandingPage />}/>
            <Route path='/auth/login' element={<LoginPage />}/>
            <Route path='/auth/register' element={<RegisterPage />}/>
            <Route path='*' element={<ErrorPage />}/>
        </Routes>
    )

}