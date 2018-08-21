<template>
	<div class="peodata">
		<van-nav-bar title="个人资料" left-text="返回" left-arrow @click-left="onClickLeft"/>
		<div class="top">
			<img class="top_img" src="@/assets/pic_datouxiang@3x.png"/>
		</div>
		<div class="flex_between_v">
			<p>手机号</p>
			<p class="texrgh">13654641432</p>
		</div>
		<div class="flex_between_v">
			<p>姓名</p>
			<p class="texrgh">mrs.zhang</p>
		</div>
		<div class="flex_between_v">
			<p>性别</p>
			<p class="texrgh">女</p>
		</div>
		<div class="flex_between_v">
			<p>身份证</p>
			<p class="texrgh">332029199304021832</p>
		</div>
		<div class="flex_between_v">
			<p>银行卡</p>
			<p class="texrgh">未填写</p>
		</div>
		<div class="bom_div">
			<router-link to='/edit' class="add">
				修改资料
			</router-link>		
		</div>
	</div>
</template>

<script>
	export default{
		name: 'peodata',
		data () {
			return {
				
			}
		},
		methods: {
			//返回
		    onClickLeft () {
		        this.$router.push({path:'/mine'})
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