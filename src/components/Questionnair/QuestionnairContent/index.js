import { PureComponent } from 'react'
import styles from './index.less'
import Input from 'components/Input'
import Default from 'assets/scale_default.png'
 
class QuestionnairContent extends PureComponent {
    state = {
    	mark: false,
    }
    //新增题目时内容页滚动到底部
    componentDidUpdate() {
    	if(this.scrollBottom) {
    		const scrollHeight = this.content.scrollHeight;
			this.page.scrollTo(0, scrollHeight)
    	}

    	if(this.scrollTo) {
    		this.page.scrollTo(0, this.scrollTo)
    	}
    }
    
    componentWillReceiveProps(nextProps) {
		if(nextProps.isFirst) {
			this.scrollBottom = true;
		}else {
			this.scrollBottom = false;
		}

		if(nextProps.scrollTo !== this.props.scrollTo) {
			this.scrollTo = nextProps.scrollTo;
		}else {
			this.scrollTo = false;
		}
		this.setState({
			mark: nextProps.sign
		})
    }

	handleMark = () => {
	   const { onChangeSign } = this.props;
       this.setState(prevState => ({
       	 mark: !prevState.mark
       }), () => {
       	onChangeSign(this.state.mark)
       })
	}

	render () {
		const { mark, title } = this.state;
		return (
			<div className={styles['questionnair-page']} ref={el => this.page = el}>
				<div className={styles['questionnair-page-banner']}>
					<div className={styles['banner-text']} onClick={this.handleMark} style={{ color: mark ? '#FFBF47' : '' }}>
					  <i className="iconfont icon-dengpao"></i>
					  <span style={{ marginLeft: 6 }}>{mark ? '取消标记' : '标记'}</span>
					</div>
					{/*<span className={styles['banner-text']}><i className="iconfont icon-grey_yanjing"></i>预览</span>*/}
				</div>
				<div className={styles['questionnair-page-title']}>
					{this.props.children[0]}
				</div>
				<div className={styles['questionnair-page-content']} ref={el => this.content = el}>
					{/*如果组件没有子节点，this.props.children返回false*/}
					{this.props.children[1] || (
						<div className={styles['questionnair-page-default']}>
							<img src={Default} style={{ width: 130 }}/>
							<div className={styles['page-default-text']}>您还没有添加题目哦，请点击左侧控件开始出题吧</div>
						</div>
					)}
				</div>
			</div>
		)
	}
}

export default QuestionnairContent