
// Ⅰ、Ⅱ、Ⅲ、Ⅳ、Ⅴ、Ⅵ、Ⅶ、Ⅷ、Ⅸ、Ⅹ 罗马数字 1,2,3,4,5,6,7,8,9,10

const SingleChoice = r => require.ensure([], () => r(require('@/components/question/english/single-choice/it-question.vue')), 'single-choice')
const SingleImageChoice = r => require.ensure([], () => r(require('@/components/question/english/single-choice/it-image-question.vue')), 'single-image-choice')
const MultipleChoice = r => require.ensure([], () => r(require('@/components/question/english/multiple-choice/it-question.vue')), 'multiple-choice')
const ReadingQuestion = r => require.ensure([], () => r(require('@/components/question/english/reading-question/it-question.vue')), 'reading-question')
const RecitationQuestion = r => require.ensure([], () => r(require('@/components/question/english/recitation-question/it-question.vue')), 'recitation-question')
const Completion = r => require.ensure([], () => r(require('@/components/question/english/completion/it-question.vue')), 'completion')
const ReadSentence = r => require.ensure([], () => r(require('@/components/question/english/read-sentence/it-question.vue')), 'read-sentence')

const englishQuestion = {
	'it-english-single-choice-I-I': SingleChoice,                                                                  // 单项选择题
	'it-english-single-choice-I-II': SingleImageChoice,                                                            // 单项图片选择题
	'it-english-multiple-choice-I-I': MultipleChoice,                                                              // 多项选择题
	'it-english-reading-question-I-I': ReadingQuestion,                                                            // 阅读题
	'it-english-recitation-question-I-I': RecitationQuestion,                                                     // 背诵题
	'it-english-completion-I-I': Completion,                                                                        // 填空题
	'it-english-read-sentence-I-I': ReadSentence                                                                   // 朗读句子
}

export default englishQuestion
