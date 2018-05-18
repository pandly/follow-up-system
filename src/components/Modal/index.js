import React, { Component } from 'react';
import styles from './index.less';

export default class Modal extends Component {
	state = {
		fideOut: false,
		childVisable: this.props.visible?this.props.visible:false,
		type: this.props.type?this.props.type:''
	}
	hide(){
		this.setState({
			fideOut: true
		})
		setTimeout(()=> {
			this.setState({
				childVisable: false,
				fideOut: false
			})
			this.props.onCancel()
		},100)
	}
	componentWillReceiveProps(nextProps){
		if(!nextProps.visible){
			this.setState({
				fideOut: true
			})
			setTimeout(()=> {
				this.setState({
					childVisable: false,
					fideOut: false
				})
			},100)
		}else{
			this.setState({
				childVisable: true
			})
		}
	}
	render(){
		const {children, title, closable } = this.props
		const {fideOut,childVisable,type} = this.state
		return (
			<div className={`${styles.modalWrap} ${fideOut?styles.hideFadeOut:''} ${childVisable?'':styles.modalHidden}`}>
				<div className={styles.shadow} onClick={()=>this.hide()}></div>
				<div className={`${styles.modal} ${type==='small'?styles.modalSmall:''}`}>
					<div className={styles.modalTitle}>
						{title}
						<i className={`iconfont icon-chachaicon ${styles.modalCloseIcon} ${closable?'':styles.modalHidden}`}
							onClick={()=>this.hide()}></i>
					</div>
					<div>
						{children}
					</div>
				</div>
			</div>
		)
	}
}