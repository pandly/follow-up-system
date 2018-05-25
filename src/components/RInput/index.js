import React, { Component } from 'react';
import styles from './index.less';

//<RInput value={value} onChange={this.handleChange} clear></RInput>
//handleChange = (value)=>{
//	this.setState({
//		value
//	})
//}


export default class RInput extends Component {
	state = {

	}
	clearInput = (e) => {
		this.props.onChange('');
		e.stopPropagation()
	}
	render(){
		const { value, onBlur = () => {}, onChange = () => {}, placeholder,autoFocus, clear } = this.props
		return (
			<div className={styles.inputWrap}>
				<input type="text"
					placeholder={placeholder} 
					className={styles.input} 
					value={value}
					onChange={e => onChange(e.target.value.trim())}
					onBlur={() => onBlur(value)}
					ref={(el) => {if(autoFocus && el) {el.focus()}}}
					/>
				<span className={`${styles.clearIcon} ${value && clear?styles.hoverClear:''}`}
						onClick={this.clearInput}></span>
				
			</div>
		)
	}
}