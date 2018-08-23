<template>
	<div class="change">
		<van-nav-bar title="忘记密码" left-text="返回" left-arrow @click-left="onClickLeft"/>
		<div class="con">
			<div class="int_fle">
				<img src="@/assets/icon_mima@2x.png"/>
				<input type="password" v-if="showA == 1" v-model="passwordA" placeholder="请重新设置您的6-16位密码"/>
				<input type="text" v-if="showA == 0" v-model="passwordA" placeholder="请重新设置您的6-16位密码"/>
				<img src="@/assets/icon_closeeyes@2x.png" v-if="showA == 1" @click="showA = 0"/>
				<img src="@/assets/icon_openeyes@2x.png" v-if="showA == 0" @click="showA = 1"/>
			</div>
			<div class="int_fle">
				<img src="@/assets/icon_mima@2x.png"/>
				<input type="password" v-if="showB == 1" v-model="passwordB" placeholder="请再次输入您的密码"/>
				<input type="text" v-if="showB == 0" v-model="passwordB" placeholder="请再次输入您的密码"/>
				<img src="@/assets/icon_closeeyes@2x.png" v-if="showB == 1" @click="showB = 0"/>
				<img src="@/assets/icon_openeyes@2x.png" v-if="showB == 0" @click="showB = 1"/>
			</div>
			<div class="reg" v-if="passwordA && passwordB" @click="logClick">
				保存
			</div>
			<div class="reg opt5" v-else>
				保存
			</div>			
		</div>
	</div>
</template>

<script>
	import { Toast } from 'vant'
	import qs from 'qs'
	export default{
		name: 'change',
		data () {
			return {
				passwordA: '',
				showA: 0 || 1,
				passwordB: '',
				showB: 0 || 1,
			}
		},
		methods: {
			//返回
		    onClickLeft () {
		        history.go(-1)
	       	},
		    //保存
		    logClick () {
		    	let that = this
		    	if ( that.passwordA.length < 6 || that.passwordA.length > 16) {
		    		Toast('请设置6-16位密码')
		    		return false
		    	}
		    	if (that.passwordA != that.passwordB) {
		    		Toast('两次密码输入不一致')
		    		return false
		    	}
		        that.$axios({
		      	  	url: '/api/app/user/updatePwd',
		       		method: 'POST',
		        	data: qs.stringify({
		          		userName: localStorage.getItem('userName'),
		          		pwd: that.passwordA
		        	})
		      	}).then(res => {
			        if (res.data.code == 0) {
			        	Toast(res.data.msg)
			        	that.$router.push({path:'/home'})
			        } else {
			          	Toast(res.data.msg)
			        }
		      	})
		    }
		}
	}
</script>

<style scoped>
.change{height: 100%;}
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