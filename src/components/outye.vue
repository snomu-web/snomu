<template>
	<div class="outye">
		<van-nav-bar title="余额转出" left-text="返回" left-arrow @click-left="onClickLeft"/>
		<div class="top">
			<p class="top_p">请输入转出金额</p>
			<input type="number" v-model="num" class="num" placeholder="请输入您要转出的金额"/>
		</div>
		<div class="flex_between_v">
			<p class="p1">当前可用余额(元）：{{ sum }}</p>
			<p class="p2" @click="all">全部转换</p>
		</div>
		<div class="bom">
			<div class="sub">
				转出
			</div>			
		</div>
	</div>
</template>

<script>
	export default({
		name: 'outye',
		data () {
			return {
				num: '',
				sum: 10000
			}
		},
		methods: {
			//返回
		    onClickLeft () {
		        this.$router.push({path:'/turnou'})
	       	},
	       	//全部转换
	       	all () {
	       		this.num = this.sum
	       	}
		}
	})
</script>

<style scoped>
.top{background: #F7FAFD;height: 2.4rem;padding: 0 .48rem;overflow: hidden;}
.top_p{font-size: .32rem;color: #222222;margin-top: .48rem;margin-bottom: .48rem;}
.num{border: 0;font-size: .4rem;background: #F7FAFD;}
.flex_between_v{margin: .24rem 0 .4rem 0;padding: 0 .48rem;}
.p1{color: #777777;}
.p2{color: #FF5651;}
.bom{padding: 0 .48rem;}
.sub{background-image: linear-gradient(135deg, #FD944A 0%, #FD3D54 100%);border-radius: 63px;font-size: .32rem;color: #FFFFFF;}
</style>