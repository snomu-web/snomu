<template>
	<div class="goodDetails">
		<van-nav-bar title="商品详情" left-text="返回" left-arrow @click-left="onClickLeft" />
		<div class="goodimgs">
			<van-swipe :autoplay="3000">
			  <van-swipe-item v-for="(image, index) in images" :key="index">
			    <img :src="image"/>
			  </van-swipe-item>
			</van-swipe>
		</div>
		<div class="goodhint">
			<p class="jiage">
				<span class="jiage-this">¥{{data.price}}</span>
				<span class="jiage-bq">{{data.itemTag}}</span>
				<span class="jiage-fl">{{data.itemTypeName}}</span>
			</p>
			<p class="name">{{data.itemName}}<span class="yun">运费:{{data.freightCharge}}元</span></p>
			<p class="jieshao">
				{{data.itemDescribe}}
			</p>
		</div>
		<div class="shuliang">
			<span class="sl-line number">
				购买数量:
			</span>
			<span class="sl-line surplus">
				剩余:{{data.storeNum}}
			</span>
			<span id="stepper">
				<van-stepper v-model="value" />
			</span>
		</div>
		<button class="btn" @click="addCart">加入购物车</button>
	</div>
</template>

<script>
	import { Stepper } from 'vant';
	import { Toast } from 'vant';
	import qs from 'qs';
	export default {
		name: "goodDetails",
		data() {
			return {
				images: [],
			    value: 1,
			    data:{},

			}
		},
		created() {
			this.stgoods()
		},
		methods: {		
			onClickLeft() {
				history.go(-1)
			},
			stgoods(){
				var newsID=this.$route.query.id;
				this.$axios({
			        url: '/api/app/item/queryItemByOne',
			        method: 'POST',
			        data: qs.stringify({
			          id:newsID
			        })
			      }).then(res => {
			        if (res.data.code == 0) {
			        	this.data = res.data.data	
			        	let itemUrlNew = this.data.itemUrlNew
			        	let arr = itemUrlNew.split(",")
			        	this.images = arr
//						for (var i = 0; i<arr.length; i++; ){	
//						    images.push(arr[i]);
//						}
			        } else {
			          Toast(res.data.msg || '查询失败')
			        }
			      })
			},
			addCart(){
				var newsID=this.$route.query.id;
				let that = this
				this.$axios({
			        url: '/api/app/shoppingcart/addCart',
			        method: 'POST',
			        data: qs.stringify({
			        	userId:localStorage.getItem('userId'),		        	
			          	itemId:newsID,
			          	price:that.data.price,
			          	freightChrge:that.data.freightCharge,
			          	amount:that.value,
			        })
			      }).then(res => {
			        if (res.data.code == 0) {
			        	Toast(res.data.msg)
			        } else {
			          Toast(res.data.msg || '查询失败')
			        }
			      })
			},
		}
	}
</script>

<style>
	/*轮播图组件*/
	.van-swipe{
		height: 100%;
	}
	.van-swipe-item img{
		width: 100%;
		height: 100%;
	}
/*=============*/
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
	position: relative;
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
	    position: absolute;
    /* right: -126px; */
    right: 2.21rem;
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