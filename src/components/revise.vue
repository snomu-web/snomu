<template>
	<div class="revise">
		<van-nav-bar title="密码修改" left-text="返回" left-arrow @click-left="onClickLeft"/>
		<div class="box">			
			<div class="int_div flex_between_v">
				<input type="text" v-model="passA" placeholder="请输入您想设置的支付密码" v-if="showA"/>
				<input type="password" v-model="passA" placeholder="请输入您想设置的支付密码" v-if="!showA"/>
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
				提交
			</div>
		</div>
	</div>
</template>

<script>
	import { Toast } from 'vant'
	import qs from 'qs'
	export default {
		name: 'revise',
		data () {
			return {
				passA: '',
				passB: '',
				showA: false,
				showB: false,
			}
		},
		methods: {
			//返回
		    onClickLeft () {
		        this.$router.push({path:'/setmine'})
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
.revise{height: 100%;background: #fff;}
.box{margin: 0 .5rem;overflow: hidden;}
.int_div{height: .88rem;border: 2px solid #D8D8D8;border-radius: .44rem;padding: 0 .4rem;margin-top: .4rem;}
.int_div input{border: 0;}
.close{width: .4rem;height: .2rem;}
.open{width: .4rem;height: .28rem;}
.sub{margin-top: 1rem; color: #FFFFFF;font-size:.36rem; background-image: linear-gradient(135deg, #FD944A 0%, #FD3D54 100%);border-radius: .44rem;height: .88rem;line-height: .88rem;text-align: center;}
</style>