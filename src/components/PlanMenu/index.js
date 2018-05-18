import React, { Component } from 'react';
import styles from './index.less';

export default class PlanMenu extends Component {
	state = {
		// status: '1'
	}
	colorChange(type){
		if(type=='yisuifang'){
			return styles.grey
		}else if(type=='yuqi'){
			return styles.red
		}else if(type=='daisuifang'){
			return styles.green
		}else if(type=='weidao'){
			return styles.yellow
		}else{
			return ''
		}
	}
	iconChange(type){
		if(type=='yisuifang'){
			return 'yisuifang-icon-grey'
		}else if(type=='yuqi'){
			return 'suifangyuqi-icon-grey'
		}else if(type=='daisuifang'){
			return 'daisuifangicon-grey'
		}else if(type=='weidao'){
			return 'shijianweidao-icon-grey'
		}else{
			return ''
		}
	}
	typeChangeText(type){
		if(type=='yisuifang'){
			return '已随访'
		}else if(type=='yuqi'){
			return '随访逾期'
		}else if(type=='daisuifang'){
			return '待随访'
		}else if(type=='weidao'){
			return '已随访'
		}else{
			return '时间未到'
		}
	}
	render(){
		const {listData, status} = this.props
		return(
			<div>
				{listData.map(item => (
					<div key={item.id} className={`${styles.menuItemWrap} ${this.colorChange(item.type)} ${status==item.id?styles.menuItemChoosed:''}`}
						onClick={() => this.props.changeStatus(item.id)}>
						<div className={styles.menuItem}>
							<i className={`iconfont icon-${this.iconChange(item.type)} ${styles.itemIcon}`}></i>
							<div className={styles.content}>
								<div className={styles.itemTitle}>
									{item.time}
								</div>
								<div className={styles.info}>
									{item.text}
								</div>
								<div className={styles.tags}>
									<span>{this.typeChangeText(item.type)}</span>
								</div>
							</div>
						</div>
						
					</div>
				))}
			</div>
			
		)
	}
}