
class Wox {

	constructor (vm) {
		this.vm = vm
		window.successCallBackMap = {}
		window.errorCallBackMap = {}
		if (window.wox) {
			window.wox
			window.error = Wox.error
		} else {
			console.log('未检测到原生环境！')
		}
	}

	static startRecorder (data, id, callBack, errorCallBack) {
		if (id && typeof callBack === 'function') {
			window.successCallBackMap[id] = callBack
		}
		if (id && typeof errorCallBack === 'function') {
			window.errorCallBackMap[id] = errorCallBack
		}
		let obj = {
			'id': id,
			'data': data
		}
		let dataStr = JSON.stringify(obj)
		if (window.wox) {
			window.wox.startRecorder(dataStr)
		} else {
			console.log('未检测到原生环境！')
		}
	}

	static play (data, id, callBack, errorCallBack) {
		if (id && typeof callBack === 'function') {
			window.successCallBackMap[id] = callBack
		}
		if (id && typeof errorCallBack === 'function') {
			window.errorCallBackMap[id] = errorCallBack
		}
		let obj = {
			'id': id,
			'data': data
		}
		let dataStr = JSON.stringify(obj)
		if (window.wox) {
			window.wox.play(dataStr)
		} else {
			console.log('未检测到原生环境！')
		}
	}

	static stop (data) {
		let dataStr = JSON.stringify(data)
		if (window.wox) {
			window.wox.stop(dataStr)
		} else {
			console.log('未检测到原生环境！')
		}
	}

	static resStart (data) {
		let dataStr = JSON.stringify(data)
		if (window.wox) {
			window.wox.resStart(dataStr)
		} else {
			console.log('未检测到原生环境！')
		}
	}

	static parse (data) {
		let dataStr = JSON.stringify(data)
		if (window.wox) {
			window.wox.parse(dataStr)
		} else {
			console.log('未检测到原生环境！')
		}
	}

	static endRecorder (data, id, callBack, errorCallBack) {
		if (id && typeof callBack === 'function') {
			window.successCallBackMap[id] = callBack
		}
		if (id && typeof errorCallBack === 'function') {
			window.errorCallBackMap[id] = errorCallBack
		}
		let obj = {
			'id': id,
			'data': data
		}
		let dataStr = JSON.stringify(obj)
		if (window.wox) {
			window.wox.endRecorder(dataStr)
		} else {
			console.log('未检测到原生环境！')
		}
	}

	static photograph (data) {
		let dataStr = JSON.stringify(data)
		if (window.wox) {
			window.wox.photograph(dataStr)
		} else {
			console.log('未检测到原生环境！')
		}
	}

	static success (data) {
		alert(data)
	}

	static error (err) {
		console.log(err)
	}

}

export default Wox
