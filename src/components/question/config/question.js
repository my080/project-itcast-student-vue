
import config from './components-config.js'

class Question {

	constructor () {
		this.config = config
	}

	_matchSubject (code) {
		let returnObj = null
		if (this.config.hasOwnProperty(code)) {
			returnObj = this.config[code]
		}
		return returnObj
	}

	_matchType (code, obj) {
		let returnObj = null
		if (obj.hasOwnProperty(code)) {
			returnObj = obj[code]
		}
		return returnObj
	}

	_matchVersion (code, obj) {
		let returnObj = null
		if (code.indexOf('.') > -1) {
			let codeArray = code.split('.')
			if (obj.hasOwnProperty(codeArray[0])) {
				let versionObj = obj[codeArray[0]]
				if (versionObj.hasOwnProperty(codeArray[1])) {
					returnObj = versionObj[codeArray[1]]
				}
			}
		}
		return returnObj
	}

	match (code) {
		let returnObj = null
		if (code.indexOf('-') > -1) {
			let codeArray = code.split('-')
			if (codeArray.length === 3) {
				let subjectCode = codeArray[0]
				let typeCode = codeArray[1]
				let versionCode = codeArray[2]
				let subjectObj = this._matchSubject(subjectCode)
				if (subjectObj) {
					let typeObj = this._matchType(typeCode, subjectObj)
					if (typeObj) {
						returnObj = this._matchVersion(versionCode, typeObj)
					}
				}
			}
		}
		return returnObj
	}
}

export default Question
