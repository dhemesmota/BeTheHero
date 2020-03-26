import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';

import Logon from './pages/Logon';
import Register from './pages/Register';
import Profile from './pages/Profile';
import NewIncident from './pages/NewIncident';

import Route from './router';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <Logon />
        </Route>
        <Route path="/register" >
          <Register />
        </Route>
        
        <Route path="/profile" isPrivate >
          <Profile />
        </Route>
        
        <Route path="/incidents/new" isPrivate >
          <NewIncident />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}