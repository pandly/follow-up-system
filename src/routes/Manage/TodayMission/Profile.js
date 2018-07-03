import { Component } from 'react'
import styles from './Profile.less'
import patientInfo from '../../../assets/patient.png'
import { Select, Table, Input, Button, Breadcrumb, Form, message, Spin } from 'antd';
import { connect } from 'dva'
import moment from 'moment'
import { routerRedux } from 'dva/router'

import PlanMenu from 'components/PlanMenu'
import Modal from 'components/Modal'
import PopoverSure from 'components/PopoverSure'
import EditDateCell from 'components/EditTableCell/EditDateCell.js'
import EditSelectCell from 'components/EditTableCell/EditSelectCell.js'
import QuestionnairEditor from 'components/Questionnair/QuestionnairEditor'
import uuid from 'utils/utils'

const Option = Select.Option;
const { TextArea } = Input;
const FormItem = Form.Item

const statusDom = (text, record) => {
	switch(text.status){
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
		case 'NO_START':
			return (
				<span >
					<span className={`${styles.status} ${styles.yellow}`}></span>
					<span className={styles.statusText}>时间未到</span>
				</span>
			)
		default :
			return (
				<span >
					<span className={`${styles.status}`}></span>
					<span className={styles.statusText}>未知</span>
				</span>
			)
	}
		
}


@Form.create()
class MissionProfile extends Component {
	constructor(props) {
		super(props)
		this.entireScaleInfoTemp = [],
		this.editorsEl = []
	}

	state = {
		planTaskList: [],
		status: '',
		editPlanShow: false,
		stopPlanShow: false,
		conclusionShow: false,
		medicineShow: false,
		inhospitalId: this.props.match.params.id,
		// scaleId: this.props.match.params.scaleId,
		medicineSquareTime: '',
		medicineResident: '',
		stopReason: '',
		stopDes: '',
		choosedPlanId: '',
		toggleAnswer: true,
		canPlanEdit: true,
		entireScaleInfo: [],
		editorLoading: true,
		endStatus: 0
	}

	hideIdCard=(id)=>{
		if(!id){
			return
		}
		if(id.length===18){
			return String(id).replace(String(id).substr(4,10),'**********')
		}else if(id.length===15){
			return String(id).replace(String(id).substr(4,7),'*******')
		}else{
			return id
		}
	}

	
	changeId=(taskId, scaleId, status)=>{
		console.log(status)
		this.setState({
			status: taskId,
			editorLoading: true
		})
        this.props.dispatch({
        	type: 'scale/getEntireScale',
        	payload: scaleId
        }).then(() => {
			this.entireScaleInfoTemp = JSON.parse(JSON.stringify(this.props.scale.entireScaleInfo))
			this.transformData(this.entireScaleInfoTemp)
			this.setState({
				editorLoading: false,
				toggleAnswer: status !== 'COMPLETE'
			})
        })
	}
	showConclusion=()=>{
		this.setState({
			conclusionShow: true
		})
	}
	hideConclusion=()=>{
		this.setState({
			conclusionShow: false
		})
	}
	showMedicine=()=>{
		this.setState({
			medicineShow: true
		})
	}
	hideMedicine=()=>{
		this.setState({
			medicineShow: false
		})
	}
	showEditPlan=()=>{
		this.setState({
			editPlanShow: true
		})
	}
	hideEditPlan=()=>{
		this.setState({
			editPlanShow: false
		})
	}
	showStopPlan=()=>{
		this.setState({
			stopPlanShow: true
		})
	}
	hideStopPlan=()=>{
		this.setState({
			stopPlanShow: false
		})
	}
	handleAdd = () => {
	    const { planTaskList } = this.state;
	    const lastObj = planTaskList[planTaskList.length-1]
	    if(lastObj.followTime===''||lastObj.returnType===''){
	    	return
	    }
	    const newData = {
			taskId: '',
			status: '',
			followTime: '',
			returnType: '',
			scaleTemplateId: {
				key: '',
				label: ''
			},
			scaleName: '',
			time: '',
			timeType: ''
	    };
	    this.setState({
	      	planTaskList: [...planTaskList, newData]
	    });
  	}
  	deletePlan = (key) => {
		const planTaskList = [...this.state.planTaskList];
		this.setState({ planTaskList: planTaskList.filter((item,index) => index !== key) });
	}

	stopPlan = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if(!err){
				const param = {
					planId: this.props.patientDetail.todayDetail.planId,
					reason: values.reason,
					description: values.desc
				}
				this.props.dispatch({
					type: 'patientDetail/stopPlan',
					payload: param
				}).then(()=>{
					this.setState({
						stopReason: values.reason,
						stopDes: values.desc,
						stopPlanShow: false,
						endStatus: 1
					})
					message.success('结案成功！')
				})
			}
		})

	}

	onCellChange = (key, dataIndex) => {
	    return (value) => {
	      	const planTaskList = [...this.state.planTaskList];
	     	const target = planTaskList.find((item,index) => index === key);
	      	if (target) {
		        target[dataIndex] = value;
		        if(dataIndex==='followTime'){
		        	target.status = moment().format('YYYY-MM-DD') < moment(value).format('YYYY-MM-DD')?'NO_START':'WAIT'
		        }
		        this.setState({ planTaskList });
	      	}
	    };
  	}

  	planChange = (value) => {
  		this.setState({
  			choosedPlanId: value
  		})
  		this.props.dispatch({
  			type: 'patientDetail/getPlanTask',
  			payload: {
  				planTemplateId: value,
  				dischargeTime: this.props.patientDetail.todayDetail.dischargeTime
  			}
  		}).then(()=>{
  			let list = [...this.props.patientDetail.PlanTaskList]
			list.forEach(item=>{
				item.scaleTemplateId = {
					key: item.scaleTemplateId,
					label: item.scaleName
				}
			})
  			this.setState({
  				planTaskList: list
  			})
  		})
  	}

  	savePlanTask = () => {
  		let list = [...this.state.planTaskList]
  		if(list.length<1){
  			message.error('随访计划中必须至少有一个任务！')
  			return
  		}
  		if(list[list.length-1].followTime===''||list[list.length-1].returnType===''){
  			message.error('请完善任务信息！')
  			return
  		}
  		list.forEach(item=>{
  			item.scaleName = item.scaleTemplateId.label
			item.scaleTemplateId = item.scaleTemplateId.key
		})
  		const param = {
  			inhospitalId: this.state.inhospitalId,
  			planTemplateId: this.props.patientDetail.todayDetail.planTemplateId===this.state.choosedPlanId?'':this.state.choosedPlanId,
  			planId: this.props.patientDetail.todayDetail.planId,
  			dischargeTime: this.props.patientDetail.todayDetail.dischargeTime,
  			taskVOS: list
  		}
  		this.props.dispatch({
  			type: 'plan/updatePlanTask',
  			payload: param
  		}).then(()=>{
  			message.success('保存成功！')
  			this.getData(this.hideEditPlan())
  			
  		})

  	}

  	cancelPlanTask = () => {
  		let list = [...this.props.patientDetail.todayDetail.tasks]
		list.forEach(item=>{
			item.scaleTemplateId = {
				key: item.scaleTemplateId,
				label: item.scaleName
			}
		})
		this.setState({
			planTaskList: list,
			choosedPlanId: this.props.patientDetail.todayDetail.planTemplateId
		})
  		this.hideEditPlan()
  	}
    
    transformData = (arr) => {
		arr.map(data => {
			if(data.answer) {
				if(data.answer.checkbox === '') {
					data.answer.checkbox = {
		        		optionValue: [],
		        		optionIndex: [],
		        		otherOptionValue: ''
		        	}
				}else {
					data.answer.checkbox = JSON.parse(data.answer.checkbox);
				}
				if(data.answer.radio === ''){
		        	data.answer.radio = {
		        		optionValue: '',
		        		optionIndex: '',
		        		otherOptionValue: ''
		        	}
		        }
		        else {
		        	data.answer.radio = JSON.parse(data.answer.radio);
		        }
			}
        })
    }
  	getData=(func)=>{
		this.props.dispatch({
			type: 'patientDetail/fetchToday',
			payload: {
				inhospitalId: this.state.inhospitalId,
				// scaleId: this.state.scaleId
			}
		}).then(()=>{
			let list = [...this.props.patientDetail.todayDetail.tasks]
			let status;
			list.forEach(item=>{
				if(item.status==='COMPLETE'){
					this.setState({
						canPlanEdit: false
					})
				}
				item.scaleTemplateId = {
					key: item.scaleTemplateId,
					label: item.scaleName
				}
				if(item.isNow){
					status = item.taskId
				}
			})
			this.entireScaleInfoTemp = JSON.parse(JSON.stringify(this.props.patientDetail.todayDetail.questionPatientVOs))
            this.transformData(this.entireScaleInfoTemp);
			if(this.props.patientDetail.todayDetail.tasks.length>0){				
				this.setState({
					endStatus: this.props.patientDetail.todayDetail.tasks[0].endStatus,
					toggleAnswer: this.props.patientDetail.todayDetail.tasks[0].status !== 'COMPLETE'
				})
			}
			this.setState({
				status:status,
				planTaskList: list,
				choosedPlanId: this.props.patientDetail.todayDetail.planTemplateId,
				editorLoading: false
			})
			if(func){
				func()
			}
		})
	}

  	handleAnswer = (obj, index) => {
        this.entireScaleInfoTemp.splice(index, 1, obj)
  	}
    
    submitAnswer = () => {
    	const infoHeight = this.infoEl.scrollHeight + 20;
    	const x = this.entireScaleInfoTemp.some((data, index) => {
    		if(data.required) {
    			switch(data.type) {
    				case 'checkbox': 
    					if(data.answer[data.type].optionValue.length === 0) {
    						message.warning(`第${index + 1}题为必填题，请完成必填题！`)
    						this.mainEl.scrollTo(0, this.editorsEl[index].offsetTop + infoHeight)
    						return true;
    					}
    				case 'radio': 
    				    if(data.answer[data.type].optionValue === '') {
    						message.warning(`第${index + 1}题为必填题，请完成必填题！`)
    						this.mainEl.scrollTo(0, this.editorsEl[index].offsetTop + infoHeight)
    						return true;
    					}
    				default: 
    				    if(data.answer[data.type] === '') {
    				    	console.log(this.editorsEl[index], this.editorsEl[index].offsetTop)
    						message.warning(`第${index + 1}题为必填题，请完成必填题！`)
    						this.mainEl.scrollTo(0, this.editorsEl[index].offsetTop + infoHeight)
    						return true;
    					}
    			}
    		}
    	})
    	if(x) {
    		return ;
    	}
    	let answers = [];
    	this.entireScaleInfoTemp.forEach(data => {
    		answers.push({
    			"answerId": uuid(),
			    "checkbox": JSON.stringify(data.answer.checkbox),
			    "dropdown": data.answer.dropdown,
			    "input": data.answer.input,
			    "questionId": data.questionId,
			    "radio": JSON.stringify(data.answer.radio),
			    "scaleId": data.scaleId,
			    "text": data.answer.text,
			    "textarea": data.answer.textarea
    		})
    	})
		this.props.dispatch({
  			type: 'patientDetail/submitTaskAnswer',
  			payload: {
  				answers
  			}
  		}).then(() => {
  			this.setState({
	        	toggleAnswer: false
	        })
	        this.getData();
	        message.success('提交成功！')
  		})
    }
    
    save = () => {
    	let answers = [];
    	this.entireScaleInfoTemp.forEach(data => {
    		answers.push({
    			"answerId": uuid(),
			    "checkbox": JSON.stringify(data.answer.checkbox),
			    "dropdown": data.answer.dropdown,
			    "input": data.answer.input,
			    "questionId": data.questionId,
			    "radio": JSON.stringify(data.answer.radio),
			    "scaleId": data.scaleId,
			    "text": data.answer.text,
			    "textarea": data.answer.textarea
    		})
    	})
		this.props.dispatch({
  			type: 'scale/saveAnswer',
  			payload: {
  				answers
  			}
  		}).then(() => {
  			message.success('保存成功！')
  		})
    }

    editAnswer = () => {
    	this.setState({
        	toggleAnswer: true
        })
    }

  	goList=()=>{
  		this.props.dispatch(routerRedux.push(`/manage/todayMission/list`));
  	}

  	componentDidMount( ){
  		this.props.dispatch({
			type: 'global/fetchDict'
		})
  		this.props.dispatch({
  			type: 'patientDetail/fetchSummary',
  			payload: this.state.inhospitalId
  		})
  		this.props.dispatch({
  			type: 'patientDetail/fetchMedicine',
  			payload: this.state.inhospitalId
  		}).then(()=>{
  			if(this.props.patientDetail.outMedicine.length>0){
  				this.setState({
					medicineSquareTime: this.props.patientDetail.outMedicine[0].squareTime,
					medicineResident: this.props.patientDetail.outMedicine[0].resident
				})
  			}else{
  				this.setState({
					medicineSquareTime: '暂无',
					medicineResident: '暂无'
				})
  			}
  			
  		})
  		this.props.dispatch({
  			type: 'plan/fetchPlanTwoList'
  		})
  		this.props.dispatch({
  			type: 'scale/fetchScaleList',
  			payload: {
  				title: ''
  			}
  		})
		
		this.getData()
	}

	componentWillUnmount(){
		this.props.dispatch({
	      	type: 'patientDetail/clear',
	    });
	}

	render(){
		const { 
			status, 
			editPlanShow,
			stopPlanShow, 
			conclusionShow, 
			medicineShow, 
			medicineSquareTime,
			medicineResident,
			stopReason,
			stopDes,
			planTaskList,
			choosedPlanId,
			toggleAnswer,
			canPlanEdit,
			editorLoading,
			endStatus
		} = this.state
		const {
			todayDetail,
			outSummary,
			outMedicine
		} = this.props.patientDetail
        
		const {dictionary} = this.props.global

		const {planTwoList} = this.props.plan

		const { scaleList } = this.props.scale
		
		const {
			getFieldDecorator
		} = this.props.form

		const columns = [{
			title: '随访状态',
			key: 'status',
			render: (text, record) => statusDom(text, record)
		},{
			title: '随访日期',
			width: '150px',
			dataIndex: 'followTime',
			key: 'followTime',
			render: (text, record, key) => (
				record.status!=='COMPLETE'&&record.status!=='OVERDUE'?
				<EditDateCell value={text} onChange={this.onCellChange(key, 'followTime')}
					haveDisabled={record.status===''?true:false}></EditDateCell>
				:
				<span>{text}</span>
			)
		},{
			title: '随访方式',
			width: '150px',
			dataIndex: 'returnType',
			key: 'returnType',
			render: (text, record, key) => (
				record.status!=='COMPLETE'&&record.status!=='OVERDUE'?
				<EditSelectCell dataSource={dictionary['RETURN_WAY']} 
					value={text} allowClear={false} labelInValue={false}
					onChange={this.onCellChange(key, 'returnType')}
					valueType={{code:'code',value: 'value'}}
					styleObj={{ width: 140 }} >

				</EditSelectCell>
				:
				<span>
					{dictionary['RETURN_WAY']?dictionary['RETURN_WAY'].map(item=>(
						text===item.code?item.value:''
                    )):''}
				</span>
			)
		},{
			title: '量表选择',
			dataIndex: 'scaleTemplateId',
			width: '190px',
			key: 'scaleTemplateId',
			render: (text, record, key) => (
				record.status!=='COMPLETE'&&record.status!=='OVERDUE'?
				<EditSelectCell dataSource={scaleList} 
					value={text} allowClear={true} labelInValue={true}
					onChange={this.onCellChange(key, 'scaleTemplateId')}
					valueType={{code:'scaleId',value: 'title'}}
					styleObj={{ width: 180 }}>

				</EditSelectCell>
				:
				<span className={`${styles.tableName} text-hidden`}>{text.label?text.label:'暂无'}</span>
			)
		},{
			title: '操作',
			key: 'action',
			width: '80px',
			render: (text, record, key) => (
				record.status!=='COMPLETE'?
				<PopoverSure title="您确定要删除该任务吗？"
					text="目标删除后将不可恢复。"
					sureFunction={()=>this.deletePlan(key)}>
					<span className="delLink">删除</span>
				</PopoverSure>
				:
				<span className="delLink">删除</span>
			)
		}]   
		const columns2 = [{
			title: '药品名称',
			dataIndex: 'drugsName',
			key: 'drugsName'
		},{
			title: '药品规格',
			dataIndex: 'drugSpecifications',
			key: 'drugSpecifications'
		},{
			title: '药品数量',
			dataIndex: 'amount',
			key: 'amount',
			render: (text, record) => (
				<span>{record.number+record.unit}</span>
			)
		},{
			title: '用法用量',
			dataIndex: 'usage',
			key: 'usage'
		}]
		return (
			<div>
				<div className={styles.contentWrap}>
					<Breadcrumb separator=">">
					    <Breadcrumb.Item>随访管理</Breadcrumb.Item>
					    <Breadcrumb.Item onClick={this.goList}>
					    	<a>今日任务</a>
					    </Breadcrumb.Item>
					    <Breadcrumb.Item>{todayDetail.patientName}</Breadcrumb.Item>
				  	</Breadcrumb>
					<div className={`${styles.patientInfo} clearfix`}>
						<div className={styles.infoWrap}>
							<div className={styles.img}>
								<img src={patientInfo} alt="头像"/>
							</div>
							<div className={styles.info}>
								<div className={styles.infoItemWrap}>
									<div className={styles.infoItem}>
										<span className={styles.basicInfo}>{todayDetail.patientName}</span>
										<span className={styles.basicInfo}>{todayDetail.sex}</span>
										<span className={styles.basicInfo}>{todayDetail.age}岁</span>
									</div>
									<div className={styles.infoItem}>
										<span className={styles.label}>身份证号：</span>
										<span className={styles.text}>{this.hideIdCard(todayDetail.cardNo)}</span>
									</div>
								</div>
								<div className={styles.infoItemWrap}>									
									<div className={styles.infoItem}>
										<span className={styles.label}>联系人：</span>
										<span className={styles.text}>{todayDetail.patientRelationship} {todayDetail.contactPeople}</span>
									</div>
									<div className={styles.infoItem}>
										<span className={styles.label}>费用类型：</span>
										<span className={styles.text}>{todayDetail.costType}</span>
									</div>
									
								</div>
								<div className={styles.infoItemWrap}>
									<div className={styles.infoItem}>
										<span className={styles.label}>联系电话：</span>
										<span className={styles.text}>{todayDetail.contactPhone}</span>
									</div>
									<div className={styles.infoItem}>
										<span className={styles.label}>家庭住址：</span>
										<span className={`${styles.text} text-hidden`}>{todayDetail.contactAddress}</span>
									</div>
								</div>
							</div>
						</div>
						{/*<div className={styles.call}>
							<i className={`iconfont icon-red_phone ${styles.callIcon}`}></i>
							<div className={styles.text}>拨打电话</div>
						</div>*/}
					</div>
					<div className={styles.mainInfoWrap} ref={el => this.mainEl = el}>
						<div className={styles.overFlow}>
							<div className={styles.menuList}>
								<div className={styles.specialItem}>
									<div className={styles.menuItem}>
										<i className={`iconfont icon-suifangjihuaicon ${styles.itemIcon}`}></i>
										<div className={styles.content}>
											<div className={styles.itemTitle}>
												随访计划
											</div>
											<div className={styles.info}>
												{todayDetail.planTitle}
											</div>
											<div className={`${styles.btnItem} aLink`} onClick={this.showEditPlan}>
												<i className={`iconfont icon-grey_bianji`}></i><span>编辑计划</span>
											</div>
											{
												endStatus===0?
												<div className={`${styles.btnItem} aLink`} onClick={this.showStopPlan}>
													<i className={`iconfont icon-jieshu`}></i><span>手动结案</span>
												</div>
												:
												<div className={`${styles.btnItem}`}>
													<i className={`iconfont icon-jieshu`}></i><span>已结案</span>
												</div>
											}
											
										</div>
									</div>
									
								</div>
								<PlanMenu dictionary={dictionary} listData={planTaskList} status={status} changeStatus={this.changeId}></PlanMenu>
							</div>
							<div className={styles.mainInfo}>
								<div className={styles.info} ref={el => this.infoEl = el}>
									<div className={styles.title}>
										<i className={`iconfont icon-tongyongbiaotiicon ${styles.titleIcon}`}></i><span>患者信息</span>
									</div>
									<div className={styles.content}>
										<div className={styles.line}>
											<div className={styles.infoItem}>
												<span className={styles.label}>住院科室：</span>
												<span className={`${styles.text} text-hidden`}>{todayDetail.hospitalizationDepartment}</span>
											</div>
											<div className={styles.infoItem}>
												<span className={styles.label}>主管医生：</span>
												<span className={styles.text}>{todayDetail.resident}</span>
											</div>
											<div className={styles.infoItem}>
												<span className={styles.label}>出院诊断：</span>
												<span className={`${styles.text} text-hidden`}>{todayDetail.dischargeDiagnosis}</span>
											</div>
										</div>
										<div className={styles.line}>
											<div className={styles.infoItem}>
												<span className={styles.label}>病区：</span>
												<span className={styles.text}>{todayDetail.wards}</span>
											</div>
											<div className={styles.infoItem}>
												<span className={styles.label}>转归情况：</span>
												<span className={`${styles.text} text-hidden`}>{todayDetail.physicalCondition}</span>
											</div>
											<div className={styles.infoItem}>
												<span className={styles.label}>出院小结：</span>
												<span className={`${styles.text} aLink`} onClick={this.showConclusion}>点击查看</span>
											</div>
										</div>
										<div className={styles.line}>
											<div className={styles.infoItem}>
												<span className={styles.label}>床号：</span>
												<span className={styles.text}>{todayDetail.bedNumber}</span>
											</div>
											<div className={styles.infoItem}>
												<span className={styles.label}>出院日期：</span>
												<span className={styles.text}>{todayDetail.dischargeTime}</span>
											</div>
											<div className={styles.infoItem}>
												<span className={styles.label}>出院带药：</span>
												<span className={`${styles.text} aLink`} onClick={this.showMedicine}>点击查看</span>
											</div>					
										</div>
										<div className={styles.line}>
												<div className={styles.infoItem}>
													<span className={styles.label}>住院号：</span>
													<span className={styles.text}>{todayDetail.inhospitalId}</span>
												</div>
												<div className={styles.infoItem}>
													<span className={styles.label}>住院天数：</span>
													<span className={styles.text}>{todayDetail.hospitalizationDays}天</span>
												</div>
										</div>
									</div>
								</div>
								<div className={styles.info}>
								    <div className={styles.title}>
										<i className={`iconfont icon-tongyongbiaotiicon ${styles.titleIcon}`}></i><span>随访内容</span>
										{!toggleAnswer && <span className={`${styles.text} aLink`} style={{ marginLeft: 10 }} onClick={this.editAnswer}>编辑</span>}
									</div>
									<Spin spinning={editorLoading} size="large">
										<div style={{ display: toggleAnswer ? 'block' : 'none'}}>
											{
												this.entireScaleInfoTemp.map((editor, index) => {
													return (
														<div
														  ref={el => this.editorsEl[index] = el}
														  key={editor.questionId}>
															<QuestionnairEditor
															  onAnswer={this.handleAnswer}
															  acitveEditor={true}
															  index={index}
															  editor={editor}
														    />
													    </div>
													)
												})
											}
										</div>
										<div style={{ display: toggleAnswer ? 'none' : 'block'}}>
											{
												this.entireScaleInfoTemp.map((data, index) => {
			                                    	return (
			                                    		data.answer && (
			                                    			<div key={index} style={{ minHeight: 60 }}>
																<div style={{ color: '#666' }}>{`${index + 1}.${data.type === 'input' ? data.completionForwards : data.title + ':'}`}</div>
																<div style={{ paddingLeft: 12, color: '#151515' }}>{typeof data.answer[data.type] !== 'string' ? (
																	typeof data.answer[data.type].optionValue !== 'string' ? (
																		data.answer[data.type].optionValue.map((item, index) => {
																			return (
																				item && <span key={index} style={{ marginRight: 15 }}>{item}</span>
																			)
																		})
																	) : data.answer[data.type].optionValue
																) : data.answer[data.type]}</div>
															</div>
														)
			                                    	)
		                                        })
											}
										</div>
									</Spin>
								</div>
								{!editorLoading && toggleAnswer && (
									<div>
									    <Button type="primary" onClick={this.save}>暂存草稿</Button>
									    <span style={{
									    	display: 'inline-block',
									    	width: 20,
									    	height: 10
									    }}></span>
										<Button type="primary" onClick={this.submitAnswer}>提交</Button>
									</div>
								)}
							</div>
							<Modal title="编辑随访计划" closable={false} visible={editPlanShow} onCancel={this.hideEditPlan}>
								<div className={styles.planName}>
									<span className={styles.label}>计划模板</span>
									<Select placeholder="请选择" style={{ width: 270 }}
										disabled={!canPlanEdit}
										value={choosedPlanId}
										onChange={this.planChange}>
								      	{
								      		planTwoList.map(item => (
									      		<Option key={item.planTemplateId} value={item.planTemplateId}>{item.title}</Option>
									      	))
					      				}
								    </Select>
								</div>
								<div className={styles.table}>
									<Table dataSource={planTaskList} columns={columns} pagination={false}
										rowKey="taskId"
										rowClassName={(record, index) => {
											return record.status
										}}/>
									<div className={`${styles.tableFooter} ${planTaskList.length%2===0?styles.doubleTable:''}`}>
										<span className={styles.footerBtn} onClick={this.handleAdd}>
											<i className={`iconfont icon-tianjialiebiao_icon ${styles.tableIcon}`}></i><span>添加计划</span>
										</span>
									</div>
								</div>
								<div className={styles.tableBtn}>
									<Button type="primary" onClick={this.savePlanTask}>保存</Button>
									<Button onClick={this.cancelPlanTask}>取消</Button>								
								</div>
							</Modal>
							<Modal title="手动结案" closable={false} visible={stopPlanShow} type="small"
								 onCancel={this.hideStopPlan}>
								<Form onSubmit={this.stopPlan} layout="inline">
									<FormItem>
										<div className={styles.stopItem}>
											<span className={styles.label}>结案原因</span>
											{
												getFieldDecorator('reason',{
													initialValue: stopReason,
													rules: [{ required: true, message: '请输入备注原因！'}]
												})(
													<Select placeholder="请选择" style={{ width: 353 }}
														allowClear>
												      	{
												      		dictionary['SETTLE_CAUSE']?
														      	dictionary['SETTLE_CAUSE'].map(item => (
														      		<Option key={item.code} value={item.code}>{item.value}</Option>
														      	))
												      		:''
									      				}
												    </Select>
												)
											}
										</div>										
									</FormItem>
									<FormItem>
										<div className={styles.stopItem}>
											<span className={styles.label}>描述</span>
											{
												getFieldDecorator('desc',{
													initialValue: stopDes,
												})(
													<TextArea style={{ width: 353, height: 120 }} />
												)
											}
											
										</div>
									</FormItem>
									<div className={styles.stopText}>
										结案后，此患者后续随访将不会执行。
									</div>
									<div className={styles.stopBtn}>
										<Button type="primary" htmlType="submit">保存</Button>
										<Button onClick={this.hideStopPlan}>取消</Button>								
									</div>
								</Form>
							</Modal>
							<Modal title="出院小结" closable={true} visible={conclusionShow} onCancel={this.hideConclusion}>
								<div className={styles.conclusionTitle}>
									<div className={styles.titleItem}>
										<span className={styles.label}>病区：</span>
										<span className={styles.text}>{outSummary?outSummary.wards:'暂无'}</span>
									</div>
									<div className={styles.titleItem}>
										<span className={styles.label}>床号：</span>
										<span className={styles.text}>{outSummary?outSummary.bedNumber:'暂无'}</span>
									</div>
								</div>
								<div className={styles.conclusionContent}>
									<div>
										<div className={`${styles.item} ${styles.specialItem}`}>
											<span className={styles.label}>入院日期：</span>
											<span className={styles.text}>{outSummary?outSummary.admittingTime:'暂无'}</span>
										</div>
										<div className={`${styles.item} ${styles.specialItem}`}>
											<span className={styles.label}>出院日期：</span>
											<span className={styles.text}>{outSummary?outSummary.dischargeTime:'暂无'}</span>
										</div>
									</div>
									<div className={styles.item}>
										<span className={styles.label}>入院诊断：</span>
										<span className={styles.text}>{outSummary?outSummary.admittingDiagnosis:'暂无'}</span>
									</div>
									<div className={styles.item}>
										<span className={styles.label}>出院诊断：</span>
										<span className={styles.text}>{outSummary?outSummary.dischargeDiagnosis:'暂无'}</span>
									</div>
									<div className={styles.item}>
										<span className={styles.label}>入院情况：</span>
										<span className={styles.text}>{outSummary?outSummary.admittingDescription:'暂无'}</span>
									</div>
									<div className={styles.item}>
										<span className={styles.label}>住院经过：</span>
										<span className={styles.text}>{outSummary?outSummary.hospitalizationCourse:'暂无'}</span>
									</div>
									<div className={styles.item}>
										<span className={styles.label}>出院情况：</span>
										<span className={styles.text}>{outSummary?outSummary.dischargeCondition:'暂无'}</span>
									</div>
									<div className={styles.item}>
										<span className={styles.label}>住院医嘱：</span>
										<span className={styles.text}>{outSummary?outSummary.doctorAdvance:'暂无'}</span>
									</div>
									<div className={styles.sign}>
										签名：{outSummary?outSummary.recordMember:'暂无'}
									</div>
								</div>
							</Modal>
							<Modal title="出院带药" closable={true} visible={medicineShow} onCancel={this.hideMedicine}>
								<div className={styles.medicineTitle}>
									<div className={styles.item}>
										<span className={styles.label}>开方时间：</span>
										<span className={styles.text}>{medicineSquareTime}</span>
									</div>
									<div className={styles.item}>
										<span className={styles.label}>医师：</span>
										<span className={styles.text}>{medicineResident}</span>
									</div>
								</div>
								<div className={styles.medicineContent}>
									<Table dataSource={outMedicine} columns={columns2} pagination={false}
										rowKey="incrementId"/>
								</div>
							</Modal>
						</div>
					</div>
				</div>
				
				
			</div>
		)
	}
}

export default connect(({ patientDetail, global, plan, scale }) => ({
  patientDetail, global, plan, scale
}))(MissionProfile);