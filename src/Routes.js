import React, { useState, useEffect } from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import App from './App';
import Login from './components/Login';
import Logout from './components/Logout';
import SignUp from './components/SignUp';
import PostDetails from './components/PostDetails';
import baseUrl from './const';

const Routes = () => {
  const [auth, setAuth] = useState(false);
  const [username, setUsername] = useState(null);
  const [userId, setUserId] = useState(null);
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
      fetch(baseUrl + '/auth', requestOptions)
        .then((response) => {
          return response.json();
        })
        .then((results) => {
          setAuth(results.response);
          setUsername(results.username);
          setUserId(results.userId);
          setRefresh(false);
        });
    } else {
      setAuth(false);
      setUsername(null);
      setUserId(null);
      setRefresh(false);
    }
  };

  useEffect(() => {
    authChecker();
  }, [refresh]);

  return (
    <HashRouter forceRefresh>
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
          render={() => <PostDetails authState={auth} userId={userId} />}
        />
      </Switch>
    </HashRouter>
  );
};

export default Routes;
