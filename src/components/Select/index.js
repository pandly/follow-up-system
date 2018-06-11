import { PureComponent } from 'react'

import styles from './index.less'

class Select extends PureComponent {

	handleChange = (e) => {
		const { onChange } = this.props;
		if(onChange) {
			onChange(e.target.value, e.target.name)
		}
	}

	render() {
		const { name, value, options } = this.props;
		return (
			<div className="wowjoy-select">
				<select
				  name={name}
				  placeholder="请选择"
				  className="wowjoy-select__inner"
				  value={value} 
				  onChange={this.handleChange}>
				    {options.map((option, index) => {
				    	return <option key={index} value={option}>{option}</option>
				    })}
		        </select>
	        </div>
		)
	}
}

export default Select