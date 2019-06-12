
import student from '../pojo/student.js'
import Request from '../../../common/scripts/request/request.js'
import SessionStorage from '../../../common/scripts/storage/promise/session-storage.js'

class PersonalService {

	constructor () {
		this.request = new Request()
	}

	logout (options) {
		let that = this
		options['code']
		return SessionStorage.get('loginUser')
			.then(function (data) {
				let loginStatusCode = data.data.loginStatusCode
				options['code'] = loginStatusCode
				return that.request.get('logout', options)
			})
			.then(SessionStorage.clear(), SessionStorage.clear())
	}

	upload (files, user) {
		let formData = new FormData()
		formData.append('ref', 'consumer')
		formData.append('refId', user.id)
		formData.append('path', 'consumer/images')
		formData.append('field', 'head_sculpture')
		formData.append('files', files[0])
		return this.request.post('upload', formData)
	}

	getTeacher (options) {
		let obj = {
			schools: options.schools[0].id,
			grades: options.grades[0].id,
			classes: options.classes[0].id,
			type: '老师'
		}
		return this.request.get('consumers', obj)
	}

	listStudents (options) {
		let obj = {
			schools: options.schools[0].id,
			grades: options.grades[0].id,
			classes: options.classes[0].id,
			type: '学生'
		}
		return this.request.get('consumers', obj)
	}

	getStudentCount (options) {
		let obj = {
			schools: options.schools[0].id,
			grades: options.grades[0].id,
			classes: options.classes[0].id,
			type: '学生'
		}
		return this.request.get('consumers/count', obj)
	}

	findTeacherCount (options) {
		return this.request.get('consumers/count', options)
	}

	findTeacher (options) {
		return this.request.get('consumers', options)
	}

	updateClass (user, schools, grades, classes) {
		student.name = user.name
		student.email = user.email
		student.password = user.password
		student.create_time = user.create_time
		student.update_time = new Date()
		student.status = 1
		student.schools = schools
		student.grades = grades
		student.classes = classes
		return this.request.put('consumers/' + user.id, student)
	}

	refreshUser (options) {
		return this.request.get('consumers/' + options.id, {})
	}

}

export default PersonalService
