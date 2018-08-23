<template>
	<div class="peodata">
		<van-nav-bar title="个人资料" left-text="返回" left-arrow @click-left="onClickLeft"/>
		<div class="top">
			<img class="top_img" v-if="!headUrl" src="@/assets/pic_datouxiang@3x.png"/>
			<img class="top_img" v-else :src="headUrl"/>
		</div>
		<div class="flex_between_v">
			<p>手机号</p>
			<p class="texrgh">{{ userName }}</p>
		</div>
		<div class="flex_between_v">
			<p>姓名</p>
			<p class="texrgh">{{ name }}</p>
		</div>
		<div class="flex_between_v">
			<p>性别</p>
			<p class="texrgh" v-if='sex == 0'>男</p>
			<p class="texrgh" v-if='sex == 1'>女</p>
		</div>
		<div class="flex_between_v">
			<p>身份证</p>
			<p class="texrgh">{{ idCard }}</p>
		</div>
		<div class="flex_between_v">
			<p>银行卡</p>
			<p class="texrgh">{{ bankId }}</p>
		</div>
		<div class="bom_div">
			<router-link to='/edit' class="add">
				修改资料
			</router-link>		
		</div>
	</div>
</template>

<script>
	import { Toast } from 'vant'
	import qs from 'qs'
	export default{
		name: 'peodata',
		data () {
			return {
				headUrl: '',						//图片
				userName: '111111',					//手机号
				name: '11',							//姓名
				sex: '1',							//性别 0男 1女
				idCard: '111111',					//身份证
				bankId: '111111',					//银行卡
			}
		},
		created () {
			this.get()
		},
		methods: {
			//返回
		    onClickLeft () {
		        this.$router.push({path:'/mine'})
	        },
	       	//获取个人信息
	       	get () {
	       		let that = this
				that.$axios({
			        url: '/api/app/userInfo/queryOneByName',
			        method: 'POST',
			        data: qs.stringify({
			        	userId: localStorage.getItem('userId')
			        })
			    }).then(res => {
			    	if(res.data.code == 0){
			    		that.headUrl = res.data.data.headUrl
			    		that.userName = res.data.data.userName
			    		that.name = res.data.data.name
			    		that.sex = res.data.data.sex
			    		that.idCard = res.data.data.idCard
			    		that.bankId = res.data.data.bankId
			    	}else{
			    		Toast(res.data.msg)		    		
			    	}
			    })
	       	}
		}
	}
</script>

<style scoped>
.top{width: 100%;height: 2.4rem;}
.top_img{width: 100%;height: 100%;}
.flex_between_v{color: #4A4A4A;font-size: .32rem;background: #fff;margin-bottom: .1rem;padding: 0 .4rem;height: 1rem;}
.texrgh{text-align: right;}
.bom_div{position: fixed;left: 0; bottom: 0;width: 100%;padding: .4rem 0;}
.add{display: block; background:#D8D8D8; border-radius: 126px;height: .88rem;line-height: .88rem;text-align: center;color: #777777;margin: 0 .3rem;font-size: .32rem;}
</style>