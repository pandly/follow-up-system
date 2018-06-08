import { Component } from 'react'
import { Input, Icon, Select } from 'antd';
import styles from './index.less'
import moment from 'moment'

const Option = Select.Option;

export default class EditSelectCell extends Component {
    state = {
        value: this.props.value,
        editable: false,
    }
    handleChange = (value) => {
        this.setState({ 
            value: value,
            editable: false
         });
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
                            <Select defaultValue={value} style={{ width: 120 }} onChange={this.handleChange}>
                                <Option value="jack">Jack</Option>
                                <Option value="lucy">Lucy</Option>
                                <Option value="disabled" disabled>Disabled</Option>
                                <Option value="Yiminghe">yiminghe</Option>
                            </Select>
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