import { PureComponent } from 'react'
import styles from './Satisfaction.less'
import { Input, Tabs, Select, DatePicker, Table, Tooltip } from 'antd';

const Search = Input.Search;
const TabPane = Tabs.TabPane;
const Option = Select.Option;
const { RangePicker } = DatePicker;

const statusDom = (text, record) => {
	switch(text.status){
		case false:
			return (
				<span className={styles.red}>未随访</span>
			)
		case true:
			return (
				<span >已随访</span>
			)
		default :
			return (
				<span >已随访</span>
			)
	}
		
} 

class Satisfaction extends PureComponent {
	state = {
		rate: 40,
		rate2: 60,
		dataSource: [{
			key: '1',
			name: '小玫瑰',
			dept: '骨科',
			zhenduan: '小腿骨折',
			doctor: '黄浩杰',
			chuyuanDate: '2018-04-10',
			suifangDate: '2018-04-10',
			callTime: '2分30秒',
			status: false
		},{
			key: '2',
			name: '小玫瑰',
			dept: '骨科',
			zhenduan: '小腿骨折',
			doctor: '黄浩杰',
			chuyuanDate: '2018-04-10',
			suifangDate: '2018-04-10',
			callTime: '2分30秒',
			status: false
		},{
			key: '3',
			name: '小玫瑰',
			dept: '骨科',
			zhenduan: '小腿骨折',
			doctor: '黄浩杰',
			chuyuanDate: '2018-04-10',
			suifangDate: '2018-04-10',
			callTime: '2分30秒',
			status: true
		},{
			key: '4',
			name: '小玫瑰',
			dept: '骨科',
			zhenduan: '小腿骨折',
			doctor: '黄浩杰',
			chuyuanDate: '2018-04-10',
			suifangDate: '2018-04-10',
			callTime: '2分30秒',
			status: false
		}],
		columns: [{
			title: '姓名',
			dataIndex: 'name',
			key: 'name'
		},{
			title: '出院科室',
			dataIndex: 'dept',
			key: 'dept'
		},{
			title: '随访人员',
			dataIndex: 'doctor',
			key: 'doctor'
		},{
			title: '出院诊断',
			dataIndex: 'zhenduan',
			key: 'zhenduan'
		},{
			title: '出院日期',
			dataIndex: 'chuyuanDate',
			key: 'chuyuanDate'
		},{
			title: '状态',
			key: 'status',
			render: (text, record) => statusDom(text, record)
		},{
			title: '随访日期',
			dataIndex: 'suifangDate',
			key: 'suifangDate'
		},{
			title: '随访时长',
			dataIndex: 'callTime',
			key: 'callTime'
		},{
			title: '操作',
			key: 'action',
			render: (text, record) => (
				<a className="aLink" href="javascript:;">开始回访</a>
			)
		}],
		dataSource2: [{
			key: '1',
			name: '小玫瑰',
			dept: '骨科',
			zhenduan: '小腿骨折',
			doctor: '黄浩杰',
			chuyuanDate: '2018-04-10',
			suifangDate: '2018-04-10',
			callTime: '2分30秒',
			status: false
		},{
			key: '2',
			name: '小玫瑰',
			dept: '骨科',
			zhenduan: '小腿骨折',
			doctor: '黄浩杰',
			chuyuanDate: '2018-04-10',
			suifangDate: '2018-04-10',
			callTime: '2分30秒',
			status: false
		},{
			key: '3',
			name: '小玫瑰',
			dept: '骨科',
			zhenduan: '小腿骨折',
			doctor: '黄浩杰',
			chuyuanDate: '2018-04-10',
			suifangDate: '2018-04-10',
			callTime: '2分30秒',
			status: true
		},{
			key: '4',
			name: '小玫瑰',
			dept: '骨科',
			zhenduan: '小腿骨折',
			doctor: '黄浩杰',
			chuyuanDate: '2018-04-10',
			suifangDate: '2018-04-10',
			callTime: '2分30秒',
			status: false
		}],
		columns2: [{
			title: '姓名',
			dataIndex: 'name',
			key: 'name'
		},{
			title: '出院科室',
			dataIndex: 'dept',
			key: 'dept'
		},{
			title: '回访人员',
			dataIndex: 'doctor',
			key: 'doctor'
		},{
			title: '回访日期',
			dataIndex: 'suifangDate',
			key: 'suifangDate'
		},{
			title: '出院诊断',
			dataIndex: 'zhenduan',
			key: 'zhenduan'
		},{
			title: '出院日期',
			dataIndex: 'chuyuanDate',
			key: 'chuyuanDate'
		},{
			title: '随访状态',
			key: 'status',
			render: (text, record) => statusDom(text, record)
		},{
			title: '随访时长',
			dataIndex: 'callTime',
			key: 'callTime'
		},{
			title: '操作',
			key: 'action',
			render: (text, record) => (
				<a className="aLink" href="javascript:;">查看回访</a>
			)
		}]
	}
	render() {
		const { rate, rate2, dataSource, columns, dataSource2, columns2 } = this.state
		return (
			<div>
				<div className={styles.contentWrap}>
					<div className={`${styles.title} clearfix`}>
						<div className={styles.titleText}>
							<i className={`iconfont icon-tianjiaicon ${styles.titleIcon}`}></i><span>满意度回访</span>
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
						    <TabPane tab="待回访" key="1">
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
						    	<div className={styles.infoWrap}>
						    		<div className={styles.infoItem}>
						    			<span className={styles.label}>已回访</span>
						    			<span className={styles.text}>100</span>
						    		</div>
						    		<div className={styles.infoItem}>
						    			<span className={styles.label}>出院患者</span>
						    			<span className={styles.text}>150</span>
						    		</div>
						    		<div className={styles.infoItem}>
						    			<span className={styles.label}>回访率</span>
						    			<span className={`${styles.text} ${rate>50?styles.green:styles.red}`}>{rate}%</span>
						    		</div>
						    		<Tooltip placement="top" title={`${rate>50?'您已完成回访率指标':'您尚未达到回访率指标，请尽快完成'}`}
				        				overlayClassName="signTooltip">
						        		<i className={`iconfont icon-jinggaotanhaoicon ${styles.infoIcon}`}></i>
						    		</Tooltip>
						    		
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
						    <TabPane tab="已回访" key="2">
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
						    	<div className={styles.infoWrap}>
						    		<div className={styles.infoItem}>
						    			<span className={styles.label}>已回访</span>
						    			<span className={styles.text}>100</span>
						    		</div>
						    		<div className={styles.infoItem}>
						    			<span className={styles.label}>出院患者</span>
						    			<span className={styles.text}>150</span>
						    		</div>
						    		<div className={styles.infoItem}>
						    			<span className={styles.label}>回访率</span>
						    			<span className={`${styles.text} ${rate2>50?styles.green:styles.red}`}>{rate2}%</span>
						    		</div>
						    		<Tooltip placement="top" title={`${rate2>50?'您已完成回访率指标':'您尚未达到回访率指标，请尽快完成'}`}
				        				overlayClassName="signTooltip">
						        		<i className={`iconfont icon-jinggaotanhaoicon ${styles.infoIcon}`}></i>
						    		</Tooltip>
						    		
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

export default Satisfaction