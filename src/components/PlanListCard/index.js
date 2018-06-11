import React, { Component } from 'react';
import styles from './index.less';

import PopoverSure from 'components/PopoverSure'

export default class PlanListCard extends Component {
	state = {
		isHover: false
	}
	showHover = ()=>{
		this.setState({
	      	isHover: true,
	    });
	}
	hideHover = ()=>{
		this.setState({
	      	isHover: false
	    });
	}
	goDetail = () => {
		if(this.props.listData.isUse){
			this.props.goDetail()
		}else{
			return
		}
	}
	sureRestart = ()=> {
		this.props.sureRestart()
	}
	render(){
		const {listData, departmentList, dictionary} = this.props
		const {isHover} =this.state
		return (
			<div className={`${styles.listItem} ${listData.isUse?'':styles.stopItem}`}
				 onMouseOver={this.showHover} onMouseLeave={this.hideHover} onClick={this.goDetail}>
				<div className={styles.listTitle}>
					{listData.title}
				</div>
				<div className={`${styles.itemInfo} ${listData.type?'':styles.itemInfoHidden}`}>
					<span className={styles.label}>类型：</span>
					<span className={styles.text}>
						{
				      		dictionary['PLAN_TEMPLATE_TYPE']?
						      	dictionary['PLAN_TEMPLATE_TYPE'].map(item => (
						      		listData.type==item.code?item.value:''
						      	))
				      		:''
	      				}
					</span>
				</div>
				<div className={`${styles.itemInfo} ${listData.department?'':styles.itemInfoHidden}`}>
					<span className={styles.label}>科室：</span>
					<span className={styles.text}>
						{
							departmentList.map(item => (
								listData.department==item.departmentId?item.departmentName:''
					      	))
				      	}
					</span>
				</div>
				<div className={`${styles.itemInfo} ${listData.inpatientWard?'':styles.itemInfoHidden}`} >
					<span className={styles.label}>病区：</span>
					<span className={`${styles.text} text-hidden`}>{listData.inpatientWard}</span>
				</div>
				<div className={`${styles.itemInfo} ${listData.illness.length!=0?'':styles.itemInfoHidden}`}>
					<span className={styles.label}>疾病诊断：</span>
					<span className={`${styles.text} text-hidden`}>
						{
							listData.illness&&listData.illness.length!=0?listData.illness.map((ill,index)=>(
								index==listData.illness.length-1?
							      	ill:ill+'，'
							)):'暂无'
	      				}
					</span>
				</div>
				<div className={`${styles.hoverInfo} ${isHover&&!listData.isUse?'':styles.itemInfoHidden}`}>
					<div className={styles.hoverTitle}>
						<i className={`iconfont icon-sanjiaoxingjinggao ${styles.hoverIcon}`}></i><span>此模板已暂停使用</span>
					</div>
					<div className={styles.ntnWrap}>
						<span onClick={this.props.goDetail}>查看详情</span>
						{
							isHover?
								<PopoverSure title="您确定要重新发布该计划吗？"
									text="目标重新发布后可进行再次编辑。"
									sureFunction={()=>this.sureRestart()}>
									<span className="aLink">重新发布</span>
								</PopoverSure>
							:''
						}
						
					</div>
				</div>
			</div>
		)
	}
}