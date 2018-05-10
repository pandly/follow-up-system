const menuData = [{
  name: '随访管理',
  icon: 'icon-suifangguanliicon',
  path: 'manage',
  children: [{
    name: '今日任务',
    path: 'todayMission',
  }, {
    name: '出院随访',
    path: 'outPatient',
  }, {
    name: '专病随访',
    path: 'specialDisease',
  }],
},{
  name: '满意度',
  icon: 'icon-huanzheguanliicon',
  path: 'interview',
  children: [{
    name: '满意度回访',
    path: 'satisfaction'
  }]
}, {
  name: '随访模板',
  icon: 'icon-suifangmobanicon',
  path: 'template',
  children: [{
    name: '随访量表',
    path: 'scale',
  }, {
    name: '随访计划',
    path: 'plan',
    children: [{
      name: '哈哈哈哈',
      path: 'hahah',
    },{
      name: '呵呵呵呵',
      path: 'heheh',
      children: [{
        name: '嘿嘿嘿',
        path: 'heihei'
      }]
    }]
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
