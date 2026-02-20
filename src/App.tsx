import { useState } from 'react'
import './App.css'
import Login from './pages/Login'
import Header from './components/Header'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'

function App() {

  return (
    <>
      <Header />
      <main className="flex-1 flex item-center justify-center">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
    </>
  )
}

export default App