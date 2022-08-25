import React, { useCallback, useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';

import Header from './persistent-components/Header';

import Landing from './routes/Landing';
import SignIn from './routes/SignIn';
import SignUp from './routes/SignUp';
import Player from './routes/Player';

import { AuthContext } from './context/auth-context';

import './App.css';

const App = () => {
  const [token, setToken] = useState(false);
  const [username, setUsername] = useState(null);

  const login = useCallback((username, token) => {
    setToken(token);
    setUsername(username);
    localStorage.setItem(
      'userData',
      JSON.stringify({
        username,
        token,
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUsername(null);
    localStorage.removeItem('userData');
  }, []);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if (storedData && storedData.token) {
      login(storedData.username, storedData.token);
    }
  }, [login]);

  let body;

  if (token) {
    body = <Player />;
  } else {
    body = (
      <>
        <Header />
        <div className='body-container'>
          <Switch>
            <Route path='/' exact>
              <Landing />
            </Route>
            <Route path='/sign-in'>
              <SignIn />
            </Route>
            <Route path='/sign-up'>
              <SignUp />
            </Route>
          </Switch>
        </div>
      </>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        login: login,
        logout: logout,
        username: username,
      }}
    >
      {body}
    </AuthContext.Provider>
  );
};

export default App;
