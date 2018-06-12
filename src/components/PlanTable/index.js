import React, { Component } from 'react';
import styles from './index.less';
import {InputNumber, Select, message } from 'antd'
const Option = Select.Option;
export default class PlanTable extends Component {
	state={
		planDetailTask: []
	}

	componentWillReceiveProps() {
		this.setState({
			planDetailTask: this.props.planDetailTask
		})
	}

	handleChange(value, name, index){
		const { onChange } = this.props
        const planDetailTaskObj = {...this.state.planDetailTask[index]};
        let newPlanDetailTaskObj;
        if(name === 'scaleId') {
            newPlanDetailTaskObj = {...planDetailTaskObj, [name]: value.key, scaleName: value.label};
        }else {
        	newPlanDetailTaskObj = {...planDetailTaskObj, [name]: value};
        } 
        let planDetailTask = [...this.state.planDetailTask];
        planDetailTask.splice(index, 1, newPlanDetailTaskObj);
        this.setState({
        	planDetailTask
        })		
		if(onChange) {
			onChange(planDetailTask)
		}
	}
	deleteItem(index){
		const { onChange, status } = this.props
		let planDetailTask = [...this.state.planDetailTask];
		if(status!='stoped'){
			if(planDetailTask.length>1){
				console.log(planDetailTask,'planDetailTask1')
				planDetailTask.splice(index, 1);
		        this.setState({
		        	planDetailTask
		        },()=>{
	        	console.log(planDetailTask,'planDetailTask2')
		        	if(onChange) {
						onChange(planDetailTask)
					}
		        })		
				
			}else{
				message.error('最少必须有一条任务！')
			}
		}else{
			
			planDetailTask.splice(index, 1);
	        this.setState({
	        	planDetailTask
	        },()=>{
	        	if(onChange) {
					onChange(planDetailTask)
				}
	        })		
			
		}
		
        
	}
	handleAdd = () => {
		const temp = this.state.planDetailTask
		if(temp[temp.length-1].time==''||temp[temp.length-1].timeType==''){
			return
		}
		const { onChange } = this.props
	    const newData = {
			time: '',
			timeType: '',
            returnType: 'PHONE',
            scaleId: '',
            scaleName: '',
            taskTemplateId: temp.length+1
	    };
	    this.setState({
	    	planDetailTask: [...this.state.planDetailTask, newData]
	    },()=>{
	    	if(onChange) {
				onChange(this.state.planDetailTask)
			}
	    })
	    
  	}

	render(){
		const { planDetailTask } = this.state;
		const { scaleList = [], dictionary = {} } = this.props

		return (
			<div>
				<table className={styles.myTable}>
					<thead>
						<tr>
							<th>序号</th>
							<th>随访时间</th>
							<th>回访方式</th>
							<th>量表</th>
							<th>操作</th>
						</tr>
					</thead>
					<tbody>
						{
							planDetailTask.map((item,index)=>(
								<tr key={index}>
									<td>{index+1}</td>
									<td>
										<span className={styles.tableItem}>
											<span>出院后</span>
											<InputNumber value={item.time} style={{ width: 54 }} min={1} onChange={(value)=>this.handleChange(value, 'time', index)} />
											<Select value={item.timeType} style={{ width: 54, height: 32 }} onChange={(value)=>this.handleChange(value, 'timeType', index)}>
										      	{dictionary['DATE_TYPE']?
												    dictionary['DATE_TYPE'].map(item1 => (
											      		<Option key={item1.code} value={item1.code}>{item1.value}</Option>
											      	)):''}
										    </Select>
										</span>
									</td>
									
									<td>
										<span className={styles.tableItem}>
											<Select defaultValue={item.returnType} style={{ width: 140, height: 32 }} onChange={(value)=>this.handleChange(value, 'returnType', index)}
												>
										      	{dictionary['RETURN_WAY']?
												    dictionary['RETURN_WAY'].map(item1 => (
											      		<Option key={item1.code} value={item1.code}>{item1.value}</Option>
											      	)):''}
										    </Select>
										</span>
									</td>
									<td>
										<span className={styles.tableItem}>
											<Select 
											  labelInValue
											  defaultValue={{key: item.scaleId}} style={{ width: 140, height: 32 }} 
											  onChange={(value)=>this.handleChange(value, 'scaleId', index)}
											  allowClear>						
										      	{scaleList.map(item1 => (
										      		<Option key={item1.scaleId} value={item1.scaleId}>{item1.title}</Option>
										      	))}
										    </Select>
										</span>
									</td>
									<td>
										<span className={styles.deleteBtn} onClick={() => this.deleteItem(index)}>删除</span>
									</td>
								</tr>
							))
						}
						
					</tbody>
				</table>
				<div className={`${styles.tableFooter} ${planDetailTask.length%2==0?styles.doubleTable:''}`}>
					<span className={styles.footerBtn} onClick={this.handleAdd}>
						<i className={`iconfont icon-tianjialiebiao_icon ${styles.tableIcon}`}></i><span>添加随访任务</span>
					</span>
				</div>
			</div>
		)
	}
}