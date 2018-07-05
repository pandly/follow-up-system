import { PureComponent } from 'react'
import styles from './List.less'
import { Input, Tabs, Select, DatePicker, Table, Tooltip, Breadcrumb, Spin } from 'antd';
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import moment from 'moment'

import Empty from 'components/Empty'

const Search = Input.Search;
const TabPane = Tabs.TabPane;
const Option = Select.Option;
const { RangePicker } = DatePicker;

const statusDom = (text, record) => {
	switch(text.task.status){
		case 'WAIT':
			return (
				<span className={styles.red}>待随访</span>
			)
		case 'COMPLETE':
			return (
				<span >已随访</span>
			)
		case 'OVERDUE':
			return (
				<span >随访逾期</span>
			)
		case 'NO_START':
			return (
				<span >时间未到</span>
			)
		default :
			return (
				<span >暂无</span>
			)
	}
		
} 

class Satisfaction extends PureComponent {
	state = {
		tabType: 'wait',
    	stayCurrentPage: 1,
    	alreadyCurrentPage: 1,
    	searchCurrentPage: 1,
		pageSize: 15,
		deptChoosed: '',
		doctorChoosed: '',
		dischargeStartTime: null,
		dischargeEndTime: null,
		followStartTime: null,
		followEndTime: null,
		tabPanes: [{
			title: '待回访',
			key: 'wait'
		},{
			title: '已回访',
			key: 'already'
		}],
		searchValue: ''
	}

	goDetail (item){
		this.props.dispatch(routerRedux.push(`/satisfaction/returnVisit/profile/${item.inhospitalId}`));
	}

	changeType=(key)=> {
  		if(key!=='search'){
  			this.getDeptAndDoc(key)
  			const now = new Date()
			if(now.getDate()>7){
				this.setState({
			  		tabType: key,
			  		deptChoosed: '',
					doctorChoosed: '',
					dischargeStartTime: moment(now).startOf('month').subtract(1,'months'),
					dischargeEndTime: moment(now).endOf('month').subtract(1,'months'),
					followStartTime: null,
					followEndTime: null
			  	}, ()=> {
					this.getData(0)
				})
			}else{
				this.setState({
			  		tabType: key,
			  		deptChoosed: '',
					doctorChoosed: '',
					dischargeStartTime: moment(now).startOf('month').subtract(2,'months'),
					dischargeEndTime: moment(now).endOf('month').subtract(2,'months'),
					followStartTime: null,
					followEndTime: null
			  	}, ()=> {
					this.getData(0)
				})
			}
  		}else{
  			
  		}
	  	
	}

	handleOutDateChange=(date, dateString)=> {
  		const startTime = dateString[0]
  		const endTime = dateString[1]
  		this.setState({
  			dischargeStartTime: startTime===''?null:moment(startTime),
  			dischargeEndTime: endTime===''?null:moment(endTime)
  		}, ()=>{
  			this.getData(0)
  		})
	}
	handleFollowDateChange=(date, dateString)=> {
  		const startTime = dateString[0]
  		const endTime = dateString[1]
  		this.setState({
  			followStartTime: startTime===''?null:moment(startTime),
  			followEndTime: endTime===''?null:moment(endTime)
  		}, ()=>{
  			this.getData(0)
  		})
	}
	handleDeptChange=(value)=> {
		if(value){
  			this.props.dispatch({
				type: 'global/fetchDoctors',
				payload: {
					type: 'satisfyStay',
					departmentId: value
				}
			}).then(()=>{
				this.setState({
		  			deptChoosed: value
		  		}, ()=>{
	  				this.getData(0)
	  			})
			})
  			
  		}else{
  			this.props.dispatch({
				type: 'global/fetchDoctors',
				payload: {
					type: 'satisfyStay',
					departmentId: ''
				}
			}).then(()=>{
				this.setState({
		  			deptChoosed: ''
		  		}, ()=>{
	  				this.getData(0)
	  			})
			})
  		}
  		
	}
	handleDoctorChange=(value)=> {
  		if(value){
  			this.setState({
	  			doctorChoosed: value
	  		}, ()=>{
	  			this.getData(0)
	  		})
  		}else{
  			this.setState({
	  			doctorChoosed: ''
	  		}, ()=>{
	  			this.getData(0)
	  		})
  		}
  		
	}

	getDeptAndDoc(type){
		if(type=='init'||type=='wait'){
			this.props.dispatch({
				type: 'global/fetchDepartment',
				payload: {
					type: 'satisfyStay'
				}
			})
			// this.props.dispatch({
			// 	type: 'global/fetchDoctors',
			// 	payload: 'satisfyStay'
			// })
		}else if(type=='already'){
			this.props.dispatch({
				type: 'global/fetchDepartment',
				payload: {
					type: 'satisfyStay'
				}
			})
			// this.props.dispatch({
			// 	type: 'global/fetchDoctors',
			// 	payload: 'satisfyAlready'
			// })
		}
		
	}

	getData(start, type){
		
		if(type&&type==='page'){
			if(this.state.tabType==='wait'){
				this.props.dispatch({
					type: 'satisfaction/fetchStay',
					payload: {
						startIndex: start,
						resident: this.state.doctorChoosed,
						department: this.state.deptChoosed,
						startTime: this.state.dischargeStartTime,
						endTime: this.state.dischargeEndTime,
						followStartTime: this.state.followStartTime,
						followEndTime: this.state.followEndTime
					}
				})
			}else if(this.state.tabType==='already'){
				this.props.dispatch({
					type: 'satisfaction/fetchAlready',
					payload: {
						startIndex: start,
						resident: this.state.doctorChoosed,
						department: this.state.deptChoosed,
						startTime: this.state.dischargeStartTime,
						endTime: this.state.dischargeEndTime,
						followStartTime: this.state.followStartTime,
						followEndTime: this.state.followEndTime
					}
				})
			}
		}else{
			this.props.dispatch({
				type: 'satisfaction/fetchInit',
				payload: {
					startIndex: start,
					resident: this.state.doctorChoosed,
					department: this.state.deptChoosed,
					startTime: this.state.dischargeStartTime,
					endTime: this.state.dischargeEndTime,
					followStartTime: this.state.followStartTime,
					followEndTime: this.state.followEndTime
				}
			})
		}
		
			
	}
	
	changeStayPage=(page)=>{
		const current = (page.current-1)*15
		this.setState({
			stayCurrentPage: page.current
		})
		this.getData(current,'page')
	}
	changeAlreadyPage=(page)=>{
		const current = (page.current-1)*15
		this.setState({
			alreadyCurrentPage: page.current
		})
		this.getData(current,'page')
	}
	searchPatient=(value)=>{		
		const panes = this.state.tabPanes
		if(panes.length<3){
			panes.push({
				title: '搜索内容',
				key: 'search'
			})
		}
		
		this.setState({
			tabPanes: panes,
	  		tabType: 'search',
	  		searchValue: value
	  	},()=>{
	  		this.getSearchData(0,value)
	  	})
	  	
	}
	changeSearchPage=(page)=>{
		const current = (page.current-1)*15
		this.setState({
			searchCurrentPage: page.current
		})
		this.getSearchData(current, this.state.searchValue)
	}

	getSearchData(current,value){
		this.props.dispatch({
			type: 'satisfaction/fetchSatisfySearch',
			payload: {
				patient: value,
				startIndex: current
			}
		})
	}

	disabledDate(current){
		return current && current>moment().endOf('day')
	}


	componentDidMount( ){
		this.getDeptAndDoc('init')
		const now = new Date()
		if(now.getDate()>7){
			this.setState({
				dischargeStartTime: moment(now).startOf('month').subtract(1,'months'),
				dischargeEndTime: moment(now).endOf('month').subtract(1,'months')
			},()=>{
				this.getData(0)
			})
		}else{
			this.setState({
				dischargeStartTime: moment(now).startOf('month').subtract(2,'months'),
				dischargeEndTime: moment(now).endOf('month').subtract(2,'months')
			},()=>{
				this.getData(0)
			})
		}
		
		
	}


	render() {
		const {
			stayCurrentPage,
			alreadyCurrentPage,
			searchCurrentPage,
			pageSize,
			deptChoosed,
			doctorChoosed,
			dischargeStartTime,
			dischargeEndTime,
			followStartTime,
			followEndTime,
			tabType,
			tabPanes
		} = this.state
		const {
			rate,
			stayFollow, 
			alreadyFollow, 
			searchFollow,  
			loading,
			searchLoading, 
			stayPageTotal, 
			alreadyPageTotal,
			searchPageTotal
		} = this.props.satisfaction
		const {departmentList, doctorList} = this.props.global
		const columns = [{
			title: '姓名',
			dataIndex: 'patientName',
			key: 'patientName'
		},{
			title: '出院科室',
			dataIndex: 'hospitalizationDepartment',
			key: 'hospitalizationDepartment',
			render: (text, record) => (
				<span className={`${styles.deptHidden} text-hidden`}>{text}</span>
			)
		},{
			title: '随访人员',
			dataIndex: 'resident',
			key: 'resident'
		},{
			title: '出院诊断',
			dataIndex: 'dischargeDiagnosis',
			key: 'dischargeDiagnosis',
			render: (text, record) => (
				<span className={`${styles.textHidden} text-hidden`}>{text}</span>
			)
		},{
			title: '出院日期',
			dataIndex: 'dischargeTime',
			key: 'dischargeTime'
		},{
			title: '随访状态',
			key: 'status',
			render: (text, record) => statusDom(text, record)
		},{
			title: '随访日期',
			dataIndex: 'followTime',
			key: 'followTime',
			render: (text, record) => (
				<span>{record.task.followTime}</span>
			)
		},{
			title: '随访时长',
			dataIndex: 'callTime',
			key: 'callTime',
			render: (text, record) => (
				<span>{record.task.callTime}</span>
			)
		},{
			title: '操作',
			key: 'action',
			render: (text, record) => (
				<a className="aLink" onClick={()=>this.goDetail(record)}>开始回访</a>
			)
		}]
		const columns2 = [{
			title: '姓名',
			dataIndex: 'patientName',
			key: 'patientName'
		},{
			title: '出院科室',
			dataIndex: 'hospitalizationDepartment',
			key: 'hospitalizationDepartment',
			render: (text, record) => (
				<span className={`${styles.deptHidden} text-hidden`}>{text}</span>
			)
		},{
			title: '回访人员',
			dataIndex: 'resident',
			key: 'resident'
		},{
			title: '回访日期',
			dataIndex: 'followTime',
			key: 'followTime',
			render: (text, record) => (
				<span>{record.task.followTime}</span>
			)
		},{
			title: '出院诊断',
			dataIndex: 'dischargeDiagnosis',
			key: 'dischargeDiagnosis',
			render: (text, record) => (
				<span className={`${styles.textHidden} text-hidden`}>{text}</span>
			)
		},{
			title: '出院日期',
			dataIndex: 'dischargeTime',
			key: 'dischargeTime'
		},{
			title: '随访状态',
			key: 'status',
			render: (text, record) => statusDom(text, record)
		},{
			title: '随访时长',
			dataIndex: 'callTime',
			key: 'callTime',
			render: (text, record) => (
				<span>{record.task.callTime}</span>
			)
		},{
			title: '操作',
			key: 'action',
			render: (text, record) => (
				<a className="aLink"
					onClick={()=>this.goDetail(record)}>查看回访</a>
			)
		}]

		return (
			<div>
				<div className={styles.contentWrap}>
					<Breadcrumb separator=">">
					    <Breadcrumb.Item>满意度</Breadcrumb.Item>
					    <Breadcrumb.Item>满意度回访</Breadcrumb.Item>
				  	</Breadcrumb>
					<div className={`${styles.title} clearfix`}>
						<div className={styles.titleText}>
							<i className={`iconfont icon-tongyongbiaotiicon ${styles.titleIcon}`}></i><span>满意度回访</span>
						</div>
						<div className={styles.titleBtn}>
							<Search
								style={{width: 320}}
						      	placeholder="患者姓名/住院号"
						      	onSearch={this.searchPatient}
						      	enterButton
						    />
						</div>
					</div>
					<div className={styles.content}>
						<Tabs activeKey={tabType} onChange={this.changeType}>
							{tabPanes.map(item => (
								<TabPane tab={item.title} key={item.key}></TabPane>
							))}
					  	</Tabs>
					  	{
					  		tabType==='search'?''
					  		:
					  			<div>
					  				<div className={styles.selectWrap}>
							    		<div className={styles.selectItem}>
							    			<span className={styles.text}>科室</span>
											<Select defaultValue="全部" style={{ width: 150 }} onChange={this.handleDeptChange}
												value={deptChoosed}>
									      		<Option value="">全部</Option>
										      	{departmentList.map(item => (
										      		<Option key={item.departmentId} value={item.departmentId}
										      			title={item.departmentName}>{item.departmentName}</Option>
										      	))}
									    	</Select>
							    		</div>
							    		<div className={styles.selectItem}>
							    			<span className={styles.text}>主管医生</span>
											<Select defaultValue="全部" style={{ width: 150 }} onChange={this.handleDoctorChange}
												value={doctorChoosed}>
										      	<Option value="">全部</Option>
										      	{doctorList.map(item => (
										      		<Option key={item.workerId} value={item.workerId}>{item.workerName}</Option>
										      	))}
										    </Select>
							    		</div>
							    		<div className={styles.selectItem}>
							    			<span className={styles.text}>随访日期</span>
											<RangePicker onChange={this.handleFollowDateChange} placeholder={['yyyy-mm-dd', 'yyyy-mm-dd']}
												value={[followStartTime,followEndTime]}
												style={{ width: 250 }}
												disabledDate={this.disabledDate}/>
							    		</div>
							    		<div className={styles.selectItem}>
							    			<span className={styles.text}>出院日期</span>
											<RangePicker onChange={this.handleOutDateChange} placeholder={['yyyy-mm-dd', 'yyyy-mm-dd']}
												style={{ width: 250 }}
												disabledDate={this.disabledDate}
												value={[dischargeStartTime,dischargeEndTime]}/>
							    		</div>
							    	</div>
							    	<div className={styles.infoWrap}>
							    		<div className={styles.infoItem}>
							    			<span className={styles.label}>已回访</span>
							    			<span className={styles.text}>{alreadyPageTotal}</span>
							    		</div>
							    		<div className={styles.infoItem}>
							    			<span className={styles.label}>出院患者</span>
							    			<span className={styles.text}>{alreadyPageTotal+stayPageTotal}</span>
							    		</div>
							    		<div className={styles.infoItem}>
							    			<span className={styles.label}>回访率</span>
							    			<span className={`${styles.text} ${rate>10?styles.green:styles.red}`}
							    				>{rate}%</span>
							    		</div>
							    		<Tooltip placement="top" title={`${rate>10?'您已完成回访率指标':'您尚未达到回访率指标，请尽快完成'}`}
					        				overlayClassName={`${rate>10?'alreadySignTooltip':'signTooltip'}`}>
							        		<i className={`iconfont icon-information ${styles.infoIcon}`}></i>
							    		</Tooltip>
							    	</div>
					  			</div>
					  	}
					  	
				    	{
				    		tabType==='wait'?
				    			<Spin spinning={loading} size="large">
					    			<div className={styles.table}>
					    				{
					    					stayFollow.length<1&&!loading?
					    					<Empty></Empty>
					    					:
											<Table dataSource={stayFollow} columns={columns} pagination={{
													current: stayCurrentPage,
													pageSize: pageSize,
													total: stayPageTotal,
													showQuickJumper: true
												}}
												rowKey="inhospitalId"
												onChange={this.changeStayPage}/>
										}
									</div>
								</Spin>
								:
								tabType==='already'?
								<Spin spinning={loading} size="large">
					    			<div className={styles.table}>
					    				{
					    					alreadyFollow.length<1&&!loading?
					    					<Empty></Empty>
					    					:
											<Table dataSource={alreadyFollow} columns={columns2} pagination={{
												current: alreadyCurrentPage,
												pageSize: pageSize,
												total: alreadyPageTotal,
												showQuickJumper: true
												}}
												rowKey="inhospitalId"
												onChange={this.changeAlreadyPage}/>
					    				}
								
									</div>
								</Spin>
								:
								<Spin spinning={searchLoading} size="large">
					    			<div className={styles.table}>
					    				{
					    					searchFollow.length<1&&!searchLoading?
					    					<Empty></Empty>
					    					:
											<Table dataSource={searchFollow} columns={columns2} pagination={{
												current: searchCurrentPage,
												pageSize: pageSize,
												total: searchPageTotal,
												showQuickJumper: true
												}}
												rowKey="inhospitalId"
												onChange={this.changeSearchPage}/>
					    				}
								
									</div>
								</Spin>
						}
					</div>
				</div>
			</div>
		)
	}
}

export default connect(({ satisfaction, global }) => ({
  satisfaction, global
}))(Satisfaction);