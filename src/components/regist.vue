<template>
	<div class="regist">
		<img class="welcome" src="@/assets/Welcome@3x.png"/>
		<div class="com">
			<div class="int_fle">
				<img src="@/assets/icon_yaoqingren@3x.png"/>
				<input type="text" class="malef1" v-model="phone" placeholder="请输入推荐人手机号"/>
				<img class="del" src="@/assets/shanchu.png" v-if="phone" @click="phone = ''"/>
			</div>
			<div class="int_fle">
				<img src="@/assets/icon_iphone@3x.png"/>
				<input type="text" name="" id="" v-model="phone" placeholder="请输入您的手机号"/>
				<img class="del" src="@/assets/shanchu.png" v-if="phone" @click="phone = ''"/>
			</div>
			<div class="flex_between_v">
				<div class="int_fle mar0">
					<img src="@/assets/icon_yanzhengma@3x.png"/>
					<input type="text" name="" id="" v-model="code" placeholder="请输入您收到的验证号"/>
					<img class="del" src="@/assets/shanchu.png" v-show="code" @click="code = ''"/>
				</div>
				<p class="getcode opt5" v-if="show && !codeshow">验证码</p>
	            <p class="getcode" v-if="show && codeshow" @click="getCode">验证码</p>
	            <p class="getcode opt5" v-if="!show">{{count}}s后获取</p>				
			</div>
			<div class="int_fle">
				<img src="@/assets/icon_mima@3x.png"/>
				<input type="password" v-if="passhow == 1" v-model="password" placeholder="请您设置6-16位密码"/>
				<input type="text" v-if="passhow == 0" v-model="password" placeholder="请您设置6-16位密码"/>
				<img src="@/assets/icon_closeeyes@2x.png" v-if="passhow == 1" @click="passhow = 0"/>
				<img src="@/assets/icon_openeyes@2x.png" v-if="passhow == 0" @click="passhow = 1"/>
			</div>
			<p class="link_p">点击查看<router-link to='/'>《用户协议》</router-link></p>
		</div>
		<div class="reg" v-if="phone && code && password" @click="regClick">
			立即注册
		</div>
		<div class="reg opt5" v-else>
			立即注册
		</div>
		<p class="bom_p">已有账号？<router-link to='/'>登录</router-link></p>
	</div>
</template>

<script>
	import { Toast } from 'vant'
	import qs from 'qs'
	export default({
		name: 'regist',
		data () {
			return {
				show: true,					//显示获取
			 	count: '',					//倒计时
			 	timer: null,				//倒计时事件
			 	codeshow: false,			//否不可点击
				phone:'',
				code: '',
				password: '',
				passhow: 0 || 1
			}
		},
		methods: {
			// 获取验证码
		    getCode () {
		        let that = this
		        that.$axios({
		      	  	url: '/api/app/appUser/getVerificationCode',
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
		    //提交
		    regClick () {
		    	let that = this
		        that.$axios({
		      	  	url: '/api/app/appUser/register',
		       		method: 'POST',
		        	data: qs.stringify({
		          		phone: that.phone,
		          		verificationCode: that.code,
		          		referrerPhone: that.people
		        	})
		      	}).then(res => {
			        if (res.data.code == 0) {
			        	Toast(res.data.msg)
			        	that.$router.pus({path:'/'})
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
.regist{overflow: hidden;height: 100%;background: #fff;position: absolute;width: 100%;top: 0;padding: 1.7rem .5rem 0 .5rem;}
.opt5{opacity: .5;}
.logo_img{display: block;margin: auto;margin-top: 1.36rem;}
.reg_til{text-align: center;font-size: .32rem;color: #666666;}
.com{}
.int_fle{display: flex;align-items: center;border: .02rem solid #d8d8d8;border-radius: 88px; height: .88rem;line-height: .88rem; margin-bottom: .4rem;overflow: hidden;padding: 0 .35rem;}
.int_fle input{margin-left: .2rem; width: 100%;font-size: .3rem;border: 0;}
.getcode{color: #fff;font-size: .3;white-space: normal;text-align: center;background: #FD5751;border-radius: 88px;height: .88rem;line-height: .88rem;flex: 1;margin-left: .2rem;}
.link_p{color: #9E9E9E;font-size: .3rem;text-align: right;margin-top:-.2rem;margin-bottom: .5rem;}
.link_p a{color: #FD5751;}
.reg{background-image: linear-gradient(135deg, #FD944A 0%, #FD3D54 100%);border-radius: .44rem;text-align: center;height: .88rem;line-height: .88rem;color: #fff;font-size: .36rem;}
.welcome{width: 4.4rem;height: .7rem;margin-bottom: .6rem;}
.flex_between_v{height: .88rem;line-height: .88rem; margin-bottom: .4rem;}
.mar0{margin: 0;flex: 2;}
.del{width: .3rem;height: .3rem;}
.bom_p{color: #9E9E9E;font-size: .3rem;margin-top: .5rem;text-align: center;}
.bom_p a{color: #FD5751;}
.malef1{margin-left: .1rem !important;}
</style>