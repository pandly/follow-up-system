import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import { getRouterData } from './common/router'; 
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';

function RouterConfig({ history, app }) {
  const routerData = getRouterData(app)
  const BasicLayout = routerData['/'].component
  const passProps = {
  	routerData
  }
  return (
    <LocaleProvider locale={zhCN}>
      <Router history={history}>
        <Switch>
          <Route 
            path="/" 
            render={props => <BasicLayout {...props} {...passProps}/>} />
        </Switch>
      </Router>
    </LocaleProvider>
  );
}

export default RouterConfig;
