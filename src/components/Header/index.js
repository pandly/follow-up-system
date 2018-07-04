import { PureComponent } from 'react';
import { Popover } from 'antd';
import styles from './index.less';

class Header extends PureComponent {
	state = {
		showUser: false
	}
	showUserInfo = () => {
		this.setState({
			showUser: true
		})
	}
	updateCode = () => {
		console.log('修改密码')
	}
	logout = () => {
		console.log('退出登录')
		window.location.href = '/logout'
	}
	popoverDelDom(userName, number){
		return (
			<div className={`${styles.infoWrap}`}>
				<div className={styles.infoName}>{userName[userName.length-1]}</div>
				<div className={styles.infoDetail}>{userName}（{number}）</div>
				<div className={styles.btnWrap}>
					<div className={styles.btnItem} onClick={this.updateCode}>
						<i className={`iconfont icon-xiugaimima`}></i>
						<span className={styles.btnText}>修改密码</span>
					</div>
					<div className={styles.btnItem} onClick={this.logout}>
						<i className={`iconfont icon-tuichudenglu`}></i>
						<span className={styles.btnText}>退出登录</span>
					</div>
				</div>
			</div>
		)
	}
	render() {
		const userName = '沈浩'
		const number = '10010'
		const {showUser} = this.state

		return (
			<div className={styles.header}>
				<div className={styles.banner}>
					<i className={`iconfont icon-zhankai ${styles.bannerIcon}`}></i>
					<div>重庆三峡医院</div>
                    <div className={styles.vertical}></div>
                    <div>院后患者随访系统</div>
				</div>
				<div className={styles.user}>
					<i className={`iconfont icon-xiaoxi ${styles.infoIcon}`}></i>
					
					<Popover placement="bottomRight" content={this.popoverDelDom(userName, number)} 
						trigger="click" overlayClassName="headerPop">
				        <div className={styles.userName} onClick={this.showUserInfo}>{userName[userName.length-1]}</div>
				     </Popover>
					
				</div>
			</div>
		)
	}
}

export default Header;
