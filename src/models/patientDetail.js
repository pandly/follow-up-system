import {
    getTodayDetail, 
    getSummary, 
    getMedicine, 
    getOutDetail, 
    getSatisfyDetail, 
    addRemark,
    stopPlan,
    getPlanTask,
} from '../services/api.js'

export default {

    namespace: 'patientDetail',

    state: {
        todayDetail: {},
        outSummary: {},
        outMedicine: [],
        outDetail: {},
        satisfyDetail: {},
        PlanTaskList: [],
        planTaskLoading: false
    },

    subscriptions: {
        setup({ dispatch, history }) {  // eslint-disable-line
        },
    },

    effects: {
        *fetchToday({ payload }, { call, put }) {  // eslint-disable-line
            // yield put({ 
            //     type: 'changeStayLoading',
            //     payload: true
            //     });
            const result = yield call(getTodayDetail, payload)
            yield put({ 
                type: 'saveToday',
                payload: result.results
                });
            
        },
        *fetchOut({ payload }, { call, put }) {  // eslint-disable-lin
            const result = yield call(getOutDetail, payload)
            yield put({ 
                type: 'saveOut',
                payload: result.results
                });
            
        },
        *fetchSatisfy({ payload }, { call, put }) {  // eslint-disable-lin
            const result = yield call(getSatisfyDetail, payload)
            yield put({ 
                type: 'saveSatisfy',
                payload: result.results
                });
            
        },
        *fetchSummary({ payload }, { call, put }) {
            const result = yield call(getSummary, payload)
            yield put({
                type: 'saveSummary',
                payload: result.results
            })
        },
        *fetchMedicine({ payload }, { call, put }) {
            const result = yield call(getMedicine, payload)
            yield put({
                type: 'saveMedicine',
                payload: result.results
            })
        },
        *addRemark({ payload }, { call, put }){
            yield call(addRemark, payload)
        },
        *stopPlan({ payload }, { call, put }){
            yield call(stopPlan, payload)
        },
        *getPlanTask({ payload }, { call, put }){
            yield put({ 
                type: 'changePlanTaskLoading',
                payload: true
                });
            const result = yield call(getPlanTask, payload)
            yield put({
                type: 'savePlanTask',
                payload: result.results
            })
            yield put({ 
                type: 'changePlanTaskLoading',
                payload: false
                });
        }
    },

    reducers: {
        saveToday(state, action) {
            return { ...state, todayDetail:action.payload };
        },
        saveOut(state, action) {
            return { ...state, outDetail:action.payload };
        },
        saveSatisfy(state, action) {
            return { ...state, satisfyDetail:action.payload };
        },
        saveSummary(state, action) {
            return { ...state, outSummary:action.payload };
        },
        saveMedicine(state, action) {
            return { ...state, outMedicine:action.payload };
        },
        savePlanTask(state, action) {
            return { ...state, PlanTaskList:action.payload };
        },
        changePlanTaskLoading(state, action) {
            return { ...state, planTaskLoading:action.payload };
        },
    },

};