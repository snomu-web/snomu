<template>
	<div class="detail">
		<van-nav-bar title="账单明细" left-text="返回" left-arrow @click-left="onClickLeft"/>
		<div class="box">
			<div class="flex_between_v top">
				<p class="til_p1">水果便利店</p>
				<p class="til_p2">-1500</p>
			</div>
			<div class="flex_between">
				<p class="con_p1">扣款详情：</p>
				<div class="">
					<p class="con_p2">购物积分 <span>-500</span></p>
					<p class="con_p2">提现积分 <span>-500</span></p>
					<p class="con_p2">余额 <span>-500</span></p>
				</div>
			</div>
			<div class="bom">
				<div class="flex_between_v">
					<p class="bom_p1">分类：</p>
					<p class="bom_p2">消费</p>
				</div>
				<div class="flex_between_v">
					<p class="bom_p1">创建时间：</p>
					<p class="bom_p2">04.23  18:10</p>
				</div>
				<div class="flex_between_v">
					<p class="bom_p1">订单号：</p>
					<p class="bom_p2">XXXXXXXXXXXXX</p>
				</div>
				<div class="flex_between_v">
					<p class="bom_p1">支持货币种类：</p>
					<p class="bom_p2">购物积分&提现积分&余额</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		name: 'detail',
		data () {
			return {
				
			}
		},
		methods: {
			//返回
		    onClickLeft () {
		        this.$router.push({path:'/bill'})
	        }
		}
	}
</script>

<style scoped>
.box{padding: .4rem;background: #fff;}
.top{padding-bottom: .4rem;border-bottom: 2px dashed #E5E5E5;}
.til_p1{font-size: .36rem;color: #222222;}
.til_p2{font-size: .36rem;color: #00AF61;}
.flex_between{padding: .4rem 0;border-bottom: 2px dashed #E5E5E5;}
.con_p1{font-size: .32rem;color: #555555;}
.con_p2{font-size: .32rem;color: #000000;margin-bottom: .3rem;text-align: right;}
.con_p2 span{color: #00AF61;}
.con_p2:last-child{margin: 0;}
.bom{padding: .4rem 0;}
.bom .flex_between_v{margin-bottom: .2rem;}
.bom .flex_between_v:last-child{margin: 0;}
.bom_p1{font-size: .32rem;color: #555555;}
.bom_p2{font-size: .32rem;color: #000000;text-align: right;}
</style>