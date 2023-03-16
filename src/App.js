import React, { useEffect, useState } from 'react';
import {
  Link,
  Routes,
  Route,
  HashRouter,
  useLocation,
  useNavigate
} from 'react-router-dom';
import axios from 'axios';
import {
  Home,
  Login,
  EscapeRooms,
  EscapeRoom,
  NavBar,
  Register,
  Footer,
  Cart
} from './Components'



const App = () => {
  const [auth, setAuth] = useState({});
  const [cart , setCart] = useState({EscapeRooms: []});
  const [rooms, setRooms] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(()=> {
    if(auth.id){
      if(location.pathname.toLowerCase() === '/login'){
        navigate('/EscapeRooms');
      }
      if(location.pathname.toLowerCase() === '/register'){
        navigate('/EscapeRooms');
      }
    }
  }, [auth]);

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
        if(user.id){
          setAuth(user);
          fetch(`/api/cart/${user.id}`)
            .then(response => response.json())
            .then(cart => setCart(cart));
        }
        else {
          window.localStorage.removeItem('token');
        }

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
        console.log('success!!!')
        const data = response.data;
        console.log(data)
        window.localStorage.setItem('token', response.data.token);
        attemptLogin();
      });
  };

  return (
    <>
    <div className='App'>
      <NavBar auth={auth} rooms={rooms} logout={logout} cart={cart}/>
      <Routes>
        <Route path='/' element={<Home rooms={rooms}/>} />
        <Route path='/EscapeRooms/:id' element={<EscapeRoom setCart={setCart} rooms={rooms} cart={cart} auth={auth} />} />
        <Route
          path='/EscapeRooms'
          element={
            <EscapeRooms
              setCart={setCart}
              rooms={rooms}
              cart={cart}
              auth={ auth }
            />
          } 
        />
        <Route path='/Register' element={<Register setAuth={setAuth} register={register} />} />
        <Route path='/login' element={<Login login={login} />} />
        <Route path='/Cart' element={<Cart cart={cart} setCart={setCart} />} />
        </Routes>
        <Footer/>
      </div>
    </>
  );
};

export default App;
