
import Request from '../../../common/scripts/request/request.js'

class HistoryService {

	constructor () {
		this.request = new Request()
	}

	listFinishExercises (options) {
		return this.request.get('has-finish-exercises', options)
	}

}

export default HistoryService
