
import Request from '../../../common/scripts/request/request.js'

class LearnReportService {

	constructor () {
		this.request = new Request()
	}

	questionReport (options) {
		return this.request.get('question-report', options)
	}

	subjectReport (options) {
		return this.request.get('subject-report', options)
	}
}

export default LearnReportService
