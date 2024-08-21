import { BrowserRouter, Routes, Route } from "react-router-dom"

import './App.css'
import Users from "./pages/Users"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Users />} />
        
      </Routes>
    </BrowserRouter>
  )
}

