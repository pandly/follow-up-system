import { PureComponent } from 'react'
import styles from './List.less'
import { Tabs, Select, DatePicker, Table, Input } from 'antd';
import { routerRedux } from 'dva/router'
import { connect } from 'dva'

const TabPane = Tabs.TabPane;
const Option = Select.Option;
const { RangePicker } = DatePicker;
const Search = Input.Search;

const statusDom = (text, record) => {
	switch(text.status){
		case false:
			return (
				<span className={styles.green}>未结案</span>
			)
		case true:
			return (
				<span >已结案</span>
			)
		default :
			return (
				<span >已结案</span>
			)
	}
		
}

class OutPatient extends PureComponent {
	state = {
    	dataSource: [{
			key: '1',
			name: '小玫瑰',
			sex: '女',
			age: '18',
			dept: '骨科',
			zhenduan: '小腿骨折',
			doctor: '黄浩杰',
			chuyuanDate: '2018-04-10',
			days: '10',
			daisuifangDate: '2018-04-10'
		},{
			key: '2',
			name: '小玫瑰',
			sex: '女',
			age: '18',
			dept: '骨科',
			zhenduan: '小腿骨折',
			doctor: '黄浩杰',
			chuyuanDate: '2018-04-10',
			days: '10',
			daisuifangDate: '2018-04-10'
		},{
			key: '3',
			name: '小玫瑰',
			sex: '女',
			age: '18',
			dept: '骨科',
			zhenduan: '小腿骨折',
			doctor: '黄浩杰',
			chuyuanDate: '2018-04-10',
			days: '10',
			daisuifangDate: '2018-04-10'
		},{
			key: '4',
			name: '小玫瑰',
			sex: '女',
			age: '18',
			dept: '骨科',
			zhenduan: '小腿骨折',
			doctor: '黄浩杰',
			chuyuanDate: '2018-04-10',
			days: '10',
			daisuifangDate: '2018-04-10'
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
			title: '出院日期',
			dataIndex: 'chuyuanDate',
			key: 'chuyuanDate'
		},{
			title: '离院天数',
			dataIndex: 'days',
			key: 'days'
		},{
			title: '待随访日期',
			dataIndex: 'daisuifangDate',
			key: 'daisuifangDate'
		},{
			title: '操作',
			key: 'action',
			render: (text, record) => (
				<a className="aLink" href="javascript:;" onClick={this.goDetail}>开始随访</a>
			)
		}],
		dataSource2: [{
			key: '1',
			name: '小玫瑰',
			sex: '女',
			age: '18',
			dept: '骨科',
			zhenduan: '小腿骨折',
			doctor: '黄浩杰',
			chuyuanDate: '2018-04-10',
			days: '10',
			suifangDate: '2018-04-10',
			callTime: '2分30秒',
			status: false
		},{
			key: '2',
			name: '小玫瑰',
			sex: '女',
			age: '18',
			dept: '骨科',
			zhenduan: '小腿骨折',
			doctor: '黄浩杰',
			chuyuanDate: '2018-04-10',
			days: '10',
			suifangDate: '2018-04-10',
			callTime: '2分30秒',
			status: false
		},{
			key: '3',
			name: '小玫瑰',
			sex: '女',
			age: '18',
			dept: '骨科',
			zhenduan: '小腿骨折',
			doctor: '黄浩杰',
			chuyuanDate: '2018-04-10',
			days: '10',
			suifangDate: '2018-04-10',
			callTime: '2分30秒',
			status: false
		},{
			key: '4',
			name: '小玫瑰',
			sex: '女',
			age: '18',
			dept: '骨科',
			zhenduan: '小腿骨折',
			doctor: '黄浩杰',
			chuyuanDate: '2018-04-10',
			days: '10',
			suifangDate: '2018-04-10',
			callTime: '2分30秒',
			status: false
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
			title: '出院日期',
			dataIndex: 'chuyuanDate',
			key: 'chuyuanDate'
		},{
			title: '离院天数',
			dataIndex: 'days',
			key: 'days'
		},{
			title: '随访日期',
			dataIndex: 'suifangDate',
			key: 'suifangDate'
		},{
			title: '通话时长',
			dataIndex: 'callTime',
			key: 'callTime'
		},{
			title: '状态',
			key: 'status',
			render: (text, record) => statusDom(text, record)
		},{
			title: '操作',
			key: 'action',
			render: (text, record) => (
				<a className="aLink" href="javascript:;">开始随访</a>
			)
		}]
  	}

  	goDetail = () =>{
  		this.props.dispatch(routerRedux.push('/manage/outPatient/profile'));
  	}
  	callback(key) {
	  	console.log(key);
	}
	onChange(date, dateString) {
	  	console.log(date, dateString);
	}
	render() {
		const { dataSource, columns, dataSource2, columns2 } = this.state
		return (
			<div>
				<div className={styles.contentWrap}>
					<div className={`${styles.title} clearfix`}>
						<div className={styles.titleText}>
							<i className={`iconfont icon-tianjiaicon ${styles.titleIcon}`}></i><span>出院随访</span>
						</div>
						<div className={styles.titleBtn}>
							<Search
								style={{width: 320}}
						      	placeholder="患者姓名/住院号"
						      	onSearch={value => console.log(value)}
						      	enterButton
						    />
						</div>
					</div>
					<div className={styles.content}>
						<Tabs defaultActiveKey="1" onChange={this.callback}>
						    <TabPane tab="待随访" key="1">
						    	<div className={styles.selectWrap}>
						    		<div className={styles.selectItem}>
						    			<span className={styles.text}>科室</span>
										<Select defaultValue="lucy" style={{ width: 150 }} onChange={this.handleChange}
											allowClear>
									      	<Option value="lucy">Lucy</Option>
									      	<Option value="111">111</Option>
									      	<Option value="222">222</Option>
									      	<Option value="333">333</Option>
									    </Select>
						    		</div>
						    		<div className={styles.selectItem}>
						    			<span className={styles.text}>主管医生</span>
										<Select defaultValue="lucy" style={{ width: 150 }} onChange={this.handleChange}
											allowClear>
									      	<Option value="lucy">Lucy</Option>
									      	<Option value="111">111</Option>
									      	<Option value="222">222</Option>
									      	<Option value="333">333</Option>
									    </Select>
						    		</div>
						    		<div className={styles.selectItem}>
						    			<span className={styles.text}>随访日期</span>
										<RangePicker onChange={this.onChange} placeholder={['yyyy-mm-dd', 'yyyy-mm-dd']}
											style={{ width: 250 }}/>
						    		</div>
						    		<div className={styles.selectItem}>
						    			<span className={styles.text}>出院日期</span>
										<RangePicker onChange={this.onChange} placeholder={['yyyy-mm-dd', 'yyyy-mm-dd']}
											style={{ width: 250 }}/>
						    		</div>
						    	</div>
						    	<div className={styles.table}>
									<Table dataSource={dataSource} columns={columns} pagination={{
										current: 1,
										pageSize: 12,
										total: 200,
										showQuickJumper: true
									}}/>
								</div>
						    </TabPane>
						    <TabPane tab="已随访" key="2">
						    	<div className={styles.selectWrap}>
						    		<div className={styles.selectItem}>
						    			<span className={styles.text}>科室</span>
										<Select defaultValue="lucy" style={{ width: 150 }} onChange={this.handleChange}
											allowClear>
									      	<Option value="lucy">Lucy</Option>
									      	<Option value="111">111</Option>
									      	<Option value="222">222</Option>
									      	<Option value="333">333</Option>
									    </Select>
						    		</div>
						    		<div className={styles.selectItem}>
						    			<span className={styles.text}>主管医生</span>
										<Select defaultValue="lucy" style={{ width: 150 }} onChange={this.handleChange}
											allowClear>
									      	<Option value="lucy">Lucy</Option>
									      	<Option value="111">111</Option>
									      	<Option value="222">222</Option>
									      	<Option value="333">333</Option>
									    </Select>
						    		</div>
						    		<div className={styles.selectItem}>
						    			<span className={styles.text}>随访日期</span>
										<RangePicker onChange={this.onChange} placeholder={['yyyy-mm-dd', 'yyyy-mm-dd']}
											style={{ width: 250 }}/>
						    		</div>
						    		<div className={styles.selectItem}>
						    			<span className={styles.text}>出院日期</span>
										<RangePicker onChange={this.onChange} placeholder={['yyyy-mm-dd', 'yyyy-mm-dd']}
											style={{ width: 250 }}/>
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
						    </TabPane>
					  	</Tabs>
					</div>
				</div>
			</div>
		)
	}
}

export default connect(({ outPatient }) => ({
  outPatient
}))(OutPatient);