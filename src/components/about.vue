<template>
	<div class="about">
		<van-nav-bar title="关于" left-text="返回" left-arrow @click-left="onClickLeft"/>
		<div class="box">
			<img class="img" src="@/assets/甲@2x.png"/>
			<p class="lev">甲乙丙1.1版本</p>
			<p class="con">甲乙丙以人为中心，想人之所想，为人民服务，一切为了人民。所以我们只要有缺点，就不怕别人批评指出。不管是什么人谁向我们指出都行。只要你说得对，我们就改正。</p>			
		</div>
	</div>
</template>

<script>
	export default {
		name: 'about',
		data () {
			return {
				
			}
		},
		methods: {
			//返回
		    onClickLeft () {
		        this.$router.push({path:'/setmine'})
	        }
	    }
	}
</script>

<style scoped>
.about{height: 100%;background: #fff;}
.box{padding: 0 .68rem;height: 100%;overflow: hidden;}
.img{width: 1.4rem;height: 3rem;text-align: center;margin: 1.86rem auto 1.7rem auto;display: block;}
.lev{color: #333333;font-size: .4rem;text-align: center;margin-bottom: .4rem;}
.con{color: #8D8D8D;}
</style>