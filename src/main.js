import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import './assets/css/global.css'
// 导入字体图标
import './assets/fonts/iconfont.css'
import './styles.scss'
import TreeTable from 'vue-table-with-tree-grid'

// 导入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
// require styles 导入富文本编辑器对应的样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import axios from 'axios'
// 配置请求的根路径
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
axios.interceptors.request.use(config => {
  // console.log(config)
  config.headers.Authorization = window.sessionStorage.getItem('token')
  // 在最后需要一定要return处理过的config
  return config
})
Vue.prototype.$http = axios

Vue.use(ElementUI)

Vue.config.productionTip = false
// 全局注册 vue-table-with-tree-grid
// Vue.component('组件名字', 组件对象/引入对象)
Vue.component('tree-table', TreeTable)

// 将富文本编辑器，注册为全局可用的组件
Vue.use(VueQuillEditor)
// 注册全局过滤器
Vue.filter('dateFormat', function(originVal) {
  const dt = new Date(originVal)

  const y = dt.getFullYear()
  // 如果不足两位，就在开始处添零来填充到2位
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + '').padStart(2, '0')

  const hh = (dt.getHours() + '').padStart(2, '0')
  const mm = (dt.getMinutes() + '').padStart(2, '0')
  const ss = (dt.getSeconds() + '').padStart(2, '0')
  // 返回一个正确的时间格式：年-月-日 时：分：秒
  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
