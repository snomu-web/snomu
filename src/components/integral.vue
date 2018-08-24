<template>
	<div class="IntegralDealList">
		<van-nav-bar title="积分"/>
    	<div class="list">
    		<!--<div class="every">
    			<p class="money">1000000<span>元&#12288尊享版</span></p>
    			<div class="yield">
    				<div class="yield-js">
    					手动加哦哦哦哦都是对方搜地方地方色东方色东方 饭扫飞机搜房
    				</div>
    				<div class="detail" @click="goDetails">
    					查看详情
    				</div>
    			</div>
    		</div>-->
    		<div class="box">
    			<img src="@/assets/wpic@2x.png"/>
    			<p>购买积分请联系管理员</p>
    		</div>
    	</div>
	</div>
</template>
<script>
import { Toast } from 'vant'
import qs from 'qs'
export default {
  name: 'Integral',
  data() {
    return {
     
    }
  },
  mounted() {
    
  },
  computed: {},
  methods: {
    goDetails(){
    	this.$router.push({path:'/packageDetails'})
    }
  }
}
</script>
<style scoped="scoped">
	.list{
		height: 100%;
	}
	.box{
		font-size: .36rem;
		color: #4A4A4A;
		text-align: center;
		height: 100%;
		background: #fff;
		padding-top: 2rem;
	}
	.IntegralDealList{
		width: 100%;
		height: 100%;
		color: #FFFFFF;
	}
	.every{
		width: 6.9rem;
		height: 3rem;
		background: url(../assets/bg_jifen@2x.png);
		background-size:100% 100%;
		margin: 0 auto;
		margin-top: 30px;
	}
	.money{
		height: 1.44rem;
		line-height: 1.44rem;
		display: inline-block;
		font-size: 0.6rem;
		margin-left: 0.4rem;
	}
	.money span{
		font-size: 0.36rem;
	}
	.yield{
		width: 100%;
		height: 3.4rem;
	}
	.yield-js{
		width: 3.4rem;
		height: 1.04rem;
		line-height: 0.52rem;
		float: left;
		margin-left: 0.4rem;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
	}
	.detail{
		
		width: 2rem;
		height: 0.72rem;
		line-height: 0.72rem;
		text-align: center;
		background-color: #FFF6E8;
		border-radius: 0.36rem;
		color: #FF5651;
		float: left;
		position: relative;
		left: 0.8rem;
	}
</style>