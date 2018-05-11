import React, { Component } from 'react';
import { Tooltip, Popover, Button } from 'antd';
import styles from './index.less';

export default class ListCard extends Component {
	state = {
		isPopSignHide: false,
		isPopDeleteHide: false,
		isBtnShow: false
	}
	hideDelPop = ()=>{
		this.setState({
	      	isPopDeleteHide: false,
	    });
	}
	hideSignPop=()=>{
		this.setState({
	      	isPopSignHide: false,
	    });
	}
	isPopSignHideChange=(visible)=>{
		this.setState({ isPopSignHide: visible  });
	}
	isPopDeleteHideChange=(visible)=>{
		this.setState({ isPopDeleteHide: visible });
	}
	popoverDelDom(item){
		return (
	    	<div>
	    		<div className="clearfix">
	    			<i className="iconfont icon-chachaicon deleteIcon" onClick={() => this.hideDelPop()}></i>
	    		</div>
	    		<div className="popTitle">
	    			<i className="iconfont icon-jinggaotanhaoicon"></i>
	    			<span className="">您确定要删除该表格吗？</span>
	    		</div>
	    		<div className="popText">
	    			目标删除后将不可恢复。
	    		</div>
	    		<div className="popBtn">
	    			<Button type="primary" onClick={() => this.sureDelete(item)}>确定</Button>
	    			<Button onClick={() => this.hideDelPop()}>取消</Button>
	    		</div>
	    	</div>
	    )
	}
	popoverSignDom(item){
		return (
	    	<div>
	    		<div className="clearfix">
	    			<i className="iconfont icon-chachaicon deleteIcon" onClick={() => this.hideSignPop()}></i>
	    		</div>
	    		<div className="popTitle">
	    			<i className="iconfont icon-jinggaotanhaoicon"></i>
	    			<span className="">您确定要取消标记吗？</span>
	    		</div>
	    		<div className="popText">
	    			若要恢复标记，可在内页进行操作。
	    		</div>
	    		<div className="popBtn">
	    			<Button type="primary" onClick={() => this.sureDelete(item)}>确定</Button>
	    			<Button onClick={() => this.hideSignPop()}>取消</Button>
	    		</div>
	    	</div>
	    )
	}
	showBtn = ()=>{
		this.setState({
	      	isBtnShow: true,
	    });
	}
	hideBtn = ()=>{
		this.setState({
	      	isBtnShow: false,
	      	isPopDeleteHide: false,
	    });
	}
	sureDelete = (item)=> {
		console.log(item,'4444')
	}
	render(){
		const {listData} = this.props
		const {isPopSignHide, isPopDeleteHide, isBtnShow} = this.state
		// console.log(this.props)
		return (
			<div className={styles.tableItem} onMouseOver={this.showBtn} 
				onMouseLeave={this.hideBtn} onClick={this.props.goDetail}>
				<div className={styles.tableTitle}>{listData.name}</div>
				<div className="clearfix">
					<div className={styles.info}>
						<span className={styles.label}>题量：</span>
						<span className={styles.value}>{listData.question}</span>
						<span className={styles.label}>应用次数：</span>
						<span className={styles.value}>{listData.times}</span>
						<Popover placement="bottomLeft"  
							content={this.popoverSignDom(listData)} 
							visible={isPopSignHide}
							onVisibleChange={this.isPopSignHideChange}
							trigger="click">
				        	<Tooltip placement="top" title={'量表尚未制作完成，请及时完善；若已完成该模版，可点击取消草稿标记。'}
				        		overlayClassName="signTooltip">
						        <i className={`iconfont icon-dengpao ${styles.titleIcon}`} style={{display: listData.sign?'inline-block':'none'}}></i>
						    </Tooltip>
				      	</Popover>
					</div>
					<div className={styles.tableBtn} style={{display: isBtnShow?'inline-block':'none'}}  
						onClick={this.showBtn}>
						<Tooltip placement="top" title={'复制'}>
					        <i className={`iconfont icon-fuzhiicon ${styles.tableIcon}`}></i>
					    </Tooltip>
					    <Popover placement="bottomLeft"  content={this.popoverDelDom(listData)} 
					    	visible={isPopDeleteHide}
					    	onVisibleChange={this.isPopDeleteHideChange}
					    	trigger="click">
				        	<Tooltip placement="top" title={'删除'}>
						        <i className={`iconfont icon-shanchuicon ${styles.tableIcon}`}></i>
						    </Tooltip>
				      	</Popover>
					</div>
				</div>
			</div>			
		)
	}
}