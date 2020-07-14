import Vue from 'vue'

import d2Container from './d2-container'
import emBox from './em-box'
import emGrid from './em-grid'

// 注意 有些组件使用异步加载会有影响
Vue.component('d2-container', d2Container)
Vue.component('em-box', emBox)
Vue.component('em-grid', emGrid)
Vue.component('d2-icon', () => import('./d2-icon'))
Vue.component('d2-icon-svg', () => import('./d2-icon-svg/index.vue'))
