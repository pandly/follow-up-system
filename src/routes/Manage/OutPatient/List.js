import { PureComponent } from 'react'
import styles from './List.less'
import { Tabs, Select, DatePicker, Table, Input, Breadcrumb, Spin } from 'antd';
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import moment from 'moment'

import Empty from 'components/Empty'

const TabPane = Tabs.TabPane;
const Option = Select.Option;
const { RangePicker } = DatePicker;
const Search = Input.Search;

const statusDom = (text, record) => {
	switch(record.task.endStatus){
		case 0:
			return (
				<span>未结案</span>
			)
		case 1:
			return (
				<span >已结案</span>
			)
		default :
			return (
				<span >暂无</span>
			)
	}
		
}

class OutPatient extends PureComponent {
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
			title: '待随访',
			key: 'wait'
		},{
			title: '已随访',
			key: 'already'
		}],
		searchValue: ''
  	}
  	goDetail(item){
  		this.props.dispatch(routerRedux.push(`/manage/outPatient/profile/${item.inhospitalId}`));
  	}
  	changeType=(key)=> {
  		if(key!=='search'){
  			this.getDeptAndDoc(key)
  			this.setState({
		  		tabType: key,
		  		deptChoosed: '',
				doctorChoosed: '',
				dischargeStartTime: null,
				dischargeEndTime: null,
				followStartTime: null,
				followEndTime: null
		  	}, ()=> {
				this.getData(0)
			})
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
  			this.setState({
	  			deptChoosed: value
	  		}, ()=>{
  				this.getData(0)
  			})
  		}else{
  			this.setState({
	  			deptChoosed: ''
	  		}, ()=>{
	  			this.getData(0)
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
				payload: 'dischargeStay'
			})
			this.props.dispatch({
				type: 'global/fetchDoctors',
				payload: 'dischargeStay'
			})
		}else if(type=='already'){
			this.props.dispatch({
				type: 'global/fetchDepartment',
				payload: 'dischargeAlready'
			})
			this.props.dispatch({
				type: 'global/fetchDoctors',
				payload: 'dischargeAlready'
			})
		}
		
	}

	getData(start){
		// this.getDeptAndDoc(this.state.tabType)
		if(this.state.tabType==='wait'){
			this.props.dispatch({
				type: 'outPatient/fetchStay',
				payload: {
					startIndex: start,
					resident: this.state.doctorChoosed,
					department: this.state.deptChoosed,
					dischargeStartTime: this.state.dischargeStartTime==null?'':this.state.dischargeStartTime,
					dischargeEndTime: this.state.dischargeEndTime==null?'':this.state.dischargeEndTime,
					followStartTime: this.state.followStartTime==null?'':this.state.followStartTime,
					followEndTime: this.state.followEndTime==null?'':this.state.followEndTime
				}
			})
		}else if(this.state.tabType==='already'){
			this.props.dispatch({
				type: 'outPatient/fetchAlready',
				payload: {
					startIndex: start,
					resident: this.state.doctorChoosed,
					department: this.state.deptChoosed,
					dischargeStartTime: this.state.dischargeStartTime==null?'':this.state.dischargeStartTime,
					dischargeEndTime: this.state.dischargeEndTime==null?'':this.state.dischargeEndTime,
					followStartTime: this.state.followStartTime==null?'':this.state.followStartTime,
					followEndTime: this.state.followEndTime==null?'':this.state.followEndTime
				}
			})
		}
		
	}
	
	changeStayPage=(page)=>{
		const current = (page.current-1)*15
		this.setState({
			stayCurrentPage: page.current
		})
		this.getData(current)
	}
	changeAlreadyPage=(page)=>{
		const current = (page.current-1)*15
		this.setState({
			alreadyCurrentPage: page.current
		})
		this.getData(current)
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
			type: 'outPatient/fetchOutSearch',
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
		this.getData(0)
	}

	render() {
		// const { dataSource, dataSource2, value, tabType } = this.state
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
			stayFollow, 
			alreadyFollow, 
			searchFollow, 
			stayLoading, 
			alreadyLoading, 
			searchLoading, 
			stayPageTotal, 
			alreadyPageTotal,
			searchPageTotal
		} = this.props.outPatient
		const {departmentList, doctorList} = this.props.global
		const columns = [{
			title: '姓名',
			dataIndex: 'patientName',
			key: 'patientName'
		},{
			title: '基本信息',
			key: 'info',
			render: (text, record) => (
				<span>{record.sex}/{record.age}岁</span>
			)
		},{
			title: '科室',
			dataIndex: 'hospitalizationDepartment',
			key: 'hospitalizationDepartment',
			render: (text, record) => (
				<span className={`${styles.deptHidden} text-hidden`}>{text}</span>
			)
		},{
			title: '出院诊断',
			dataIndex: 'dischargeDiagnosis',
			key: 'dischargeDiagnosis',
			render: (text, record) => (
				<span className={`${styles.textHidden} text-hidden`}>{text}</span>
			)
		},{
			title: '主管医生',
			dataIndex: 'resident',
			key: 'resident'
		},{
			title: '出院日期',
			dataIndex: 'dischargeTime',
			key: 'dischargeTime'
		},{
			title: '离院天数',
			key: 'dischargeDays',
			dataIndex: 'dischargeDays',
			render: (text, record) => (
				<span>{text}天</span>
			)
		},{
			title: '待随访日期',
			key: 'followTime',
			render: (text, record) => (
				<span>{record.task.followTime}</span>
			)
		},{
			title: '操作',
			key: 'action',
			render: (text, record) => (
				<a className="aLink" onClick={()=>this.goDetail(record)}>开始随访</a>
			)
		}]
		const columns2 = [{
			title: '姓名',
			dataIndex: 'patientName',
			key: 'patientName'
		},{
			title: '基本信息',
			key: 'info',
			render: (text, record) => (
				<span>{record.sex}/{record.age}岁</span>
			)
		},{
			title: '科室',
			dataIndex: 'hospitalizationDepartment',
			key: 'hospitalizationDepartment',
			render: (text, record) => (
				<span className={`${styles.deptHidden} text-hidden`}>{text}</span>
			)
		},{
			title: '出院诊断',
			dataIndex: 'dischargeDiagnosis',
			key: 'dischargeDiagnosis',
			render: (text, record) => (
				<span className={`${styles.textHidden} text-hidden`}>{text}</span>
			)
		},{
			title: '主管医生',
			dataIndex: 'resident',
			key: 'resident'
		},{
			title: '出院日期',
			dataIndex: 'dischargeTime',
			key: 'dischargeTime'
		},{
			title: '随访日期',
			key: 'followTime',
			render: (text, record) => (
				<span>{record.task.followTime}</span>
			)
		},{
			title: '通话时长',
			key: 'callTime',
			render: (text, record) => (
				<span>{record.task.callTime}</span>
			)
		},{
			title: '状态',
			key: 'status',
			render: (text, record) => statusDom(text, record)
		},{
			title: '操作',
			key: 'action',
			render: (text, record) => (
				<a className="aLink"
					onClick={()=>this.goDetail(record)}>查看随访</a>
			)
		}]
		return (
			<div>
				<div className={styles.contentWrap}>
					<Breadcrumb separator=">">
					    <Breadcrumb.Item>随访管理</Breadcrumb.Item>
					    <Breadcrumb.Item>出院随访</Breadcrumb.Item>
				  	</Breadcrumb>
					<div className={`${styles.title} clearfix`}>
						<div className={styles.titleText}>
							<i className={`iconfont icon-tongyongbiaotiicon ${styles.titleIcon}`}></i><span>出院随访</span>
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
						  		<div className={styles.selectWrap}>
						    		<div className={styles.selectItem}>
						    			<span className={styles.text}>科室</span>
										<Select defaultValue="全部" style={{ width: 150 }} onChange={this.handleDeptChange}
											value={deptChoosed}>
								      		<Option value="">全部</Option>
									      	{departmentList.map(item => (
									      		<Option key={item.departmentId} value={item.departmentName}>{item.departmentName}</Option>
									      	))}
								    	</Select>
						    		</div>
						    		<div className={styles.selectItem}>
						    			<span className={styles.text}>主管医生</span>
										<Select defaultValue="全部" style={{ width: 150 }} onChange={this.handleDoctorChange}
											value={doctorChoosed}>
									      	<Option value="">全部</Option>
									      	{doctorList.map(item => (
									      		<Option key={item.workerId} value={item.workerName}>{item.workerName}</Option>
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
											value={[dischargeStartTime,dischargeEndTime]}
											style={{ width: 250 }}
											disabledDate={this.disabledDate}/>
						    		</div>
						    	</div>
					  	}
					  	
				    	{
				    		tabType==='wait'?
				    			<Spin spinning={stayLoading} size="large">
					    			<div className={styles.table}>
					    				{
					    					stayFollow.length<1&&!stayLoading?
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
								<Spin spinning={alreadyLoading} size="large">
					    			<div className={styles.table}>
					    				{
					    					alreadyFollow.length<1&&!alreadyLoading?
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

export default connect(({ outPatient, global }) => ({
  outPatient, global
}))(OutPatient);