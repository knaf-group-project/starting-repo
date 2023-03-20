import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ auth, rooms, logout, cart }) => {

  useEffect(() => {
    const menu = document.querySelector('#menu-icon');
    const navbar = document.querySelector('.navbar');
    const links = document.querySelectorAll('.navbar li a');

    menu.addEventListener('click', () => {
      menu.classList.toggle('bx-x');
      navbar.classList.toggle('open');
    });

    links.forEach((link) => {
      link.addEventListener('click', (event) => {
        if (link.classList.contains('dropbtn')) {
          event.preventDefault();
        }
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
        <li className="dropdown">
          <a className="dropbtn">Escape Rooms</a>
          <div className="dropdown-content">
            {rooms.map(room => (
              <Link key={room.id} to={`/EscapeRooms/${room.id}`}>{room.name}</Link>
            ))}
          </div>
        </li>

        {auth.id ? null : <li><Link to='/Register'>Sign up</Link></li>}
      </nav>

      <div className="header-btn">
        {auth.id ? (
          <div className='welcome'>
            Hello {auth.username}
            <span style={{ margin: "0 10px" }}> | </span>
            <Link to="/cart">
              <i className="bx bx-cart" style={{ fontSize: "20px", margin: '5px' }}></i>
              Cart ({cart.EscapeRooms.length})
            </Link>
            <Link to="#" className="in" onClick={logout}>Logout</Link>
            <span style={{ margin: "0 10px" }}> | </span>
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
