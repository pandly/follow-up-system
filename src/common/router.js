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
      component: dynamicWrapper(app, ['todayMission'], () => import('../routes/Manage/TodayMission')),
    },
    '/manage/todayMission/list': {
      component: dynamicWrapper(app, ['todayMission'], () => import('../routes/Manage/TodayMission/List')),
    },
    '/manage/todayMission/profile': {
      component: dynamicWrapper(app, ['todayMission'], () => import('../routes/Manage/TodayMission/Profile')),
    },
    '/manage/outPatient': {
      component: dynamicWrapper(app, ['outPatient'], () => import('../routes/Manage/OutPatient')),
    },
    '/manage/outPatient/list': {
      component: dynamicWrapper(app, ['outPatient'], () => import('../routes/Manage/OutPatient/List')),
    },
    '/manage/outPatient/profile': {
      component: dynamicWrapper(app, ['outPatient'], () => import('../routes/Manage/OutPatient/Profile')),
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
    '/interview/satisfaction': {
      component: dynamicWrapper(app, ['satisfaction'], () => import('../routes/Interview')),
    },
    '/interview/satisfaction/list': {
      component: dynamicWrapper(app, ['satisfaction'], () => import('../routes/Interview/List')),
    },
    '/interview/satisfaction/detail': {
      component: dynamicWrapper(app, ['satisfactionDetail'], () => import('../routes/Interview/detail')),
    },
    '/template/scale': {
      component: dynamicWrapper(app, ['scale'], () => import('../routes/Template/Scale')),
    },
    '/template/plan': {
      component: dynamicWrapper(app, ['plan'], () => import('../routes/Template/Plan')),
    },
  };
  return routerConfig;
}


