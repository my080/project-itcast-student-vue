/**
 * 登录注册的业务层封装类
 * @author 周亮
 * @createDate 2019-05-17
 */

import Request from '../../../common/scripts/request/request.js'

class LoginService {

	constructor () {
		this.request = new Request()
	}

	sendEmail (options) {
		return this.request.post('send-email', options)
	}

	findTeacherCount (options) {
		return this.request.get('consumers/count', options)
	}

	saveLoginStatus (options) {
		return this.request.post('save-login-status', options)
	}

	findTeacher (options) {
		return this.request.get('consumers', options)
	}

	register (options) {
		return this.request.post('consumers', options)
	}

	logout (options) {
		return this.request.get('logout', options)
	}

	login (options) {
		return this.request.post('studentLogin', options)
	}

	resetPassword (options) {
		let obj = {
			id: options.id,
			password: options.password
		}
		return this.request.put('consumers/' + options.id, obj)
	}

	activate (options) {
		let obj = {
			id: options.id,
			code: options.code,
			status: 1
		}
		return this.request.put('consumers/' + options.id, obj)
	}

	updateUserCode (options) {
		let obj = {
			id: options.id,
			activate_code: options.activate_code,
		}
		return this.request.put('consumers/' + options.id, obj)
	}

	findUser (options) {
		return this.request.get('consumers', options)
	}

	getUserCount (options) {
		return this.request.get('consumers/count', options)
	}

	getUser (options) {
		return this.request.get('consumers', options)
	}

}

export default LoginService
