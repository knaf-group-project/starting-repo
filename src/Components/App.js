import React, { useEffect, useState } from 'react';
import Home from './Home';
import Login from './Login';
import EscapeRooms from './EscapeRooms';
import Navbar from './Navbar.js';
import { Link, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Register from './Register';


const App = ()=> {
  const [auth, setAuth] = useState({});
  const [rooms, setRooms] = useState([]);
  const attemptLogin = ()=> {
    const token = window.localStorage.getItem('token');
    if(token){
      fetch(
        '/api/auth/',
        {
          method: 'GET',
          headers: {
            'authorization':`Bearer${token}`
          }
        }
      )
      .then( response => response.json())
      .then( user => setAuth(user));
    }
  };

  useEffect(()=> {
    attemptLogin();
  }, []);

  useEffect(()=> {
    fetch('./api/EscapeRooms')
      .then( response => response.json())
      .then( rooms => {
        setRooms(rooms)
      })
  }, []);

  const logout = ()=> {
    window.localStorage.removeItem('token');
    setAuth({});
  }

  const login = async({ username, password})=> {
    axios.post(
      '/api/auth/',
      {
      username, password 
      }
    )
    .then( response => {
      console.log(response)
      console.log('success')
      const data = response.data;
      window.localStorage.setItem('token', data.token);
      attemptLogin();
    });
  };

  const register = async ({ username, password }) => {
    axios.post(
      '/api/users/register', 
      {
        username, password
      }
      )
      .then( response => {
        console.log('success')
        const data = response.data;
        console.log(data)
    });
  };


  return (
    <div>
      <Navbar />
      <h1>Welcome to our site !</h1>
      <nav>
        {
          auth.id ? (
            <>
              <Link to='/'>Home</Link>
              <button onClick={ logout }>Logout { auth.username }</button>
            </>
          ) : (
            <>
              <Link to='/login'>Login</Link>
            </>
          )
        }
          <Link to='/EscapeRooms'>Escape Rooms({ rooms.length})</Link>
      </nav>
      <Routes>
      <Route path='/Navbar' element= { <Navbar  logout={logout}/> } />
      <Route path='/EscapeRooms' element= { <EscapeRooms rooms={rooms} /> } />
      <Route path='/Register' element= { <Register register={register}/> } />
        {
          auth.id ? (
            <>
            <Route path='/' element= { <Home auth={ auth }/> } />
            </>

          ): (
            <>
            <Route path='/login' element= { <Login login={ login }/> } />
            </>
          )
        }
      </Routes>
    </div>
  );
};

export default App;
