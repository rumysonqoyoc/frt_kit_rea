import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import {Navbar} from './componentes/Navbar'
import {Inicio} from './rutas/Inicio'
import { Por_programa } from './rutas/Por_programa'
import { Por_meta } from './rutas/Por_meta'
import { Por_meta_tarea } from './rutas/Por_meta_tarea'
import { Por_clasificador } from './rutas/Por_clasificador'
import { Por_meta_clasificador } from './rutas/Por_meta_clasificador'
import './App.css'


export const App = ()=> {
  return (
    <>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Inicio/>}></Route>
      <Route path='/por_programa' element={<Por_programa/>}></Route>
      <Route path='/por_meta' element={<Por_meta/>}></Route>
      <Route path='/por_meta_tarea' element={<Por_meta_tarea/>}></Route>
      <Route path='/por_clasificador' element={<Por_clasificador/>}></Route>
      <Route path='/por_meta_clasificador' element={<Por_meta_clasificador/>}></Route>
      <Route path='/*' element={<Navigate to='/'/>}></Route>
    </Routes>
    </>
  )
}
