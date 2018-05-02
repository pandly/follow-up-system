简体中文

# Follow Up System

一套为医院提供院后患者随访的系统

## 内容

```
- 随访管理
  - 今日任务
  - 出院随访
  - 专病随访
  - 满意度回访
- 患者管理
- 随访模板
  - 随访量表
  - 随访计划
```

## 使用

```bash
$ git clone https://github.com/pandly/follow-up-system.git
$ cd follow-up-system
$ npm install
$ npm run start         # 访问 http://localhost:8000,启动时代理开发环境中的真实数据，如需更改代理接口地址，可以在.roadhogrc.mock.js中修改
$ npm run mock          # 访问 http://localhost:8000,启动时访问mock数据
$ npm run build         # 文件打包 
```


