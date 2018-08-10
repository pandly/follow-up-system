import { PureComponent } from 'react'
import Input from 'components/Input'
import Checkbox from 'components/Checkbox'
import Radio from 'components/Radio'
import Dropdown from 'components/Dropdown'
import ContentEditable from 'components/ContentEditable'
import uuid from 'utils/utils'
import styles from './index.less'
import { Select } from 'antd';

const Option = Select.Option;

const rowOptions = [1,2,3,4]

class QuestionnairEditor extends PureComponent {
    constructor(props) {
		super(props)
		this.temp = '';
		this.otherOptionInput = '';
    }

    state = {
		editor: {...this.props.editor},
		hasOption: [],
		hasTitle: true,
		otherOptionInput: '',
		otherOptionForwards: '',
		selectValue: ''
    }
    componentWillReceiveProps(nextProps) {    	
		this.setState({
			editor: {...this.state.editor, ...nextProps.editor}
		})
    	//处理select ant的select默认值处理
    	if(nextProps.editor.type=='dropdown'){
			let temp =  nextProps.editor.answer&& JSON.parse(JSON.stringify(nextProps.editor.answer))
	    	if(nextProps.editor.answer&&temp[nextProps.editor.type]){
	    		this.setState({
	    			selectValue: temp[nextProps.editor.type]
	    		})
	    	}
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
			default: return '错误'
		}
    }
    
    handleChange = (e, index) => {
    	let value = e.target ? e.target.value : e;
    	let key = e.target.name;
    	let checked = e.target.checked;
    	if(key === 'title' && value) {
    		//控制题目input边框颜色
    		this.setState({
    			hasTitle: true
    		})
    	}
    	if(key === 'options') {
    		let { options } = this.state.editor;
    		let { hasOption } = this.state;
    		hasOption[index] = true;
    		this.setState({
				hasOption: [...hasOption]
    		})
    		let optionsTemp = options.concat();
    		optionsTemp[index] = value;
    		value = optionsTemp;
    	}
    	if(key === 'required' || key === 'remark') {
    		value = checked;
    	}
    	if(key === 'maxLength') {
    		value = parseInt(value)
    	}
		this.setState(prevState => ({
			editor: { ...prevState.editor, [key]:value }
		}))
    }
    //暂时用ant 下拉框
    handleAnswerSelectChange = (value) => {
    	this.setState({
        	selectValue: value
        })
    	let { type } = this.state.editor;
    	this.answer[type] = value;
    	const answerEditor = { ...this.state.editor, answer: this.answer }
        this.props.onAnswer(answerEditor, this.props.index)

    }
    //填写答案时触发的事件
    handleAnswerChange = (e, index) => {
    	let { type } = this.state.editor;
    	let value = e.target.value;
    	this.optionIndex = e.target.dataset.index;
    	if(value === 'undefined') {
			value = this.otherOptionValue
		}
    	if(type === 'checkbox') {
    		let valueIn = this.answer.checkbox.optionValue.includes(value);
    		let indexIn = this.answer.checkbox.optionIndex.includes(this.optionIndex);
    		this.answer.checkbox.optionValue[this.optionIndex] = valueIn ? null : value;
    		this.answer.checkbox.optionIndex[this.optionIndex] = indexIn ? null : this.optionIndex;
    		this.answer.checkbox.otherOptionValue = this.otherOptionValue;
    	}else if(type === 'radio'){
    		this.answer[type] = {
    			optionValue: value,
    			optionIndex: this.optionIndex,
    			otherOptionValue: this.otherOptionValue
    		};
    	}else {
    		this.answer[type] = value;
    	}
        const answerEditor = { ...this.state.editor, answer: this.answer }
        this.props.onAnswer(answerEditor, this.props.index)
    }
    //填写radio、checkbox'其他'选项时触发的方法
    handleOtherOptionInputChange = (e) => {
    	const { type, otherOptionForwards, otherOptionBackwards } = this.state.editor;
		this.otherOptionValue = e.target.innerHTML;
		this.allValue = otherOptionForwards + this.otherOptionValue + otherOptionBackwards;
		this.optionIndex = e.target.dataset.index;
		if(type === 'checkbox') {
			const length = this.answer.checkbox.optionValue.length;
			this.answer.checkbox.optionValue[length - 1] = this.answer.checkbox.optionValue[length - 1] === null ? null : this.allValue;
    		this.answer.checkbox.otherOptionValue = this.allValue;
		}else if(type === 'radio'){
			this.answer[type] = {
				optionValue: this.allValue,
    			optionIndex: this.optionIndex,
    			otherOptionValue: this.allValue
			};
		}else {
			this.answer[type] = this.otherOptionValue;
		}
		const answerEditor = { ...this.state.editor, answer: this.answer }
        this.props.onAnswer(answerEditor, this.props.index)
    }
    disableEnter = (event) => {
		if (event.which == 13) {
			event.cancelBubble=true;
			event.preventDefault();
			event.stopPropagation();
		}
    }
	render() {
		const { index } = this.props;
		const { 
			editor, 
			hasOption,
			hasTitle,
			selectValue
		} = this.state;
        let { 
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
        	editorShake,
        	answer,
        	questionId
        } = editor;
        this.answer = answer && JSON.parse(JSON.stringify(answer));
        this.otherOptionValue = answer && this.answer[type].otherOptionValue;
        /*
         * 
         * 以下元素为填写状态下的元素
         * 
         */
		//填写状态下的填空
		const subCompletionEl = (
			<div className="subject-other-option">
				<span>{completionForwards}</span>
				<div
				  className='other-option-input'
				  onInput={this.handleOtherOptionInputChange}
				  onKeyPress={this.disableEnter}
				  contentEditable
				  dangerouslySetInnerHTML={{ __html: answer && this.answer[type] }}>
				</div>
				<span>{completionBackwards}</span>
			</div>
		)
		//填写状态下的单选、多选其他选项
        const subOtherOptionsEl = (
			<div className="subject-other-option">
				<span>{otherOptionForwards}</span>
				<div
				  className='other-option-input'
				  onInput={this.handleOtherOptionInputChange}
				  onKeyPress={this.disableEnter}
				  contentEditable
				  dangerouslySetInnerHTML={{ __html: this.otherOptionInput }}>
				</div>
				<span>{otherOptionBackwards}</span>
			</div>
		)
		//填写状态下的单选、多选
		const optionsCom = otherOption ? options.concat('undefined') : options
        const subRadioEl = (
			<div className="radio-group">
				{optionsCom.map((data, index) => {
					return (
						<label 
						  className="wowjoy-radio"
						  style={{ width: `100%`, marginBottom: 20 }}
						  key={uuid()}>
							<input 
							  type="radio"
							  name={`radio${questionId}`}
							  data-index={index}
							  value={data} 
							  defaultChecked={answer && this.answer.radio.optionIndex === index+''}
							  onChange={this.handleAnswerChange}
							  style={{ display: 'none' }}/>
							<span className="wowjoy-radio__inner"></span>
						    <span className="wowjoy-radio__text">
						    	{data === 'undefined' ? (
									<div className="subject-other-option">
										<span>{otherOptionForwards}</span>
											<div
											  data-index={index}
											  className='other-option-input'
											  onInput={this.handleOtherOptionInputChange}
											  onKeyPress={this.disableEnter}
											  contentEditable
											  dangerouslySetInnerHTML={{ __html: this.otherOptionValue }}>
											</div>
										<span>{otherOptionBackwards}</span>
									</div>
						    	) : data}
						    </span>
						</label> 
					)
				})}
			</div>
        )
		const subCheckboxEl = (
			<div className="checkbox-group">
				{optionsCom.map((data, index) => {
					return (
						<label 
						  className="wowjoy-checkbox"
						  key={uuid()}
						  style={{ width: `100%`, marginBottom: 20 }}>
							<input 
							  type="checkbox"
							  name={`checkbox${questionId}`}
							  value={data}
							  data-index={index}
							  defaultChecked={answer && this.answer.checkbox !== '' && this.answer.checkbox.optionIndex.includes(index+'')}
							  onChange={this.handleAnswerChange}
							  style={{ display: 'none' }}/>
								<span className="wowjoy-checkbox__inner"></span>
						    	<span className="wowjoy-checkbox__text">
									{data === 'undefined' ? (
										<div className="subject-other-option">
											<span>{otherOptionForwards}</span>
												<div
												  data-index={index}
												  className='other-option-input'
												  onInput={this.handleOtherOptionInputChange}
												  onKeyPress={this.disableEnter}
												  contentEditable
												  dangerouslySetInnerHTML={{ __html: this.otherOptionValue }}>
												</div>
											<span>{otherOptionBackwards}</span>
										</div>
							    	) : data}
						    	</span>
						</label>
					)
				})}
			</div>
		)
        //填写状态下的下拉框
		const subDropdownEl = (
			<Select 
				defaultValue={ answer && this.answer[type] }
				value={ selectValue }
				onChange={this.handleAnswerSelectChange}>
				{options.map((option, index) => (
			  		<Option key={index} value={option}>{option}</Option>
			  	))}
		    </Select>
			/*<select 
              defaultValue={ answer && this.answer[type] }
			  onChange={this.handleAnswerChange}>
			  {options.map((option, index) => {
			  	return <option key={index} value={option}>{option}</option>
			  })}
			</select>*/
		)
		const optionsEl = type === 'dropdown' ? subDropdownEl : (type === 'radio' ? subRadioEl : subCheckboxEl)
        //填写状态下的单行文本、多行文本
        const subTextEl = (
			<input
			  defaultValue={ answer && this.answer[type] }
			  className="subject-input"
			  style={{ height: 36 }}
			  onChange={this.handleAnswerChange}
			  maxLength={maxLength} />
        )
        const subTextareaEl = (
			<textarea
			  defaultValue={ answer && this.answer[type] } 
			  className="subject-input"
			  name={'textarea'}
			  onChange={this.handleAnswerChange} 
			  rows={textareaHeight} />
        )
		return (
			/*
			 * 想了很多交互，最终认为还是将编辑模块和题目模块放在一起实现起来相对方便点，虽然这样造成的后果是代码很臃肿。。。
			 * 如果不这样做，组件之间的传值问题将会变得错综复杂
			 * 后期有时间再仔细想想看看能不能有更优的办法
			 */ 
			<div className="questionnair-item">
				<div 
				  className="questionnair-subject">
				    <div className="questionnair-subject-inner">
						<div className="subject-row subject-row-title">
							<span>{index + 1}.</span>
							{'input' === type ? subCompletionEl : (<span>{title}</span>)}
							{required && <span className="subject-title-require">*</span>}
						</div>
						{remark && <div className="subject-row subject-remarks">{remarkText}</div>}
						<div className="subject-row subject-row-question">
							{['radio', 'dropdown', 'checkbox'].includes(type) && optionsEl}
							{type === 'text' && subTextEl}
							{type === 'textarea' && subTextareaEl}
						</div>
	                </div>
				</div>
			</div>
		)
	}
}

export default QuestionnairEditor