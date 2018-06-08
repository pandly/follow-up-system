import { PureComponent } from 'react'

import styles from './index.less'

class Input extends PureComponent {
    static defaultProps = {
		disabled: false
    }

	handleChange = (e) => {
		const { onChange, index } = this.props;
		if(onChange) {
			onChange(e.target.value, e.target.name, index)
		}
	}

	render() {
		const { type, name, value, width, margin, style, maxLength, rows, disabled, ...otherProps } = this.props;
		return (
			<div 
			  className="wowjoy-input"
			  style={{ width, margin }}>
			    {type === 'textarea' ? (
					<textarea {...otherProps}
					  rows={rows}
					  name={name}
					  value={value}
					  disabled={disabled}
					  onChange={this.handleChange}
					  style={style}
					  className="wowjoy-textarea__inner"
					/>
			    ) : (
					<input {...otherProps}
					  type={type || 'text'}
					  name={name}
					  value={value}
					  disabled={disabled}
					  onChange={this.handleChange}
					  style={style}
					  className="wowjoy-input__inner"
					/>
			    )}
				
			</div>
		)
	}
}

export default Input