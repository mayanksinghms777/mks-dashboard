import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import {NavLink} from "react-router-dom"
import logo from "../images/brandlogo.png"

function Navbar() {
    return (
<>
<nav className="navbar navbar-expand-lg navbar-light ">
  <NavLink className="navbar-brand" to="/"> <img src={logo} alt="logo" /> </NavLink>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav ml-auto">
      <li className="nav-item active">
        <NavLink className="nav-link" to="/">Home <span className="sr-only"></span></NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/about">About</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/employees">Employees</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/login">Sign In</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/signup">Registration</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/logout">LogOut</NavLink>
      </li>
    </ul>
  </div>
</nav>
    </>
    )
}

export default Navbar
