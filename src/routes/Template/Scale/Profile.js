import { PureComponent } from 'react'
import { Breadcrumb } from 'antd';
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import styles from './Profile.less'

import Questionnair from 'components/Questionnair'

class Scale extends PureComponent {
	goList=()=>{
  		this.props.dispatch(routerRedux.push(`/template/scale/list`));
  	}
	render() {
		const { search } = this.props.location
		return (
			<div className={styles.scaleWrap}>
				<Breadcrumb separator=">">
				    <Breadcrumb.Item>随访模板</Breadcrumb.Item>
				    <Breadcrumb.Item onClick={this.goList}>
				    	<a>随访量表</a>
				    </Breadcrumb.Item>
				    <Breadcrumb.Item>
				    	{
				    		search==''?'创建随访量表':'查看随访量表'
				    	}
				    </Breadcrumb.Item>
			  	</Breadcrumb>
			  	<Questionnair search={search} />
			</div>
			
		)
	}
}

export default connect(({ scale }) => ({
  scale
}))(Scale);