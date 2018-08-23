<template>
	<div class="edit">
		<van-nav-bar title="修改资料" left-text="返回" left-arrow @click-left="onClickLeft"/>
		<div class="flex_between_v">
			<p class="to_p">姓名</p>
			<input type="text" v-model="name" placeholder="请输入您的姓名"/>
		</div>
		<div class="flex_between_v">
			<p>性别</p>
			<div class="sex">
				<p @click="sex = 0" :class="{ addbor: !sex }">男</p>
				<p @click="sex = 1" :class="{ addbor: sex }">女</p>
			</div>
		</div>
		<div class="flex_between_v">
			<p class="to_p">身份证</p>
			<input type="text" v-model="idCard" placeholder="请输入您的身份证号码"/>
		</div>
		<div class="flex_between_v">
			<p class="to_p">开户银行</p>
			<input type="text" v-model="openBank" placeholder="请输入开户行银行名称"/>
		</div>
		<div class="flex_between_v">
			<p class="to_p">开户支行</p>
			<input type="text" v-model="subBank" placeholder="请输入开户行支行名称"/>
		</div>
		<div class="flex_between_v">
			<p class="to_p">银行卡号</p>
			<input type="text" v-model="bankId" placeholder="请输入您的银行名称"/>
		</div>
		<div class="bom_div">
			<div class="add" @click="sub">
				保存
			</div>		
		</div>
	</div>
</template>

<script>
	import { Toast } from 'vant'
	import qs from 'qs'
	export default{
		name: 'edit',
		data () {
			return {
				name: '',
				sex: 0,				//选择性别 0男 1女
				idCard: '',			//身份证号
				openBank: '',		//开户支行
				subBank: '',		//开户行
				bankId: ''			//银行卡号
			}
		},
		created () {
			this.get()
		},
		methods: {
			//返回
		    onClickLeft () {
		        this.$router.push({path:'/peodata'})
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
			    		that.name = res.data.data.name
			    		that.sex = res.data.data.sex
			    		that.idCard = res.data.data.idCard
			    		that.openBank = res.data.data.openBank
			    		that.subBank = res.data.data.subBank
			    		that.bankId = res.data.data.bankId
			    	}else{
			    		Toast(res.data.msg)		    		
			    	}
			    })
	       	},
	       	//保存
	       	sub () {
	       		let that = this
				that.$axios({
			        url: '/api/app/userInfo/update',
			        method: 'POST',
			        data: qs.stringify({
			        	userId: localStorage.getItem('userId'),
			        	name: that.name,
			        	sex: that.sex,
			        	idCard: that.idCard,
			        	openBank: that.openBank,
			        	subBank: that.subBank,
			        	bankId: that.bankId
			        })
			    }).then(res => {
			    	if(res.data.code == 0){
			    		Toast(res.data.msg)
			    		that.$router.push({path:'/peodata'})
			    	}else{
			    		Toast(res.data.msg)		    		
			    	}
			    })
	       	},
		}
	}
</script>

<style scoped>
.flex_between_v{color: #4A4A4A;font-size: .32rem;background: #fff;margin-bottom: .1rem;padding: 0 .4rem;height: 1rem;}
p{color: #4A4A4A;font-size: .32rem;width: 1.6rem;margin-right: .2rem;}
input{border: 0;font-size: .32rem;flex: 1;}
.sex{display: flex;flex: 1;}
.sex p{color: #9E9E9E;font-size: .32rem;width: 1.36rem;height: .6rem;text-align: center;line-height: .6rem;border: 2px solid #fff}
.addbor{border: 2px solid #FF5651 !important;border-radius: 12px;color: #FF5651;}
.bom_div{position: fixed;left: 0; bottom: 0;width: 100%;padding: .4rem 0;}
.add{display: block; background-image: linear-gradient(135deg, #FD944A 0%, #FD3D54 100%);border-radius: 126px;height: .88rem;line-height: .88rem;text-align: center;color: #fff;margin: 0 .3rem;font-size: .36rem;}
</style>