import React, { useState } from 'react';
import axios from 'axios';

const Register = ({ setAuth }) => {
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');

  const registerSubmit = async (ev) => {
    ev.preventDefault();
    axios
      .post('/api/users/register', {
        username: registerUsername,
        password: registerPassword,
      })
      .then((response) => {
        console.log('success');
        const data = response.data;
        console.log(data);
        window.localStorage.setItem('token', data.token);
        setAuth({ id: data.id, username: data.username });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className='formBody'>
      <div className='containerSignUp'>
          <form className='registerSubmit' onSubmit={registerSubmit}>
            <h2>Sign Up</h2>
            <div className='inputBox' >
              <input
                type='text'
                required='required'
                value={registerUsername}
                onChange={(ev) => setRegisterUsername(ev.target.value)}
              />
              <i className='bx bx-user' ></i>
              <span>username</span>
            </div>
            <div className='inputBox'>
              <input
                type='password'
                required='required'
                value={registerPassword}
                onChange={(ev) => setRegisterPassword(ev.target.value)}
              />
              <i className='bx bxs-lock-alt' ></i>
              <span>password</span>
            </div>
            <div className='inputBox'>
              <input type='submit' value="Create Account">
              </input>
            </div>
            <p>Already a member ? <a href="#/Login" className='login'>Login in</a></p>
          </form>
      </div>
    </div>
  );
};


export default Register;
