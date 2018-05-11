import React, { Component } from 'react';
import styles from './index.less';

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
		if(this.props.listData.status){
			this.props.goDetail()
		}else{
			return
		}
	}
	render(){
		const {listData} = this.props
		const {isHover} =this.state
		return (
			<div className={`${styles.listItem} ${listData.status?'':styles.stopItem}`}
				 onMouseOver={this.showHover} onMouseLeave={this.hideHover} onClick={this.goDetail}>
				<div className={styles.listTitle}>
					{listData.title}
				</div>
				<div className={`${styles.itemInfo} ${listData.type?'':styles.itemInfoHidden}`}>
					<span className={styles.label}>类型：</span>
					<span className={styles.text}>{listData.type}</span>
				</div>
				<div className={`${styles.itemInfo} ${listData.dept?'':styles.itemInfoHidden}`}>
					<span className={styles.label}>科室：</span>
					<span className={styles.text}>{listData.dept}</span>
				</div>
				<div className={`${styles.itemInfo} ${listData.diseaseArea?'':styles.itemInfoHidden}`} >
					<span className={styles.label}>病区：</span>
					<span className={`${styles.text} text-hidden`}>{listData.diseaseArea}</span>
				</div>
				<div className={`${styles.itemInfo} ${listData.diagnose?'':styles.itemInfoHidden}`}>
					<span className={styles.label}>疾病诊断：</span>
					<span className={`${styles.text} text-hidden`}>{listData.diagnose}</span>
				</div>
				<div className={`${styles.hoverInfo} ${isHover&&!listData.status?'':styles.itemInfoHidden}`}>
					<div className={styles.hoverTitle}>
						<i className={`iconfont icon-sanjiaoxingjinggao ${styles.hoverIcon}`}></i><span>此模板已暂停使用</span>
					</div>
					<div className={styles.ntnWrap}>
						<span onClick={this.props.goDetail}>查看详情</span>
						<span className="aLink">重新发布</span>
					</div>
				</div>
			</div>
		)
	}
}