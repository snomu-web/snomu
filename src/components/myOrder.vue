<template>
	<div class="shopcar">
		<van-nav-bar
		  title="我的订单"
		  left-text="返回"
		  right-text="退货单"
		  left-arrow
		  @click-left="onClickLeft"
		  @click-right="onClickRight"
		/>
		<!--<div class="shopcar-no">
			<van-nav-bar title="购物车"/>
			<img class="shopcar-no-img" src="@/assets/zwpic@2x.png"/>
			<p>您还未在平台购买过商品～</p>
		</div>-->
		<div class="commodity">
			<div class="commodity-name">
				<van-checkbox v-model="danChecked">卫龙辣条</van-checkbox><span class="delete">删除</span>
			</div>
			<div class="commodity-details">
				<img src="../assets/fdicon@2x.png"/>
				<div class="commodity-details-right">
					<p class="com-del-hint">师德师风东方闪电第三方士大夫 饭搜地方搜地方发送到地方胜多负少的水电费水电费发送到饭搜地方搜地方搜地方沙发斯蒂芬 收到</p>
					<p class="com-del-bq"><span class="com-del-bq-left">明星产品</span><span class="com-del-bq-yf">568元</span></p>
					<p class="com-del-num">
						<span class="danjia">¥12</span>
						<span id="stepper">
							<van-stepper v-model="value" />
						</span>
					</p>
				</div>
			</div>
		</div>
		<div class="tijiao">
			<van-submit-bar :price="3050" button-text="结算" @submit="onSubmit">
			  <van-checkbox v-model="checked">全选</van-checkbox>
			</van-submit-bar>
		</div>
	</div>
	
</template>

<script>
	import { NavBar } from 'vant';
	import { Stepper } from 'vant';
	import { SubmitBar } from 'vant';
	import { Checkbox, CheckboxGroup } from 'vant';
	export default({
		data(){
			return{
				value: 1,
				danChecked:true,
				checked: true
			}
		},
		
		name: 'shopcar',
		methods: {
		    onClickLeft() {
		    	history.go(-1)
		    },
		    onClickRight() {
		      	Toast('我的订单');
		      	this.$router.push({path:'/myOrder'})
		    },
		    onSubmit(){
		    	
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
.dizhi{
	box-sizing: border-box;
	padding: 0 0.3rem;
	width: 7.1rem;
	height: 2rem;
	background-color: #FFFFFF;
	margin: 0 auto;
	margin-top: 0.2rem;
	padding-top: 0.15rem;
}
.dizhi-one{
	height: 0.58rem;
	line-height: 0.58rem;
	font-size: 0.28rem;
	color: #4A4A4A;
	letter-spacing: 0;
}
.dizhi-gr{
	height: 0.58rem;
	line-height: 0.58rem;
}
.dizhi-gr-line{
	height: 0.58rem;
	line-height: 0.58rem;
	font-size: 0.28rem;
	color: #000000;
	letter-spacing: 0;
	position: relative;
}
.dizhi-gr-name{
	
}
.dizhi-gr-name img{
	width: 0.22rem;
	height: 0.3rem;
	margin-right: 0.1rem;
	position: relative;
    top: 0.05rem;
}
.dizhi-gr-tel{
	position: relative;
	left: 1.5rem;
	
}
.dizhi-gr-tel img{
	width: 0.22rem;
	height: 0.3rem;
	margin-right: 0.1rem;
	position: relative;
    top: 0.05rem;
}
.dizhi-gr-next{
	float: right;
}
.dizhi-sh{
	height: 0.54rem;
	line-height: 0.54rem;
	font-size: 0.24rem;
	color: #4A4A4A;
}
/*商品列表*/
.commodity{
	width: 7.1rem;
	height: 2.8rem;
	margin: 0 auto;
	background-color: #FFFFFF;
	margin-top: 0.2rem;
}
.commodity-name{
	padding: 0 0.2rem;
	height: 0.84rem;
	line-height: 0.84rem;
}
#radio{
	width: 0.32rem;
	height: 0.32rem;
	color: #FFFFFF;
	background-color: #FFFFFF!important;
}
#radio :hover{
}
.this-name{
	font-size: 0.28rem;
	color: #000000;
}
.delete{
	float: right;
	font-size: 0.24rem;
	color: #9E9E9E;
	position: relative;
    bottom: 0.88rem;
}
.commodity-details{
	width: 100%;
	height: 1.76rem;
	padding: 0 0.2rem;
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
	position: relative;
    right: -40px;
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