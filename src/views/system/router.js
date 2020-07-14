
export default [
	// 首页
	{
		path: 'index',
		name: 'index',
		meta: {
			auth: true
		},
		component: () => import('./index')
	},
	// 系统 前端日志
	{
		path: 'log',
		name: 'log',
		meta: {
			title: '前端日志',
			auth: true
		},
		component: () => import('./log')
	},
	// 刷新页面 必须保留
	{
		path: 'refresh',
		name: 'refresh',
		hidden: true,
		component: () => import('./function/refresh')
	},
	// 页面重定向 必须保留
	{
		path: 'redirect/:route*',
		name: 'redirect',
		hidden: true,
		component: () => import('./function/redirect')
	}
]