import {getOutStayFollow, getOutAlreadyFollow, getOutSearch} from '../services/api.js'
export default {

    namespace: 'outPatient',

    state: {
        stayFollow: [],
        alreadyFollow: [],
        searchFollow: [],
        stayLoading: true,
        alreadyLoading: true,
        searchLoading: true,
        stayPageTotal: 0,
        alreadyPageTotal: 0,
        searchPageTotal: 0
    },

    subscriptions: {
        setup({ dispatch, history }) {  // eslint-disable-line
        },
    },

    effects: {
        *fetchStay({ payload }, { call, put }) {  // eslint-disable-line
            yield put({ 
                type: 'changeStayLoading',
                payload: true
                });
            const result = yield call(getOutStayFollow, payload)
            yield put({ 
                type: 'changeStayLoading',
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
                type: 'changeAlreadyLoading',
                payload: true
                });
            const result = yield call(getOutAlreadyFollow, payload)
            yield put({ 
                type: 'changeAlreadyLoading',
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
        *fetchOutSearch({ payload }, { call, put }){
            yield put({ 
                type: 'changeSearchLoading',
                payload: true
                });
            const result = yield call(getOutSearch, payload)
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
        }
    },

    reducers: {
        saveStay(state, action) {
            return { ...state, stayFollow: action.payload };
        },
        saveAlready(state, action) {
            return { ...state, alreadyFollow: action.payload };
        },
        saveSearch(state, action) {
            return { ...state, searchFollow: action.payload };
        },
        changeStayLoading(state, action){
            return { ...state, stayLoading: action.payload}
        },
        changeAlreadyLoading(state, action){
            return { ...state, alreadyLoading: action.payload}
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
