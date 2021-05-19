import './Login.css';
import Layout from './Layout';
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

const Login = (props) => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [redirect, setRedirect] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: username,
        password: password,
        adminSite: false,
      }),
    };
    fetch('https://serene-waters-04286.herokuapp.com/login', requestOptions)
      .then((response) => response.json())
      .then((results) => {
        if (results.token !== undefined) {
          window.localStorage.setItem('user', results.token);
          props.authRefresh(true);
          setRedirect(true);
        } else {
          setErrorMessage(results.message);
        }
      });
  };

  return (
    <Layout>
      {redirect && <Redirect to={'/'} push />}
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
            required
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
            required
          />
          <br />
          <input type="submit" id="loginButton" value="Login" />
          {errorMessage && <div>{errorMessage}</div>}
        </form>
      </div>
    </Layout>
  );
};

export default Login;
