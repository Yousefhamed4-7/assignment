import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import './assets/styles.css'
import AdminNavBarProvidor from './Contexts/AdminNavBarContext.jsx'
import CurrentPageContextProvioder from './Contexts/CurrentPageContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CurrentPageContextProvioder>
      <AdminNavBarProvidor>
        <BrowserRouter>
          <App/>
        </BrowserRouter>
      </AdminNavBarProvidor>
    </CurrentPageContextProvioder>
  </StrictMode>
)
