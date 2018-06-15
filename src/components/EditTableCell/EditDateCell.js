import { Component } from 'react'
import { DatePicker } from 'antd';
import styles from './index.less'
import moment from 'moment'


export default class EditDateCell extends Component {
    state = {
        value: this.props.value===''?null:moment(this.props.value,'yyyy-mm-dd'),
        editable: false,
    }
    handleChange = (date, dateString) => {
        const value = dateString;
        this.setState({ 
            value: moment(value),
            editable: false
         },()=>{
            if (this.props.onChange) {
                this.props.onChange(moment(this.state.value).format('YYYY-MM-DD'));
            }
         });
        
    }
    edit = () => {
        this.setState({ editable: true });
    }

    disabledDate(current) {
        return current && current < moment().subtract(1, 'days').endOf('day');
    }

    render() {
        const { value, editable } = this.state;
        const { haveDisabled } = this.props;
        return (
            <div className={styles.editCellWrap}>
                {
                    editable ?
                        <div>
                            <DatePicker onChange={this.handleChange} 
                                placeholder="YYYY-MM-DD"
                                value={value}
                                showToday={false} style={{width: 140}} allowClear={false}
                                disabledDate={haveDisabled?this.disabledDate:null}/>
                        </div>
                        :
                        <div>
                            {
                                value?moment(value).format('YYYY-MM-DD'):
                                <span className={styles.chooseNot}>请选择</span>
                            }
                            <i className={`iconfont icon-bi ${styles.editIcon}`} onClick={this.edit}></i>
                        </div>
                }
            </div>
        );
    }
}