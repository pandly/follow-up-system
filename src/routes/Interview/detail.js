import { PureComponent } from 'react'
import styles from './detail.less'
import patientInfo from '../../assets/patient.png'
import { Modal } from 'antd';


class SatisfactionDetail extends PureComponent {
	state = {
		
	}
	
	hideIdCard(id){
		if(id.length==18){
			return String(id).replace(String(id).substr(4,10),'**********')
		}else if(id.length==15){
			return String(id).replace(String(id).substr(4,7),'*******')
		}else{
			return id
		}
	}
	render(){
		const { isSummaryShow } = this.state
		return (
			<div>
				<div className={styles.contentWrap}>
					<div className={`${styles.patientInfo} clearfix`}>
						<div className={styles.infoWrap}>
							<div className={styles.img}>
								<img src={patientInfo} alt="头像"/>
							</div>
							<div className={styles.info}>
								<div className={styles.infoItemWrap}>
									<div className={styles.infoItem}>
										<span className={styles.basicInfo}>赵默笙</span>
										<span className={styles.basicInfo}>女</span>
										<span className={styles.basicInfo}>18岁</span>
									</div>
									<div className={styles.infoItem}>
										<span className={styles.label}>身份证号：</span>
										<span className={styles.text}>{this.hideIdCard('330601199010100011')}</span>
									</div>
								</div>
								<div className={styles.infoItemWrap}>									
									<div className={styles.infoItem}>
										<span className={styles.label}>联系人：</span>
										<span className={styles.text}>儿子 何照</span>
									</div>
									<div className={styles.infoItem}>
										<span className={styles.label}>费用类型：</span>
										<span className={styles.text}>市医保</span>
									</div>
									
								</div>
								<div className={styles.infoItemWrap}>
									<div className={styles.infoItem}>
										<span className={styles.label}>联系电话：</span>
										<span className={styles.text}>18866669999</span>
									</div>
									<div className={styles.infoItem}>
										<span className={styles.label}>家庭住址：</span>
										<span className={`${styles.text} text-hidden`}>浙江省杭州市下城区东新路xxxx小区11111111</span>
									</div>
								</div>
							</div>
						</div>
						<div className={styles.call}>
							<i className={`iconfont icon-daisuifang-icon-green ${styles.callIcon}`}></i>
							<div className={styles.text}>拨打电话</div>
						</div>
					</div>
					<div className={styles.mainInfo}>
						<div className={styles.info}>
							<div className={styles.title}>
								<i className={`iconfont icon-tianjiaicon ${styles.titleIcon}`}></i><span>患者信息</span>
							</div>
							<div className={styles.content}>
								<div className={styles.line}>
									<div className={styles.infoItem}>
										<span className={styles.label}>住院科室：</span>
										<span className={`${styles.text} text-hidden`}>肾内科肾内科肾内科肾内科</span>
									</div>
									<div className={styles.infoItem}>
										<span className={styles.label}>转归情况：</span>
										<span className={`${styles.text} text-hidden`}>逐渐可见好转</span>
									</div>
									<div className={styles.infoItem}>
										<span className={styles.label}>出院小结：</span>
										<span className={`${styles.text} aLink`} onClick={this.showSummary}>点击查看</span>
									</div>
								</div>
								<div className={styles.line}>
									<div className={styles.infoItem}>
										<span className={styles.label}>病区：</span>
										<span className={styles.text}>0501</span>
									</div>
									<div className={styles.infoItem}>
										<span className={styles.label}>出院日期：</span>
										<span className={styles.text}>2018-01-06</span>
									</div>
									<div className={styles.infoItem}>
										<span className={styles.label}>出院带药：</span>
										<span className={`${styles.text} aLink`}>点击查看</span>
									</div>
								</div>
								<div className={styles.line}>
									<div className={styles.infoItem}>
										<span className={styles.label}>床号：</span>
										<span className={styles.text}>0501</span>
									</div>
									<div className={styles.infoItem}>
										<span className={styles.label}>住院天数：</span>
										<span className={styles.text}>4天</span>
									</div>
									<div className={styles.infoItem}>
										<span className={styles.label}>随访：</span>
										<span className={styles.text}>
											<span className="aLink">已随访</span>
											<span style={{display: 'none'}}>未随访</span>
										</span>
									</div>									
								</div>
								<div className={styles.line}>
									<div className={styles.specialLine}>
										<div className={styles.infoItem}>
											<span className={styles.label}>住院号：</span>
											<span className={styles.text}>12136</span>
										</div>
										<div className={styles.infoItem}>
											<span className={styles.label}>主管医生：</span>
											<span className={styles.text}>何以玫</span>
										</div>
									</div>
									<div className={styles.infoItem}>
										<span className={styles.label}>出院诊断：</span>
										<span className={`${styles.text} text-hidden`}>肾小球肾炎肾小球肾炎肾小球肾炎肾小球肾炎</span>
									</div>
									<div className={styles.infoItem}>
										<span className={styles.label}>随访备注：</span>
										<span className={styles.text}>
											<span  style={{display: 'none'}} className="aLink">点击备注</span>
											<span>
												<span className={styles.remark}>随访状态不符</span>
												<span className="aLink">点击查看</span>
											</span>
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				
				
			</div>
		)
	}
}

export default SatisfactionDetail