import store from '@/store'
import axios from 'axios'
import { Message } from 'element-ui'
import router from '@/router'
import util from '@/libs/util'

// 创建一个错误
function errorCreate (msg) {
  const error = new Error(msg)
  errorLog(error)
  throw error
}

// 记录和显示错误
function errorLog (error) {
  // 添加到日志
  store.dispatch('d2admin/log/push', {
    message: '数据请求异常',
    type: 'danger',
    meta: {
      error
    }
  })
  // 打印到控制台
  if (process.env.NODE_ENV === 'development') {
    util.log.danger('>>>>>> Error >>>>>>')
    console.log(error)
  }
  // 显示提示
  Message({
    message: error.message,
    type: 'error',
    duration: 5 * 1000
  })
}

// 创建一个 axios 实例
const http = axios.create({
	baseURL: process.env.VUE_APP_API,
	headers: {
		'content-type': 'application/json'
	},
  timeout: 60000 // 请求超时时间
})

// 请求拦截器
http.interceptors.request.use(
  config => {
    // 在请求发送之前做一些处理
    const token = util.cookies.get('ticket')
    if (token) {
      config.headers['ticket'] = token
    }
    return config
  },
  error => {
    // 发送失败
    console.log(error)
    Promise.reject(error)
  }
)

// 响应拦截器
http.interceptors.response.use(
  response => {
		const { code, msg } = response.data
		if (code === 401) {
			Message({
			message: msg || `登录已经过期,请重新登录！`,
			type: 'error',
			duration: 5 * 1000
      })
			router.push({
				name: 'login'
			})
		}

    // // dataAxios 是 axios 返回数据中的 data
    // const dataAxios = response.data
    // // 这个状态码是和后端约定的
    // const { code } = dataAxios
    // // 根据 code 进行判断
    // if (code === undefined) {
    //   // 如果没有 code 代表这不是项目后端开发的接口 比如可能是 D2Admin 请求最新版本
    //   return dataAxios
    // } else {
    //   // 有 code 代表这是一个后端接口 可以进行进一步的判断
    //   switch (code) {
    //     case 0:
    //       // [ 示例 ] code === 0 代表没有错误
    //       return dataAxios.data
    //     case 'xxx':
    //       // [ 示例 ] 其它和后台约定的 code
    //       errorCreate(`[ code: xxx ] ${dataAxios.msg}: ${response.config.url}`)
    //       break
    //     default:
    //       // 不是正确的 code
    //       errorCreate(`${dataAxios.msg}: ${response.config.url}`)
    //       break
		//   }
		//}
		return response;
  },
  error => {
    if (error && error.response) {
      switch (error.response.status) {
        case 400: error.message = '请求错误'; break
        case 401: error.message = '未授权，请登录'; break
        case 403: error.message = '拒绝访问'; break
        case 404: error.message = `请求地址出错: ${error.response.config.url}`; break
        case 408: error.message = '请求超时'; break
        case 500: error.message = '服务器内部错误'; break
        case 501: error.message = '服务未实现'; break
        case 502: error.message = '网关错误'; break
        case 503: error.message = '服务不可用'; break
        case 504: error.message = '网关超时'; break
        case 505: error.message = 'HTTP版本不受支持'; break
        default: break
      }
    }
    errorLog(error)
    return Promise.reject(error)
  }
)

export const get = (url, param = {}) => {
	return new Promise((resolve, reject) => {
		http.get(`${url}`, {
			params: param
		}).then(function (response) {
			resolve(response.data)
		}).catch(function (error) {
			resolve({
				success: false,
				code: 501,
				msg: '服务或网络异常！'
			})
			console.log(error)
		})
	})
}

export const post = (url, param = {}, config = {}) => {
	return new Promise((resolve, reject) => {
		http.post(`${url}`, param, config).then(function (response) {
			resolve(response.data)
		}).catch(function (error) {
			resolve({
				success: false,
				code: 501,
				msg: '服务或网络异常！'
			})
			console.log(error)
		})
	})
}

export default {
	post,
	get,
	http,
}

