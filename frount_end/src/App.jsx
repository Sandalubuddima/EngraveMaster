import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Loging_page from './pages/logingpage'
import Signup_page from './pages/signuppage'
import Home_page from './pages/homepage'
import Error_page from './pages/errorpage'


function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home_page />} />
        <Route path="/login" element={<Loging_page />} />
        <Route path="/signup" element={<Signup_page />} />
        <Route path="/*" element={<Error_page />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

