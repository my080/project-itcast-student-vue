
import Request from '../../../common/scripts/request/request.js'

class WrongService {

	constructor () {
		this.request = new Request()
	}

	listWrongExercises (options) {
		return this.request.get('wrong-exercises', options)
	}

}

export default WrongService
