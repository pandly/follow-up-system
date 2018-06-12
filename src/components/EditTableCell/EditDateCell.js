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
        this.setState({ 
            value: value,
            editable: false
         },()=>{
            if (this.props.onChange) {
                this.props.onChange(this.state.value);
            }
         });
        
    }
    edit = () => {
        this.setState({ editable: true });
    }

    disabledDate(current) {
        return current && current < moment().subtract(1, 'days').endOf('day');
    }

    componentWillReceiveProps(){
        if(this.props.value==''){
            const date = moment().format('YYYY-MM-DD')
            this.setState({
                value: date
            })
        }
    }
    render() {
        const { value, editable } = this.state;
        const { haveDisabled } = this.props;
        return (
            <div className={styles.editCellWrap}>
                {
                    editable ?
                        <div>
                            <DatePicker defaultValue={moment(value, 'YYYY-MM-DD')} onChange={this.handleChange} 
                                showToday={false} style={{width: 140}} allowClear={false}
                                disabledDate={haveDisabled?this.disabledDate:false}/>
                        </div>
                        :
                        <div>
                            {
                                value?value:
                                <span className={styles.chooseNot}>请选择</span>
                            }
                            <i className={`iconfont icon-bi ${styles.editIcon}`} onClick={this.edit}></i>
                        </div>
                }
            </div>
        );
    }
}