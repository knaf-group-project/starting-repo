import React, { useState } from 'react';


const Register = ({register}) => {
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');

  const registerSubmit = async (ev) => {
    ev.preventDefault();
    try {
    register({registerUsername, registerPassword})
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form className="registerSubmit" onSubmit={registerSubmit}>
      <h1 className="registerIn">Please register here!</h1>
      <input
        className="registerIn"
        placeholder="username"
        value={registerUsername}
        onChange={ev => setRegisterUsername(ev.target.value)} />

      <input
        className="registerIn"
        placeholder="password"
        value={registerPassword}
        onChange={ev => setRegisterPassword(ev.target.value)} />

      <button className="registerIn">Register</button>
    </form>
  )
};

export default Register;
