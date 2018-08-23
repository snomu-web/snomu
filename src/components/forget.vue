<template>
	<div class="forget">
		<van-nav-bar title="忘记密码" left-text="返回" left-arrow @click-left="onClickLeft"/>
		<div class="con">
			<div class="int_fle">
				<img src="@/assets/icon_iphone@2x.png"/>
				<input type="text" name="" id="" v-model="phone" placeholder="请输入您的手机号"/>
				<img class="del" src="@/assets/shanchu.png" v-if="phone" @click="phone = ''"/>
			</div>
			<div class="flex_between_v">
				<div class="int_fle mar0">
					<img src="@/assets/icon_yanzhengma@2x.png"/>
					<input type="text" name="" id="" v-model="code" placeholder="请输入您收到的验证号"/>
					<img class="del" src="@/assets/shanchu.png" v-show="code" @click="code = ''"/>
				</div>
				<p class="getcode opt5" v-if="show && !codeshow">验证码</p>
	            <p class="getcode" v-if="show && codeshow" @click="getCode">验证码</p>
	            <p class="getcode opt5" v-if="!show">{{count}}s后获取</p>				
			</div>
			<div class="reg" v-if="phone && code" @click="logClick">
				下一步
			</div>
			<div class="reg opt5" v-else>
				下一步
			</div>			
		</div>
	</div>
</template>

<script>
	import { Toast } from 'vant'
	import qs from 'qs'
	export default{
		name: 'forget',
		data () {
			return {
				show: true,					//显示获取
			 	count: '',					//倒计时
			 	timer: null,				//倒计时事件
			 	codeshow: false,			//否不可点击
				phone:'',
				code: '',
			}
		},
		methods: {
			//返回
		    onClickLeft () {
		        history.go(-1)
	       },
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
		    //下一步
		    logClick () {
		    	let that = this
		        that.$axios({
		      	  	url: '/api/app/user/checkCode',
		       		method: 'POST',
		        	data: qs.stringify({
		          		userName: that.phone,
		          		code: that.code
		        	})
		      	}).then(res => {
			        if (res.data.code == 0) {
			        	localStorage.setItem('userId',res.data.data.userId)
			        	localStorage.setItem('userName',res.data.data.userName)
			        	that.$router.push({path:'/change'})
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
	}
</script>

<style scoped>
.forget{height: 100%;}
.opt5{opacity: .5;}
.int_fle{display: flex;align-items: center;border: .02rem solid #d8d8d8;border-radius: 88px; height: .88rem;line-height: .88rem; margin-bottom: .4rem;overflow: hidden;padding: 0 .35rem;}
.int_fle input{margin-left: .2rem; width: 100%;font-size: .3rem;border: 0;}
.getcode{color: #fff;font-size: .3;white-space: normal;text-align: center;background: #FD5751;border-radius: 88px;height: .88rem;line-height: .88rem;flex: 1;margin-left: .2rem;}
.link_p{color: #9E9E9E;font-size: .3rem;text-align: right;margin-top:-.2rem;margin-bottom: .5rem;}
.link_p a{color: #FD5751;}
.reg{background-image: linear-gradient(135deg, #FD944A 0%, #FD3D54 100%);border-radius: .44rem;text-align: center;height: .88rem;line-height: .88rem;color: #fff;font-size: .36rem;}
.welcome{width: 4.4rem;height: .7rem;margin-bottom: .6rem;}
.flex_between_v{height: .88rem;line-height: .88rem; margin-bottom: 1rem;}
.mar0{margin: 0;flex: 2;}
.del{width: .3rem;height: .3rem;}
.bom_p{color: #9E9E9E;font-size: .3rem;margin-top: .5rem;text-align: center;}
.bom_p a{color: #FD5751;}
.malef1{margin-left: .1rem !important;}
.con{padding: .4rem .5rem;background: #fff;height: 100%;}
</style>