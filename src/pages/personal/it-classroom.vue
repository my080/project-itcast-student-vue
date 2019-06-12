<template>
	<div class="personal-classroom">
		<van-nav-bar class="nav-bar"
		             left-arrow
		             :title="msg"
		             @click-left="onClickLeft">
		</van-nav-bar>
		
		<van-row class="teacher-list" type="flex">
			<van-col span="2"></van-col>
			
			<van-col span="20">
				
				<article v-for="(teacher, index) in teachers" :key="index">
					
					<template v-if="teacher['head_sculpture']">
						<img :src="config.serverURL + teacher['head_sculpture']['url']" width="40px">
					</template>
					
					<template v-else>
						<span class="icon iconfont icon-touxiang"></span>
					</template>
				
					<h3>{{ teacher.name }}</h3>
				</article>
				
			</van-col>
			
			<van-col span="2"></van-col>
		</van-row>
		
		
		<van-cell-group class="list">
			
			<van-cell title="学生" :value="studentCount + '名 >'"
			          @click="toStudents"/>
		
		</van-cell-group>
		
		<van-row class="btn-row" type="flex">
			
			<van-col span="3"></van-col>
			
			<van-col span="18">
				<van-button class="login-btn" round type="info" @click="toChangeClass">更换班级</van-button>
			</van-col>
			
			<van-col span="3"></van-col>
			
		</van-row>
		
	</div>
</template>

<script>
	import config from '../../common/scripts/config/config.js'
	import PersonalService from './service/personal-service.js'
	import { NavBar, CellGroup, Cell, Row, Col, Button } from 'vant'
	
	export default {
		name: 'personal-classroom',
		components: {
			'van-nav-bar': NavBar,
			'van-cell-group': CellGroup,
			'van-cell': Cell,
			'van-row': Row,
			'van-col': Col,
			'van-button': Button
		},
		beforeCreate () {
			this.service = new PersonalService()
		},
		data () {
			return {
				msg: '班级管理',
				studentCount: 0,
				teachers: null,
				imageURL: null,
				config: null
			}
		},
		created () {
			this.init()
		},
		methods: {
			init () {
				let that = this
				let user = that.$store.state.personal.loginUser
				this.config = config
				this.service.getStudentCount(user).then(function (data) {
					that.studentCount = data.data
				})
				this.service.getTeacher(user).then(function (data) {
					that.teachers = data.data
				})
			},
			onClickLeft () {
				this.$router.push('/personal')
			},
			toStudents () {
				this.$router.push('/students')
			},
			toChangeClass () {
				this.$router.push('/change-teacher')
			}
		}
	}
</script>

<style lang="scss">
	@import "./personal.scss";
	
	.teacher-list {
		padding: 30px 0;
		article {
			min-height: 64px;
		}
		h3 {
			font-weight: 600;
			margin-top: 6px;
			text-align: center;
			font-size: 18px;
		}
	}
</style>