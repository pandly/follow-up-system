import { PureComponent } from 'react'
import styles from './index.less'
import Input from 'components/Input'
import Default from 'assets/scale_default.png'
 
class QuestionnairContent extends PureComponent {
    state = {
    	mark: false,
    	title: '模板标题'
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
		if(nextProps.length > this.props.length) {
			this.scrollBottom = true;
		}else {
			this.scrollBottom = false;
		}

		if(nextProps.scrollTo !== this.props.scrollTo) {
			this.scrollTo = nextProps.scrollTo;
		}else {
			this.scrollTo = false;
		}
    }

	handleMark = () => {
       this.setState(prevState => ({
       	 mark: !prevState.mark
       }))
	}
    
    changeTitle = (value) => {
    	const { onChangeTitle } = this.props;
        this.setState({
			title: value
        })
        if(onChangeTitle) {
        	onChangeTitle(value)
        }
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
					<div className={styles['title-inner']}>
						<Input
                          value={title}
                          onChange={this.changeTitle}
                          style={{
                          	height: 45,
                          	borderColor: 'transparent',
                          	textAlign: 'center',
                          	fontSize: 18,
                          	color: '#666',
                          	fontFamily: 'PingFangSC-Medium'
                          }}
						  className={styles['title-input']} />
					</div>
				</div>
				<div className={styles['questionnair-page-content']} ref={el => this.content = el}>
					{/*如果组件没有子节点，this.props.children返回false*/}
					{this.props.children || (
						<div className={styles['questionnair-page-default']}>
							<img src={Default} style={{ width: 130 }}/>
							<div className={styles['page-default-text']}>您好没有添加题目哦，请点击左侧控件开始出题吧</div>
						</div>
					)}
				</div>
			</div>
		)
	}
}

export default QuestionnairContent