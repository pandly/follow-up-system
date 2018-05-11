import { PureComponent } from 'react'
import { Select, Table } from 'antd'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import styles from './List.less'

const Option = Select.Option;

const statusDom = (text, record) => {
	switch(text.status){
		case 'yisuifang':
			return (
				<span >
					<span className={`${styles.status} ${styles.grey}`}></span>
					<span className={styles.statusText}>已随访</span>
				</span>
			)
		case 'yuqi':
			return (
				<span >
					<span className={`${styles.status} ${styles.red}`}></span>
					<span className={styles.statusText}>随访逾期</span>
				</span>
			)
		case 'daisuifang':
			return (
				<span >
					<span className={`${styles.status} ${styles.green}`}></span>
					<span className={styles.statusText}>待随访</span>
				</span>
			)
		case 'weidao':
			return (
				<span >
					<span className={`${styles.status} ${styles.yellow}`}></span>
					<span className={styles.statusText}>时间未到</span>
				</span>
			)
		default :
			return (
				<span >
					<span className={`${styles.status} ${styles.grey}`}></span>
					<span className={styles.statusText}>已随访</span>
				</span>
			)
	}
		
}

class TodayMission extends PureComponent {
    
	state = {
		missionType: 'wait',
		dataSource: [{
			key: '1',
			name: '小玫瑰',
			sex: '女',
			age: '18',
			dept: '骨科',
			zhenduan: '小腿骨折',
			doctor: '黄浩杰',
			days: '10',
			status: 'yisuifang'
		},{
			key: '2',
			name: '小玫瑰',
			sex: '女',
			age: '18',
			dept: '骨科',
			zhenduan: '小腿骨折',
			doctor: '黄浩杰',
			days: '10',
			status: 'yuqi'
		},{
			key: '3',
			name: '小玫瑰',
			sex: '女',
			age: '18',
			dept: '骨科',
			zhenduan: '小腿骨折',
			doctor: '黄浩杰',
			days: '10',
			status: 'daisuifang'
		},{
			key: '4',
			name: '小玫瑰',
			sex: '女',
			age: '18',
			dept: '骨科',
			zhenduan: '小腿骨折',
			doctor: '黄浩杰',
			days: '10',
			status: 'weidao'
		}],
		columns: [{
			title: '姓名',
			dataIndex: 'name',
			key: 'name'
		},{
			title: '基本信息',
			key: 'info',
			render: (text, record) => (
				<span>{record.sex}/{record.age}岁</span>
			)
		},{
			title: '科室',
			dataIndex: 'dept',
			key: 'dept'
		},{
			title: '出院诊断',
			dataIndex: 'zhenduan',
			key: 'zhenduan'
		},{
			title: '主管医生',
			dataIndex: 'doctor',
			key: 'doctor'
		},{
			title: '离院天数',
			dataIndex: 'days',
			key: 'days'
		},{
			title: '状态',
			key: 'status',
			render: (text, record) => statusDom(text, record)
		},{
			title: '操作',
			key: 'action',
			render: (text, record) => (
				<a className="aLink" href="javascript:;" onClick={this.checkProfile}>查看随访</a>
			)
		}],
		dataSource2: [{
			key: '1',
			name: '小玫瑰2',
			sex: '女',
			age: '18',
			dept: '骨科',
			zhenduan: '小腿骨折',
			doctor: '黄浩杰',
			days: '10',
			status: 'yisuifang'
		},{
			key: '2',
			name: '小玫瑰2',
			sex: '女',
			age: '18',
			dept: '骨科',
			zhenduan: '小腿骨折',
			doctor: '黄浩杰',
			days: '10',
			status: 'yuqi'
		},{
			key: '3',
			name: '小玫瑰2',
			sex: '女',
			age: '18',
			dept: '骨科',
			zhenduan: '小腿骨折',
			doctor: '黄浩杰',
			days: '10',
			status: 'daisuifang'
		},{
			key: '4',
			name: '小玫瑰2',
			sex: '女',
			age: '18',
			dept: '骨科',
			zhenduan: '小腿骨折',
			doctor: '黄浩杰',
			days: '10',
			status: 'weidao'
		}],
		columns2: [{
			title: '姓名',
			dataIndex: 'name',
			key: 'name'
		},{
			title: '基本信息',
			key: 'info',
			render: (text, record) => (
				<span>{record.sex}/{record.age}岁</span>
			)
		},{
			title: '科室',
			dataIndex: 'dept',
			key: 'dept'
		},{
			title: '出院诊断',
			dataIndex: 'zhenduan',
			key: 'zhenduan'
		},{
			title: '主管医生',
			dataIndex: 'doctor',
			key: 'doctor'
		},{
			title: '离院天数',
			dataIndex: 'days',
			key: 'days'
		},{
			title: '状态',
			key: 'status',
			render: (text, record) => statusDom(text, record)
		},{
			title: '操作',
			key: 'action',
			render: (text, record) => (
				<a className="aLink" href="javascript:;" onClick={this.checkProfile}>查看随访</a>
			)
		}]
	}
	
	checkProfile = () => {
		this.props.dispatch(routerRedux.push('/manage/todayMission/profile'));
	}
    
	typeChangeText(type){
		if(type=='yisuifang'){
			return '已随访'
		}else if(type=='yuqi'){
			return '随访逾期'
		}else if(type=='daisuifang'){
			return '待随访'
		}
	}
	changeTab(type){
		this.setState({
			missionType: type
		})
	}
	handleChange(value) {
  		console.log(`selected ${value}`);
	}
	
	render() {
		console.log(this.props)
		const { missionType, dataSource, columns, dataSource2, columns2 } = this.state
		return (
			<div>
				<div className={styles.contentWrap}>
					<div className={styles.title}>
						<i className={`iconfont icon-tianjiaicon ${styles.titleIcon}`}></i><span>今日任务</span>
					</div>
					<div className={styles.content}>
						<div className={styles.tabBtn}>
							<div className={`${styles.tabItem} ${missionType==='wait'?styles.tabItemChoosed:''}`} onClick={() => this.changeTab('wait')}>
								<i className={`iconfont icon-daisuifang-icon-green ${styles.tabIcon}`}></i>
								<span className={styles.text}>待随访</span>
								<span className={styles.number}>30</span>
							</div>
							<div className={`${styles.tabItem} ${missionType==='already'?styles.tabItemChoosed:''}`} onClick={() => this.changeTab('already')}>
								<i className={`iconfont icon-yisuifang-icon-green ${styles.tabIcon}`}></i>
								<span className={styles.text}>已随访</span>
								<span className={styles.number}>8</span>
							</div>
						</div>
						<div style={{display: missionType==='wait'?'block':'none'}}>
							<div className={styles.selectWrap}>
								<span className={styles.text}>科室</span>
								<Select defaultValue="lucy" style={{ width: 150 }} onChange={this.handleChange}
									allowClear>
							      	<Option value="lucy">Lucy</Option>
							      	<Option value="111">111</Option>
							      	<Option value="222">222</Option>
							      	<Option value="333">333</Option>
							    </Select>
								<span className={styles.text}>主管医生</span>
								<Select defaultValue="lucy" style={{ width: 150 }} onChange={this.handleChange}
									allowClear>
							      	<Option value="lucy">Lucy</Option>
							      	<Option value="111">111</Option>
							      	<Option value="222">222</Option>
							      	<Option value="333">333</Option>
							    </Select>
							    <span className={styles.text}>随访状态</span>
								<Select defaultValue="lucy" style={{ width: 150 }} onChange={this.handleChange}
									allowClear>
							      	<Option value="lucy">Lucy</Option>
							      	<Option value="111">111</Option>
							      	<Option value="222">222</Option>
							      	<Option value="333">333</Option>
							    </Select>
							</div>
							<div className={styles.table}>
								<Table dataSource={dataSource} columns={columns} pagination={{
									current: 1,
									pageSize: 12,
									total: 200,
									showQuickJumper: true
								}}/>
							</div>
						</div>
						<div style={{display: missionType==='already'?'block':'none'}}>
							<div className={styles.selectWrap}>
								<span className={styles.text}>主管医生</span>
								<Select defaultValue="lucy" style={{ width: 250 }} onChange={this.handleChange}
									allowClear>
							      	<Option value="lucy">Lucy</Option>
							      	<Option value="111">111</Option>
							      	<Option value="222">222</Option>
							      	<Option value="333">333</Option>
							    </Select>
							    <span className={styles.text}>随访状态</span>
								<Select defaultValue="lucy" style={{ width: 250 }} onChange={this.handleChange}
									allowClear>
							      	<Option value="lucy">Lucy</Option>
							      	<Option value="111">111</Option>
							      	<Option value="222">222</Option>
							      	<Option value="333">333</Option>
							    </Select>
							    <div className={styles.selectTag}>
							    	<span className={styles.text}>出院诊断</span>
									<Select
										allowClear
										className={styles.select}
							          	mode="tags"
							          	placeholder="请输入出院诊断（多填项）"
							          	defaultValue={['1', '2']}
							          	onChange={this.handleChange}
							          	style={{ width: 250 }}
							        >
							          	<Option key='111'>11111111111111111111111111111111111111111111</Option>
							          	<Option key='222'>222</Option>
							          	<Option key='333'>333</Option>
							          	<Option key='444'>444</Option>
							          	<Option key='555'>555</Option>
							          	<Option key='666'>666</Option>
							          	<Option key='777'>777</Option>
							        </Select>
							    </div>
							    
							</div>
							<div className={styles.table}>
								<Table dataSource={dataSource2} columns={columns2} pagination={{
									current: 1,
									pageSize: 12,
									total: 200,
									showQuickJumper: true
								}}/>
							</div>
						</div>
					</div>
					
				</div>
			</div>
		)
	}
}

export default connect(({ todayMission }) => ({
  todayMission
}))(TodayMission);