import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Layout from './Layout';

const SignUp = () => {
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState('');
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
        }),
      };
      fetch(
        'https://serene-waters-04286.herokuapp.com/signup',
        requestOptions
      ).then(() => history.push('/login'));
    } else {
    }
  };

  return (
    <Layout>
      <div className="display: grid col-start-1 col-span-full grid-rows-3 row-start-2 place-content-center">
        <form
          onSubmit={handleSubmit}
          className="text-center row-start-2 self-end"
        >
          <label htmlFor="username-field">Username:</label>
          <br />
          <input
            className="
              input
              w-48
              border-2
              border-green-200
              rounded-md
              focus:border-green-500"
            type="text"
            id="username-field"
            name="username"
            autoComplete="on"
            value={username ? username : ''}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <br />
          <label htmlFor="email-field">Email:</label>
          <br />
          <input
            className="
              input
              w-48
              border-2
            border-green-200
              rounded-md
            focus:border-green-500"
            type="email"
            id="email-field"
            name="email"
            autoComplete="on"
            value={email ? email : ''}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <br />
          <label htmlFor="password-field">Password:</label>
          <br />
          <input
            className="
              input
              w-48
              border-2
            border-green-200
              rounded-md
            focus:border-green-500"
            type="password"
            id="password-field"
            name="password"
            autoComplete="on"
            value={password ? password : ''}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <br />
          <label htmlFor="password-confirmation-field">Confirm Password:</label>
          <br />
          <input
            className="
              input
              w-48
              border-2
            border-green-200
              rounded-md
            focus:border-green-500"
            type="password"
            id="password-confirmation-field"
            name="password-confirmation"
            autoComplete="on"
            value={confirmPassword ? confirmPassword : ''}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <br />
          <input
            className="bg-green-100 rounded-md mt-2 w-48 hover:bg-green-200 cursor-pointer"
            type="submit"
            id="signUpSubmit"
            value="Sign Up"
          />
        </form>
        <p className="row-start-3">
          {password !== confirmPassword && confirmPassword !== ''
            ? 'The passwords do not match'
            : ''}
        </p>
      </div>
    </Layout>
  );
};

export default SignUp;
