import React, { useState } from 'react';

const Login = ({ login })=> {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const _login = (ev)=> {
    ev.preventDefault();
    login({ username, password });

    clearForm();
  }

  const clearForm = () => {
    setUsername('')
    setPassword('')
  }
  return (
<div className='formBody'>
  <div className='containerSignUp'>
      <form className='registerSubmit' onSubmit={_login}>
        <h2>Login</h2>
        <div className='inputBox' >
          <input
            type='text'
            required='required'
            value={username}
            onChange={(ev) => setUsername(ev.target.value)}
          />
          <i className='bx bx-user' ></i>
          <span>username</span>
        </div>
        <div className='inputBox'>
          <input
            type='password'
            required='required'
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <i className='bx bxs-lock-alt' ></i>
          <span>password</span>
        </div>
        <div className='inputBox'>
        <input type='submit' value="Log in">
              </input>
        </div>
        <p>Not a member? <a href="#/Register" className='login'>Sign up now</a></p>
      </form>
    </div>
  </div>
  );
};

export default Login;
