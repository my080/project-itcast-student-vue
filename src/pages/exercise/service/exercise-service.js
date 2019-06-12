
import Request from '../../../common/scripts/request/request.js'

class ExerciseService {

	constructor () {
		this.request = new Request()
	}

	submit (options) {
		return this.request.put('scores/' + options.id, options)
	}

	finish (options) {
		let param = {
			id: options.id,
			status: options.status,
			is_all_right: options.is_all_right,
			update_time: new Date()
		}
		return this.request.put('scores/' + options.id, param)
	}

	listExercisesByUser (options) {
		return this.request.get('exercises', options)
	}

}

export default ExerciseService
