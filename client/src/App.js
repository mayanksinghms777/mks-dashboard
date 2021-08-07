import React from 'react'
import { Route } from "react-router-dom"
import "./App.css"
import Navbar from './components/Navbar'
import Home from './components/Home'
import About from './components/About'
import Employees from './components/Employees'
import Login from './components/Login'
import Signup from './components/Signup'
import Logout from './components/Logout'
import Addemp from './components/Addemp'
import Editemp from './components/Editemp'

const App = () => {
  return (
    <>
      <Navbar/>
      <Route exact path ="/">
          <Home/>
      </Route>

      <Route path ="/about">
          <About/>
      </Route>

      <Route path ="/employees">
          <Employees/>
      </Route>

      <Route path ="/login">
          <Login/>
      </Route>

      <Route path ="/signup">
          <Signup/>
      </Route>

      <Route path ="/logout">
          <Logout/>
      </Route>

      <Route path ="/addemp">
          <Addemp/>
      </Route>

      <Route path ="/editemp/:id">
          <Editemp/>
      </Route>

    </>
  )
}

export default App
