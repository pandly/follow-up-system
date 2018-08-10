import { PureComponent } from 'react'

import styles from './index.less'
import { Select } from 'antd';

const Option = Select.Option;

class SelectMy extends PureComponent {

	// handleChange = (e) => {
	// 	console.log(e.target,'eeeee')
	// 	const { onChange } = this.props;
	// 	if(onChange) {
	// 		onChange(e)
	// 	}
	// }
	handleChange = (value) => {
		const { onChange } = this.props;
		if(onChange) {
			onChange({target: {value: value, name: this.props.name}})
		}
	}

	render() {
		const { name, value, options } = this.props;
		return (
			<Select
			 	placeholder="请选择"
			 	value={value}
			 	onChange={this.handleChange}>
					{options.map((option, index) => (
				    	<Option key={index} value={option}>{option}</Option>
				    ))}
			</Select>
			
		)
	}
}

export default SelectMy