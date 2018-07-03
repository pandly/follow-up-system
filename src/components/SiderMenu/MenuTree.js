import { PureComponent } from 'react'
import CollapseTransition from './CollapseTransition'
import { Icon } from 'antd'
import { NavLink } from 'dva/router'
import styles from './index.less'

class MenuTree extends PureComponent {
    constructor(props) {
    	super(props)
    	this.state = {
    		spread: true  //默认所有菜单展开
    	}
    }

    componentDidMount() {
		const { currentNode, currentPath } = this.props
		this.matchCurrentPath(currentPath, currentNode.path)
    }
        
    componentWillReceiveProps(nextProps) {
		const { currentNode, currentPath } = nextProps
		this.matchCurrentPath(currentPath, currentNode.path)
    }

    clickSubMenu = () => {
		this.setState(prevState => ({
			spread: !prevState.spread
		}))
    }
    // 将在该菜单路径下的所有菜单展开
    matchCurrentPath = (matchPath, path) => {
        if(matchPath === path){
       		this.setState({spread: true})
			return;
        }
        const arr1 = matchPath.replace('/', '').split('/')
        const arr2 = path.replace('/', '').split('/')
        if(arr2.every((data, index) => data === arr1[index])) {
       		this.setState({spread: true})
        }
    }

	render() {
		let childrenItems = null
		const { currentNode, level, currentPath } = this.props
		const { spread } = this.state
		const paddingLeft = { paddingLeft: 24 + level * 33 }
      
		if(currentNode.children) {
			childrenItems = currentNode.children.map(node => <MenuTree key={node.path} currentNode={node} level={level + 1} currentPath={currentPath} />)
		    return (
				<li className={styles['menu-subMenu']}>
					<div className={styles['subMenu-title']} style={paddingLeft} onClick={this.clickSubMenu}>
					    <span className={styles['subMenu-title-text']}>
						    {currentNode.icon && <i className={`iconfont ${currentNode.icon} menu-icon`}></i>}
							<span className="bold">{currentNode.name}</span>
						</span>
						{/*<Icon type="down" className={ `${styles['subMenu-icon-arrow']} ${spread && styles['subMenu-icon-arrow-up']}`}/>*/}
					</div>
					<CollapseTransition isSpread={spread} >
						<ul className={ styles['menu-inline'] }>
							{childrenItems}
						</ul>
					</CollapseTransition>
				</li>
		    )
		}else {
			return (
				<li className={styles['menu-item']}>
					<NavLink
				      to={currentNode.path}
				      activeClassName="actived"
				      style={paddingLeft}>
				      {currentNode.icon && <i className={`${currentNode.icon} menu-icon`}></i>}
				      <span>{currentNode.name}</span>
				    </NavLink>
			    </li>
			)
		}
	}
}

export default MenuTree
