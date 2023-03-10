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
  const [cart , setCart] = useState({EscapeRooms: []});
  const [rooms, setRooms] = useState([]);

  console.log('Escape Rooms:', rooms)
  console.log('CART:', cart)
  
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
      .then(user => {
        setAuth(user);
        fetch(`/api/cart/${user.id}`)
          .then(response => response.json())
          .then(cart => setCart(cart));
          console.log(user.id)
      });
  }
};

const fetchEscapeRooms = async () => {
  const response = await fetch('/api/EscapeRooms');
  const rooms = await response.json();
  setRooms(rooms)
}

  useEffect(() => {
    attemptLogin();
    fetchEscapeRooms()
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
        <Route path='/EscapeRooms' element={<EscapeRooms setCart={setCart} rooms={rooms} cart={cart} />} />
        <Route path='/Register' element={<Register setAuth={setAuth} register={register} />} />
        <Route path='/login' element={<Login login={login} />} />
      </Routes>
      <Footer />
    </HashRouter>
  );
};

export default App;
