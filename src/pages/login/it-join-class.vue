<template>
	<div class="join-class">
		<van-nav-bar class="nav-bar"
		             left-arrow
		             :title="navTitle"
		             @click-left="onClickLeft">
		</van-nav-bar>
		
		<div class="join-title">学校：{{ school.name }}</div>
		<div class="join-title">老师：{{ teacher.name }}</div>
		
		<van-cell-group>
			<van-field class="login-input" v-model="code" placeholder="请选择班级" @click="showPopup"></van-field>
		</van-cell-group>
		
		<van-row class="btn-row" type="flex">
			<van-col span="3"></van-col>
			
			<van-col span="18">
				<van-button class="login-btn" round type="info" @click="submit">下一步</van-button>
			</van-col>
			
			<van-col span="3"></van-col>
		</van-row>
		
		<van-popup class="popup-class" v-model="show" position="bottom">
			
			<van-cell-group class="cell-list">
				<template v-for="grade in grades">
					<van-cell v-for="classItem in grade.classes" :value="grade['名称'] + classItem.name" :key="classItem.id" @click="choiceClass(grade, classItem)" />
				</template>
			</van-cell-group>
			
			<van-cell-group>
				<van-cell @click="cancel" value="取消" />
			</van-cell-group>
			
		</van-popup>
	</div>
</template>

<script>
	import LoginService from './service/login-service.js'
	import student from './pojo/student.js'
	import SessionStorage from '../../common/scripts/storage/promise/session-storage.js'
	import { NavBar, Field, CellGroup, Button, Row, Col, Popup, Cell } from 'vant'

	export default {
		name: 'join-class',
		components: {
			'van-nav-bar': NavBar,
			'van-field': Field,
			'van-cell-group': CellGroup,
			'van-row': Row,
			'van-button': Button,
			'van-col': Col,
			'van-popup': Popup,
			'van-cell': Cell
		},
		beforeCreate () {
			this.service = new LoginService()
		},
		data () {
			return {
				navTitle: '加入班级',
				code: null,
				show: false,
				teacher: {},
				school: {},
				grades: [],
				selectedGrade: {},
				selectedClass: {},
				student: student
			}
		},
		created () {
			this.findTeacher()
		},
		methods: {
			onClickLeft () {
				this.$router.push('/relate-teacher')
			},
			next () {},
			pushClasses () {
				let that = this
				for (let i = 0; i < that.grades.length; i++) {
					that.grades[i].classes = []
					for (let j = 0; j < that.teacher.classes.length; j++) {
						if (that.teacher.classes[j].grades.includes(that.grades[i].id)) {
							that.grades[i].classes.push(that.teacher.classes[j])
						}
					}
				}
			},
			findTeacher () {
				let that = this
				let data = {
					email: that.$store.state.login.teacherEmail
				}
				this.service.findTeacher(data).then(function (data) {
					if (data.data[0]) {
						let teacher = data.data[0]
						that.teacher = teacher
						that.school = teacher.schools[0]
						that.grades = teacher.grades
						that.pushClasses()
					} else {
						that.$toast('老师不存在！')
					}
				}).catch(function () {
					that.$toast('服务器存在异常请与客服联系！')
				})
			},
			choiceGrade(grade) {
				this.selectedGrade = grade
				this.show = false
			},
			choiceClass (grade, classItem) {
				this.selectedGrade = grade
				this.selectedClass = classItem
				this.code = this.selectedGrade['名称'] + this.selectedClass.name
				this.show = false
			},
			showPopup () {
				this.show = true
			},
			confirm () {
				this.$router.push('/student-info')
			},
			cancel () {
				this.show = false
			},
			close () {
				this.dialogShow = false
			},
			submit () {
				if (this.code) {
					let schools = [this.school.id]
					let grades = [this.selectedGrade.id]
					let classes = [this.selectedClass.id]
					this.student.schools = schools
					this.student.grades = grades
					this.student.classes = classes
					SessionStorage.set('register', this.student)
					this.$router.push('/student-info')
				} else {
					this.$toast('请选择班级！')
				}
			}
		}
	}
</script>

<style lang="scss">
	@import "./login.scss";
	.join-class {
		background: #f4f4f4;
		height: 100vh;
	}
</style>