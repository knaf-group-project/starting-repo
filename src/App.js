import React, { useEffect, useState } from 'react';
import { Link, Routes, Route, HashRouter } from 'react-router-dom';
import axios from 'axios';
import {
  Home,
  Login,
  EscapeRooms,
  NavBar,
  Register
} from './Components'
import Footer from './Components/Footer';


const App = () => {
  const [auth, setAuth] = useState({});
  const [rooms, setRooms] = useState([]);
  const attemptLogin = () => {
    const token = window.localStorage.getItem('token');
    if (token) {
      fetch(
        '/api/auth/',
        {
          method: 'GET',
          headers: {
            'authorization': `Bearer${token}`
          }
        }
      )
        .then(response => response.json())
        .then(user => setAuth(user));
    }
  };

  useEffect(() => {
    attemptLogin();
  }, []);

  useEffect(() => {
    fetch('./api/EscapeRooms')
      .then(response => response.json())
      .then(rooms => {
        setRooms(rooms)
      })
  }, []);

  const logout = () => {
    window.localStorage.removeItem('token');
    setAuth({});
  }

  const login = async ({ username, password }) => {
    axios.post(
      '/api/auth/',
      {
        username,
        password
      }
    )
      .then(response => {
        console.log(response)
        console.log('success')
        const data = response.data;
        window.localStorage.setItem('token', data.token);
        attemptLogin();
      });
  };


  const register = async (username, password) => {
    axios.post(
      '/api/users/register',
      {
        username, password
      }
    )
      .then(response => {
        console.log('success')
        const data = response.data;
        console.log(data)
        window.localStorage.setItem('token', response.data.token);
      });
  };

  return (
    <HashRouter>
      <NavBar auth={auth} logout={logout} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/EscapeRooms' element={<EscapeRooms rooms={rooms} />} />
        <Route path='/Register' element={<Register setAuth={setAuth} register={register} />} />
        <Route path='/login' element={<Login login={login} />} />
      </Routes>
      <Footer />
    </HashRouter>
  );
};

export default App;
