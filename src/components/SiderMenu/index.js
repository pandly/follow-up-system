import { Component } from 'react'
import { NavLink } from 'dva/router';
import styles from './index.less'

class SiderMenu extends Component {
    constructor(props) {
    	super(props)
    	this.menus = props.menuData;
    }
    
    getMenuItemPath = (item) => {
    	const { path, name } = item;
		return (
			<NavLink
		      to={path}
		      activeClassName="actived"
		      replace={path === this.props.location.pathname}
		    >
		      <span>{name}</span>
		    </NavLink>
		)
    }

    getNavMenuItems = (menusData) => {
		if(!menusData) {
			return []
		}
		return menusData.map(data => {
			const icon = `icon-${data.icon}`
			if(data.children){
				return (
					<li key={data.path} className={styles['menu-subMenu']}>
						<div className={styles['subMenu-title']}>
							<i className={`${icon} ${styles['subMenu-title-icon']}`}></i>
							<span className={styles['subMenu-title-text']}>{data.name}</span>
						</div>
						<ul className={styles['menu-inline']}>
							{this.getNavMenuItems(data.children)}
						</ul>
					</li>
				)
			}else{
				return <li key={data.path} className={styles['menu-item']}>{this.getMenuItemPath(data)}</li>
			}
		})
    }

	render() {
		return (
			<div className={styles.sider}>
				<ul className={styles.menu}>
					{this.getNavMenuItems(this.menus)}
				</ul>
			</div>
		)
	}
}

export default SiderMenu
