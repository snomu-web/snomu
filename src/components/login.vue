<template>
	<div class="login">
		<img class="welcome" src="@/assets/Welcome@2x.png"/>
		<div class="flex_start_v">
			<div class="top_p1 posire" @click="type = 0">
				<p :class="{ col222: !type }">账号密码登录</p>
				<p class="line" v-if="type == 0"></p>
			</div>
			<div class="posire" @click="type = 1">
				<p :class="{ col222: type }">手机验证登录</p>
				<p class="line" v-if="type == 1"></p>
			</div>
		</div>
		<div class="com">
			<div class="int_fle">
				<img src="@/assets/icon_iphone@2x.png"/>
				<input type="text" name="" id="" v-model="phone" placeholder="请输入您的手机号"/>
				<img class="del" src="@/assets/shanchu.png" v-if="phone" @click="phone = ''"/>
			</div>
			<div class="flex_between_v" v-if="type == 1">
				<div class="int_fle mar0">
					<img src="@/assets/icon_yanzhengma@2x.png"/>
					<input type="text" name="" id="" v-model="code" placeholder="请输入您收到的验证号"/>
					<img class="del" src="@/assets/shanchu.png" v-if="code" @click="code = ''"/>
				</div>
				<p class="getcode opt5" v-if="show && !codeshow">验证码</p>
	            <p class="getcode" v-if="show && codeshow" @click="getCode">验证码</p>
	            <p class="getcode opt5" v-if="!show">{{count}}s后获取</p>				
			</div>
		</div>
		<div class="int_fle" v-if="type == 0">
			<img src="@/assets/icon_mima@2x.png"/>
			<input type="password" v-if="passhow == 1" v-model="password" placeholder="请输入您的密码"/>
			<input type="text" v-if="passhow == 0" v-model="password" placeholder="请输入您的密码"/>
			<img src="@/assets/icon_closeeyes@2x.png" v-if="passhow == 1" @click="passhow = 0"/>
			<img src="@/assets/icon_openeyes@2x.png" v-if="passhow == 0" @click="passhow = 1"/>
		</div>
		<router-link to='/forget' v-if="type == 0" class='forget'>忘记密码？</router-link>
		<div class="reg" v-if="(phone && code) || (phone && password)" @click="logClick">
			登录
		</div>
		<div class="reg opt5" v-else>
			登录
		</div>
		<p class="bom_p">没有账号？<router-link to='/regist'>快速注册</router-link></p>
	</div>
</template>

<script>
	import { Toast } from 'vant'
	import qs from 'qs'
	export default({
		name: 'login',
		data () {
			return {
				type: 0 || 1,   			//0账号密码 1手机号登录
				password: '',				//密码
				passhow: 0 || 1,
				show: true,					//显示获取
			 	count: '',					//倒计时
			 	timer: null,				//倒计时事件
			 	codeshow: false,			//否不可点击
				phone:'',
				code: '',
				isTrust: 0					//托管状态 0为托管   1已托管
			}
		},
		methods: {
			// 获取验证码
		    getCode () {
		        let that = this
		        that.$axios({
		      	  	url: '/api/app/yzm/yzm',
		       		method: 'POST',
		        	data: qs.stringify({
		          		phone: that.phone
		        	})
		      	}).then(res => {
			        if (res.data.code == 0) {
			          	Toast('获取成功')
			          	that.codeGet()
			        } else {
			          	Toast(res.data.msg)
			        }
		      	})
		    },
		    //倒计时
		    codeGet () {
		        const TIME_COUNT = 60
		        let that = this
		        that.count = TIME_COUNT
		        that.show = false
		        that.timer = setInterval(() => {
		        if (that.count > 0 && that.count <= TIME_COUNT) {
		          	that.count--
		        } else {
		            that.show = true
		            clearInterval(this.timer)
		            that.timer = null
		        }
		      }, 1000)
		    },
		    //登录
		    logClick () {
		    	let that = this
		    	let data = ''
		    	let url = ''
		    	if (that.type == 0) {
		    		data = {
		    			userName: that.phone,
		    			password: that.password
		    		}
		    		url = '/api/app/user/loginByPwd'
		    	} else {
		    		data = {
		    			userName: that.phone,
		    			code: that.code
		    		}
		    		url = '/api/app/user/loginByCode'
		    	}
		        that.$axios({
		      	  	url: url,
		       		method: 'POST',
		        	data: qs.stringify(data)
		      	}).then(res => {
			        if (res.data.code == 0) {
			        	Toast(res.data.msg)
			        	localStorage.setItem('userId',res.data.data.userId)
			        	localStorage.setItem('userName',res.data.data.userName)
						localStorage.setItem('cookId',res.data.data.clientId)			        	
			        	that.$router.push({path:'/home'})
			        } else {
			          	Toast(res.data.msg)
			        }
		      	})
		    }
		},
		watch: {
			phone () {
				if (this.phone) {
					this.codeshow = true
				} else {
					this.codeshow = false
				}
			}
		}
	})
</script>

<style scoped>
.login{overflow: hidden;height: 100%;background: #fff;position: absolute;width: 100%;top: 0;padding: 1.7rem .5rem 0 .5rem;}
.opt5{opacity: .5;}
.logo_img{display: block;margin: auto;margin-top: 1.36rem;}
.lo_til{text-align: center;font-size: .32rem;color: #666666;}
.int_fle{display: flex;align-items: center;border: .02rem solid #d8d8d8;border-radius: 88px; height: .88rem;line-height: .88rem; margin-bottom: .4rem;overflow: hidden;padding: 0 .35rem;}
.int_fle input{margin-left: .2rem; width: 100%;font-size: .3rem;border: 0;}
.getcode{color: #fff;font-size: .3;white-space: normal;text-align: center;background: #FD5751;border-radius: 88px;height: .88rem;line-height: .88rem;flex: 1;margin-left: .2rem;}
.bom_p{color: #9E9E9E;font-size: .3rem;margin-top: .5rem;text-align: center;}
.bom_p a{color: #FD5751;}
.welcome{width: 4.4rem;height: .7rem;margin-bottom: .6rem;}
.mar0{margin: 0;flex: 2;}
.reg{background-image: linear-gradient(135deg, #FD944A 0%, #FD3D54 100%);border-radius: .44rem;text-align: center;height: .88rem;line-height: .88rem;color: #fff;font-size: .36rem;margin-top: 1rem;}
.flex_start_v{font-size: .32rem;margin-bottom: .88rem;color: #9E9E9E;}
.top_p1{margin-right: .37rem;}
.posire{position: relative;}
.line{background: #777777;width: .8rem;height: .04rem;margin: auto;margin-top: .24rem;position: absolute;left: 50%;transform: translateX(-50%);}
.col222{color: #222222;}
.forget{display: block;text-align: right;margin-top: -.2rem;}
.del{width: .3rem;height: .3rem;}
</style>