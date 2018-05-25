import { Component } from 'react'
import styles from './Profile.less'
import patientInfo from '../../../assets/patient.png'
import { Select, DatePicker, Table, Input, Button, Breadcrumb } from 'antd';

import PlanMenu from 'components/PlanMenu'
import Modal from 'components/Modal'
import PopoverSure from 'components/PopoverSure'

const Option = Select.Option;
const { TextArea } = Input;

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
					<span className={`${styles.status}`}></span>
					<span className={styles.statusText}>未知</span>
				</span>
			)
	}
		
}

class MissionProfile extends Component {
	state = {
		listData: [{
			id: '1',
		    type: 'yisuifang',
		    time: '2018-04-02',
		    text: '到院复查'
		},{
			id: '2',
		    type: 'yuqi',
		    time: '2018-04-02',
		    text: '到院复查'
		},{
			id: '3',
		    type: 'daisuifang',
		    time: '2018-04-21',
		    text: '出院后电话回访'
		},{
			id: '4',
		    type: 'weidao',
		    time: '2018-05-02',
		    text: '健康宣教'
		}],
		dataSource: [{
			key: '1',
			status: 'yisuifang',
			date: '2017-10-10',
			way: '到院复查',
			table: '肝胆外科随访登记表'
		},{
			key: '2',
			status: 'yuqi',
			date: '2017-10-10',
			way: '到院复查',
			table: '肝胆外科随访登记表'
		},{
			key: '3',
			status: 'daisuifang',
			date: '2017-10-10',
			way: '到院复查',
			table: '肝胆外科随访登记表'
		},{
			key: '4',
			status: 'weidao',
			date: '2017-10-10',
			way: '到院复查',
			table: '肝胆外科随访登记表'
		}],
		dataSource2: [{
			key: '1',
			name:'他克莫司(华东)胶囊',
			specification:'1毫克*50粒',
			amount:'1盒',
			usage:'每次0.5mg   一日一次  口服'
		},{
			key: '2',
			name:'他克莫司(华东)胶囊',
			specification:'1毫克*50粒',
			amount:'1盒',
			usage:'每次0.5mg   一日一次  口服'
		},{
			key: '3',
			name:'他克莫司(华东)胶囊',
			specification:'1毫克*50粒',
			amount:'1盒',
			usage:'每次0.5mg   一日一次  口服'
		}],
		status: '1',
		editPlanShow: false,
		stopPlanShow: false,
		conclusionShow: false,
		medicineShow: false
	}
	
	hideIdCard(id){
		if(id.length==18){
			return String(id).replace(String(id).substr(4,10),'**********')
		}else if(id.length==15){
			return String(id).replace(String(id).substr(4,7),'*******')
		}else{
			return id
		}
	}
	
	changeId=(id)=>{
		this.setState({
			status: id
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
	    const { dataSource } = this.state;
	    const newData = {
			key: dataSource.length+1,
			status: '',
			date: '',
			way: '',
			table: ''
	    };
	    this.setState({
	      	dataSource: [...dataSource, newData]
	    });
  	}
  	deletePlan = (record) => {
		const dataSource = [...this.state.dataSource];
		this.setState({ dataSource: dataSource.filter(item => item.key !== record.key) });
	}
	render(){
		const { isSummaryShow, listData, status, editPlanShow, dataSource, stopPlanShow, conclusionShow, medicineShow, dataSource2 } = this.state
		const columns = [{
			title: '随访状态',
			key: 'status',
			render: (text, record) => statusDom(text, record)
		},{
			title: '随访日期',
			dataIndex: 'date',
			key: 'date'
		},{
			title: '随访方式',
			dataIndex: 'way',
			key: 'way'
		},{
			title: '量表选择',
			dataIndex: 'table',
			key: 'table'
		},{
			title: '操作',
			key: 'action',
			render: (text, record) => (
				record.status!='yisuifang'?
				<PopoverSure title="您确定要删除该表格吗？"
					text="目标删除后将不可恢复。"
					sureFunction={()=>this.deletePlan(record)}>
					<span className="delLink">删除</span>
				</PopoverSure>
				:
				<span className="delLink">删除</span>
			)
		}]   
		const columns2 = [{
			title: '药品名称',
			dataIndex: 'name',
			key: 'name'
		},{
			title: '药品规格',
			dataIndex: 'specification',
			key: 'specification'
		},{
			title: '药品数量',
			dataIndex: 'amount',
			key: 'amount'
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
					    <Breadcrumb.Item href="">出院随访</Breadcrumb.Item>
					    <Breadcrumb.Item>查看详情</Breadcrumb.Item>
				  	</Breadcrumb>
					<div className={`${styles.patientInfo} clearfix`}>
						<div className={styles.infoWrap}>
							<div className={styles.img}>
								<img src={patientInfo} alt="头像"/>
							</div>
							<div className={styles.info}>
								<div className={styles.infoItemWrap}>
									<div className={styles.infoItem}>
										<span className={styles.basicInfo}>赵默笙</span>
										<span className={styles.basicInfo}>女</span>
										<span className={styles.basicInfo}>18岁</span>
									</div>
									<div className={styles.infoItem}>
										<span className={styles.label}>身份证号：</span>
										<span className={styles.text}>{this.hideIdCard('330601199010100011')}</span>
									</div>
								</div>
								<div className={styles.infoItemWrap}>									
									<div className={styles.infoItem}>
										<span className={styles.label}>联系人：</span>
										<span className={styles.text}>儿子 何照</span>
									</div>
									<div className={styles.infoItem}>
										<span className={styles.label}>费用类型：</span>
										<span className={styles.text}>市医保</span>
									</div>
									
								</div>
								<div className={styles.infoItemWrap}>
									<div className={styles.infoItem}>
										<span className={styles.label}>联系电话：</span>
										<span className={styles.text}>18866669999</span>
									</div>
									<div className={styles.infoItem}>
										<span className={styles.label}>家庭住址：</span>
										<span className={`${styles.text} text-hidden`}>浙江省杭州市下城区东新路xxxx小区11111111</span>
									</div>
								</div>
							</div>
						</div>
						<div className={styles.call}>
							<i className={`iconfont icon-red_phone ${styles.callIcon}`}></i>
							<div className={styles.text}>拨打电话</div>
						</div>
					</div>
					<div className={styles.mainInfoWrap}>
						<div className={styles.overFlow}>
							<div className={styles.menuList}>
								<div className={styles.specialItem}>
									<div className={styles.menuItem}>
										<i className={`iconfont icon-suifangjihuaicon ${styles.itemIcon}`}></i>
										<div className={styles.content}>
											<div className={styles.itemTitle}>
												患者信息
											</div>
											<div className={styles.info}>
												肾小球肾炎随访的计划
											</div>
											<div className={`${styles.btnItem} aLink`} onClick={this.showEditPlan}>
												<i className={`iconfont icon-green_bianji`}></i><span>编辑计划</span>
											</div>
											<div className={`${styles.btnItem} aLink`} onClick={this.showStopPlan}>
												<i className={`iconfont icon-tianjialiebiao_icon`}></i><span>手动结案</span>
											</div>
										</div>
									</div>
									
								</div>
								<PlanMenu listData={listData} status={status} changeStatus={this.changeId}></PlanMenu>
							</div>
							<div className={styles.mainInfo}>
								<div className={styles.info}>
									<div className={styles.title}>
										<i className={`iconfont icon-tongyongbiaotiicon ${styles.titleIcon}`}></i><span>患者信息</span>
									</div>
									<div className={styles.content}>
										<div className={styles.line}>
											<div className={styles.infoItem}>
												<span className={styles.label}>住院科室：</span>
												<span className={`${styles.text} text-hidden`}>肾内科肾内科肾内科肾内科</span>
											</div>
											<div className={styles.infoItem}>
												<span className={styles.label}>主管医生：</span>
												<span className={styles.text}>何以玫</span>
											</div>
											<div className={styles.infoItem}>
												<span className={styles.label}>出院诊断：</span>
												<span className={`${styles.text} text-hidden`}>肾小球肾炎肾小球肾炎肾小球肾炎肾小球肾炎</span>
											</div>
										</div>
										<div className={styles.line}>
											<div className={styles.infoItem}>
												<span className={styles.label}>病区：</span>
												<span className={styles.text}>0501</span>
											</div>
											<div className={styles.infoItem}>
												<span className={styles.label}>转归情况：</span>
												<span className={`${styles.text} text-hidden`}>逐渐可见好转</span>
											</div>
											<div className={styles.infoItem}>
												<span className={styles.label}>出院小结：</span>
												<span className={`${styles.text} aLink`} onClick={this.showConclusion}>点击查看</span>
											</div>
										</div>
										<div className={styles.line}>
											<div className={styles.infoItem}>
												<span className={styles.label}>床号：</span>
												<span className={styles.text}>0501</span>
											</div>
											<div className={styles.infoItem}>
												<span className={styles.label}>出院日期：</span>
												<span className={styles.text}>2018-01-06</span>
											</div>
											<div className={styles.infoItem}>
												<span className={styles.label}>出院带药：</span>
												<span className={`${styles.text} aLink`} onClick={this.showMedicine}>点击查看</span>
											</div>					
										</div>
										<div className={styles.line}>
												<div className={styles.infoItem}>
													<span className={styles.label}>住院号：</span>
													<span className={styles.text}>12136</span>
												</div>
												<div className={styles.infoItem}>
													<span className={styles.label}>住院天数：</span>
													<span className={styles.text}>4天</span>
												</div>
										</div>
									</div>
								</div>
								<div>
									status：{status}
								</div>
							</div>
							<Modal title="编辑随访计划" closable={false} visible={editPlanShow} onCancel={this.hideEditPlan}>
								<div className={styles.planName}>
									<span className={styles.label}>计划模板</span>
									<Input defaultValue="肝胆外科随访计划模板" style={{width: 270}}></Input>
								</div>
								<div className={styles.table}>
									<Table dataSource={dataSource} columns={columns} pagination={false}
										rowClassName={(record, index) => {
											return record.status
										}}/>
									<div className={`${styles.tableFooter} ${dataSource.length%2==0?styles.doubleTable:''}`}>
										<span className={styles.footerBtn} onClick={this.handleAdd}>
											<i className={`iconfont icon-tianjialiebiao_icon ${styles.tableIcon}`}></i><span>添加计划</span>
										</span>
									</div>
								</div>
								<div className={styles.tableBtn}>
									<Button type="primary">保存</Button>
									<Button onClick={this.hideEditPlan}>取消</Button>								
								</div>
							</Modal>
							<Modal title="手动结案" closable={false} visible={stopPlanShow} type="small"
								 onCancel={this.hideStopPlan}>
								<div className={styles.stopItem}>
									<span className={styles.label}>结案原因</span>
									<Select defaultValue="lucy" style={{ width: 353 }}
										allowClear>
								      	<Option value="lucy">Lucy</Option>
								      	<Option value="111">111</Option>
								      	<Option value="222">222</Option>
								      	<Option value="333">333</Option>
								    </Select>
								</div>
								<div className={styles.stopItem}>
									<span className={styles.label}>结案原因</span>
									<TextArea style={{ width: 353, height: 120 }} />
								</div>
								<div className={styles.stopText}>
									结案后，此患者后续随访将不会执行。
								</div>
								<div className={styles.stopBtn}>
									<Button type="primary">保存</Button>
									<Button onClick={this.hideStopPlan}>取消</Button>								
								</div>
							</Modal>
							<Modal title="出院小结" closable={true} visible={conclusionShow} onCancel={this.hideConclusion}>
								<div className={styles.conclusionTitle}>
									<div className={styles.titleItem}>
										<span className={styles.label}>开方时间：</span>
										<span className={styles.text}>2018-04-18</span>
									</div>
									<div className={styles.titleItem}>
										<span className={styles.label}>医师：</span>
										<span className={styles.text}>何以玫</span>
									</div>
								</div>
								<div className={styles.conclusionContent}>
									<div>
										<div className={`${styles.item} ${styles.specialItem}`}>
											<span className={styles.label}>入院日期：</span>
											<span className={styles.text}>2018-04-18</span>
										</div>
										<div className={`${styles.item} ${styles.specialItem}`}>
											<span className={styles.label}>入院诊断：</span>
											<span className={styles.text}>1.动脉粥样硬化；2.脑供血不足。</span>
										</div>
									</div>
									<div>
										<div className={`${styles.item} ${styles.specialItem}`}>
											<span className={styles.label}>出院日期：</span>
											<span className={styles.text}>2018-04-18</span>
										</div>
										<div className={`${styles.item} ${styles.specialItem}`}>
											<span className={styles.label}>出院诊断：</span>
											<span className={styles.text}>1.右侧基底节区腔隙性脑梗；2.脑供血不足；3.颈椎病；4.前列腺肥大。</span>
										</div>
									</div>
									<div className={styles.item}>
										<span className={styles.label}>入院情况：</span>
										<span className={styles.text}>患者因反复出现头昏、曾在外院诊断为“脑供血不足”，2年来一直未予用药治疗。病程中，头昏症状反反复复出现，尤其起床时症状明显，发作时无黑朦，头昏无头晕，无耳鸣、脑鸣，休息片刻能     自行缓解；偶有胸闷，无视物旋转及晕厥，无肢体麻木、无四肢抽搐。现发作频次较过去是有所增加，故而入住本院检查。目前，患者精神尚好，饮食正常，睡眠尚好，大、小便正常。</span>
									</div>
									<div className={styles.item}>
										<span className={styles.label}>住院经过：</span>
										<span className={styles.text}>入院后健康宣教；完善相关检查；,一般检查无明显异常，DR示：胸部正位片未见异常，颈椎病；头颅CT示：右侧基底节区腔隙性脑梗塞，予以了阿司匹林抗凝、脑心通改善脑部微循环、倍他司汀缓解头昏，非那雄胺改善前列腺。</span>
									</div>
									<div className={styles.item}>
										<span className={styles.label}>出院情况：</span>
										<span className={styles.text}>好转。患者偶尔有头晕头昏，一般情况好，睡眠好，二便正常。查体：BP120/80mmHg，神志清晰，精神尚可，口唇紫绀，颈软，颈静脉无怒张，两肺呼吸音粗，未闻及干湿性罗音。心率68次/分，心律齐，各瓣膜听诊区未闻及病理性杂音，腹软，肠鸣音正常存在， 四肢肌力四级，生理反射存在，病理反射巴氏征等未引出。今日给予办理出院。</span>
									</div>
									<div className={styles.item}>
										<span className={styles.label}>住院医嘱：</span>
										<span className={styles.text}>1.注意休息；2.清淡饮食；3.适量颈椎运动；4.坚持服药。</span>
									</div>
									<div className={styles.sign}>
										签名：何以玫
									</div>
								</div>
							</Modal>
							<Modal title="出院带药" closable={true} visible={medicineShow} onCancel={this.hideMedicine}>
								<div className={styles.medicineTitle}>
									<div className={styles.item}>
										<span className={styles.label}>病区：</span>
										<span className={styles.text}>五病区</span>
									</div>
									<div className={styles.item}>
										<span className={styles.label}> 床号：</span>
										<span className={styles.text}>0501</span>
									</div>
								</div>
								<div className={styles.medicineContent}>
									<Table dataSource={dataSource2} columns={columns2} pagination={false}/>
								</div>
							</Modal>
						</div>

						
					</div>
				</div>
				
				
			</div>
		)
	}
}

export default MissionProfile