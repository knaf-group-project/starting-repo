import React from 'react'

export default function Footer() {
  return (
    <footer>
      <div className='row'>
        <div className='col'>
          <h2 className='logo2'>ESCAPE ROOM</h2>
          <p>Subscribe for more news about Escape Rooms. Follow us on social medias for more. something idk we can come up with something</p>
        </div>
        <div className='col'>
          <h3>Office <div className='underline'><span></span></div></h3>
          <p> Knaf Group</p>
          <p>Chicago, IL</p>
          <p>5006 N. React St.</p>
          <p className='email-id'>random@outlook.com</p>
          <h4>+1(773)606-2345</h4>
        </div>
        <div className='col'>
            <h3>Link<div className='underline'><span></span></div></h3>
            <ul>
                <li><a href=''>Home</a></li>
                <li><a href=''>About</a></li>
                <li><a href=''>Escape Rooms</a></li>
                <li><a href=''>Register</a></li>
                <li><a href=''>Contacts</a></li>
            </ul>
        </div>
        <div className='col'>
            <h3>Newsletter<div className='underline'><span></span></div></h3>
        <form className='footer-form'>
        <i className='bx bx-envelope' ></i>
            <input type='email' placeholder='Enter your email' required></input>
            <button type='submit'><i className='bx bx-right-arrow-alt' ></i></button>
        </form>
        <div className='social-icons'>
        <i className='bx bxl-facebook-square'></i>
        <i className='bx bxl-twitter' ></i>
        <i className='bx bxl-instagram' ></i>
        <i className='bx bxl-tiktok' ></i>
        </div>
        </div>
      </div>
      <hr/>
      <p className='copyright'>KNAF GROUP @ 2023 - All Rights Reserved</p>
    </footer>
  )
}
