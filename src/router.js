import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import { getRouterData } from './common/router'; 

function RouterConfig({ history, app }) {
  const routerData = getRouterData(app)
  const BasicLayout = routerData['/'].component
  const passProps = {
  	routerData
  }
  return (
    <Router history={history}>
      <Switch>
        <Route 
          path="/" 
          render={props => <BasicLayout {...props} {...passProps}/>} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
