import { PureComponent } from 'react'

import styles from './index.less'

class Checkbox extends PureComponent {

	handleChange = (e) => {
		const { onChange } = this.props;
		if(onChange) {
			onChange(e.target.checked, e.target.name)
		}
	}

	render() {
		const { checked, name, label, style } = this.props;
		return (
			<label className="wowjoy-checkbox" style={style}>
				<input 
				  type="checkbox"
				  name={name} 
				  checked={checked}
				  onChange={this.handleChange}
				  style={{ display: 'none' }}/>
					<span className="wowjoy-checkbox__inner"></span>
			    	<span className="wowjoy-checkbox__text">{label}</span>
			</label>
		)
	}
}

export default Checkbox