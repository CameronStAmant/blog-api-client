import './Login.css';
import Layout from './Layout';
import React, { useState } from 'react';

const Login = () => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    };
    fetch('http://localhost:3000/login', requestOptions)
      .then((response) => response.json())
      .then((results) => {
        window.localStorage.setItem('user', results.token);
      });
  };

  return (
    <Layout>
      <div className="mainContent">
        <form onSubmit={handleSubmit} className="login-form">
          <label htmlFor="username-field">Username:</label>
          <br />
          <input
            type="text"
            id="username-field"
            name="username"
            autoComplete="on"
            value={username ? username : ''}
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
          <label htmlFor="password-field">Password:</label>
          <br />
          <input
            type="password"
            id="password-field"
            name="password"
            autoComplete="on"
            value={password ? password : ''}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <input type="submit" value="Login" />
        </form>
      </div>
    </Layout>
  );
};

export default Login;
