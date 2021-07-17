import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';

import Home from 'Pages/Home';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" component={Home} exact />

      <Redirect from="*" to="/" />
    </Switch>
  );
};

export default Routes;
