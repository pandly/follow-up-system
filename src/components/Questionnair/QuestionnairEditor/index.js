import { PureComponent } from 'react'
import Input from 'components/Input'
import Checkbox from 'components/Checkbox'
import Radio from 'components/Radio'
import Select from 'components/Select'
import Button from 'components/Button'
import ContentEditable from 'components/ContentEditable'
import ShakeTransition from 'components/Shake'
import Dialog from 'components/Dialog'
import PropTypes from 'prop-types'
import uuid from 'utils/utils'

import styles from './index.less'

const rowOptions = [1,2,3,4]

class QuestionnairEditor extends PureComponent {
    constructor(props) {
		super(props)
		this.temp = '';
    }
    
    state = {
    	toggleMutiOption: false,
		editor: {...this.props.editor},
		hover: false,
		inputShake: false,
		hasTitle: true,
		dialogVisible: false,
		mutiOption: ''
    }   
    /* 首先有点乱。。。
     * 由于每次每个题目的操作实际上都是在操作整个题目数组，题目数组交给了题目组件的父组件来管理
     * 所以每次题目操作完以后更新父组件的题目数组，父组件更新会触发题目组件的componentWillReceiveProps生命周期函数
     */
    componentWillReceiveProps(nextProps) {
    	/*
    	 * 每次只能编辑一个题目，所以触发再次添加题目的操作，将会引起当前题目的抖动
         * 连续点击产生连续抖动的效果，所以创建一个变量editorShake，来标志表格需要抖动
    	 * 由于是更新数组，为了在抖动的效果下保留之前填写的数据，所以比较之前和新的editorShake是否相同
    	 * 如果不同则说明只是要产生抖动，只更新editorShake变量
    	 */
    	if(nextProps.editor.editorShake !== this.props.editor.editorShake) {
    		this.setState({
				editor: {...this.state.editor, editorShake: nextProps.editor.editorShake}
			})
    	}else {
    		this.setState({
				editor: {...this.state.editor, ...nextProps.editor}
			})
    	}
    }

    switchEditor = (type) => {
		switch(type) {
			case 'radio': return '单选题';
			case 'dropdown': return '下拉题';
			case 'checkbox': return '多选题';
			case 'textarea': return '多行文本题';
			case 'text': return '单行文本题';
			case 'input': return '填空题';
		}
    }
    
    handleChange = (val, key, index) => {
    	let value = val;
    	if(key === 'title' && val) {
    		this.setState({
    			hasTitle: true
    		})
    	}
    	if(key === 'options') {
    		const options = this.state.editor.options.concat();
    		options[index] = val;
    		value = options;
    	}
		this.setState(prevState => ({
			editor: { ...prevState.editor, [key]:value }
		}))
    }
    //新增选项
    createOption = () => {
		this.setState(prevState => ({
			editor: { ...prevState.editor, 'options': [...prevState.editor.options, ''] }
		}))
    }
    //删除选项
    deleteOption = (index) => {
    	let options = [...this.state.editor.options];
    	options.splice(index, 1);
		this.setState(prevState => ({
			editor: { ...prevState.editor, options }
		}))
    }
    /*
     * 以下都是有关于批量编辑的事件
     */
    //点击打开批量编辑的弹窗
    handleMutiOption = () => {
        this.setState({
        	dialogVisible: true,
        	mutiOption: this.state.editor.options.join('\n')
        })
    }
    //批量编辑textarea中的change
    handleMutiTextarea = (val) => {
    	this.mutiTextareaValue = val;
        this.setState({
        	mutiOption: val
        })
    }
    //关闭批量编辑的弹窗
    closeDialog = () => {
    	this.setState({
        	dialogVisible: false
        })
    }
    //打开批量编辑的弹窗
    confirmDialog = () => {
    	const options = this.mutiTextareaValue.split('\n');
		this.setState(prevState => ({
        	dialogVisible: false,
        	editor: { ...prevState.editor, options }
        }))
    }
    //确认
    confirm = () => {
    	const { index, handleConfirm } = this.props;
    	const { editor, inputShake } = this.state;
    	if(!editor.title && editor.type !== 'input') {
    		this.setState(prevState => ({
    			inputShake: !prevState.inputShake,
    			hasTitle: false
    		}))
    		return ;
    	}
    	const newEditor = {...editor, isEditor: false, isFirst: false};
    	if(handleConfirm) {
    		handleConfirm(index, newEditor)
    	};
    	this.isFirst = false;
    	this.temp = JSON.parse(JSON.stringify(this.state.editor));
    }
    //取消
    cancel = () => {
    	const { index, handleCancel } = this.props;
    	if(handleCancel) {
    		handleCancel(index)
    	}
    	this.setState({
    		editor: this.temp
    	})
    }
    //编辑
    edit = () => {
    	const { index, handleEdit } = this.props;
    	if(handleEdit) {
    		handleEdit(index)
    	}
    }
    //复制
    copy = () => {
    	const { index, handleCopy } = this.props;
        if(handleCopy) {
        	handleCopy(index)
        }
    }
    //删除
    remove = () => {
    	const { index, handleRemove } = this.props;
        if(handleRemove) {
        	handleRemove(index)
        }
    }
    //鼠标进入
    mouseEnter = () => {
    	if(!this.props.drag) {
			this.setState({
	    		hover: true
	    	})
    	}
    }
    //鼠标离开
    mouseLeave = () => {
    	if(!this.props.drag) {
			this.setState({
	    		hover: false
	    	})
    	}
    }
	render() {
		const { index, curMoveItem, drag } = this.props;
		const { 
			toggleMutiOption, 
			editor, 
			hover, 
			inputShake, 
			hasTitle,
			dialogVisible,
			mutiOption
		} = this.state;
        const { 
        	type, 
        	isEditor, 
        	title, 
        	required, 
        	remark, 
        	remarkText, 
        	options, 
        	rows, 
        	textareaHeight, 
        	maxLength,
        	otherOption, 
        	otherOptionForwards, 
        	otherOptionBackwards, 
        	completionForwards, 
        	completionBackwards,
        	editorShake
        } = editor;
        //题目
        const titleEdiEl = (
			<div className="editor-row">
				<label className="editor-row-title">题目</label>
				<div className="editor-row-content">
				    <ShakeTransition shake={inputShake}>
						<Input
						  name={'title'}
						  value={title}
						  onChange={this.handleChange}
						  style={{
						  	borderColor: hasTitle ? '' : 'red'
						  }}
						/>
					</ShakeTransition>
				</div>				
			</div>
        )
        //选项框
        const optionsArr = options.map((option, index) => {
			return (
				<div className="editor-row" key={index}>
				    <label className="editor-row-title">
						<i className="iconfont icon-xuanxiangicon"></i>
				    </label>	        
				    <div className="editor-row-content">
						<Input
						  index={index}
						  name={'options'}
						  value={option}
						  onChange={this.handleChange}
						/>
					</div>
					<i className="iconfont icon-chachaicon" onClick={() => this.deleteOption(index)}></i>
				</div>
			)
		})
        //选项框和新建框
        const optionsEdiEl = (
			<div>
			    { optionsArr }
				<div className="editor-row">	        
				    <div className="editor-row-content">
						<div className="editor-create-option" onClick={this.createOption}>
							<i className="iconfont icon-xinjianxuanxiangicon"></i>
						    <span style={{ color: '#999' }}>新建选项</span>
						</div>
					</div>
					<i className="iconfont icon-chachaicon" style={{ visibility: 'hidden' }}></i>
				</div>
			</div>
        )
        //”其他“选项
        const optionsEdiOtherEl = (
			<div className="editor-row">	        
			    <div className="editor-row-content">
			        <div className="other-option-wrapper">
						<ContentEditable 
							name={'otherOptionForwards'}
							html={otherOptionForwards}
							onChange={this.handleChange}
						/>
						<div className="other-fill">
							<div className="other-fill-inner">____</div>
						</div>
						<ContentEditable
						    style={{ flex: 1 }}
							name={'otherOptionBackwards'}
							html={otherOptionBackwards}
							onChange={this.handleChange}
						/>
			        </div>
				</div>
				<i className="iconfont icon-chachaicon" onClick={() => this.handleChange(false, 'otherOption')}></i>
			</div>
        )
        //填空题
        const completionEdiEl = (
			<div className="editor-row">
			    <label className="editor-row-title">内容</label>	        
			    <div className="editor-row-content">
			        <div className="other-option-wrapper">
						<ContentEditable 
							name={'completionForwards'}
							html={completionForwards}
							onChange={this.handleChange}
						/>
						<div className="other-fill">
							<div className="other-fill-inner">____</div>
						</div>
						<ContentEditable
						    style={{ flex: 1 }}
							name={'completionBackwards'}
							html={completionBackwards}
							onChange={this.handleChange}
						/>
			        </div>
				</div>
			</div>
        )
        //添加"其他"选项 | 批量编辑
        const optionsCtrlEl = (
			<div className="options-control">	        
			    <button 
			      className="control-button"
			      style={{
			      	color: otherOption ? '#CCC' : '#45A8E6',
			      	cursor: otherOption ? 'not-allowed' : 'pointer'
			      }}
			      disabled={otherOption} 
			      onClick={() => this.handleChange(true, 'otherOption')}>
			    	添加“其他”选项
			    </button>
			    <span style={{ margin: '0 10px' }}>|</span>
			    <button 
			      className="control-button"
			      style={{
			      	color: toggleMutiOption ? '#CCC' : '#45A8E6',
			      	cursor: toggleMutiOption ? 'not-allowed' : 'pointer'
			      }}
			      disabled={toggleMutiOption} 
			      onClick={() => this.handleMutiOption()}>
			        批量编辑
			    </button>
			</div>
        )
        //单选、多选其他选项
        const optionsSubOtherEl = (
			<div className="subject-other-option">
				<span>{otherOptionForwards}</span>
				<Input 
				  type="text" 
				  width={40} 
				  style={{ 
				  	height: 23,
				  	borderColor: 'transparent',
				  	background: 'transparent',
				  	borderBottomColor: '#333' 
				  }}/>
				<span>{otherOptionBackwards}</span>
			</div>
		)
		//填空题目
		const subCompletionEl = (
			<div className="subject-other-option">
				<span>{completionForwards}</span>
				<Input 
				  type="text" 
				  width={100} 
				  style={{ 
				  	height: 23,
				  	borderColor: 'transparent',
				  	background: 'transparent',
				  	borderBottomColor: '#333' 
				  }}/>
				<span>{completionBackwards}</span>
			</div>
		)
		const optionsCom = otherOption ? options.concat(optionsSubOtherEl) : options;
        const optionsRadioEl = optionsCom.map(data => {
			return <Radio key={uuid()} label={data} style={{ width: `${100/parseInt(rows)}%`, marginBottom: 8 }} />;
		})
		const optionsCheckboxEl = optionsCom.map(data => {
			return <Checkbox key={uuid()} label={data} style={{ width: `${100/parseInt(rows)}%`, marginBottom: 8 }} />;
		})
		const optionsSelectEl = <Select options={options}/>
		const optionsEl = type === 'dropdown' ? optionsSelectEl : (type === 'radio' ? optionsRadioEl : optionsCheckboxEl)
        
        const optionsTextEl = <Input maxLength={maxLength} />
        const optionsTextareaEl = <Input type='textarea' rows={textareaHeight} />
		return (
			/*
			 * 想了很多交互，最终认为还是将编辑模块和题目模块放在一起实现起来相对方便点，虽然这样造成的后果是代码很臃肿。。。
			 * 如果不这样做，组件之间的传值问题将会变得错综复杂
			 * 后期有时间再仔细想想看看能不能有更优的办法
			 */ 
			<div className="questionnair-item">
                {isEditor ? (
	    		    <ShakeTransition shake={editorShake}>
	                	<div className="questionnair-editor">
							<div className="questionnair-editor-inner">
								<div className="editor-type">
									<i className="iconfont icon-Q-icon"></i>
									<span className="editor-type-text">{this.switchEditor(type)}</span>
								</div>
								{'input' === type ? completionEdiEl : titleEdiEl}
								<div className="editor-row">
								    <div className="editor-row-content">						
										<Checkbox
										  name={'required'}
										  checked={required} 
										  label={'必填'}
										  onChange={this.handleChange}
										  style={{
										  	marginRight: 15
										  }}
										/>
										<Checkbox
										  name={'remark'}
										  checked={remark}  
										  label={'备注'}
										  onChange={this.handleChange}
										  style={{
										  	marginRight: 15
										  }}
										/>
										{remark && (
											<Input
											  name={'remarkText'}
											  value={remarkText || ''}
											  onChange={this.handleChange}
											/>
										)}
								    </div>
								</div>
								{['radio', 'dropdown', 'checkbox'].includes(type) && optionsEdiEl}
								{otherOption && optionsEdiOtherEl}
								{['radio', 'checkbox'].includes(type) && optionsCtrlEl}
							    {['radio', 'checkbox'].includes(type) && (
									<div className="editor-adv">
										<span className="adv-option">
											每行显示
											<Select
											  name={'rows'}
										      value={rows} 
											  options={rowOptions}
											  onChange={this.handleChange}/>
											个选项
										</span>
									</div>
							    )}
								{'text' === type && (
									<div className="editor-adv">
										<span className="adv-option">
											最多填写
											<Input
											  width={50}
											  margin={'0 10px'} 
											  type={"number"}
											  name={'maxLength'}
											  value={maxLength}
											  onChange={this.handleChange} />
											字
										</span>
									</div>
								)}
								{'textarea' === type && (
									<div className="editor-adv">
										<span className="adv-option">
											文本框高度
											<Input
											  width={50}
											  margin={'0 10px'}
											  type={"number"}
											  name={'textareaHeight'}
											  value={textareaHeight}
											  onChange={this.handleChange} />
											行
										</span>
									</div>
								)}
								<div className="editor-button">
									<Button type="primary" onClick={this.confirm}>确定</Button>
									<Button type="cancel" onClick={this.cancel}>取消</Button>
								</div>
							</div>
							<Dialog
							  visible={dialogVisible}
							  title="批量修改"
							  onCancel={this.closeDialog}
							  onConfirm={this.confirmDialog}
							>
								<Input 
								  type="textarea"
								  value={mutiOption}
								  onChange={this.handleMutiTextarea}
								  rows={6} />
							</Dialog>
						</div>
				    </ShakeTransition>
                ) : (
					<div 
					  className="questionnair-subject"
					  style={{ 
					  	background: drag ? '' : (hover ? '#F5F5F5' : '#fff'),
			  			borderTopColor: (drag && index == 0) ? '#dbdbdb' : '',
			  			borderBottomColor: drag ? '#dbdbdb' : '',
					  }}
					  onMouseEnter={this.mouseEnter}
					  onMouseLeave={this.mouseLeave}>
					    <div className="questionnair-subject-inner">
							<div className="subject-row">
								<span>{index + 1}.</span>
								{'input' === type ? subCompletionEl : (<span>{title}</span>)}
								{required && <span className="subject-title-require">*</span>}
							</div>
							{remark && <div className="subject-row subject-remarks">{remarkText}</div>}
							<div className="subject-row">
								{['radio', 'dropdown', 'checkbox'].includes(type) && optionsEl}
								{type === 'text' && optionsTextEl}
								{type === 'textarea' && optionsTextareaEl}
							</div>
		                </div>
		                <div 
		                  className="subject-control-mask" 
		                  style={{ 
		                  	background: curMoveItem === index ? 'rgba(245,245,245,0.3)' : '' 
		                  }}>
		                </div>
		                <div 
		                  className="subject-control-bar"
		                  style={{ transform: drag ? '' : (hover ? 'translateX(0)' : '') }}>
							<div className="control-bar-inner">
							    <div className="control-bar-button" onClick={this.edit}>
							    	<i className="iconfont icon-grey_bianji"></i>
							    </div>
								<div className="control-bar-button" onClick={this.copy}>
									<i className="iconfont icon-grey_fuzhi"></i>
								</div>
								<div className="control-bar-button" onClick={this.remove}>
									<i className="iconfont icon-grey_shanchu"></i>
								</div>
							</div>
		                </div>
					</div>
                )}
			</div>
		)
	}
}

export default QuestionnairEditor