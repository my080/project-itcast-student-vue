/**
 * 请求层的封装类
 * @author 周亮
 * @createDate 2019-04-04
 * @notice 我本地用了 nginx 做的代理，这里并没有跨域处理
 */

import config from '../config/config.js'
import axios from 'axios'

class Request {

	constructor () {
		this.baseURL = config.serverURL
	}

	get (url, options) {
		let data = options
		let requestURL = this.baseURL + url
		if (data) {
			requestURL = requestURL + '?'
			for (let key in data) {
				requestURL = requestURL + key + '=' + data[key] + '&'
			}
			requestURL = requestURL.substr(0, requestURL.length - 1)
		}
		return axios.get(requestURL)
	}

	post (url, options) {
		let data = options
		let requestURL = this.baseURL + url
		return axios.post(requestURL, data)
	}

	put (url, options) {
		let data = options
		let requestURL = this.baseURL + url
		return axios.put(requestURL, data)
	}

	delete (url, options) {
		let data = options
		let requestURL = this.baseURL + url
		return axios.delete(requestURL, data)
	}

}

export default Request
