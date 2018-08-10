import { PureComponent } from 'react'
import { InputNumber } from 'antd';

import styles from './index.less'

class InputNumberMy extends PureComponent {  

	handleChange = (value) => {
		const { onChange } = this.props;
		if(onChange) {
			onChange({target: {value: value, name: this.props.name}})
		}
	}

	render() {
		const { type, name, value} = this.props;
		return (
			<InputNumber 
				value={value}
				min={1}  
				onChange={this.handleChange} />
		)
	}
}

export default InputNumberMy