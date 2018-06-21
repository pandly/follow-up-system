import dva from 'dva';
import './index.less';
import 'moment/locale/zh-cn';

// 1. Initialize
const app = dva({
	onError(e, dispatch){
		console.log(e.message)
	}
});

// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./models/example').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
