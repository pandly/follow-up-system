import { PureComponent } from 'react';
import styles from './index.less';

class Header extends PureComponent {
	render() {
		const userName = '沈浩'
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
					<div className={styles.userName}>{userName[userName.length-1]}</div>
				</div>
			</div>
		)
	}
}

export default Header;
