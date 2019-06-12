<template>
	<div class="send-email-success">
		
		<van-nav-bar class="nav-bar"
		             left-arrow
		             :title="navTitle"
		             @click-left="onClickLeft">
		</van-nav-bar>
		
		<van-panel class="prompt" title="温馨提示">
			
			<div class="message">
				<h2>邮件已发送成功请注意查收！</h2>
				<h2>如已激活，请登录！</h2>
			</div>
			
			<div slot="footer">
				<van-button size="small" type="info" @click="toLogin">去登陆</van-button>
				<div class="clear"></div>
			</div>
			
		</van-panel>
		
	</div>
</template>

<script>
	import { Panel, NavBar, Button  } from 'vant'
	
	export default {
		name: 'send-email-success',
		components: {
			'van-panel': Panel,
			'van-nav-bar': NavBar,
			'van-button': Button
		},
		data () {
			return {
				navTitle: '邮件发送成功'
			}
		},
		methods: {
			onClickLeft () {
				this.$router.push('/send-email-success')
			},
			toLogin () {
				this.$router.push('/login')
			}
		}
	}
</script>

<style lang="scss">
	@import "./login.scss";
	
	.send-email-success {
		background: #f4f4f4;
		height: 100vh;
		.message {
			padding: 30px 15px;
			h2 {
				font-size: 20px;
				line-height: 24px;
			}
		}
	    .van-button {
		    float: right;
	    }
	    .clear {
		   clear: both;
	    }
	}
</style>