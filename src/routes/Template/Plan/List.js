import { PureComponent } from 'react'
import styles from './List.less'
import { Input, Select } from 'antd';
import { routerRedux } from 'dva/router'
import { connect } from 'dva'

import PlanListCard from 'components/PlanListCard'

const Search = Input.Search;
const Option = Select.Option;

class Plan extends PureComponent {
	state = {
		listData: [{
			id: '1',
			title: '杭州市市级医院院级随访计划市级医院院级随访计划',
			type: '普通随访量表',
			dept: '肾内科',
			diseaseArea: '十七病区、十六病区、十六病区',
			diagnose: '肾小球肾炎、肾小球肾炎肾小球肾炎肾小球肾炎',
			status: true
		},{
			id: '2',
			title: '杭州市市级医院院级随访计划市级医院院级随访计划',
			type: '普通随访量表',
			dept: '肾内科',
			diseaseArea: null,
			diagnose: null,
			status: true
		},{
			id: '3',
			title: '杭州市市级医院院级随访计划市级医院院级随访计划',
			type: '普通随访量表',
			dept: '肾内科',
			diseaseArea: null,
			diagnose: null,
			status: true
		},{
			id: '4',
			title: '杭州市市级医院院级随访计划市级医院院级随访计划',
			type: '普通随访量表',
			dept: '肾内科',
			diseaseArea: '十七病区、十六病区、十六病区',
			diagnose: null,
			status: true
		},{
			id: '5',
			title: '杭州市市级医院院级随访计划市级医院院级随访计划',
			type: '普通随访量表',
			dept: '肾内科',
			diseaseArea: '十七病区、十六病区、十六病区',
			diagnose: '肾小球肾炎、肾小球肾炎肾小球肾炎肾小球肾炎',
			status: false
		},{
			id: '6',
			title: '杭州市市级医院院级随访计划市级医院院级随访计划',
			type: '普通随访量表',
			dept: '肾内科',
			diseaseArea: null,
			diagnose: null,
			status: false
		},{
			id: '7',
			title: '杭州市市级医院院级随访计划市级医院院级随访计划',
			type: '普通随访量表',
			dept: '肾内科',
			diseaseArea: null,
			diagnose: null,
			status: false
		}]
	}
	handleChange(value) {
  		console.log(`selected ${value}`);
	}
	goDetail = () => {
		this.props.dispatch(routerRedux.push('/template/plan/profile'));
	}
	render() {
		const { listData } = this.state
		return (
			<div>
				<div className={styles.content}>
					<div className={`${styles.title} clearfix`}>
						<div className={styles.titleText}>
							<i className={`iconfont icon-tongyongbiaotiicon ${styles.titleIcon}`}></i><span>随访计划</span>
						</div>
						<div className={styles.titleBtn}>
							<span className={styles.addBtn}>
								<i className={`iconfont icon-tianjiaicon ${styles.titleIcon}`}></i><span className={styles.text}>创建随访计划</span>
							</span>
							<Search
								style={{width: 320}}
						      	placeholder="模版标题"
						      	onSearch={value => console.log(value)}
						      	enterButton
						    />
						</div>
					</div>
					<div className={styles.selectWrap}>
						<span className={styles.text}>类型</span>
						<Select defaultValue="lucy" style={{ width: 250 }} onChange={this.handleChange}
							allowClear>
					      	<Option value="lucy">Lucy</Option>
					      	<Option value="111">111</Option>
					      	<Option value="222">222</Option>
					      	<Option value="333">333</Option>
					    </Select>
					    <span className={styles.text}>状态</span>
						<Select defaultValue="lucy" style={{ width: 250 }} onChange={this.handleChange}
							allowClear>
					      	<Option value="lucy">Lucy</Option>
					      	<Option value="111">111</Option>
					      	<Option value="222">222</Option>
					      	<Option value="333">333</Option>
					    </Select>
					</div>
					<div className={styles.planList}>
						{
							listData.map(item => (
								<PlanListCard key={item.id} listData={item} goDetail={this.goDetail}></PlanListCard>
							))
						}
					</div>
				</div>
			</div>
		)
	}
}

export default connect(({ plan }) => ({
  plan
}))(Plan);