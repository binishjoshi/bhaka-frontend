import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './persistent-components/Header';

import Landing from './routes/Landing';
import SignIn from './routes/SignIn';
import SignUp from './routes/SignUp';

import './App.css';

const App = () => {
  return (
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
};

export default App;
