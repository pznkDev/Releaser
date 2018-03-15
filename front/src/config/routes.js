import React from 'react';
import {Route, Switch} from 'react-router-dom';

import Main from '../components/main_page/main_page'
import Statistic from '../components/statistic'
import Bugs from "../components/bugs/bugs";


const routes = (
  <Switch>
      <Route exact path="/" component={Main}/>
      <Route path="/bugs" component={Bugs}/>
      <Route exact path="/statistics" component={Statistic}/>
  </Switch>
);

export default routes;
