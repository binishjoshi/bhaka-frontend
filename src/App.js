import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Landing from './routes/Landing';
import SignIn from './routes/SignIn';
import SignUp from './routes/SignUp';

const App = () => {
  return (
    <Switch>
      <Route path='/'>
        <Landing />
      </Route>
      <Route path='/signin'>
        <SignIn />
      </Route>
      <Route path='/signup'>
        <SignUp />
      </Route>
    </Switch>
  );
};

export default App;
