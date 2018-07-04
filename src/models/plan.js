import {
    getPlanList, 
    getPlanDetail, 
    getPlanDetailTask, 
    changePlanStatus,
    addPlan,
    updatePlan,
    deletePlan,
    getPlanTwoList,
    updatePlanTask
} from '../services/api.js'
export default {

    namespace: 'plan',

    state: {
        planList: [],
        planTwoList: [],
        planListLoading: true,   
        planDetail: [],
        planDetailTask: [],
        planDetailLoading: true
    },

    subscriptions: {
        setup({ dispatch, history }) {  // eslint-disable-line
        },
    },

    effects: {
        *fetchPlanList({ payload }, { call, put }) {  // eslint-disable-line
            yield put({ 
                type: 'changePlanListLoading',
                payload: true
                });
            const result = yield call(getPlanList, payload)
            yield put({ 
                type: 'savePlanList',
                payload: result.results
                });            
            yield put({ 
                type: 'changePlanListLoading',
                payload: false
                });
        },
        *fetchPlanTwoList({ payload }, { call, put }) {  // eslint-disable-line
            const result = yield call(getPlanTwoList, payload)
            yield put({ 
                type: 'savePlanTwoList',
                payload: result.results
                });
        },
        *fetchPlanDetail({ payload }, { call, put }){
            yield put({ 
                type: 'changePlanDetailLoading',
                payload: true
                });
            const result1 = yield call(getPlanDetail, payload)            
            const result2 = yield call(getPlanDetailTask, payload)
            yield put({ 
                type: 'savePlanDetail',
                payload: result1.results
                });
            yield put({ 
                type: 'savePlanDetailTask',
                payload: result2.results
                });
            yield put({ 
                type: 'changePlanDetailLoading',
                payload: false
                });
        },
        *changePlanStatus({ payload }, { call, put }){
            yield call(changePlanStatus, payload)
        },
        *addPlan({ payload }, { call, put }){
            yield call(addPlan, payload)
        },
        *updatePlan({ payload }, { call, put }){
            yield put({ 
                type: 'changePlanDetailLoading',
                payload: true
                });
            yield call(updatePlan, payload.update)
            const result1 = yield call(getPlanDetail, payload.planTemplateId)            
            const result2 = yield call(getPlanDetailTask, payload.planTemplateId)
            yield put({ 
                type: 'savePlanDetail',
                payload: result1.results
                });
            yield put({ 
                type: 'savePlanDetailTask',
                payload: result2.results
                });
            yield put({ 
                type: 'changePlanDetailLoading',
                payload: false
                });
        },
        *updatePlanTask({ payload }, { call, put }){
            yield call(updatePlanTask,payload)
        },
        *deletePlan({ payload }, { call, put }){
            yield call(deletePlan, payload)
        }
    },

    reducers: {
        savePlanList(state, action) {
            return { ...state, planList: action.payload };
        },
        savePlanTwoList(state, action) {
            return { ...state, planTwoList: action.payload };
        },
        changePlanListLoading(state, action){
            return { ...state, planListLoading: action.payload}
        },
        savePlanDetail(state, action) {
            return { ...state, planDetail: action.payload };
        },
        savePlanDetailTask(state, action) {
            return { ...state, planDetailTask: action.payload };
        },
        changePlanDetailLoading(state, action){
            return { ...state, planDetailLoading: action.payload}
        },
        clear(){
            return {
                planList: [],
                planTwoList: [],
                planListLoading: false,
                planDetail: [],
                planDetailTask: [],
                planDetailLoading: false
            }
        }
    },

};
