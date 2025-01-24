import { useState } from 'react'

import './App.css'
import Navbar from './components/Navbar'


import Chaser from './components/Chaser'
import Footer from './components/Footer'
function App() {
  
  return (
    <>
    <Navbar/>
    <div className='min-h-[85vh]'>
    <Chaser/> 
    </div>
    <Footer/> 
    </>
  )
}

export default App
