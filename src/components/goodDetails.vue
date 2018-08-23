<template>
	<div class="goodDetails">
		<van-nav-bar title="商品详情" left-text="返回" left-arrow @click-left="onClickLeft" />
		<div class="goodimgs">
			<van-swipe :autoplay="3000">
			  <van-swipe-item v-for="(image, index) in images" :key="index">
			    <img src="image"/>
			  </van-swipe-item>
			</van-swipe>
		</div>
		<div class="goodhint">
			<p class="jiage">
				<span class="jiage-this">¥12</span>
				<span class="jiage-bq">明星产品</span>
				<span class="jiage-fl">分类</span>
			</p>
			<p class="name">卧龙辣条<span class="yun">运费:12元</span></p>
			<p class="jieshao">
				时空房间上克隆时代峰峻搜地方熟练度附近水电费健康了收到 地方是
			</p>
		</div>
		<div class="shuliang">
			<span class="sl-line number">
				购买数量:
			</span>
			<span class="sl-line surplus">
				剩余:1254
			</span>
			<span id="stepper">
				<van-stepper v-model="value" />
			</span>
		</div>
		<button class="btn">加入购物车</button>
	</div>
</template>

<script>
	import { Stepper } from 'vant';
	export default {
		name: "goodDetails",
		data() {
			return {
				images: [
			        'https://img.yzcdn.cn/1.jpg',
			        'https://img.yzcdn.cn/2.jpg'
			    ],
			    value: 1
			}
		},
		created() {
		},
		methods: {		
			onClickLeft() {
				history.go(-1)
			},
		}
	}
</script>

<style>
.goodDetails{
	width: 100%;
	height: 100%;
	background-color: #F5F5F5;
}
.goodimgs{
	width: 100%;
	height: 4.72rem;
	background-color: #FAFAFC;
	border: 1px solid #;
}
.goodhint{
	width: 100%;
	height: 2.4rem;
	background-color: #FFFFFF;
	padding: 0.32rem 0.3rem 0 0.3rem;
}
.jiage{
	width: 100%;
	height: 0.36rem;
	line-height: 0.36rem;
	margin-top: 0.32rem;
}
.jiage-this{
	margin-right: 0.28rem;
	font-size: 0.36rem;
	color: #FF5651;
}
.jiage-bq{
	height: 0.48rem;
	line-height: 0.48rem;
	background-color: #FF6D00 ;
	color: #FFFFFF;
	font-size: 0.2rem;
	border-radius: 0.24rem;
	display: inline-block;
	padding: 0 27px;
    position: relative;
    bottom: 0.06rem;
}
.jiage-fl{
	line-height: 0.36rem;
	float: right;
	font-size: 0.28rem;
	color: #9E9E9E;
}
.name{
	margin-top: 0.3rem;
	margin-bottom: 0.05rem;
	font-size: 0.3rem;
	color: #4A4A4A;
	text-align: left;
	height: 0.3rem;
	line-height: 0.3rem;
}
.yun{
	font-size: 0.26rem;
	float: right;
	color: #777777;
}
.jieshao{
	height: 0.72rem;
	line-height: 0.36rem;
	color: #777777;
	font-size: 0.26rem;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
	overflow: hidden;
}
.shuliang{
	height: 1rem;
	background-color:#FFFFFF ;
	margin-top: 0.16rem;
	font-size: 0.36rem;
	color: #777777;
	padding-left: 0.3rem;
}

.sl-line{
	height: 1rem;
	line-height: 1rem;
	color: #777777;
}
.number{
	font-size: 0.26rem;
	
}
.surplus{
	font-size: 0.24rem;
}
#stepper{
	width: 1.8rem;
	height: 0.48rem;
	float: right;
    position: relative;
    top: 50%;
    margin-top: -0.24rem;
}
/*步进器组件*/
/*.van-stepper__minus, .van-stepper__plus{
	width: 0.48rem!important;
	height: 0.48rem!important;
}
.van-stepper__input{
	width: 0.48rem!important;
	height: 0.48rem!important;
	font-size: 0.28rem!important;
}
.van-stepper{
	width: 1.8rem!important;
	height: 0.48rem!important;
}*/
.btn{
	width: 6.9rem;
	height: 0.88rem;
	color: #FFFFFF;
	line-height: 0.88rem;
	border: none;
	text-align: center;
	color: 0.32rem;
	border-radius: 0.44rem;
	background:linear-gradient(to right, #FD944A, #FD3D54) ;
	position: fixed;
	left: 50%;
	margin-left: -3.45rem;
	bottom: 0.6rem;
}
</style>