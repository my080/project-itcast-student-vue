<template>
	<div class="students">
		<van-nav-bar class="nav-bar"
		             left-arrow
		             :title="msg"
		             @click-left="onClickLeft">
		</van-nav-bar>
		
		<van-cell-group class="students-list">
			<van-cell v-for="(student, index) in students" :key="index"
			          :title="student.name"/>
		</van-cell-group>
	</div>
</template>

<script>
	import PersonalService from './service/personal-service.js'
	import { NavBar, CellGroup, Cell } from 'vant'

	export default {
		name: 'students',
		components: {
			'van-nav-bar': NavBar,
			'van-cell-group': CellGroup,
			'van-cell': Cell
		},
		beforeCreate () {
			this.service = new PersonalService()
		},
		data () {
			return {
				msg: '学生',
				students: []
			}
		},
		created () {
			this.init()
		},
		methods: {
			init () {
				let that = this
				this.service.listStudents(this.$store.state.personal.loginUser).then(function (data) {
					that.students = data.data
				})
			},
			onClickLeft () {
				this.$router.push('/personal-classroom')
			}
		}
	}
</script>

<style lang="scss">
	@import "./personal.scss";
</style>