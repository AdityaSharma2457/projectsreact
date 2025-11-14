import React from 'react'
import "./navbar.css";

const Navbar = () => {
  return (
    <nav>
        <div className="wrapper">

            <img src="/favicon.ico" alt="logo" />
        <h1>Todo</h1>


        </div>
      <ul>
        <li><a href="">home </a></li>
        <li><a href="">contact </a></li>
        <li><a href="">about</a></li>
      </ul>
    </nav>
  )
}

export default Navbar
