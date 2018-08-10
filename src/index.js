import dva from 'dva';
import './index.less';
import 'moment/locale/zh-cn';
// import fastclick from 'fastclick'

// 1. Initialize
const app = dva({
	onError(e, dispatch){
		console.log(e.message)
	}
});

// 2. Plugins
// app.use({});
document.documentElement.style.fontSize = document.documentElement.clientWidth / 7.5 + 'px';
// fastclick.attach(document.body)

// 3. Model
// app.model(require('./models/example').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
