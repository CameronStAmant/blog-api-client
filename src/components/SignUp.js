import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Layout from './Layout';
import baseUrl from '../const';
import Button from './Button';
import Input from './Input';

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
      fetch(baseUrl + '/signup', requestOptions).then(() =>
        history.push('/login')
      );
    } else {
    }
  };

  return (
    <Layout>
      <div className="grid place-content-center">
        <form className="text-center row-start-2 self-end">
          <label htmlFor="username-field">Username:</label>
          <br />
          <Input
            type="text"
            id="username-field"
            name="username"
            value={username ? username : ''}
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
          <label htmlFor="email-field">Email:</label>
          <br />
          <Input
            type="email"
            id="email-field"
            name="email"
            value={email ? email : ''}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <label htmlFor="password-field">Password:</label>
          <br />
          <Input
            type="password"
            id="password-field"
            name="password"
            value={password ? password : ''}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <label htmlFor="password-confirmation-field">Confirm Password:</label>
          <br />
          <Input
            type="password"
            id="password-confirmation-field"
            name="password-confirmation"
            value={confirmPassword ? confirmPassword : ''}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <br />
          <Button
            value="Login"
            color="green"
            type="submit"
            onClick={handleSubmit}
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
