import { PureComponent } from 'react'
import Questionnair from 'components/Questionnair'

class Scale extends PureComponent {
	render() {
		const { search } = this.props.location
		return (
			<Questionnair search={search} />
		)
	}
}

export default Scale