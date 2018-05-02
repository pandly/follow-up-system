import { PureComponent } from 'react';
import styles from './index.less';

class Header extends PureComponent {
	render() {
		return (
			<div className={styles.header}>
				<div className={styles.banner}>
					<div>重庆三峡医院</div>
                    <div className={styles.vertical}></div>
                    <div>院后患者随访系统</div>
				</div>
				<div className={styles.user}>
					沈浩
				</div>
			</div>
		)
	}
}

export default Header;
