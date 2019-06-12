const subjectReportOption = {
	title: {
		text: '学科分布',
			x:'center'
	},
	tooltip: {},
	legend: {
		orient: 'vertical',
			left: 'left',
			data: ['已进行', '未进行']
	},
	radar: {
		// shape: 'circle',
		name: {
			textStyle: {
				color: '#fff',
					backgroundColor: '#999',
					borderRadius: 3,
					padding: [3, 5]
			}
		},
		radius: '65%',
		indicator: []
	},
	series: [{
		name: '进行状况',
		type: 'radar',
		// areaStyle: {normal: {}},
		data : []
	}]
}

export default subjectReportOption
