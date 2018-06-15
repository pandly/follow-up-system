import { Component } from 'react'
import { Select } from 'antd';
import styles from './index.less'

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
         },()=>{
            if (this.props.onChange) {
                this.props.onChange(this.state.value);
            }
         });
        
    }
    edit = () => {
        this.setState({ editable: true });
    }
    showText = () => {
        const { value } = this.state;
        const { dataSource, labelInValue, valueType } = this.props;
        if(labelInValue){
            if(value&&value.label&&value.label!==''){
                return(
                    <span>{value.label}</span>
                )
            }else{
                return(
                    <span className={styles.chooseNot}>请选择</span>
                )
            }
            
        }else{
            if(value&&value!==''){
                return(
                    <span>
                       { dataSource?dataSource.map(item=>(
                           value===item[valueType.code]?item[valueType.value]: ''
                       )):''}
                    </span>
                )
            }else{
                return (
                    <span className={styles.chooseNot}>请选择</span>
                )
            }
            
        }
    }
    render() {
        const { value, editable } = this.state;
        const { dataSource, allowClear, labelInValue, valueType, styleObj } = this.props;
        return (
            <div className={styles.editCellWrap}>
                {
                    editable ?
                        <div>
                            <Select defaultValue={value} style={styleObj} 
                                onChange={this.handleChange}
                                labelInValue={labelInValue}
                                allowClear={allowClear}>
                                {
                                    dataSource.map(item=>(
                                        <Option key={item[valueType.code]} value={item[valueType.code]}>{item[valueType.value]}</Option>
                                    ))
                                }
                            </Select>
                        </div>
                        :
                        <div>
                            {this.showText()}
                           
                            <i className={`iconfont icon-bi ${styles.editIcon}`} onClick={this.edit}></i>
                        </div>
                }
            </div>
        );
    }
}