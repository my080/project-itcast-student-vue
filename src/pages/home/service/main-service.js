
import Request from '../../../common/scripts/request/request.js'

class MainService {

	constructor () {
		this.request = new Request()
	}

	listExercisesByUser (options) {
		return this.request.get('not-finish-exercises', options)
	}
}

export default MainService
