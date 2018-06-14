import { stringify } from 'qs';
import request from '../utils/request';

//POST  获取科室列表
export async function getDepartments(params){
	return request('/api/v1/department/get_department',{
		method: 'POST'
	})
}

//POST  获取主治医生
export async function getDoctors(params){
	return request('/api/v1/resident/get_resident',{
		method: 'POST'
	})
}

//get 字典查找
export async function getDictionary(){
	return request('/api/vi/dictionary/all')
}

//POST  今日任务待随访列表
export async function getTodayStayFollow(params){
	return request('/api/v1/patient/get_stay_follow',{
		method: 'POST',
		body: params
	})
}
//POST  今日任务已随访列表
export async function getTodayAlreadyFollow(params){
	return request('/api/v1/patient/get_already_follow',{
		method: 'POST',
		body: params
	})
}

//get 今日任务患者详情
export async function getTodayDetail(params){
	return request(`/api/v1/patient/get_patient?inhospitalId=${params.inhospitalId}`)
}

//POST  出院随访待随访列表
export async function getOutStayFollow(params){
	return request('/api/v1/discharge/get_stay_follow',{
		method: 'POST',
		body: params
	})
}
//POST  出院随访已随访列表
export async function getOutAlreadyFollow(params){
	return request('/api/v1/discharge/get_already_follow',{
		method: 'POST',
		body: params
	})
}
//get 出院随访患者详情
export async function getOutDetail(params){
	return request(`/api/v1/discharge/get_patient?inhospitalId=${params.inhospitalId}`)
}
//POST  根据患者姓名或住院号获取患者随访任务列表
export async function getOutSearch(params){
	return request('/api/v1/discharge/search',{
		method: 'POST',
		body: params
	})
}

//POST  满意度回访待回访列表
export async function getSatisfyStayFollow(params){
	return request('/api/v1/satisfy/get_stay_follow',{
		method: 'POST',
		body: params
	})
}
//POST  满意度回访已回访列表
export async function getSatisfyAlreadyFollow(params){
	return request('/api/v1/satisfy/get_already_follow',{
		method: 'POST',
		body: params
	})
}
//get 满意度回访患者详情
export async function getSatisfyDetail(params){
	return request(`/api/v1/satisfy/get_patient?inhospitalId=${params.inhospitalId}`)
}
//POST  保存备注
export async function addRemark(params){
	return request('/api/v1/satisfy/remark',{
		method: 'POST',
		body: params
	})
}

//POST  手动结案
export async function stopPlan(params){
	return request('/api/v1/plan/end_plan',{
		method: 'POST',
		body: params
	})
}
//POST  患者姓名或者住院号获取满意度回访列表任务
export async function getSatisfySearch(params){
	return request('/api/v1/satisfy/search',{
		method: 'POST',
		body: params
	})
}

//get 根据患者住院Id获取出院小结
export async function getSummary(inhospitalId){
	return request(`/api/v1/discharge/get_discharge_summary?inhospitalId=${inhospitalId}`)
}

//get 根据患者出院id获取出院带药
export async function getMedicine(inhospitalId){
	return request(`/api/v1/discharge/get_discharge_medicine?inhospitalId=${inhospitalId}`)
}

//get 患者详情根据计划id查询当前随访计划
export async function getPlanTask(param){
	return request(`/api/v1/plan/get_update_task?planTemplateId=${param.planTemplateId}&dischargeTime=${param.dischargeTime}`)
}

//POST  患者详情界面编辑随访计划模板
export async function updatePlanTask(params){
	return request('/api/v1/plan/update_plan',{
		method: 'POST',
		body: params
	})
}


//POST  计划模板列表
export async function getPlanList(params){
	return request('/api/v1/plan/planTemplateList',{
		method: 'POST',
		body: params
	})
}
//Get  计划模板列表(默认+出院)
export async function getPlanTwoList(params){
	return request('/api/v1/plan/plan_template_default_and_outhospital_list')
}

//POST  计划模板状态修改: 停用，重新启用
export async function changePlanStatus(params){
	return request('/api/v1/plan/planTemplateStatusModify',{
		method: 'POST',
		body: params
	})
}

//get 根据计划模板id查询模板信息
export async function getPlanDetail(planTemplateId){
	return request(`/api/v1/plan/planTemplateInfo?planTemplateId=${planTemplateId}`)
}

//get 根据计划模板id查询任务模板列表
export async function getPlanDetailTask(planTemplateId){
	return request(`/api/v1/plan/getTaskTemplateByPlanTemplateId?planTemplateId=${planTemplateId}`)
}

//POST  新增计划模板
export async function addPlan(params){
	return request('/api/v1/plan/addPlanTemplate',{
		method: 'POST',
		body: params
	})
}

//POST  修改计划模板
export async function updatePlan(params){
	return request('/api/v1/plan/modifyPlanTemplate',{
		method: 'POST',
		body: params
	})
}

//get 删除计划模板
export async function deletePlan(id){
	return request(`/api/v1/plan/deleteTemplate?id=${id}`)
}


//POST  模糊搜索量表列表
export async function getScaleList(params){
	return request('/api/v1/scale/list',{
		method: 'POST',
		body: params
	})
}

//get 删除量表
export async function deleteScale(id){
	return request(`/api/v1/scale/delete/${id}`)
}

//get 量表被引用的模板
export async function getScaleUsePlan(id){
	return request(`/v1/scale/use/${id}`)
}
//get 获取量表信息
export async function getScale(id){
	return request(`/api/v1/scale/info/${id}`)
}

//get 保存量表
export async function saveScale(params){
	return request('/api/v1/scale/save',{
		method: 'POST',
		body: params
	})
}
//get 保存量表
export async function getFollowScale(id){
	return request(`/api/v1/scale/follow_scale?scaleId=${id}`)
}





