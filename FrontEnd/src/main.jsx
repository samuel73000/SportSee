import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Home from "./Page/Home/Home.jsx"
import Header from "./composant/Header/Header.jsx"
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <Header />
    <Home />
  </StrictMode>,
)
