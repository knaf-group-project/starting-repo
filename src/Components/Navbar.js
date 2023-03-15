import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ auth, logout, cart }) => {
  useEffect(() => {
    const menu = document.querySelector('#menu-icon');
    const navbar = document.querySelector('.navbar');
    const links = document.querySelectorAll('.navbar li a');

    menu.addEventListener('click', () => {
      menu.classList.toggle('bx-x');
      navbar.classList.toggle('open');
    });

    links.forEach((link) => {
      link.addEventListener('click', () => {
        menu.classList.remove('bx-x');
        navbar.classList.remove('open');
      });
    });
  }, []);

  return (
      <header className="header">
        <a href="#" className="logo">
          Escape Room
        </a>

        <div className="bx bx-menu" id="menu-icon"></div>

        <nav className="navbar">
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/About'>About</Link></li>
          <li><Link to='/EscapeRooms'>Escape Rooms</Link></li>
          <li><Link to='/Register'>Sign up</Link></li>
        </nav>

        <div className="header-btn">
          {auth.id ? (
            <div className='welcome'>
              Hello {auth.username}
              <button onClick={ logout }> Logout </button>
              <span> | </span>
              <Link to="/cart">Cart ({cart.EscapeRooms.length})</Link>
            </div>
          ) : (
            <>
              <Link to="/login" className="in">Login</Link>
            </>
          )}
        </div>
      </header>
  );
};

export default Navbar;
