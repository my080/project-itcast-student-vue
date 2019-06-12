<template>
	<div class="header">
		<h2>{{ titleTxt }}</h2>
	</div>
</template>

<script>
	export default {
		name: 'home',
		components: {},
		props: ['title'],
		data () {
			return {
				titleTxt: this.$props['title']
			}
		},
		methods: {}
	}
</script>

<style lang="scss">
	@import "./header.scss";
</style>