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
    '/followUpManage/todayMission': {
      component: dynamicWrapper(app, ['todayMission'], () => import('../routes/FollowUpManage/TodayMission')),
    },
    '/followUpManage/outPatient': {
      component: dynamicWrapper(app, ['outPatient'], () => import('../routes/FollowUpManage/OutPatient')),
    },
    '/followUpManage/specialDisease': {
      component: dynamicWrapper(app, ['specialDisease'], () => import('../routes/FollowUpManage/SpecialDisease')),
    },
    '/followUpManage/satisfaction': {
      component: dynamicWrapper(app, ['satisfaction'], () => import('../routes/Satisfaction/Satisfaction')),
    },
    '/followUpTemplate/scale': {
      component: dynamicWrapper(app, ['scale'], () => import('../routes/FollowUpTemplate/Scale')),
    },
    '/followUpTemplate/plan': {
      component: dynamicWrapper(app, ['plan'], () => import('../routes/FollowUpTemplate/Plan')),
    },
  };
  return routerConfig;
}


