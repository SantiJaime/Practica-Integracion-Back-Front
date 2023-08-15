import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Homepage from '../pages/Homepage'
import Ejercicio2 from '../pages/Ejercicio2'
import Ejercicio4 from '../pages/Ejercicio4'
import Ejercicio6 from '../pages/Ejercicio6'
import NavbarComp from '../components/NavbarComp'
import RegisterEj6 from '../pages/RegisterEj6'
import LoginEj6 from '../pages/LoginEj6'

const RoutesView = () => {
  return (
    <>
    <NavbarComp/>
    <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path='/ej2' element={<Ejercicio2/>}/>
        <Route path='/ej4' element={<Ejercicio4/>}/>
        <Route path='/ej6' element={<Ejercicio6/>}/>
        <Route path='/ej6/register'element={<RegisterEj6/>}/>
        <Route path='/ej6/login'element={<LoginEj6/>}/>
    </Routes>
    </>
  )
}

export default RoutesView