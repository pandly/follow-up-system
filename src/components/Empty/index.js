import React, { Component } from 'react';
import styles from './index.less';
import empty from '../../assets/empty.png'

export default class Empty extends Component {
	render(){
		return (
			<div className={styles.emptyWrap}>
				<img className={styles.img} src={empty} />
				<div className={styles.text}>非常抱歉，当前页面暂无内容...</div>
			</div>
		)
	}
}