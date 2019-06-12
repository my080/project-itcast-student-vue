
const questionReportOption = {
	title : {
		text: '学习状况',
			subtext: '作答状态',
			x:'center'
	},
	tooltip : {
		trigger: 'item',
			formatter: "{a} <br/>{b} : {c} ({d}%)"
	},
	legend: {
		orient: 'vertical',
			left: 'left',
			data: ['全对','半对','错误','未进行']
	},
	series : [
		{
			name: '访问来源',
			type: 'pie',
			radius : '55%',
			center: ['50%', '60%'],
			data:[],
			itemStyle: {
				emphasis: {
					shadowBlur: 10,
					shadowOffsetX: 0,
					shadowColor: 'rgba(0, 0, 0, 0.5)'
				}
			}
		}
	]
}

export default questionReportOption
