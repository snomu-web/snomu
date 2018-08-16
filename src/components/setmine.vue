<template>
	<div class="setmine">
		<van-nav-bar title="设置" left-text="返回" left-arrow @click-left="onClickLeft"/>
		<router-link to='/about' class="flex_between_v list_div">
			关于我们
			<img src="@/assets/commone_btn_in@2x.png" class="right_img"/>
		</router-link>
		<router-link to='/revise' class="flex_between_v list_div">
			修改密码
			<img src="@/assets/commone_btn_in@2x.png" class="right_img"/>
		</router-link>
		<router-link to='/payment' class="flex_between_v list_div">
			支付密码
			<img src="@/assets/commone_btn_in@2x.png" class="right_img"/>
		</router-link>
		<div class="bom">
			<div class="exid" @click="exidpop">
				退出登录
			</div>			
		</div>
	</div>
</template>

<script>
	export default {
		name: 'setmine',
		data () {
			return {
				
			}
		},
		methods: {
			//返回
		    onClickLeft () {
		        this.$router.push({path:'/mine'})
	       },
	       //退出弹窗
	       exidpop () {
	       		this.$dialog.alert({
			  		message: '您是否要退出登录？',
			  		showCancelButton: true,
			  		closeOnClickOverlay: true,
				}).then(() => {
			  		
				})
	       }
	    },
	}
</script>

<style scoped>
.list_div{background: #fff;color: #4A4A4A;font-size: .32rem;padding: .34rem .4rem;margin-bottom: .16rem;}
.right_img{width: .4rem; height: .4rem;}
.bom{position: absolute;bottom: 1.2rem;width: 100%;}
.exid{background: #D8D8D8;border-radius: 100px;margin: 0 .3rem;height: .88rem;line-height: .88rem;text-align: center;color: #777777;font-size: .32rem;}
</style>