<template>
	<div class="question">
		<strong>it-english-reading-question-I-I</strong><br />
		<van-button @click="pre">上一题</van-button>
		<van-button @click="next">下一题</van-button>
	</div>
</template>

<script>
	import { Button } from 'vant';
	
	export default {
		name: 'it-english-reading-question-I-I',
		components: {
			'van-button': Button
		},
		methods: {
			next () {
				this.$emit('next')
			},
			pre () {
				this.$emit('pre')
			}
		}
	}
</script>

<style>

</style>