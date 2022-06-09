import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Footer from './persistent-components/Footer';
import Header from './persistent-components/Header';

import Landing from './routes/Landing';
import SignIn from './routes/SignIn';
import SignUp from './routes/SignUp';

const App = () => {
  return (
    <>
      <Header />
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
      <Footer />
    </>
  );
};

export default App;
