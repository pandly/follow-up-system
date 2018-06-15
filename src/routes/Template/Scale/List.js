import { PureComponent } from 'react'
import { Input, Breadcrumb, Spin, message } from 'antd';
import styles from './List.less'
import { connect } from 'dva'

import TableListCard from 'components/TableListCard'
import Empty from 'components/Empty'

const Search = Input.Search;

class Scale extends PureComponent {
	state = {
		title: ''
	}
	createTemplate = () => {
		this.props.history.push('/template/scale/profile');
	}
	updateTemplate = (id) => {
		this.props.history.push({
			pathname: '/template/scale/profile',
			search: `id=${id}`
		});
	}
	searchScale = (value) => {
		this.setState({
  			title: value
  		}, ()=>{
  			this.getData()
  		})
	}
	getData(){
		this.props.dispatch({
			type: 'scale/fetchScaleList',
			payload: {
				title: this.state.title
			}
		})
	}
	sureDelete(data){
		if(data.useNumber>0){
			let templateName = ''
			data.templateName.forEach((item, index) => {
				templateName = index===data.templateName.length-1?
					templateName + item
					:templateName + item + '，'
			})
			message.error(`该量表已被模板${templateName}使用，无法删除！`)
		}else{
			this.props.dispatch({
				type: 'scale/deleteScale',
				payload: data.scaleId
			}).then(()=>{
				message.success('删除成功！')
				this.getData()
			})
		}
		
	}
	copyTable(item){
		console.log(item,'copy')
	}
	componentWillMount(){
		this.getData()
	}
	render() {
		const {
			scaleList,
        	scaleListLoading
		} = this.props.scale

		return (
			<div>
				<div className={styles.content}>
					<Breadcrumb separator=">">
					    <Breadcrumb.Item>随访模板</Breadcrumb.Item>
					    <Breadcrumb.Item>随访量表</Breadcrumb.Item>
				  	</Breadcrumb>
					<div className={`${styles.title} clearfix`}>
						<div className={styles.titleText}>
							<i className={`iconfont icon-tongyongbiaotiicon ${styles.titleIcon}`}></i><span>随访量表</span>
						</div>
						<div className={styles.titleBtn}>
							<span className={styles.addBtn} onClick={this.createTemplate}>
								<i className={`iconfont icon-tianjiaicon ${styles.titleIcon}`}></i><span className={styles.text}>创建随访模版</span>
							</span>
							<Search
								style={{width: 320}}
						      	placeholder="量表标题"
						      	onSearch={this.searchScale}
						      	enterButton
						    />
						</div>
					</div>
					<div className={styles.listWrap}>
						<Spin spinning={scaleListLoading} size="large">
							<div className={styles.tableWrap}>
								{
									scaleList&&scaleList.length<1&&!scaleListLoading?
										<Empty></Empty>
										:
										scaleList.map(item => (
											<TableListCard  
												key={item.scaleId} 
												listData={item} 
												onClick={() => this.updateTemplate(item.scaleId)}
												sureDelete={()=>this.sureDelete(item)}
												copyTable={()=>this.copyTable(item)}></TableListCard>
										))					    					
								}
							</div>
						</Spin>
					</div>
				</div>
			</div>
		)
	}
}

export default connect(({ scale }) => ({
  scale
}))(Scale);