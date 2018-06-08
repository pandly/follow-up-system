import { PureComponent } from 'react'
import QuestionnairContent from './QuestionnairContent'
import QuestionnairEditor from './QuestionnairEditor'
import QuestionnairSiderbar from './QuestionnairSiderbar'
import DragSort from '../DragSort'
import ShakeTransition from 'components/Shake'
import uuid from 'utils/utils'

import styles from './index.less'

class Questionnair extends PureComponent {
	constructor(props) {
		super(props)
		this.editorsEl = [];
	}

    state = {
    	editors: [],
    	curMoveItem: null,
    	drag: false,
    	scrollTo: 0,
    }
    /* 
     * 判断是否有处于编辑状态的题目, activeEditorIndex // -1,没有处于编辑状态的题目
     * 如果有处于编辑状态的题目，则激活该编辑器抖动
     */
    isThereEditor = () => {
    	const activeEditorIndex = this.state.editors.findIndex(data => data.isEditor === true)
    	if(activeEditorIndex !== -1) {
			let editors = JSON.parse(JSON.stringify(this.state.editors));
			editors[activeEditorIndex].editorShake = uuid();
			this.setState({
	        	editors
	        })
			return true;
		}else {
			return false;
		}
    } 

	createEditor = (type) => {
		if(this.isThereEditor()) {
			return;
		}
		const editor = {
			id: uuid(), //id
			type: type, //类型
			title: '', //题目
        	required: false, //是否必填
        	remark: false, //是否有备注
	        remarkText: '', //备注内容
	        options: ['选项', '选项'], //选项(只有radio,checkbox,select有,其余尽量给个空数组)
	        rows: 1, //选项占的行数
	        textareaHeight: 3, //多行文本高度
	        maxLength: 50, //单行文本限制的字数
	        otherOptionForwards: '其他', //”其他“项文本(前)
	        otherOptionBackwards: '', //”其他“项文本(后)
	        completionForwards: '题目：', //填空题文本(前)
	        completionBackwards: '', //填空题文本(后)
            isEditor: true, //编辑状态还是已编辑状态
            isFirst: true,
            editorShake: ''
		}
		this.setState(prevState => ({
			editors: [...prevState.editors, editor]
		}))
	}
    
    dragEditor = (editors) => {
		this.setState({
			editors
		})
    }
    
    locateEditor = (index) => {
    	console.log(this.editorsEl, this.editorsEl[index].scrollHeight)
    	this.setState({
    		scrollTo: this.editorsEl[index].offsetTop
    	})
    }

    cancelEdit = (index) => {
        let editors = JSON.parse(JSON.stringify(this.state.editors));
        editors[index].isFirst ? editors.splice(index, 1) : editors[index].isEditor = false;
        this.setState({
        	editors
        })
    }
        
    confirmEdit = (index, newEditor) => {
    	let editors = JSON.parse(JSON.stringify(this.state.editors));
    	editors.splice(index, 1, newEditor);
    	this.setState({
    		editors
        })
    }
    
    againEdit = (index) => {
    	if(this.isThereEditor()) {
			return;
		}
        let editors = JSON.parse(JSON.stringify(this.state.editors));
        editors[index].isEditor = true;
        this.setState({
       	    editors
        })
    }
    
    copyEdit = (index) => {
		let editors = JSON.parse(JSON.stringify(this.state.editors));
		const copyEditor = {...this.state.editors[index], id: uuid()};
    	editors.splice(index+1, 0, copyEditor);
    	this.setState({
       	    editors
        })
    }

    removeEdit = (index) => {
		let editors = JSON.parse(JSON.stringify(this.state.editors));
        editors.splice(index, 1)
        this.setState({
       	    editors
        })
    }
    
    handleDragMove = (editors, from, to) => {
	    this.setState({
	      curMoveItem: to,
	      editors,
	      drag: true
	    })
	}

	handleDragEnd = ()=>{
	    this.setState({
	      curMoveItem: null,
	      drag: false
	    })
	}
    
    handleTitle = (val) => {
		this.questionnairTitle = val 
    }

	render() {
		const { editors, drag, editorShake, scrollTo } = this.state;
		//如果有编辑状态的题目则禁止拖动
		const hasEditor = editors.some(data => data.isEditor === true);
		const canDrag = hasEditor ? false : true;
		const editorsEl = editors.map((editor, index) => {
	    	return (
	    		<div
	    		  className="drag-wrapper"
	    		  ref={el => this.editorsEl[index] = el}
	    		  key={editor.id}>
					<QuestionnairEditor
					  index={index}
					  curMoveItem={this.state.curMoveItem}
					  editor={editor}
					  drag={drag}
					  handleConfirm={this.confirmEdit}
				      handleCancel={this.cancelEdit}
				      handleEdit={this.againEdit}
				      handleRemove={this.removeEdit}
				      handleCopy={this.copyEdit}
				    />
			    </div>
	    	)
	    })
		return (
			<div className={styles.questionnair}>
				<QuestionnairSiderbar 
				  selectEditor={this.createEditor}
				  onDragOutline={this.dragEditor}
				  onClickOutline={this.locateEditor}
				  editors={editors} 
				/>
				<QuestionnairContent
				  length={editors.length}
                  scrollTo={scrollTo}
				  onChangeTitle={this.handleTitle}>
				    {editorsEl.length !== 0 && (
						<DragSort
						  onDragEnd={this.handleDragEnd} 
			              onDragMove={this.handleDragMove}
			              draggable={canDrag} 
			              data={editors}>
					    	{editorsEl}
					    </DragSort>
				    )}
				</QuestionnairContent>
			</div>
		)
	}
}

export default Questionnair