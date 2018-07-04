import { PureComponent } from 'react'
import { Select, Table, Breadcrumb, DatePicker, Spin } from 'antd'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import styles from './List.less'
import moment from 'moment'
import empty from '../../../assets/noTask.png'

const Option = Select.Option;
const { RangePicker } = DatePicker;

const statusDom = (text, record) => {
	if(text.task.endStatus===1){
		return (
			<span >
				<span className={`${styles.status} ${styles.grey}`}></span>
				<span className={styles.statusText}>已结案</span>
			</span>
		)
	}else if(text.task.endStatus===0||text.task.endStatus===null){
		switch(text.task.status){
			case 'COMPLETE':
				return (
					<span >
						<span className={`${styles.status} ${styles.grey}`}></span>
						<span className={styles.statusText}>已随访</span>
					</span>
				)
			case 'OVERDUE':
				return (
					<span >
						<span className={`${styles.status} ${styles.red}`}></span>
						<span className={styles.statusText}>随访逾期</span>
					</span>
				)
			case 'WAIT':
				return (
					<span >
						<span className={`${styles.status} ${styles.green}`}></span>
						<span className={styles.statusText}>待随访</span>
					</span>
				)
			default :
				return (
					<span >
						<span className={`${styles.status} ${styles.grey}`}></span>
						<span className={styles.statusText}>暂无</span>
					</span>
				)
		}
	}else{
		return (
			<span></span>
		)
	}
	
		
}

class TodayMission extends PureComponent {
    
	state = {
		missionType: 'wait',
		currentPage: 1,
		pageSize: 15,
		deptChoosed: '',
		doctorChoosed: '',
		startTime: null,
		endTime: null
	}
	
	checkProfile(item){
		this.props.dispatch(routerRedux.push(`/manage/todayMission/profile/${item.inhospitalId}`));
	}

	changeTab(type){
		this.getDeptAndDoc(type)
		this.setState({
			missionType: type,
			deptChoosed: '',
			doctorChoosed: '',
			startTime: null,
			endTime: null,
			currentPage: 1
		}, ()=> {
			this.getData(0)
		})
		
	}
	handleDateChange=(date, dateString)=> {
  		const startTime = dateString[0]
  		const endTime = dateString[1]
  		this.setState({
  			startTime: startTime===''?null:moment(startTime),
  			endTime: endTime===''?null:moment(endTime)
  		}, ()=>{
  			this.getData(0)
  		})
	}
	handleDeptChange=(value)=> {
  		if(value){
  			this.props.dispatch({
				type: 'global/fetchDoctors',
				payload: {
					type: 'todayStay',
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
					type: 'todayStay',
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
	
	changePage=(page)=>{
		const current = (page.current-1)*15
		this.setState({
			currentPage: page.current
		})
		this.getData(current)
	}

	getData(start, type){
		// this.getDeptAndDoc(type)
		if(type&&type==='init'){
			this.props.dispatch({
				type: 'todayMission/fetchInit',
				payload: {
					startIndex: start,
					resident: this.state.doctorChoosed,
					department: this.state.deptChoosed,
					dischargeStartTime: this.state.startTime==null?'':this.state.startTime,
					dischargeEndTime: this.state.endTime==null?'':this.state.endTime
				}
			})
		}else{
			if(this.state.missionType==='wait'){
				this.props.dispatch({
					type: 'todayMission/fetchStay',
					payload: {
						startIndex: start,
						resident: this.state.doctorChoosed,
						department: this.state.deptChoosed,
						dischargeStartTime: this.state.startTime==null?'':this.state.startTime,
						dischargeEndTime: this.state.endTime==null?'':this.state.endTime
					}
				})
			}else if(this.state.missionType==='already'){
				this.props.dispatch({
					type: 'todayMission/fetchAlready',
					payload: {
						startIndex: start,
						resident: this.state.doctorChoosed,
						department: this.state.deptChoosed,
						dischargeStartTime: this.state.startTime==null?'':this.state.startTime,
						dischargeEndTime: this.state.endTime==null?'':this.state.endTime
					}
				})
			}
		}
		
		
	}

	getDeptAndDoc(type){
		if(type=='init'||type=='wait'){
			this.props.dispatch({
				type: 'global/fetchDepartment',
				payload: 'todayStay'
			})
			// this.props.dispatch({
			// 	type: 'global/fetchDoctors',
			// 	payload: 'todayStay'
			// })
		}else if(type=='already'){
			this.props.dispatch({
				type: 'global/fetchDepartment',
				payload: 'todayAlready'
			})
			// this.props.dispatch({
			// 	type: 'global/fetchDoctors',
			// 	payload: 'todayAlready'
			// })
		}
		
	}

	disabledDate(current){
		return current && current>moment().endOf('day')
	}

	componentDidMount( ){
		this.getDeptAndDoc('init')
		this.getData(0, 'init')
	}
	
	render() {
		const { 
			missionType, 
			currentPage, 
			pageSize,
			deptChoosed,
			doctorChoosed,
			startTime,
			endTime
		} = this.state
		const {
			stayFollow, 
			alreadyFollow, 
			loading, 
			pageTotal,
			stayFollowTotal,
        	alreadyFollowTotal,
		} = this.props.todayMission
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
			title: '离院天数',
			dataIndex: 'dischargeDays',
			key: 'dischargeDays',
			render: (text, record) => (
				<span>{text}天</span>
			)
		},{
			title: '状态',
			key: 'status',
			render: (text, record) => statusDom(text, record)
		},{
			title: '操作',
			key: 'action',
			render: (text, record) => (
				<a className="aLink" onClick={()=>this.checkProfile(record)}>开始随访</a>
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
			title: '离院天数',
			dataIndex: 'dischargeDays',
			key: 'dischargeDays',
			render: (text, record) => (
				<span>{text}天</span>
			)
		},{
			title: '状态',
			key: 'status',
			render: (text, record) => statusDom(text, record)
		},{
			title: '操作',
			key: 'action',
			render: (text, record) => 
				(
					<a className="aLink" onClick={()=>this.checkProfile(record)}>查看随访</a>
				)
			
		}]
		
		return (
			<div>
				<div className={styles.contentWrap}>
					<Breadcrumb separator=">">
					    <Breadcrumb.Item>随访管理</Breadcrumb.Item>
					    <Breadcrumb.Item>今日任务</Breadcrumb.Item>
				  	</Breadcrumb>
					<div className={styles.title}>
						<i className={`iconfont icon-tongyongbiaotiicon ${styles.titleIcon}`}></i><span>今日任务</span>
					</div>
					<div className={styles.content}>
						<div className={styles.tabBtn}>
							<div className={`${styles.tabItem} ${missionType==='wait'?styles.tabItemChoosed:''}`} onClick={() => this.changeTab('wait')}>
								<i className={`iconfont icon-daisuifang-icon-green ${styles.tabIcon}`}></i>
								<span className={styles.text}>待随访</span>
								<span className={styles.number}>{stayFollowTotal}</span>
							</div>
							<div className={`${styles.tabItem} ${missionType==='already'?styles.tabItemChoosed:''}`} onClick={() => this.changeTab('already')}>
								<i className={`iconfont icon-yisuifang-icon-green ${styles.tabIcon}`}></i>
								<span className={styles.text}>已随访</span>
								<span className={styles.number}>{alreadyFollowTotal}</span>
							</div>
						</div>
						<div className={styles.selectWrap}>
							<span className={styles.text}>科室</span>
							<Select defaultValue="全部" style={{ width: 150 }} onChange={this.handleDeptChange}
								value={deptChoosed}>
						      	<Option value="">全部</Option>
						      	{departmentList.map(item => (
						      		<Option key={item.departmentId} value={item.departmentId}
						      			title={item.departmentName}>{item.departmentName}</Option>
						      	))}
						    </Select>
							<span className={styles.text}>主管医生</span>
							<Select defaultValue="全部" style={{ width: 150 }} onChange={this.handleDoctorChange}
								value={doctorChoosed}>
						      	<Option value="">全部</Option>
						      	{doctorList.map(item => (
						      		<Option key={item.workerId} value={item.workerId}>{item.workerName}</Option>
						      	))}
						    </Select>
						    <span className={styles.text}>出院日期</span>
							<RangePicker onChange={this.handleDateChange} placeholder={['yyyy-mm-dd', 'yyyy-mm-dd']}
								value={[startTime,endTime]}
								style={{ width: 250 }}
								disabledDate={this.disabledDate}/>
						</div>
						<Spin spinning={loading} size="large">
						{
							missionType==='wait'?
								<div className={styles.table}>
									{
										stayFollow.length<1&&!loading?
											<div className={styles.emptyWrap}>
												<img className={styles.img} src={empty} alt="" />
												<div className={styles.text}>非常抱歉，当前页面暂无内容...</div>
											</div>
											:
											<Table dataSource={stayFollow} columns={columns} 
												pagination={{
													current: currentPage,
													pageSize: pageSize,
													total: pageTotal,
													showQuickJumper: true
												}}
												rowKey="inhospitalId"
												onChange={this.changePage}
												/>
									}
									
								</div>
								:
								<div className={styles.table}>
									{
										alreadyFollow.length<1&&!loading?
											<div className={styles.emptyWrap}>
												<img className={styles.img} src={empty} alt="" />
												<div className={styles.text}>非常抱歉，当前页面暂无内容...</div>
											</div>
											:
											<Table dataSource={alreadyFollow} columns={columns2} 
												pagination={{
													current: currentPage,
													pageSize: pageSize,
													total: pageTotal,
													showQuickJumper: true
												}}
												rowKey="inhospitalId"
												onChange={this.changePage}
												/>
									}
								
							</div>
						}
						</Spin>
					</div>
				</div>
			</div>
		)
	}
}

export default connect(({ todayMission, global }) => ({
  todayMission, global
}))(TodayMission);