import {
    getScaleList,
    deleteScale
} from '../services/api.js'
export default {

    namespace: 'scale',

    state: {
        scaleList: [],
        scaleListLoading: false,
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
        }
    },

    reducers: {
        saveScaleList(state, action) {
            return { ...state, scaleList: action.payload };
        },
        changeScaleListLoading(state, action){
            return { ...state, scaleListLoading: action.payload}
        },
    },

};
