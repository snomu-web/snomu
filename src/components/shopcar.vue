<template>
	<div class="shopcar">
		<van-nav-bar
		  title="购物车"
		  right-text="我的订单"
		  @click-right="onClickRight"
		/>
		<!--<div class="shopcar-no">
			<van-nav-bar title="购物车"/>
			<img class="shopcar-no-img" src="@/assets/zwpic@2x.png"/>
			<p>您还未在平台购买过商品～</p>
		</div>-->
		<div class="box">
			<div class="dizhi" v-for="(item, index) in addrelist" :key='index' v-if="item.isDefault == 1">
				<p class="dizhi-one">配送信息:</p>
				<p class="dizhi-gr">
					<span id="" class="dizhi-gr-line dizhi-gr-name">
						<img src="@/assets/icon_people@2x.png"/>
						{{ item.name }}
					</span>
					<span id="" class="dizhi-gr-line dizhi-gr-tel">
						<img src="@/assets/icon_iphone@2x.png"/>
						{{ item.phone }}
					</span>
					<span id="" class="dizhi-gr-line dizhi-gr-next">
						<img src="@/assets/right@3x.png"/>
					</span>
				</p>
				<p class="dizhi-sh">收货地址:{{ item.province }}/{{ item.city }}/{{ item.region }}</p>
			</div>
			<van-checkbox-group v-model="result" class='check_box' @change='change'>
				<van-checkbox class='commodity' v-for='(item, index) in list' :key='index' :name='item'>
					<div class="til_good">
						<p class="goods_p1">{{ item.itemName }}</p>
						<p class="goods_p2" @click.stop="delgood(item.id)">删除</p>
					</div>
					<div class="commodity-details">
						<img :src="item.url"/>
						<div class="commodity-details-right">
							<p class="com-del-hint">{{ item.itemName }}</p>
							<p class="com-del-bq"><span class="com-del-bq-left">{{ item.itemTag }}</span><span class="com-del-bq-yf">运费：{{ item.freightCharge }}元</span></p>
							<p class="com-del-num">
								<span class="danjia">¥{{ item.price }}</span>
								<span id="stepper">
									<div class="flex_between_v set_box">
										<p class="set_p" @click.stop="reduce(item.id,item.amount,index,$event)">-</p>
										<div class="set_div" @click.stop=""></div>
										<input class="set" type="number" v-model="item.amount" min="1" disabled/>
										<p class="set_p" @click.stop="increase(item.id,item.amount,index,$event)">+</p>
									</div>
								</span>
							</p>
						</div>
					</div>
				</van-checkbox>
			</van-checkbox-group>
		</div>
		<div class="tijiao">
			<van-submit-bar :price="price*100" button-text="结算" @submit="show = true">
			  <van-checkbox v-model="checked" @change='all'>全选</van-checkbox>
			</van-submit-bar>
		</div>
		<!--弹窗-->
		<van-dialog v-model="show" show-cancel-button :before-close="beforeClose" :close-on-click-overlay='true'>
		  	<van-field v-model="payPwd" type="password" label="支付密码" placeholder="请输入支付密码"/>
		</van-dialog>
	</div>	
</template>

<script>
	import { Toast } from 'vant'
	import qs from 'qs'
	export default({
		name: 'shopcar',
		data(){
			return{
				name: '',							//姓名
				cellphone: '',						//手机号
				address: '',						//收货地址
				amount: 1,							//商品数量
				danChecked:true,
				checked: false,
				price: 0,							//合计
				list: [],							//列表
				result: [],							//选中项
				addrelist: [],						//地址信息
				payPrice: 0,						//所有商品价格
				postage: 0,							//所有商品邮费
				cartId: [],							//购物车id
				payPwd: '',							//支付密码
				show: false							//弹窗
			}
		},
		created () {
			this.getShop()
			this.getadd()
		},
		methods: {
		    onClickRight() {
		      	this.$router.push({path:'/myOrder'})
		    },
		    //查询地址
		    getadd () {
		    	let that = this
				that.$axios({
			        url: '/api/app/shopAddress/queryAddress',
			        method: 'POST',
			        data: qs.stringify({
			        	userId: localStorage.getItem('userId')
			        })
			    }).then(res => {
			    	if(res.data.code == 0){
			    		that.addrelist = res.data.data
			    		for (let i = 0; i < res.data.data.length; i++) {
			    			if (res.data.data[i].isDefault == 1) {
			    				that.name = res.data.data[i].name
			    				that.cellphone = res.data.data[i].phone
			    				that.address = res.data.data[i].province + res.data.data[i].city + res.data.data[i].region + res.data.data[i].shippingAddress 
			    			}
			    		}
			    	}else{
			    		Toast(res.data.msg)		    		
			    	}
			    })
		    },
		    //步进值改变
		    //减少
		    reduce (e,amount,index) {
		    	let good = this.list[index]
		    	if (this.list[index].amount == 1) {
		    		return false
		    	}
		    	this.amount = this.list[index].amount --
		    	if (this.price > 0 && this.result[index]) {
		    		this.price -= good.price + good.freightCharge		    		
		    	}
		    	this.amountgood(e,this.list[index].amount)
		    },
		    //增加
		    increase (e,amount,index) {
		    	let good = this.list[index]
		    	console.log(good.amount)
		    	this.amount = this.list[index].amount ++
		    	if (this.result[index]) {
		    		this.price += good.price + good.freightCharge		    		
		    	}
		    	this.amountgood(e,this.list[index].amount)
		    },
		    //商品数量减少
		    amountgood (e,amount) {
		    	let that = this
				that.$axios({
			        url: '/api/app/shoppingcart/updateAmount',
			        method: 'POST',
			        data: qs.stringify({
			        	id: e,
			        	amount:amount
			        })
			    }).then(res => {
			    	if(res.data.code == 0){
			    		
			    	}else{
			    		Toast(res.data.msg)		    		
			    	}
			    })
		    },
		    //查询购物车
		    getShop () {
		    	let that = this
				that.$axios({
			        url: '/api/app/shoppingcart/querycart',
			        method: 'POST',
			        data: qs.stringify({
			        	userId: localStorage.getItem('userId')
			        })
			    }).then(res => {
			    	if(res.data.code == 0){
			    		that.list = res.data.data
			    	}else{
			    		Toast(res.data.msg)		    		
			    	}
			    })
		    },
		    //选择商品
		    change (e) {
		    	console.log(e)
		    	let that = this
		    	that.price = 0
		    	for (let i = 0; i < e.length; i++) {
		    		that.price += e[i].amount * e[i].price + e[i].amount * e[i].freightCharge
		    	}
		    },
		 	//删除商品
		 	delgood (e) {
		    	let that = this
				that.$axios({
			        url: '/api/app/shoppingcart/deleteCart',
			        method: 'POST',
			        data: qs.stringify({
			        	id: e
			        })
			    }).then(res => {
			    	if(res.data.code == 0){
			    		
			    	}else{
			    		Toast(res.data.msg)		    		
			    	}
			    })
		    },
		    //全选
		    all (e) {
		    	if (e) {
		    		this.result = this.list
		    	} else {
		    		this.result = []
		    	}
		    },
		    //支付弹窗
	       	beforeClose(action, done) {
	       		let that = this
		      	if (action === 'confirm') {
		        	that.onSubmit()
		        	done()
		      	} else {
		        	done()
		      	}
    		},
		    //结算
		    onSubmit () {
		    	let that = this
		    	let order = {}
		    	let orderDetails = []
		    	for (let i = 0; i < that.result.length; i++) {
		    		that.payPrice += that.result[i].amount * that.result[i].price
		    		that.postage += that.result[i].amount * that.result[i].freightCharge
		    		that.cartId.push(that.result[i].id)
		    		let orderDetail=new Object()
		    		orderDetail.itemId=that.result[i].amount
		    		orderDetail.quantity=that.result[i].amount
		    		orderDetail.payPrice=that.result[i].amount
		    		orderDetail.postage=that.result[i].amount
		    		orderDetails.push(orderDetail)
		    	}
		    	that.cartId.join(',')
		    	let jsonData={
		        	userId: localStorage.getItem('userId'),
		        	name: that.name,
		        	cellphone: that.cellphone,
		        	address: that.address,
		        	payPrice: that.payPrice,
		        	postage: that.postage,
		        	payPwd: that.payPwd
			    }
		    	for (var i = 0; i < orderDetails.length; i++) {
		    		jsonData["orderDetails["+i+"].itemId"] = orderDetails[i].itemId
		    	}
				that.$axios({
			        url: '/api/app/orders/submitOrder',
			        method: 'POST',
			        data: qs.stringify(jsonData)
			    }).then(res => {
			    	if(res.data.code == 0){
			    		that.getShop ()
			    	}else{
			    		Toast(res.data.msg)		    		
			    	}
			    })
		    }
		}
	})
</script>

<style scoped>
.box{
	padding: 0 .2rem;
}
.shopcar{
	width: 100%;
	height: 100%;
	background-color: #F5F5F5;
}
.dizhi{
	box-sizing: border-box;
	padding: 0 0.3rem;
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
	/*width: 0.22rem;*/
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
	height: 2.8rem;
	margin: 0 auto;
	background-color: #FFFFFF;
	margin-top: 0.2rem;
	display: flex;
	flex-direction: column;
	padding: .26rem .2rem;
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
	display: flex;
}
.commodity-details img{
	width: 2.8rem;
	height: 1.76rem;
	margin-right: .26rem;
}
.commodity-details-right{
	height: 1.76rem;
	flex: 1;
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

.set_box{width: 1.8rem;height: .48rem;border: .02rem solid #F5F5F5;overflow: hidden;position: relative;}
.set_div{position: absolute;width: .84rem;height: .48rem;left: 50%;margin-left: -.42rem;}
.set{width: .84rem;height: .48rem;background: #F5F5F5;border: 0;text-align: center;}
.set_p{flex: 1;text-align: center;}
.til_good{position: absolute;top: -.55rem;height: .48rem;width: 100%;display: flex;justify-content: space-between;padding-left: .4rem;}
.goods_p1{color: #000000;}
.goods_p2{font-size: .24rem;color: #9E9E9E;}
.check_box{padding-bottom: 2.4rem;}
</style>