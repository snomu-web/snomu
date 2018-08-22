<template>
	<div class="payment">
		<van-nav-bar title="支付密码" left-text="返回" left-arrow @click-left="onClickLeft"/>
		<div class="box">
			<div class="flex_between_v">
				<input type="text" class="code_int" v-model="code" placeholder="请输入验证码"/>
	            <p class="getcode" v-if="codeshow" @click="getCode">获取验证码</p>
	            <p class="getcode opt4" v-if="!codeshow">{{count}}s后获取</p>
			</div>
			<div class="int_div flex_between_v">
				<input type="text" v-model="passA" placeholder="请重新设置您的6-16位密码" v-if="showA"/>
				<input type="password" v-model="passA" placeholder="请重新设置您的6-16位密码" v-if="!showA"/>
				<img class="close" src="@/assets/icon_closeeyes@2x.png" v-if="!showA" @click="showA = true"/>
				<img class="open" src="@/assets/icon_openeyes@2x.png" v-if="showA" @click="showA = false"/>
			</div>
			<div class="int_div flex_between_v matop4">
				<input type="text" v-model="passB" placeholder="请再次输入您的密码" v-if="showB"/>
				<input type="password" v-model="passB" placeholder="请再次输入您的密码" v-if="!showB"/>
				<img class="close" src="@/assets/icon_closeeyes@2x.png" v-if="!showB" @click="showB = true"/>
				<img class="open" src="@/assets/icon_openeyes@2x.png" v-if="showB" @click="showB = false"/>
			</div>
			<div class="sub" @click="sub">
				保存
			</div>
		</div>
	</div>
</template>

<script>
	import { Toast } from 'vant'
	import qs from 'qs'
	export default {
		name: 'payment',
		data () {
			return {
				passA: '',
				passB: '',
				showA: false,
				showB: false,
				code:'',
				codeshow: true,					//显示获取
			 	count: '',						//倒计时
			 	timer: null,					//倒计时事件
			}
		},
		methods: {
			//返回
		    onClickLeft () {
		        this.$router.push({path:'/setmine'})
	       },
	       // 获取验证码
		    getCode () {
		        let that = this
		        that.$axios({
		      	  	url: '/api/app/appUser/getVerificationCodeByUserId',
		       		method: 'POST',
		        	data: qs.stringify({
		          		userId: localStorage.getItem('userId')
		        	})
		      	}).then(res => {
			        if (res.data.code == 0) {
			          	Toast('获取成功')
			          	that.codeGet()
			        } else {
			          	Toast(res.data.message)
			        }
		      	})
		    },
		    //倒计时
		    codeGet () {
		        const TIME_COUNT = 60
		        let that = this
		        that.count = TIME_COUNT
		        that.codeshow = false
		        that.timer = setInterval(() => {
		        if (that.count > 0 && that.count <= TIME_COUNT) {
		          	that.count--
		        } else {
		            that.codeshow = true
		            clearInterval(this.timer)
		            that.timer = null
		        }
		      }, 1000)
		    },
	       	//提交
		    sub () {
		    	let that = this
		    	let lengthA = that.passA.length
		    	let lengthB = that.passB.length
		    	if ((lengthA < 6 || lengthA >16) || (lengthB < 6 || lengthB >16)) {
	       			Toast('请输入6-16位密码')
	       			return false
	       		}
		        that.$axios({
		      	  	url: '/api/app/myTeamInfo/getMyTeamInfo',
		       		method: 'POST',
		        	data: qs.stringify({
		          		userId:localStorage.getItem('userId')
		        	})
		      	}).then(res => {
			        if (res.data.code == 0) {
			        	that.activateSum = res.data.data.activateSum
			        } else {
			          	Toast(res.data.msg)
			        }
		      	})
		    }
	    }
	}
</script>

<style scoped>
.payment{height: 100%;background: #fff;}
.box{margin: 0 .5rem;overflow: hidden;padding-top:.2rem;}
.code_int{border-radius: .44rem;border: 2px solid #D8D8D8;padding: .22rem .4rem;margin-right:.2rem; height: .88rem;height: .88rem;line-height: .88rem;box-sizing: border-box;}
.getcode{background: #FD5751;border-radius: .44rem;text-align: center;height: .88rem;line-height: .88rem;color: #fff;font-size: .3rem;width: 100%;}
.int_div{height: .88rem;border: 2px solid #D8D8D8;border-radius: .44rem;padding: 0 .4rem;margin-top: .4rem;}
.int_div input{border: 0;}
.close{width: .4rem;height: .2rem;}
.open{width: .4rem;height: .28rem;}
.sub{margin-top: 1rem; color: #FFFFFF;font-size:.36rem; background-image: linear-gradient(135deg, #FD944A 0%, #FD3D54 100%);border-radius: .44rem;height: .88rem;line-height: .88rem;text-align: center;}
</style>