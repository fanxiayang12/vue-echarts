/* eslint-disable eol-last */
// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
import layout from '@/layout'
import system from './system/router'

const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

/**
 * 在主框架内显示
 */
const frameIn = [{
  path: '/',
  redirect: {
    name: 'index'
  },
  component: layout,
  children: [
    ...system,
  ]
}]

/**
 * 在主框架之外显示
 */
const frameOut = [
]

/**
 * 错误页面
 */
const errorPage = [{
  path: '*',
  name: '404',
  component: _import('system/error/404')
}]

// 导出需要显示菜单的
export const frameInRoutes = frameIn

// 重新组织后导出
export default [
  ...frameIn,
  ...frameOut,
  ...errorPage
]