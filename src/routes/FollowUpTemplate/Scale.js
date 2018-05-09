import { PureComponent } from 'react'
import { Input } from 'antd';
import styles from './Scale.less'

import ListCard from 'components/ListCard'

const Search = Input.Search;

class Scale extends PureComponent {
	render() {
		const tableList = [{
			id:1,
			name: '感染科结核病患者随访登记表感染科结核病患者随访登记表',
			question: 20,
			times: 0,
			sign: false
		},{
			id:2,
			name: '感染科结核病患者随访登记表感染科结核病患者随访登记表感染科结核病患者随访登记表感染科结核病患者随访登记表',
			question: 20,
			times: 0,
			sign: true
		},{
			id:3,
			name: '调查表',
			question: 20,
			times: 0,
			sign: false
		},{
			id:4,
			name: '浙江省杭州市第一人民医院小儿患病统计调查表',
			question: 20,
			times: 4,
			sign: false
		},{
			id:5,
			name: '调查表结核病登记表',
			question: 20,
			times: 6,
			sign: false
		},{
			id:6,
			name: '结核病患者随访登记表',
			question: 20,
			times: 20,
			sign: false
		}]


		return (
			<div>
				<div className={styles.content}>
					<div className={`${styles.title} clearfix`}>
						<div className={styles.titleText}>
							<i className={`iconfont icon-tianjiaicon ${styles.titleIcon}`}></i><span>随访量表</span>
						</div>
						<div className={styles.titleBtn}>
							<span className={styles.addBtn}>
								<i className={`iconfont icon-tianjiaicon ${styles.titleIcon}`}></i><span className={styles.text}>创建随访模版</span>
							</span>
							<Search
								style={{width: 320}}
						      	placeholder="量表标题"
						      	onSearch={value => console.log(value)}
						      	enterButton
						    />
						</div>
					</div>
					<div className={styles.tableWrap}>
						{ tableList.map(item => (
							 <ListCard key={item.id} listData={item}></ListCard>
						))}
					</div>
				</div>
			</div>
		)
	}
}

export default Scale