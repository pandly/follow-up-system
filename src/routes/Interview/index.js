import React, { PureComponent } from 'react';
import { Route, Redirect, Switch } from 'dva/router';
import { getRoutes } from 'utils/router';

export default class Interview extends PureComponent {

  render() {
    const { match, routerData } = this.props;
    return (
      <Switch>
        {
          getRoutes(match.path, routerData).map(item => {
            return (
              <Route
                key={item.key}
                path={item.path}
                component={item.component}
                exact={item.exact}
              />
            )
          })
        }
        <Redirect exact from="/interview/satisfaction" to="/interview/satisfaction/list" />
      </Switch>
    );
  }
}
