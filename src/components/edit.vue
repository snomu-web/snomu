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
				<p @click="sexed = 0" :class="{ addbor: !sexed }">男</p>
				<p @click="sexed = 1" :class="{ addbor: sexed }">女</p>
			</div>
		</div>
		<div class="flex_between_v">
			<p class="to_p">身份证</p>
			<input type="text" v-model="carId" placeholder="请输入您的身份证号码"/>
		</div>
		<div class="flex_between_v">
			<p class="to_p">开户银行</p>
			<input type="text" v-model="bank" placeholder="请输入开户行银行名称"/>
		</div>
		<div class="flex_between_v">
			<p class="to_p">开户支行</p>
			<input type="text" v-model="branch" placeholder="请输入开户行支行名称"/>
		</div>
		<div class="flex_between_v">
			<p class="to_p">银行卡号</p>
			<input type="text" v-model="number" placeholder="请输入您的银行名称"/>
		</div>
		<div class="bom_div">
			<div class="add">
				保存
			</div>		
		</div>
	</div>
</template>

<script>
	export default{
		name: 'edit',
		data () {
			return {
				name: '',
				sexed: 0,				//选择性别 0男 1女
				carId: '',
				bank: '',
				branch: '',
				number: ''
			}
		},
		methods: {
			//返回
		    onClickLeft () {
		        this.$router.push({path:'/peodata'})
	        }
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