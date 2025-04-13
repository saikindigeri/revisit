import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/login'
import Dashboard from './pages/dashboard'
import Register from './pages/register'


const App = () => {
  return (
   <BrowserRouter>
   <Routes>
    <Route path="/login" element={<Login/>} />
    <Route path="/register" element={<Register/>} />
    <Route path="/" element={<Dashboard/>} />
    
   </Routes>
   </BrowserRouter>
  )
}

export default App