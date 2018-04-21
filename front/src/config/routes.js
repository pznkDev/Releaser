import React from 'react';
import {Route, Switch} from 'react-router-dom';

import Statistic from '../components/statistic/index'
import Bugs from '../components/bugs/bugs';
import Poll from '../components/poll_page/poll_page';


const routes = (
  <Switch>
      <Route exact path="/" component={Poll}/>
      <Route path="/bugs" component={Bugs}/>
      <Route path="/statistics" component={Statistic}/>
  </Switch>
);

export default routes;
