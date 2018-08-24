<template>
	<div class="shopcar">
		<van-nav-bar
		  title="退货单"
		  left-text="返回"
		  left-arrow
		  @click-left="onClickLeft"
		/>
		<!--<div class="shopcar-no">
			<van-nav-bar title="购物车"/>
			<img class="shopcar-no-img" src="@/assets/zwpic@2x.png"/>
			<p>您还未在平台购买过商品～</p>
		</div>-->
		<div class="commodity" v-for="data in datas">
			<div class="commodity-order">
				<span id="com-ord-num">
					订单号:{{data.orderNo}}
				</span>
				<span id="com-ord-sj">
					{{data.orderTime}}
				</span>
			</div>
			<div class="commodity-wuliu">
				<span id="com-wl-num">
					物流单号:{{data.returnExpressNo}}
				</span>				
				<span id="com-wl-sj" v-if="data.status == 0">未支付</span>
				<span id="com-wl-sj" v-if="data.status == 1">已支付(待发货)</span>
				<span id="com-wl-sj" v-if="data.status == 2">已发货</span>
				<span id="com-wl-sj" v-if="data.status == 3">已收货</span>
				<span id="com-wl-sj" v-if="data.status == 4">退货中</span>
				<span id="com-wl-sj" v-if="data.status == 5">退货完成</span>
			</div>			
			<div class="commodity-details" v-for="a in data.orderDetail">
				<img src="../assets/fdicon@2x.png"/>
				<div class="commodity-details-right">
					<p class="comname">{{a.itemName}}</p>
					<p class="com-del-hint">{{a.itemDescribe}}</p>
					<p class="com-del-bq"><span class="com-del-bq-left">¥{{a.payPrice}}元</span><span class="com-del-bq-yf">{{a.postage}}元</span></p>
					
				</div>
			</div>
		</div>
	</div>
	
</template>

<script>
	import { NavBar } from 'vant';
	import { Stepper } from 'vant';
	import { SubmitBar } from 'vant';
	import { Checkbox, CheckboxGroup } from 'vant';
	import qs from 'qs';
	export default({
		data(){
			return{
				value: 1,
				datas:[],
			}
		},
		
		name: 'shopcar',
		created() {
			this.tuihuo()
		},
		methods: {
		    onClickLeft() {
		    	history.go(-1)
		    },
//		    退货订单查询
		    tuihuo(){
		    	this.$axios({
			        url: '/api/app/orders/queryReturnOrder',
			        method: 'POST',
			        data: qs.stringify({
			          	userId: localStorage.getItem('userId'),
			        })
			      }).then(res => {
			        if (res.data.code == 0) {
			        	this.datas = res.data.data
			        } else {
			          	Toast(res.data.msg || '查询失败')
			        }
			      })
		    }
		}
	})
</script>

<style scoped>
.shopcar{
	width: 100%;
	height: 100%;
	background-color: #F5F5F5;
}
.comname{
	font-size: 0.28rem;
color: #000000;
}
/*商品列表*/
.commodity{
	width: 100%;
	margin: 0 auto;
	background-color: #FFFFFF;
	margin-top: 0.2rem;
}
.commodity-order{
	height: 0.82rem;
	line-height: 0.82rem;
	font-size: 0.28rem;
	color: #000000;
	border-bottom: 1px solid #F7F2F2;
	padding: 0 0.3rem;
}
#com-ord-num{
	font-size: 0.28rem;
color: #000000;
}
#com-ord-sj{
	float: right;
	font-size: 0.28rem;
color: #777777;
}
.commodity-wuliu{
	height: 0.68rem;
	line-height: 0.68rem;
	font-size: 0.24rem;
	padding: 0 0.3rem;
}
#com-wl-num{
	font-size: 0.26rem;
	color: #4A4A4A;
}
#com-wl-sj{
	float: right;
	font-size: 0.26rem;
	color: #777777;
	
}
.commodity-details{
	width: 100%;
	height: 1.76rem;
	padding: 0 0.3rem;
	margin-bottom: 0.2rem;
}
.commodity-details img{
	width: 2.22rem;
	height: 1.756rem;
	margin-left: 0.28rem;
	
}
.commodity-details-right{
	width: 3.62rem;
	height: 1.76rem;
	float: right;
}
.com-del-hint{
	height: 0.64rem;
	font-size: 0.24rem;
	color: #777777;
	line-height: 0.32rem;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
	overflow: hidden;
	margin-top: 0.14rem;
}
.com-del-bq{
	height: 0.4rem;
	line-height: 0.4rem;
}
.com-del-bq-left{
	font-size: 0.24;
	color: #FF6D00;
	
}
.com-del-bq-yf{
	font-size: 0.24rem;
	color: #9E9E9E;
	float: right;
}
.com-del-num{
	height: 0.48rem;
	line-height: 0.48rem;
}
.danjia{
	font-size: 0.28rem;
	color: #FF5651;
	line-height: 14px;
}
#stepper{
	width: 1.8rem;
	height: 0.48rem;
	float: right;
    position: relative;
    top: 50%;
    margin-top: -0.24rem;
}
.tijiao{
	width: 100%;
	height: 1.2rem;
	line-height: 1.2rem;
	background-color: #FFFFFF;
	position: fixed;
	bottom: 1rem;
}
/*无商品*/
.shopcar-no{text-align: center;font-size: .3rem;color: #888888;height: 100%;background: #fff;}
.shopcar-no-img{margin-top: 1.4rem}
</style>