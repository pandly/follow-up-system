import { PureComponent } from 'react'
import Toast from 'antd-mobile/lib/toast';
import 'antd-mobile/lib/toast/style/css';
import Button from 'antd-mobile/lib/button';
import 'antd-mobile/lib/button/style/css';
import styles from './PatientFill.less'
import { connect } from 'dva'
import uuid from 'utils/utils'

import QuestionnairEditorMobile from 'components/Questionnair/QuestionnairEditorMobile'

class PatientFill extends PureComponent {
	constructor(props) {
		super(props)
		this.entireScaleInfoTemp = [],
		this.editorsEl = []
	}
	state = {
		patientId: this.props.match.params.patientId,
		editorLoading: true
	}
	transformData = (arr) => {
		arr.map(data => {
			if(data.answer) {
				if(data.answer.checkbox === '') {
					data.answer.checkbox = {
		        		optionValue: [],
		        		optionIndex: [],
		        		otherOptionValue: ''
		        	}
				}else {
					data.answer.checkbox = JSON.parse(data.answer.checkbox);
				}
				if(data.answer.radio === ''){
		        	data.answer.radio = {
		        		optionValue: '',
		        		optionIndex: '',
		        		otherOptionValue: ''
		        	}
		        }
		        else {
		        	data.answer.radio = JSON.parse(data.answer.radio);
		        }
			}
        })
    }
    handleAnswer = (obj, index) => {
        this.entireScaleInfoTemp.splice(index, 1, obj)
  	}
  	submitAnswer = () => {
    	const infoHeight = this.infoEl.scrollHeight + 20;
    	const x = this.entireScaleInfoTemp.some((data, index) => {
    		if(data.required) {
    			switch(data.type) {
    				case 'checkbox': 
    					if(data.answer[data.type].optionValue.length === 0) {
    						Toast.info(`第${index + 1}题为必填题，请完成必填题！`, 1);
    						this.mainEl.scrollTo(0, this.editorsEl[index].offsetTop - infoHeight)
    						return true;
    					}
    				case 'radio': 
    				    if(data.answer[data.type].optionValue === '') {
    						Toast.info(`第${index + 1}题为必填题，请完成必填题！`, 1);
    						this.mainEl.scrollTo(0, this.editorsEl[index].offsetTop - infoHeight)
    						return true;
    					}
    				default: 
    				    if(data.answer[data.type] === '') {
    						Toast.info(`第${index + 1}题为必填题，请完成必填题！`, 1);
    						this.mainEl.scrollTo(0, this.editorsEl[index].offsetTop - infoHeight)
    						return true;
    					}
    			}
    			
    		}
    	})
    	if(x) {
    		return ;
    	}
    	let answers = [];
    	this.entireScaleInfoTemp.forEach(data => {
    		answers.push({
    			"answerId": uuid(),
			    "checkbox": JSON.stringify(data.answer.checkbox),
			    "dropdown": data.answer.dropdown,
			    "input": data.answer.input,
			    "questionId": data.questionId,
			    "radio": JSON.stringify(data.answer.radio),
			    "scaleId": data.scaleId,
			    "text": data.answer.text,
			    "textarea": data.answer.textarea
    		})
    	})
    	console.log(answers)
		// this.props.dispatch({
  // 			type: 'patientDetail/submitTaskAnswer',
  // 			payload: {
  // 				answers
  // 			}
  // 		}).then(() => {
  // 			this.setState({
	 //        	toggleAnswer: false
	 //        })
	 //        this.getData();
	 //        message.success('提交成功！')
  // 		})
    }
	getData = () => {
		Toast.loading('加载中...', 0);
		this.props.dispatch({
			type: 'patientDetail/fetchToday',
			payload: {
				inhospitalId: this.state.patientId
			}
		}).then(()=>{
			this.entireScaleInfoTemp = JSON.parse(JSON.stringify(this.props.patientDetail.todayDetail.questionPatientVOs))
			this.transformData(this.entireScaleInfoTemp);
			this.setState({
				editorLoading: false
			})
			Toast.hide()
		})
	}
	componentDidMount(){
		this.getData()
	}
	render() {
		return (
			<div className={styles.infoWrap} ref={el => this.mainEl = el}>
				<div className={styles.infoTitle} ref={el => this.infoEl = el}>
					<div className={styles.title}>肝胆外科随访</div>
					<div className={styles.text}>为了给您提供健康服务，希望您能抽出几分钟时间，完成我们的随访问卷，谢谢！</div>
				</div>
				<div>
					{
						this.entireScaleInfoTemp.map((editor, index) => {
							return (
								<div
								  ref={el => this.editorsEl[index] = el}
								  key={editor.questionId}>
									<QuestionnairEditorMobile
									  onAnswer={this.handleAnswer}
									  acitveEditor={true}
									  index={index}
									  editor={editor}
								    />
							    </div>
								
							)
						})
					}
				</div>
				<div className={styles.btnWrap}>
					<Button type="primary" onClick={this.submitAnswer}>提 交</Button>
				</div>
			</div>
		)
	}
}

export default connect(({ scale, patientDetail }) => ({
  scale, patientDetail
}))(PatientFill);