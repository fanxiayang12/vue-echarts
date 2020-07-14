export default {
	namespaced: true,
	state: {
		appInfo: {}
	},
	actions: {
		saveAppInfo({
			state,
			dispatch
		}, appInfo) {
			return new Promise(async resolve => {
				state.appInfo = appInfo
				await dispatch('d2admin/db/set', {
					dbName: 'sys',
					path: 'system.appInfo',
					value: appInfo,
					user: true
				}, {
					root: true
				})
				resolve()
			})
		},
		load({
			state,
			dispatch
		}) {
			return new Promise(async resolve => {
				var re = await dispatch('d2admin/db/get', {
					dbName: 'sys',
					path: 'system.appInfo',
					defaultValue: {},
					user: true
				}, {
					root: true
				})
				state.appInfo = re;
				resolve()
			})
		}
	}
}
