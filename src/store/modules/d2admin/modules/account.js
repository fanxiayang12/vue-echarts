import { Message, MessageBox } from 'element-ui'
import util from '@/libs/util.js'
// import router from '@/router'
// import { AccountLogin } from '@api/sys.login'

export default {
  namespaced: true,
  actions: {
    async login ({ dispatch }, res ) {
      util.cookies.set('uuid', res.id)
      util.cookies.set('ticket', res.ticket)
      // 设置 vuex 用户信息
      await dispatch('d2admin/user/set', res, { root: true })
      // 用户登录后从持久化数据加载一系列的设置
      await dispatch('load')
    },
    async logout ({
    		commit,
    		dispatch
    	}) {
        util.cookies.remove('ticket')
        util.cookies.remove('uuid')
        // 清空 vuex 用户信息
        await dispatch('d2admin/user/set', {}, { root: true })
    },
    load ({ dispatch }) {
      return new Promise(async resolve => {
        // DB -> store 加载用户名
        await dispatch('d2admin/user/load', null, { root: true })
        // DB -> store 加载主题
        await dispatch('d2admin/theme/load', null, { root: true })
        // DB -> store 加载页面过渡效果设置
        await dispatch('d2admin/transition/load', null, { root: true })
        // DB -> store 持久化数据加载上次退出时的多页列表
        await dispatch('d2admin/page/openedLoad', null, { root: true })
        // DB -> store 持久化数据加载侧边栏折叠状态
        await dispatch('d2admin/menu/asideCollapseLoad', null, { root: true })
        // DB -> store 持久化数据加载全局尺寸
        await dispatch('d2admin/size/load', null, { root: true })
        // end
        resolve()
      })
    }
  }
}
