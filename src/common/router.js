import dynamic from 'dva/dynamic';

const dynamicWrapper = (app, models, component) => dynamic({
 app,
 models: () => models.map(m => import(`../models/${m}.js`)),
 component,
})

export const getRouterData = (app) => {
  const routerConfig = {
    '/': {
      component: dynamicWrapper(app, [], () => import('../layouts/BasicLayout')),
    },
    '/manage/todayMission': {
      component: dynamicWrapper(app, ['todayMission','global'], () => import('../routes/Manage/TodayMission')),
    },
    '/manage/todayMission/list': {
      component: dynamicWrapper(app, ['todayMission'], () => import('../routes/Manage/TodayMission/List')),
    },
    '/manage/todayMission/profile/:id': {
      component: dynamicWrapper(app, ['todayMission','patientDetail','global','plan','scale'], () => import('../routes/Manage/TodayMission/Profile')),
    },
    '/manage/outPatient': {
      component: dynamicWrapper(app, ['outPatient','global'], () => import('../routes/Manage/OutPatient')),
    },
    '/manage/outPatient/list': {
      component: dynamicWrapper(app, ['outPatient'], () => import('../routes/Manage/OutPatient/List')),
    },
    '/manage/outPatient/profile/:id': {
      component: dynamicWrapper(app, ['outPatient','patientDetail','global','plan','scale'], () => import('../routes/Manage/OutPatient/Profile')),
    },
    '/manage/specialDisease': {
      component: dynamicWrapper(app, ['specialDisease'], () => import('../routes/Manage/SpecialDisease')),
    },
    '/manage/specialDisease/list': {
      component: dynamicWrapper(app, ['specialDisease'], () => import('../routes/Manage/SpecialDisease/List')),
    },
    '/manage/specialDisease/profile': {
      component: dynamicWrapper(app, ['specialDisease'], () => import('../routes/Manage/SpecialDisease/Profile')),
    },
    '/satisfaction/returnVisit': {
      component: dynamicWrapper(app, ['satisfaction', 'global'], () => import('../routes/Satisfaction/ReturnVisit')),
    },
    '/satisfaction/returnVisit/list': {
      component: dynamicWrapper(app, ['satisfaction', 'scale'], () => import('../routes/Satisfaction/ReturnVisit/List')),
    },
    '/satisfaction/returnVisit/profile/:id': {
      component: dynamicWrapper(app, ['satisfaction','patientDetail','global', 'scale'], () => import('../routes/Satisfaction/ReturnVisit/Profile')),
    },
    '/template/scale': {
      component: dynamicWrapper(app, ['scale'], () => import('../routes/Template/Scale')),
    },
    '/template/scale/list': {
      component: dynamicWrapper(app, ['scale'], () => import('../routes/Template/Scale/List')),
    },
    '/template/scale/profile': {
      component: dynamicWrapper(app, ['scale'], () => import('../routes/Template/Scale/Profile')),
    },
    '/template/scale/patientFill/:patientId': {
      component: dynamicWrapper(app, ['scale', 'patientDetail'], () => import('../routes/Template/Scale/PatientFill')),
    },
    '/template/plan': {
      component: dynamicWrapper(app, ['plan'], () => import('../routes/Template/Plan')),
    },
    '/template/plan/list': {
      component: dynamicWrapper(app, ['plan','global'], () => import('../routes/Template/Plan/List')),
    },
    '/template/plan/profile/:status/:id': {
      component: dynamicWrapper(app, ['plan','global','scale'], () => import('../routes/Template/Plan/Profile')),
    },
  };
  return routerConfig;
}


