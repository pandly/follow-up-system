import {
    getScaleList,
    deleteScale,
    getScale,
    saveScale,
    getFollowScale
} from '../services/api.js'
export default {

    namespace: 'scale',

    state: {
        scaleList: [],
        scaleListLoading: false,
        scaleInfo: {},
        followScaleInfo: {},
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
    },

};
