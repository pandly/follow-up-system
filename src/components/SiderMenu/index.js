import { Component } from 'react'
import MenuTree from './MenuTree'
import styles from './index.less'

class SiderMenu extends Component {
	render() {
		const { location, menuData } = this.props
		const menus = menuData.map((node, index) => 
			<MenuTree 
			  key={node.path} 
			  currentNode={node} 
			  level={0} 
			  currentPath={location.pathname}
			/>
		)
		return (
			<div className={styles.sider}>
				<ul className={styles.menu}>
					{menus}
				</ul>
			</div>
		)
	}
}

export default SiderMenu
