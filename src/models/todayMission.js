import {getTodayStayFollow, getTodayAlreadyFollow} from '../services/api.js'
export default {

    namespace: 'todayMission',

    state: {
        stayFollow: [],
        alreadyFollow: [],
        loading: true,
        pageTotal: 0
    },

    subscriptions: {
        setup({ dispatch, history }) {  // eslint-disable-line
        },
    },

    effects: {
        *fetchStay({ payload }, { call, put }) {  // eslint-disable-line
            yield put({ 
                type: 'changeLoading',
                payload: true
                });
            const result = yield call(getTodayStayFollow, payload)
            yield put({ 
                type: 'changeLoading',
                payload: false
                });
            yield put({ 
                type: 'setPageTotal',
                payload: result.total
                });
            yield put({ 
                type: 'saveStay',
                payload: result.results
                });
            
        },
        *fetchAlready({ payload }, { call, put }) {  // eslint-disable-line
            yield put({ 
                type: 'changeLoading',
                payload: true
                });
            const result = yield call(getTodayAlreadyFollow, payload)
            yield put({ 
                type: 'changeLoading',
                payload: false
                });
            yield put({ 
                type: 'setPageTotal',
                payload: result.total
                });
            yield put({ 
                type: 'saveAlready',
                payload: result.results
                });
            
        },
    },

    reducers: {
        saveStay(state, action) {
            return { ...state, stayFollow: action.payload };
        },
        saveAlready(state, action) {
            return { ...state, alreadyFollow: action.payload };
        },
        changeLoading(state, action){
            return { ...state, loading: action.payload}
        },
        setPageTotal(state, action){
            return { ...state, pageTotal: action.payload }
        }
    },

};
