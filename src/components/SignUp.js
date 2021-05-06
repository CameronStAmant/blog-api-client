import './SignUp.css';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Layout from './Layout';

const SignUp = () => {
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
      }),
    };
    fetch('http://localhost:3000/signup', requestOptions).then(
      history.push('/login')
    );
  };

  return (
    <Layout>
      <div className="mainContent">
        <form onSubmit={handleSubmit} className="Sign-up-form">
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
          <label htmlFor="email-field">Email:</label>
          <br />
          <input
            type="email"
            id="email-field"
            name="email"
            autoComplete="on"
            value={email ? email : ''}
            onChange={(e) => setEmail(e.target.value)}
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
          <label htmlFor="password-confirmation-field">Confirm Password:</label>
          <br />
          <input
            type="password"
            id="password-confirmation-field"
            name="password-confirmation"
            autoComplete="on"
            value={confirmPassword ? confirmPassword : ''}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <br />
          <input type="submit" value="Sign Up" />
        </form>
      </div>
    </Layout>
  );
};

export default SignUp;
