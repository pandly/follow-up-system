import {
    getSatisfyStayFollow, 
    getSatisfyAlreadyFollow, 
    getSatisfySearch,
    submitSatisfyAnswer
} from '../services/api.js'
export default {

    namespace: 'satisfaction',

    state: {
        stayFollow: [],
        alreadyFollow: [],
        searchFollow: [],
        loading: true,
        searchLoading: true,
        stayPageTotal: 0,
        alreadyPageTotal: 0,
        searchPageTotal: 0,
        rate: 0
    },

    subscriptions: {
        setup({ dispatch, history }) {  // eslint-disable-line
        },
    },

    effects: {
        *fetchInit({ payload }, { call, put }) {
            yield put({ 
                type: 'changeLoading',
                payload: true
                });
            const result1 = yield call(getSatisfyStayFollow, payload)
            const result2 = yield call(getSatisfyAlreadyFollow, payload)
            let rate = 0
            if(result1.total+result2.total!==0){
                rate = (result2.total*100/(result1.total+result2.total)).toFixed(2)
            }
            console.log(rate,'rate')
            yield put({ 
                type: 'changeLoading',
                payload: false
                });
            yield put({ 
                type: 'setStayPageTotal',
                payload: result1.total
                });
            yield put({ 
                type: 'saveStay',
                payload: result1.results
                });
            yield put({ 
                type: 'setAlreadyPageTotal',
                payload: result2.total
                });
            yield put({ 
                type: 'saveAlready',
                payload: result2.results
                });
            yield put({
                type: 'saveRate',
                payload: rate
            })
        },
        *fetchStay({ payload }, { call, put }) {  // eslint-disable-line
            yield put({ 
                type: 'changeLoading',
                payload: true
                });
            const result = yield call(getSatisfyStayFollow, payload)
            console.log(result,'22')
            yield put({ 
                type: 'changeLoading',
                payload: false
                });
            yield put({ 
                type: 'setStayPageTotal',
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
            const result = yield call(getSatisfyAlreadyFollow, payload)
            yield put({ 
                type: 'changeLoading',
                payload: false
                });
            yield put({ 
                type: 'setAlreadyPageTotal',
                payload: result.total
                });
            yield put({ 
                type: 'saveAlready',
                payload: result.results
                });
            
        },
        *fetchSatisfySearch({ payload }, { call, put }){
            yield put({ 
                type: 'changeSearchLoading',
                payload: true
                });
            const result = yield call(getSatisfySearch, payload)
            yield put({ 
                type: 'changeSearchLoading',
                payload: false
                });
            yield put({ 
                type: 'setSearchPageTotal',
                payload: result.total
                });
            yield put({ 
                type: 'saveSearch',
                payload: result.results
                });
        },
        *submitSatisfyAnswer({ payload }, { call, put }){
            yield call(submitSatisfyAnswer, payload)
        }
    },

    reducers: {
        saveRate(state, action){
            return { ...state, rate: action.payload };
        },
        saveStay(state, action) {
            return { ...state, stayFollow: action.payload };
        },
        saveAlready(state, action) {
            return { ...state, alreadyFollow: action.payload };
        },
        saveSearch(state, action) {
            return { ...state, searchFollow: action.payload };
        },
        changeLoading(state, action){
            return { ...state, loading: action.payload}
        },
        changeSearchLoading(state, action){
            return { ...state, searchLoading: action.payload}
        },
        setStayPageTotal(state, action){
            return { ...state, stayPageTotal: action.payload }
        },
        setAlreadyPageTotal(state, action){
            return { ...state, alreadyPageTotal: action.payload }
        },
        setSearchPageTotal(state, action){
            return { ...state, searchPageTotal: action.payload }
        }
    },

};
