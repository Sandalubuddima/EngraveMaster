import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Loging_page from './pages/logingpage'
import Signin_page from './pages/signinpage'
import Error_page from './pages/errorpage'


function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Loging_page />} />
        <Route path="/signin" element={<Signin_page />} />
        <Route path="/*" element={<Error_page />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

