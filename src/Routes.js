import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from './App';
import Login from './components/Login';
import SignUp from './components/SignUp';
import PostDetails from './components/PostDetails';
import Logout from './components/Logout';

const Routes = () => {
  const [auth, setAuth] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const authChecker = () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('user'),
      },
    };
    if (localStorage.getItem('user')) {
      fetch('http://localhost:3000/auth', requestOptions)
        .then((response) => {
          return response.json();
        })
        .then((results) => {
          setAuth(results);
          setRefresh(false);
        });
    } else {
      setAuth(false);
      setRefresh(false);
    }
  };

  useEffect(() => {
    authChecker();
  }, [refresh]);

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" render={() => <App authState={auth} />} />
        <Route
          exact
          path="/login"
          render={() => <Login authRefresh={(state) => setRefresh(state)} />}
        />
        <Route exact path="/signUp" component={SignUp} />
        <Route
          exact
          path="/logout"
          render={() => <Logout authRefresh={(state) => setRefresh(state)} />}
        />
        <Route
          exact
          path="/posts/:id"
          render={() => <PostDetails authState={auth} />}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
