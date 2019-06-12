<template>
	<article class="practice-item">
		
		<div class="left">
			<h2>
				<van-button class="subject" plain type="info" size="small">{{ subject }}</van-button> &nbsp; <span class="title">{{ titleTxt }}</span>
			</h2>
			<h3>
				截止时间： {{ endTimeStr }}
			</h3>
		</div>
		
		<div class="right">
			<van-button type="info" size="small" @click="toExercise">开始</van-button>
		</div>
		
	</article>
</template>

<script>
	import SessionStorage from '../../../../../common/scripts/storage/promise/session-storage.js'
	import { Button } from 'vant';

	export default {
		name: 'practice-item',
		components: {
			'van-button': Button
		},
		props: ['title', 'start', 'end', 'subject', 'exercise'],
		data () {
			return {
				titleTxt: this.$props['title'],
				startTime: this.$props['start'],
				endTime: this.$props['end'],
				subjectName: this.$props['subject'],
				exerciseData: this.$props['exercise']
			}
		},
		methods: {
			toExercise () {
				let that = this
				SessionStorage.set('doing-exercise', this.exerciseData).then(() => {
					that.$router.push({
						path: '/exercise',
						query: {
							id: that.exerciseData.id
						}
					})
				})
			}
		},
		computed: {
			endTimeStr: function () {
				return new Date(this.endTime).Format('MM-dd hh:mm')
			}
		}
	}
</script>

<style lang="scss">
	@import "./practice-item.scss";
</style>