import React, { Component } from 'react';
import { Popover, Button } from 'antd';
// import styles from './index.less';

export default class PopoverSure extends Component {
	state = {
		isHide: false
	}
	hidePop = ()=>{
		this.setState({
	      	isHide: false
	    });
	}
	isHideChange=(visible)=>{
		this.setState({ isHide: visible  });
	}
	sure=()=>{
		this.props.sureFunction()
		this.setState({
	      	isHide: false
	    });
	}
	popoverDelDom(){
		return (
	    	<div>
	    		<div className="clearfix">
	    			<i className="iconfont icon-chachaicon deleteIcon" onClick={this.hidePop}></i>
	    		</div>
	    		<div className="popTitle">
	    			<i className="iconfont icon-jinggaotanhaoicon"></i>
	    			<span>{this.props.title}</span>
	    		</div>
	    		<div className="popText">
	    			{this.props.text}
	    		</div>
	    		<div className="popBtn">
	    			<Button type="primary" onClick={this.sure}>确定</Button>
	    			<Button onClick={this.hidePop}>取消</Button>
	    		</div>
	    	</div>
	    )
	}
	render(){
		const {children} = this.props
		const {isHide} = this.state
		return (
			<Popover placement="bottomLeft"  content={this.popoverDelDom()} 
		    	visible={isHide}
		    	onVisibleChange={this.isHideChange}
		    	trigger="click">
			    {children}
	      	</Popover>
		)
	}
}