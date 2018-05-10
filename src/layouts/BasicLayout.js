import { Component, Fragment } from 'react'
//import PropTypes from 'prop-types';
//import DocumentTitle from 'react-document-title';
// import { connect } from 'dva';
import { Route, Redirect, Switch } from 'dva/router';
import Header from 'components/Header'
import SiderMenu from 'components/SiderMenu'
import { getMenuData } from '../common/menu'
import { getRoutes } from 'utils/router'

import styles from './BasicLayout.less';

class BasicLayout extends Component {
	render() {
		const { match, routerData } = this.props
		const passProps = {
			routerData
		}
		return (
			<Fragment>
				<Header />
                <SiderMenu 
                  menuData={ getMenuData() }
                  {...this.props}
                />
                <div className={styles.content}>
                	<Switch>
                		{
                			getRoutes(match.path, routerData).map(item => (
								<Route
								  key={item.key}
			                      path={item.path}
			                      render={ props => <item.component {...props} {...passProps} /> }
								/>
                			))
                		}
                		<Redirect exact from="/" to="/manage/todayMission" />
                	</Switch>
                </div>
			</Fragment>
		)
	}
}

export default BasicLayout