import { Routes,Route,useNavigate } from "react-router-dom"
import AdminPages from "./Auth/Admin/AdminPages"
import CustomerPages from "./Auth/Customer/CustomerPages"
import UnauthorizedPages from "./Auth/UnauthorizedPages"
import Echo from "laravel-echo";
import Pusher from 'pusher-js';
import axios from "axios"



function App() {

  const navigate = useNavigate()
  const loggedIn = localStorage.getItem("loggedIn")
  const role = localStorage.getItem("role")


  window.Echo = new Echo({
    broadcaster: 'reverb', // Or 'reverb'
    key: import.meta.env.VITE_REVERB_APP_KEY,  
    wsHost: import.meta.env.VITE_REVERB_HOST, // For Reverb, get the host from env or use current hostname
    wsPort: import.meta.env.VITE_REVERB_PORT ?? 80, // For Reverb
    wwsPort: import.meta.env.VITE_REVERB_PORT ?? 443, // For Reverb
    forceTLS: (import.meta.env.VITE_REVERB_SCHEME ?? 'https') === "https", // For Reverb, check if scheme is https
    enabledTransports: ['ws', 'wss'], // For Reverb
    authorizer: channel => {
      return {
          authorize: (socketId, callback) => {
              axios.post('http://localhost:8000/api/broadcasting/auth',{
                  socket_id: socketId,
                  channel_name: channel.name
              },{
                baseURL: "http://localhost:8000",
                headers:{
                  "Authorization": "Bearer " + localStorage.getItem("userToken")
                }
              })
              .then(response => {
                  callback(false, response.data);
              })
              .catch(error => {
                  callback(true, error);
              });
          }
      };
    }
  });
    

    return (
      <>
    <Routes>
      {loggedIn ? 
          role == "admin" ? 
          
      <Route path="*" element={<AdminPages/>} />
      :
      <Route path="*" element={<CustomerPages/>}/>
      :
      <Route path="*" element={<UnauthorizedPages/>}/>
    }
    </Routes>
  </>
  )
}

export default App
