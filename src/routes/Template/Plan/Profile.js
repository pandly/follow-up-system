import { PureComponent } from 'react'
import { Select, Input, InputNumber, Table, Button, Popover, Breadcrumb } from 'antd'
import styles from './Profile.less'

import PopoverSure from 'components/PopoverSure'

const Option = Select.Option;

class Plan extends PureComponent {
	state = {
		dataSource: [{
			key: '1',
			time: '',
			unit: '',
			way: '',
			table: ''
		},{
			key: '2',
			time: '',
			unit: '',
			way: '',
			table: ''
		}],
		status: 'stop'
	}
	handleChange(value){
  		console.log(`selected ${value}`);
	}
	deleteItem = (key) => {
		const dataSource = [...this.state.dataSource];
		this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
	}
	handleAdd = () => {
	    const { dataSource } = this.state;
	    const newData = {
	      	key: dataSource.length+1,
			time: '',
			unit: '',
			way: '',
			table: ''
	    };
	    this.setState({
	      	dataSource: [...dataSource, newData]
	    });
  	}
  	//删除
	sureDelete = ()=> {
		
	}

	//暂停使用
	sureStop = ()=> {
		
	}

	//重新发布
	sureRestart = ()=> {
		
	}
	render() {
		const { dataSource, status, isPopDeleteHide, isPopStopHide, isPopRestartHide } = this.state
		const columns = [{
			title: '序号',
			dataIndex: 'key',
			key: 'key'
		},{
			title: '随访时间',
			key: 'time',
			render: (text, record) => (
				<span className={styles.tableItem}>
					<span>出院后</span>
					<InputNumber defaultValue={record.time} min={1} style={{ width: 54 }} onChange={this.handleChange} />
					<Select defaultValue={record.unit} style={{ width: 54, height: 32 }} onChange={this.handleChange}
						allowClear>
				      	<Option value="lucy">天</Option>
				      	<Option value="111">周</Option>
				      	<Option value="222">月</Option>
				      	<Option value="333">年</Option>
				    </Select>
				</span>
			)
		},{
			title: '回访方式',
			key: 'way',
			render: (text, record) => (
				<span className={styles.tableItem}>
					<Select defaultValue={record.way} style={{ width: 140, height: 32 }} onChange={this.handleChange}
						allowClear>
				      	<Option value="lucy">Lucy</Option>
				      	<Option value="111">111</Option>
				      	<Option value="222">222</Option>
				      	<Option value="333">333</Option>
				    </Select>
				</span>
			)
		},{
			title: '量表',
			key: 'table',
			render: (text, record) => (
				<span className={styles.tableItem}>
					<Select defaultValue={record.way} style={{ width: 140, height: 32 }} onChange={this.handleChange}
						allowClear>
				      	<Option value="lucy">Lucy</Option>
				      	<Option value="111">111</Option>
				      	<Option value="222">222</Option>
				      	<Option value="333">333</Option>
				    </Select>
				</span>
			)
		},{
			title: '操作',
			key: 'action',
			render: (text, record) => (
				<span className={styles.deleteBtn} onClick={() => this.deleteItem(record.key)}>删除</span>
			)
		}]
		const columns2 = [{
			title: '序号',
			dataIndex: 'key',
			key: 'key'
		},{
			title: '随访时间',
			key: 'time',
			render: (text, record) => (
				<span>出院后{record.time}{record.unit}</span>
			)
		},{
			title: '回访方式',
			key: 'way',
			render: (text, record) => (
				<span>{record.way}</span>
			)
		},{
			title: '量表',
			key: 'table',
			render: (text, record) => (
				<span>{record.table}</span>
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
				    <Breadcrumb.Item>随访计划</Breadcrumb.Item>
				    <Breadcrumb.Item>查看随访计划</Breadcrumb.Item>
			  	</Breadcrumb>
				<div className={`${styles.contentWrap} ${status=='add'?'':styles.hidden}`}>
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
									<Select defaultValue="lucy" style={{ width: 255}} onChange={this.handleChange}
										allowClear >
								      	<Option value="lucy">Lucy</Option>
								      	<Option value="111">111</Option>
								      	<Option value="222">222</Option>
								      	<Option value="333">333</Option>
								    </Select>
								</div>
								<div className={styles.item}>
									<span className={styles.label}>模版名称</span>
									<Input style={{ width: 622 }} />
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
									<Select defaultValue="lucy" style={{ width: 255 }} onChange={this.handleChange}
										allowClear placeholder="请选择">
								      	<Option value="lucy">Lucy</Option>
								      	<Option value="111">111</Option>
								      	<Option value="222">222</Option>
								      	<Option value="333">333</Option>
								    </Select>
								</div>
								<div className={styles.item}>
									<span className={styles.label}>包含：</span>
									<span className={styles.text}>肝胆外科</span>
								</div>
								<div className={`${styles.item} ${styles.specialItem}`}>
									<Select defaultValue="lucy" style={{ width: 115 }} onChange={this.handleChange}
										allowClear placeholder="请选择">
								      	<Option value="lucy">Lucy</Option>
								      	<Option value="111">111</Option>
								      	<Option value="222">222</Option>
								      	<Option value="333">333</Option>
								    </Select>
									<span className={styles.label}>疾病诊断</span>
									<Input style={{ width: 422 }} placeholder="请填写（多填）" />
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
									<Select defaultValue="lucy" style={{ width: 255 }} onChange={this.handleChange}
										allowClear>
								      	<Option value="lucy">Lucy</Option>
								      	<Option value="111">111</Option>
								      	<Option value="222">222</Option>
								      	<Option value="333">333</Option>
								    </Select>
								</div>
								<Table dataSource={dataSource} columns={columns} pagination={false}/>
								<div className={`${styles.tableFooter} ${dataSource.length%2==0?styles.doubleTable:''}`}>
									<span className={styles.footerBtn} onClick={this.handleAdd}>
										<i className={`iconfont icon-tianjialiebiao_icon ${styles.tableIcon}`}></i><span>添加随访任务</span>
									</span>
								</div>
							</div>
						</div>
					</div>
					<div className={styles.footer}>
						<Button>取消</Button>
						<Button type="primary">保存</Button>
					</div>
				</div>

				<div className={`${styles.checkContent} ${status=='stop'?styles.stopContent:''} ${status=='add'?styles.hidden:''}`}>
					<div className={styles.main}>	
						<div className={styles.contentItem}>
							<div className={styles.title}>
								<div className={styles.titleText}>
									<i className={`iconfont icon-tongyongbiaotiicon ${styles.titleIcon}`}></i><span>模版属性</span>
								</div>
							</div>
							<div className={styles.content}>
								<div className={styles.item}>
									<span className={styles.label}>模版类型：</span>
									<span className={styles.text}>出院随访模板</span>
								</div>
								<div className={styles.item}>
									<span className={styles.label}>模版名称：</span>
									<span className={styles.text}>肝胆外科随访计划</span>
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
									<span className={styles.text}>肝胆外科</span>
								</div>
								<div className={styles.item}>
									<span className={styles.label}>包含：</span>
									<span className={styles.text}>肝胆外科</span>
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
								<div className={`${styles.item} ${styles.specialItem}`}>
									<span className={styles.label}>随访开始时间：</span>
									<span className={styles.text}>肝胆外科</span>
								</div>
								<Table dataSource={dataSource} columns={columns2} pagination={false}/>
							</div>
						</div>
					</div>					
					
					<div className={`${styles.footer} ${styles.linkFooter}`}>
						<div className={`${styles.footerItem} aLink`}>
							<i className={`iconfont icon-bi ${styles.footerIcon}`}></i>
							<span>编辑</span>
						</div>
						<PopoverSure title="您确定要暂停该计划吗？"
							text="目标暂停后可重新发布。"
							sureFunction={()=>this.sureStop()}>
							<div className={`${styles.footerItem} aLink ${status=='check'?'':styles.hidden}`}>
								<i className={`iconfont icon-lansezantingshiyong ${styles.footerIcon}`}></i>
								<span>暂停使用</span>
							</div>
						</PopoverSure>
						
				      	<PopoverSure title="您确定要重新发布该计划吗？"
							text="目标重新发布后可进行再次编辑。"
							sureFunction={()=>this.sureRestart()}>
							<div className={`${styles.footerItem} aLink ${status=='stop'?'':styles.hidden}`}>
								<i className={`iconfont icon-zhongxinfabuicon ${styles.footerIcon}`}></i>
								<span>重新发布</span>
							</div>
						</PopoverSure>
				      	<PopoverSure title="您确定要删除该计划吗？"
							text="目标删除后将不可恢复。"
							sureFunction={()=>this.sureDelete()}>
							<div className={`${styles.footerItem} ${status=='stop'?'':styles.hidden}`}>
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

export default Plan