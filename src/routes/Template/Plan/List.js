import { PureComponent } from 'react'
import styles from './List.less'
import { Input, Select, Breadcrumb, Spin, message } from 'antd';
import { routerRedux } from 'dva/router'
import { connect } from 'dva'

import PlanListCard from 'components/PlanListCard'
import Empty from 'components/Empty'

const Search = Input.Search;
const Option = Select.Option;

class Plan extends PureComponent {
	state = {
		isUse: '',
		title: '',
		type: '',
		planList: []
	}
	handleTypeChange=(value)=> {
  		if(value){
  			this.setState({
	  			type: value,
	  			title: ''
	  		}, ()=>{
	  			this.getData()
	  		})
  		}else{
  			this.setState({
	  			type: ''
	  		}, ()=>{
	  			this.getData()
	  		})
  		}
	}
	handleStatusChange=(value)=> {
  		if(value){
  			this.setState({
	  			isUse: value,
	  			title: ''
	  		}, ()=>{
	  			this.getData()
	  		})
  		}else{
  			this.setState({
	  			isUse: ''
	  		}, ()=>{
	  			this.getData()
	  		})
  		}
	}
	searchPlan=(value)=>{
		this.setState({
  			title: value,
  			type: '',
  			isUse: ''
  		}, ()=>{
  			this.getData()
  		})
	}
	searchChange=(e)=>{
		this.setState({
			title: e.target.value
		})
	}
	goDetail(id, type){
		let detailType = ''
		switch(type){
			case false:
				detailType = 'stoped';
				break;
			case true:
				detailType = 'used'
				break;
			case 'detail':
				detailType = 'detail'
				break;
			default:
				detailType = ''
		}
		this.props.dispatch(routerRedux.push(`/template/plan/profile/${detailType}/${id}`));
	}

	sureRestart(id){
		this.props.dispatch({
			type: 'plan/changePlanStatus',
			payload: {
				plantemplateId: id,
				isUse: true
			}
		}).then(()=>{
			message.success('重新发布成功！')
			this.getData()
		})
	}

	getData(){
		this.props.dispatch({
			type: 'plan/fetchPlanList',
			payload: {
				isUse: this.state.isUse==='true'?true:this.state.isUse==='false'?false:'',
				title: this.state.title,
				type: this.state.type
			}
		}).then(()=>{
			let list = []
			this.props.plan.planList.forEach((item)=>{
				const illness = JSON.parse(item.illness)
				const obj = {...item,illness:illness}
				list.push(obj)
			})
			this.setState({
				planList: list
			})
		})
	}

	componentDidMount(){
		this.props.dispatch({
			type: 'global/fetchDepartment',
			payload: {
				type: ''
			}
		})
		this.props.dispatch({
			type: 'global/fetchDict'
		})
		this.getData()
		
	}
	componentWillUnmount(){
		this.props.dispatch({
			type: 'plan/clear'
		})
	}

	render() {
		const { planList, type, isUse, title } = this.state
		const {
			// planList, 
			planListLoading
		} = this.props.plan
		const {departmentList,dictionary} = this.props.global
		return (
			<div>
				<div className={styles.content}>
					<Breadcrumb separator=">">
					    <Breadcrumb.Item>随访模板</Breadcrumb.Item>
					    <Breadcrumb.Item>随访计划</Breadcrumb.Item>
				  	</Breadcrumb>
					<div className={`${styles.title} clearfix`}>
						<div className={styles.titleText}>
							<i className={`iconfont icon-tongyongbiaotiicon ${styles.titleIcon}`}></i><span>随访计划</span>
						</div>
						<div className={styles.titleBtn}>
							<span className={styles.addBtn} onClick={() => this.goDetail('add','detail')}>
								<i className={`iconfont icon-tianjiaicon ${styles.titleIcon}`}></i><span className={styles.text}>创建随访计划</span>
							</span>
							<Search
								value={title}
								onChange={this.searchChange}
								style={{width: 320}}
						      	placeholder="模版标题"
						      	onSearch={this.searchPlan}
						      	enterButton
						    />
						</div>
					</div>
					<div className={styles.selectWrap}>
						<span className={styles.text}>类型</span>
						<Select value={type} style={{ width: 250 }} onChange={this.handleTypeChange}
							allowClear>
							<Option value="">全部</Option>
					      	{
					      		dictionary['PLAN_TEMPLATE_TYPE']?
							      	dictionary['PLAN_TEMPLATE_TYPE'].map(item => (
							      		<Option key={item.code} value={item.code}>{item.value}</Option>
							      	))
					      		:''
		      				}
					    </Select>
					    <span className={styles.text}>状态</span>
						<Select value={isUse} style={{ width: 250 }} onChange={this.handleStatusChange}
							allowClear>
							<Option value="">全部</Option>
					      	<Option value="true">正在使用</Option>
					      	<Option value="false">暂停使用</Option>
					    </Select>
					</div>
					<div className={styles.listWrap}>
						<Spin spinning={planListLoading} size="large">
							<div className={styles.planList}>
								{
									planList&&planList.length<1&&!planListLoading?
										<Empty></Empty>
										:
										planList.map(item => (
											<PlanListCard key={item.planTemplateId} listData={item} 
												departmentList={departmentList}
												dictionary={dictionary}
												goDetail={() => this.goDetail(item.planTemplateId,item.isUse)}
												sureRestart={()=>this.sureRestart(item.planTemplateId)}></PlanListCard>
										))					    					
								}
							</div>
						</Spin>
					</div>
				</div>
			</div>
		)
	}
}

export default connect(({ plan, global }) => ({
  plan, global
}))(Plan);