import {
    getScaleList,
    deleteScale,
    getScale,
    saveScale,
    getFollowScale,
    getEntireScale,
    saveAnswer
} from '../services/api.js'
export default {

    namespace: 'scale',

    state: {
        scaleList: [],
        scaleListLoading: false,
        scaleInfo: {},
        followScaleInfo: [],
        entireScaleInfo: [],
        whetherSuccessfullySaved: ''
    },

    subscriptions: {
        setup({ dispatch, history }) {  // eslint-disable-line
        },
    },

    effects: {
        *fetchScaleList({ payload }, { call, put }) {  // eslint-disable-line
            yield put({ 
                type: 'changeScaleListLoading',
                payload: true
                });
            const result = yield call(getScaleList, payload)
            yield put({ 
                type: 'saveScaleList',
                payload: result.results
                });            
            yield put({ 
                type: 'changeScaleListLoading',
                payload: false
                });
        },
        *deleteScale({ payload }, { call, put }){
            yield call(deleteScale, payload)
        },
        *saveScale({ payload }, { call, put }) {
            yield call(saveScale, payload)
        },
        *getScale({ payload }, { call, put }) {
            const result = yield call(getScale, payload)
            yield put({ 
                type: 'updateScaleInfo',
                payload: result.results
            });
        },
        *getFollowScale({ payload }, { call, put }) {
            const result = yield call(getFollowScale, payload)
            yield put({ 
                type: 'updateFollowScaleInfo',
                payload: result.results
            });
        },
        *getEntireScale({ payload }, { call, put }) {
            const result = yield call(getEntireScale, payload)
            yield put({ 
                type: 'updateEntireScaleInfo',
                payload: result.results.answerVOList
            });
        },
        *saveAnswer({ payload }, { call, put }) {
            yield call(saveAnswer, payload)
        }
    },

    reducers: {
        saveScaleList(state, action) {
            return { ...state, scaleList: action.payload };
        },
        changeScaleListLoading(state, action){
            return { ...state, scaleListLoading: action.payload}
        },
        updateScaleInfo(state, action){
            return { ...state, scaleInfo: action.payload}
        },
        updateFollowScaleInfo(state, action){
            return { ...state, followScaleInfo: action.payload}
        },
        updateEntireScaleInfo(state, action){
            return { ...state, entireScaleInfo: action.payload}
        },
    },

};
