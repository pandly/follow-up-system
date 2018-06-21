import { PureComponent } from 'react'
import { Select, Input, Table, Button, Breadcrumb, Spin, message, Form } from 'antd'
import styles from './Profile.less'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'

import PopoverSure from 'components/PopoverSure'
import PlanTable from 'components/PlanTable'

const Option = Select.Option;
const FormItem = Form.Item

@Form.create()
class PlanProfile extends PureComponent {
	state = {
		planDetailTask: [],
		planDetail: {},
		status: this.props.match.params.status,
		planTemplateId: this.props.match.params.id,
		deptDisable: false,
		illDisable: false,
		haveIllDisable: false,
	}
	// handleChange=(value,name,index)=>{
 //        const planDetailTaskObj = {...this.state.planDetailTask[index]};
 //        let newplanDetailTaskObj
	// 	newplanDetailTaskObj = {...planDetailTaskObj, [name]: value};
        
 //        let planDetailTask = [...this.state.planDetailTask];
 //        planDetailTask.splice(index, 1, newplanDetailTaskObj);
 //        this.setState({
 //        	planDetailTask
 //        })
	// }
	
  	//删除
	sureDelete = ()=> {
		this.props.dispatch({
			type: 'plan/deletePlan',
			payload: this.state.planTemplateId
		}).then(()=>{
			message.success('删除成功！')
			this.props.dispatch(routerRedux.push('/template/plan/list'));
		})
	}
	editType=()=>{
		if(this.state.status!=='stoped'){
			this.setState({
		    	planTemplateId: 'add'
			})
			this.initData()
		}
		
	}
	//暂停使用
	sureStop = ()=> {
		this.props.dispatch({
			type: 'plan/changePlanStatus',
			payload: {
				plantemplateId: this.state.planTemplateId,
				isUse: false
			}
		}).then(()=>{
			message.success('暂停使用成功！')
			this.getDetail()
			this.setState({
		      	status: 'stoped'
		    });
		})
	}

	//重新发布
	sureRestart = ()=> {
		this.props.dispatch({
			type: 'plan/changePlanStatus',
			payload: {
				plantemplateId: this.state.planTemplateId,
				isUse: true
			}
		}).then(()=>{
			message.success('重新发布成功！')
			this.getDetail()
			this.setState({
		      	status: 'used'
		    });
		})
	}

	getDetail(){
		this.props.dispatch({
			type: 'plan/fetchPlanDetail',
			payload: this.state.planTemplateId
		}).then(() => {
			this.initData()
		})
	}

	initData=(func)=>{
		const illness = JSON.parse(this.props.plan.planDetail.illness)
		if(this.props.plan.planDetail.type==='DEFAULT'||this.props.plan.planDetail.type==='SATISFACTION_SURVEY'){
			this.setState({				
				planDetailTask: this.props.plan.planDetailTask,
				planDetail: {...this.props.plan.planDetail, department: 'all',illness: illness},
				deptDisable: true,
				illDisable: true,
				haveIllDisable: true,
			}, ()=>{
				this.props.form.setFieldsValue({
					type: this.state.planDetail.type,
					title: this.state.planDetail.title,
					department: this.state.planDetail.department,
					haveIllness: this.state.planDetail.haveIllness,
					illness: this.state.planDetail.illness,
				})
				if(func){
					func()
				}
			})
		}else{
			let department;
			if(this.props.plan.planDetail.department===''){
				department = 'all'
			}else{
				department = this.props.plan.planDetail.department
			}
			this.setState({
				planDetailTask: this.props.plan.planDetailTask,
				planDetail: {...this.props.plan.planDetail, department: department, illness: illness},
				deptDisable: false,
				illDisable: false,
				haveIllDisable: false,
			}, ()=>{
				this.props.form.setFieldsValue({
					type: this.state.planDetail.type,
					title: this.state.planDetail.title,
					department: this.state.planDetail.department,
					haveIllness: this.state.planDetail.haveIllness,
					illness: this.state.planDetail.illness,
				})
				if(func){
					func()
				}
			})
		}	
	}

	saveForm=(e)=>{
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if(!err){
				let param = {
					planTemplate: {						
						department: values.department==='all'?'':values.department,
						haveIllness: values.haveIllness,
						title: values.title,
						type: values.type,
						illness: values.illness?JSON.stringify(values.illness):JSON.stringify([])

					},
					taskTemplates: this.table?this.table:this.state.planDetailTask
				}

				if(this.props.match.params.id==='add'){
					this.table.forEach(item=>{
						delete item.taskTemplateId
					})
					this.props.dispatch({
						type: 'plan/addPlan',
						payload: param
					}).then(()=>{
						message.success('添加成功！')
						this.props.dispatch(routerRedux.push('/template/plan/list'));
					})
				}else{
					param.planTemplate.planTemplateId = this.state.planDetail.planTemplateId
					if(this.table){
						this.setState({
							planDetailTask: this.table
						},()=>{
							this.props.dispatch({
							type: 'plan/updatePlan',
							payload: {
								update: param,
								planTemplateId: this.props.match.params.id
							}
						}).then(()=>{
							this.initData(()=>{
								message.success('修改成功！')
								this.setState({
									planTemplateId: this.props.match.params.id
									})
								})
							
							
							
							})
						})
					}else{
						this.props.dispatch({
							type: 'plan/updatePlan',
							payload: {
								update: param,
								planTemplateId: this.props.match.params.id
							}
						}).then(()=>{
							this.initData(()=>{
								message.success('修改成功！')
								this.setState({
									planTemplateId: this.props.match.params.id
								})
							})
						})
					}
				}
			}
		})
	}
	cancelForm=()=>{
		let id = this.props.match.params.id
		if(id==='add'){
			this.props.dispatch(routerRedux.push('/template/plan/list'));
		}else{
			this.initData()
			this.setState({
				planTemplateId: this.props.match.params.id
			})
		}
	}

	changeType=(value)=>{
		if(value==='DEFAULT'||value==='SATISFACTION_SURVEY'){
			this.setState({
				planDetail: {
					...this.state.planDetail,
					illness:[],
					haveIllness: 'HAVE', 
					department: 'all'
				},
				deptDisable: true,
				illDisable: true,
				haveIllDisable: true,
			})
		}else if(value==='OUT_HOSPITAL'){
			this.setState({
				planDetail: {
					...this.state.planDetail,
					illness:[],
					haveIllness: 'RESTRICT', 
					department: ''
				},
				deptDisable: false,
				illDisable: true,
				haveIllDisable: false,
			})
		}
	}
	changeHaveIllness=(value)=>{
		if(value==='RESTRICT'){
			this.setState({
				planDetail: {
					...this.state.planDetail,
					illness:[]
				},
				illDisable: true,
			})
			this.props.form.setFieldsValue({
				illness: []
			})
		}else{
			this.setState({
				illDisable: false,
			})
		}
	}
    
    updateTable=(data) => {
    	this.table = data;
    }

    goList=()=>{
  		this.props.dispatch(routerRedux.push(`/template/plan/list`));
  	}

	componentDidMount(){
		this.props.dispatch({
			type: 'scale/fetchScaleList',
			payload: {
				title: ''
			}
		})
		this.props.dispatch({
			type: 'global/fetchDict'
		})
		this.props.dispatch({
			type: 'global/fetchDepartment'
		})
		if(this.state.planTemplateId!=='add'){
			this.getDetail()
		}else{
			this.setState({				
				planDetailTask: [{
					time: '',
					timeType: '',
					returnType: 'PHONE',
					scaleName: '',
					scaleId: ''
				}],
				planDetail: {},
				deptDisable: false,
				illDisable: false,
				haveIllDisable: false,
			})
		}
	}

	componentWillUnmount(){
		this.props.dispatch({
	      	type: 'plan/clear',
	    });
	}


	render() {
		const { 
			status, 
			planTemplateId,
			deptDisable,
			illDisable,
			haveIllDisable,
			planDetailTask,
			planDetail
		} = this.state
		const {
        	planDetailLoading
		} = this.props.plan 
		const {
			scaleList
		} = this.props.scale
		const {departmentList, dictionary} = this.props.global
		const {
			getFieldDecorator
		} = this.props.form
		const columns2 = [{
			title: '序号',
			dataIndex: 'index',
			key: 'index',
			render: (text, record, index) => (
				<span>{index+1}</span>
			)
		},{
			title: '随访时间',
			key: 'time',
			render: (text, record) => (
				<span>
					出院后{record.time}
					{						
						dictionary['DATE_TYPE']?
							dictionary['DATE_TYPE'].map(item => (
				      			record.timeType===item.code?item.value:''
			      		)):''
			      	}
				</span>
			)

		},{
			title: '回访方式',
			key: 'way',
			render: (text, record) => (
				<span>
					{						
						dictionary['RETURN_WAY']?
							dictionary['RETURN_WAY'].map(item => (
				      			record.returnType===item.code?item.value:''
			      		)):''
			      	}
				</span>
			)
		},{
			title: '量表',
			key: 'table',
			render: (text, record) => (
				<span className={`${styles.tableName} text-hidden`}>{record.scaleName}</span>
			)
		},{
			title: '',
			key: 'action',
			render: (text, record) => (
				<span> </span>
			)
		}]

		
		
		return (
			<div className={styles.contentMain}>
				{/*{this.props.match.params.id}*/}
				<Breadcrumb separator=">">
				    <Breadcrumb.Item>随访模板</Breadcrumb.Item>
				    <Breadcrumb.Item onClick={this.goList}>
				    	<a>随访计划</a>
				    </Breadcrumb.Item>
				    <Breadcrumb.Item>
				    	{
				    		status==='detail'?'创建随访计划':'查看随访计划'
				    	}
				    </Breadcrumb.Item>
			  	</Breadcrumb>

				<div className={`${styles.contentWrap} ${planTemplateId==='add'?'':styles.hidden}`}>
					<Form onSubmit={this.saveForm} layout="inline">
						<div className={styles.main}>	
							<div className={styles.contentItem}>
								<div className={styles.title}>
									<div className={styles.titleText}>
										<i className={`iconfont icon-tongyongbiaotiicon ${styles.titleIcon}`}></i><span>模版属性</span>
									</div>
								</div>
								<div className={styles.content}>
									<div className={styles.item}>
										<span className={styles.label}>模版类型</span>
										<FormItem>
											{
												getFieldDecorator('type',{
													initialValue: planDetail.type,
													rules: [{ required: true, message: '请输入模版类型！'}]
												})(
													<Select style={{ width: 255}} allowClear 
														onChange={this.changeType}>
												      	{
												      		dictionary['PLAN_TEMPLATE_TYPE']?
														      	dictionary['PLAN_TEMPLATE_TYPE'].map(item => (
														      		<Option key={item.code} value={item.code}>{item.value}</Option>
														      	))
												      		:''
									      				}
								    				</Select>
												)
											}										
									    </FormItem>
									</div>
									<div className={styles.item}>
										<span className={styles.label}>模版名称</span>
										<FormItem>
											{
												getFieldDecorator('title',{
													initialValue: planDetail.title,
													rules: [{ required: true, message: '请输入模版名称！'}]
												})(
													<Input style={{ width: 622 }}/>
												)
											}										
									    </FormItem>
										
									</div>
								</div>
							</div>
							<div className={styles.contentItem}>
								<div className={styles.title}>
									<div className={styles.titleText}>
										<i className={`iconfont icon-tongyongbiaotiicon ${styles.titleIcon}`}></i><span>适用范围</span>
									</div>
								</div>
								<div className={styles.content}>
									<div className={styles.item}>
										<span className={`${styles.label} ${styles.required}`}>科室</span>
										<FormItem>
											{
												getFieldDecorator('department',{
													initialValue: planDetail.department
												})(
													<Select style={{ width: 255 }}
														placeholder="请选择" disabled={deptDisable}>
												      	<Option value="all">全部</Option>
											      		{departmentList.map(item => (
												      		<Option key={item.departmentId} value={item.departmentId}>{item.departmentName}</Option>
												      	))}
												    </Select>
												)
											}										
									    </FormItem>
										
									</div>
									<div className={`${styles.item} ${styles.specialItem}`}>
										<FormItem>
											{
												getFieldDecorator('haveIllness',{
													initialValue: planDetail.haveIllness
												})(
													<Select style={{ width: 115 }}  disabled={haveIllDisable}
														placeholder="请选择"
														onChange={this.changeHaveIllness}>
												      	{
												      		dictionary['HAVE_ILLNESS']?
														      	dictionary['HAVE_ILLNESS'].map(item => (
														      		<Option key={item.code} value={item.code}>{item.value}</Option>
														      	))
												      		:''
									      				}
												    </Select>
												)
											}										
									    </FormItem>
										{
											illDisable?'':
											<div className={styles.inline}>
												<span className={styles.label}>疾病诊断</span>
												<FormItem>
													{
														getFieldDecorator('illness',{
															initialValue: planDetail.illness
														})(
															<Select style={{ width: 422, position: 'absolute', left: 0, top: -13 }} 
																mode="tags" disabled={illDisable}
																allowClear placeholder="请填写（多填）"
																dropdownStyle={{display: 'none'}}>
														    </Select>
														)
													}										
											    </FormItem>
											</div>
										}
										
										
									</div>
								</div>
							</div>
							<div className={styles.contentItem}>
								<div className={styles.title}>
									<div className={styles.titleText}>
										<i className={`iconfont icon-tongyongbiaotiicon ${styles.titleIcon}`}></i><span>随访任务</span>
									</div>
								</div>
								<div className={styles.content}>
									<div className={styles.item}>
										<span className={`${styles.label} ${styles.specialLabel}`}>随访开始时间</span>
										<Select defaultValue="OUT_HOSPITAL" style={{ width: 255 }}
											allowClear disabled>
									      	{dictionary['START_TYPE']?
														      	dictionary['START_TYPE'].map(item => (
									      		<Option key={item.code} value={item.code}>{item.value}</Option>
									      	)):''}
									    </Select>
									</div>
									<PlanTable 
									  planDetailTask={planDetailTask} 
									  dictionary={dictionary}
									  scaleList={scaleList}
									  status={status}
									  onChange={this.updateTable}
									/>									
								</div>
							</div>
						</div>
						<div className={styles.footer}>
							<Button onClick={this.cancelForm}>取消</Button>
							<Button type="primary" onClick={this.saveForm}>保存</Button>
						</div>
					</Form>
				</div>
				<div className={`${styles.checkContent} ${status==='stoped'?styles.stopContent:''} ${planTemplateId==='add'?styles.hidden:''}`}>
					<div className={styles.main}>	
						<Spin spinning={planDetailLoading} size="large">
							<div className={styles.contentItem}>
								<div className={styles.title}>
									<div className={styles.titleText}>
										<i className={`iconfont icon-tongyongbiaotiicon ${styles.titleIcon}`}></i><span>模版属性</span>
									</div>
								</div>
								<div className={styles.content}>
									<div className={styles.item}>
										<span className={styles.label}>模版类型：</span>
										<span className={styles.text}>
											{
									      		dictionary['PLAN_TEMPLATE_TYPE']?
											      	dictionary['PLAN_TEMPLATE_TYPE'].map(item => (
											      		planDetail.type===item.code?item.value:''
											      	))
									      		:''
						      				}
										</span>
									</div>
									<div className={styles.item}>
										<span className={styles.label}>模版名称：</span>
										<span className={styles.text}>{planDetail.title}</span>
									</div>
								</div>
							</div>
							<div className={styles.contentItem}>
								<div className={styles.title}>
									<div className={styles.titleText}>
										<i className={`iconfont icon-tongyongbiaotiicon ${styles.titleIcon}`}></i><span>适用范围</span>
									</div>
								</div>
								<div className={styles.content}>
									<div className={styles.item}>
										<span className={styles.label}>科室：</span>
										<span className={styles.text}>
											{
												planDetail.department==='all'?'全部':
													departmentList.map(item => (
											      		planDetail.department===item.departmentId?item.departmentName:''
									      	))}
										</span>
									</div>
									{
										planDetail.haveIllness!=='RESTRICT'?
										<div className={styles.item}>
											<span className={styles.label}>{planDetail.haveIllness==='HAVE'?'包含诊断':'不包含诊断'}：</span>
											<span className={styles.text}>
												{
													planDetail.illness&&planDetail.illness.length!==0?planDetail.illness.map((ill,index)=>(
														index===planDetail.illness.length-1?
													      	ill:ill+'，'
													)):'暂无'
							      				}
											</span>
										</div>
										:
										<div className={styles.item}>
											<span className={styles.label}>诊断：</span>
											<span className={styles.text}>无限制</span>
										</div>
									}
								</div>
							</div>
							<div className={styles.contentItem}>
								<div className={styles.title}>
									<div className={styles.titleText}>
										<i className={`iconfont icon-tongyongbiaotiicon ${styles.titleIcon}`}></i><span>随访任务</span>
									</div>
								</div>
								<div className={styles.content}>
									<div className={`${styles.item} ${styles.specialItem}`}>
										<span className={styles.label}>随访开始时间：</span>
										<span className={styles.text}>出院时间</span>
									</div>
									<Table dataSource={planDetailTask} columns={columns2} pagination={false}
										rowKey="taskTemplateId"/>
								</div>
							</div>
						</Spin>	
					</div>
					<div className={`${styles.footer} ${styles.linkFooter}`}>
						<div className={`${styles.footerItem} aLink`} onClick={this.editType}>
							<i className={`iconfont icon-bi ${styles.footerIcon}`}></i>
							<span>编辑</span>
						</div>
						<PopoverSure title="您确定要暂停该计划吗？"
							text="目标暂停后可重新发布。"
							sureFunction={()=>this.sureStop()}>
							<div className={`${styles.footerItem} aLink ${status==='used'?'':styles.hidden}`}>
								<i className={`iconfont icon-lansezantingshiyong ${styles.footerIcon}`}></i>
								<span>暂停使用</span>
							</div>
						</PopoverSure>
						
				      	<PopoverSure title="您确定要重新发布该计划吗？"
							text="目标重新发布后可进行再次编辑。"
							sureFunction={()=>this.sureRestart()}>
							<div className={`${styles.footerItem} aLink ${status==='stoped'?'':styles.hidden}`}>
								<i className={`iconfont icon-zhongxinfabuicon ${styles.footerIcon}`}></i>
								<span>重新发布</span>
							</div>
						</PopoverSure>
				      	<PopoverSure title="您确定要删除该计划吗？"
							text="目标删除后将不可恢复。"
							sureFunction={()=>this.sureDelete()}>
							<div className={`${styles.footerItem} ${status==='stoped'?'':styles.hidden}`}>
								<i className={`iconfont icon-hongselajixiang ${styles.footerIcon}`}></i>
								<span>删除</span>
							</div>
						</PopoverSure>
					</div>
				</div>
			</div>
		)
	}
}

export default connect(({ plan, scale, global }) => ({
  plan, scale, global
}))(PlanProfile);