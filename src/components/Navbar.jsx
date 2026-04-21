import React from 'react'
import { NavLink } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
  return (
    <div  className='navlink-css'>
      <NavLink to ='/'>
        Home
      </NavLink>
      <NavLink to= '/pastes'>
        Pastes
      </NavLink>
    </div>
  )
}

export default Navbar
