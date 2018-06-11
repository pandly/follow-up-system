import {getDepartments, getDoctors, getDictionary} from '../services/api.js'
export default {
	namespace: 'global',
	state: {
		departmentList: [],
		doctorList: [],
		dictionary: {}
	},
	subscriptions: {
		setup({ dispatch, history }) {  // eslint-disable-line
        },
	},
	effects: {
		*fetchDepartment({ payload }, { call, put }) { 
			const result = yield call(getDepartments)
            yield put({ 
                type: 'saveDepartment',
                payload: result.results
                });
		},
		*fetchDoctors({ payload }, { call, put }) { 
			const result = yield call(getDoctors)
            yield put({ 
                type: 'saveDoctors',
                payload: result.results
                });
		},
		*fetchDict({ payload }, { call, put }) { 
			const result = yield call(getDictionary)
            yield put({ 
                type: 'saveDict',
                payload: result.result
                });
		},
	},
	reducers: {
		saveDepartment(state, action) {
            return { ...state, departmentList: action.payload };
        },
        saveDoctors(state, action) {
            return { ...state, doctorList: action.payload };
        },
        saveDict(state, action) {
            return { ...state, dictionary: action.payload };
        },
	}
}