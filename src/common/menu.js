const menuData = [{
  name: '随访管理',
  icon: 'suifangguanliicon',
  path: 'followUpManage',
  children: [{
    name: '今日任务',
    path: 'todayMission',
  }, {
    name: '出院随访',
    path: 'outPatient',
  }, {
    name: '专病随访',
    path: 'specialDisease',
  }, {
    name: '满意度回访',
    path: 'satisfaction'
  }],
}, {
  name: '随访模板',
  icon: 'suifangmobanicon',
  path: 'followUpTemplate',
  children: [{
    name: '随访量表',
    path: 'scale',
  }, {
    name: '随访计划',
    path: 'plan',
  }],
}];

function formatter(data, parentPath = '/') {
  return data.map((item) => {
    let { path } = item;
    path = parentPath + item.path;
    const result = {
      ...item,
      path,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`);
    }
    return result;
  });
}

export const getMenuData = () => formatter(menuData);
