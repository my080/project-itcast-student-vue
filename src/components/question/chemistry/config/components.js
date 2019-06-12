
// Ⅰ、Ⅱ、Ⅲ、Ⅳ、Ⅴ、Ⅵ、Ⅶ、Ⅷ、Ⅸ、Ⅹ 罗马数字 1,2,3,4,5,6,7,8,9,10

const SingleChoice = r => require.ensure([], () => r(require('@/components/question/chemistry/single-choice/it-question.vue')), 'single-choice')
const SingleImageChoice = r => require.ensure([], () => r(require('@/components/question/chemistry/single-choice/it-image-question.vue')), 'image-single-choice')
const Completion = r => require.ensure([], () => r(require('@/components/question/chemistry/completion/it-question.vue')), 'completion')
const ImageCompletion = r => require.ensure([], () => r(require('@/components/question/chemistry/completion/it-image-question.vue')), 'image-completion')

const physicsQuestion = {
	'it-chemistry-completion-I-I': Completion,                                                                     // 填空题
	'it-chemistry-completion-I-II': ImageCompletion,                                                               // 附带图片内容的填空题
	'it-chemistry-single-choice-I-I': SingleChoice,                                                                // 单项选择题
	'it-chemistry-single-choice-I-II': SingleImageChoice                                                           // 附带图片单项选择题
}

export default physicsQuestion
