import {getTodayStayFollow, getTodayAlreadyFollow} from '../services/api.js'
export default {

    namespace: 'todayMission',

    state: {
        stayFollow: [],
        alreadyFollow: [],
        stayFollowTotal: 0,
        alreadyFollowTotal: 0,
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
        *fetchInit({ payload }, { call, put }){
            yield put({ 
                type: 'changeLoading',
                payload: true
                });
            const result1 = yield call(getTodayStayFollow, payload)
            const result2 = yield call(getTodayAlreadyFollow, payload)
            yield put({ 
                type: 'changeLoading',
                payload: false
                });
            yield put({ 
                type: 'setPageTotal',
                payload: result1.total
                });
            yield put({ 
                type: 'saveStay',
                payload: result1.results
                });
            yield put({ 
                type: 'saveAlready',
                payload: result2.results
                });
            yield put({
                type: 'setStayNumberTotal',
                payload: result1.total
            })
            yield put({
                type: 'setAlreadyNumberTotal',
                payload: result2.total
            })
        }
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
        },
        setStayNumberTotal(state, action){
            return { 
                ...state, 
                stayFollowTotal: action.payload
            }
        },
        setAlreadyNumberTotal(state, action){
            return { 
                ...state, 
                alreadyFollowTotal: action.payload
            }
        },
    },

};
