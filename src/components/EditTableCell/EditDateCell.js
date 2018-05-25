import { Component } from 'react'
import { Input, Icon, DatePicker } from 'antd';
import styles from './index.less'
import moment from 'moment'


export default class EditDateCell extends Component {
    state = {
        value: this.props.value,
        editable: false,
    }
    handleChange = (date, dateString) => {
        const value = dateString;
        this.setState({ value });
    }
    check = () => {
        this.setState({ editable: false });
        if (this.props.onChange) {
            this.props.onChange(this.state.value);
        }
    }
    edit = () => {
        this.setState({ editable: true });
    }
    render() {
        const { value, editable } = this.state;
        return (
            <div className={styles.editCellWrap}>
                {
                    editable ?
                        <div>
                            <DatePicker defaultValue={moment(value, 'YYYY-MM-DD')} onChange={this.handleChange} 
                                style={{width: 120}}/>
                            <Icon
                                type="check"
                                className={styles.checkIcon}
                                onClick={this.check}
                            />
                        </div>
                        :
                        <div>
                            {value || ' '}
                            <i className={`iconfont icon-bi ${styles.editIcon}`} onClick={this.edit}></i>
                        </div>
                }
            </div>
        );
    }
}