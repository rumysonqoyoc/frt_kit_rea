import React from 'react'
import { NavLink } from 'react-router-dom'
import './Navbar.css';
export const Navbar = () => {
  return (
    <>
    <div className='grid-container'>
    <header className='header'><h1 className='logo'>Red Cusco Norte - Kits SIGA/PPR</h1></header>
    <nav className='navbar'>
      <input type="checkbox" id='click'/>
      <label htmlFor="click" className='menu-btn'>
        <i className='fas fa-bars'></i>
      </label>
      <ul>
        <li><NavLink to='/'>Inicio</NavLink></li>
        <li><NavLink to='/por_programa'>Por Programa</NavLink></li>
        <li><NavLink to='/por_meta'>Por Meta</NavLink></li>
        <li><NavLink to='/por_meta_tarea'>Por Meta/Tarea</NavLink></li>
        <li><NavLink to='/por_clasificador'>Por Clasificador</NavLink></li>
        <li><NavLink to='/por_meta_clasificador'>Por Meta/Clasificador</NavLink></li>
      </ul>

    </nav>
    </div>
    </>
  )
}
