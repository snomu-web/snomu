<template>
	<div class="transferConfirm">
		<van-nav-bar title="转账"left-text="返回" left-arrow @click-left="onClickLeft" />
		<div class="account">
			<p class="account-xx">当前账户信息</p>
			<ul>
				<li>
					<p class="link_p">3055</p>
					<p class="link_p">账户余额(元)</p>
					
				</li>
				<li>
					<p class="link_p">3055</p>
					<p class="link_p">购物积分</p>
				</li>
				<li>
					<p class="link_p">3055</p>
					<p class="link_p">转出积分</p>
				</li>
			</ul>
		</div>
		<div class="type" @click="show = true">			
			<span class="type-text">
				请选择转账货币类型
			</span>
			<span class="type-xz">
				{{dealType}}
				<img src="../assets/btn_triangle@2x.png"/>
			</span>
		</div>
		<div class="money">
    		<div class="me">
    			请输入转账的数额
    		</div>
    		<input class="adverse" placeholder="请输入您要转账的数额">
    	</div>		
		<button>发起转账</button>
		<!--<van-picker show-toolbar title="标题" :columns="columns" @cancel="onCancel" @confirm="onConfirm" v-show="show" @click="typeSelect"/>-->
		<van-popup v-model="show" position="bottom" :overlay="true" @confirm="onConfirm" >
			<van-picker show-toolbar
			  :columns="columns"
			  @cancel="onCancel"
			  @confirm="onConfirm"/>
		</van-popup>
		
	</div>
</template>
<script>
import { Toast } from 'vant'
import { Actionsheet } from 'vant';
import { Popup } from 'vant';
import qs from 'qs'
export default {
  name: 'TransferConfirm',
  data() {
    return {
      	show: false,
      	dealType:'',
	  	columns: ['杭州', '宁波', '温州', '嘉兴', '湖州']
    }
  },
  mounted() {
    console.log(this.show)
  },
  computed: {},
  methods: {
    onClickLeft() {
      	this.$router.go(-1)
    },
    typeSelect(){
    	this.show = true 
    },
	onConfirm(value, index) {	
		this.show = false 
		this.dealType = value
    },
    onCancel() {
      	this.show = false
    },
     onChange(picker, value, index) {
      Toast(`当前值：${value}, 当前索引：${index}`);
    }
  }
}
</script>
<style scoped="scoped">
*{
	box-sizing: border-box;	
	list-style: none;
	display: block;
}
.account{
	width: 100%;
	height: 216px;
}
.account-xx{
	font-size: 0.28rem;
	color: #000000;
	margin-top: 0.4rem;
	margin-left: 0.48rem;
}
.account ul{
	width: 100%;
	margin-top:0.36rem ;
	
}
.account ul li{
	width: 33.3%;
	display: block;
	float: left;
	font-size: 0.28rem;
	text-align: center;
}
.link_p{
	height: 0.64rem;
	line-height: 0.64rem;
}
.type{
	width: 100%;
	height: 1.2rem;
	background-color: #FFF8F8;
}
.type-text{
	display: inline-block;
	color: #222222;
	margin-left: 0.48rem;
	font-size: 0.32rem;
	line-height: 1.2rem;
}
.type-xz{
	width: 2.8rem;
	height: 0.88rem;
	display: inline-block;
	border: 1px solid #F7F2F2;
	background-color: #FFFFFF;
	line-height: 0.88rem;
	text-align: center;
	margin-left: 0.86rem;
}
.type-xz img{
	display: inline-block;
	width: 0.32rem;
	height: 0.16rem;
	margin-left: 0.74rem;
}
.money{
	width: 100%;
	height: 2.4rem;
	background-color: #F7FAFD;
}
.me{
	box-sizing: border-box;
	margin-left: 48px;
	font-size: 0.32rem;
	color: #222222;
	height: 1.28rem;
	line-height: 1.28rem;
}
.adverse{
	box-sizing: border-box;
	border: none;
	background-color: #F7FAFD;
	margin-left: 48px;
	font-size: 0.4rem;
	color: #9E9E9E;
}
.type{
	width: 100%;
	height: 120px;
}
button{
	width: 6.7rem;
	height: 0.88rem;
	border-radius: 0.44rem;
	margin: 0 auto;
	margin-top: 94px;
	display: block;
	border: none;
	font-size: 0.36rem;
	color: #FFFFFF;
	text-align: center;
	background:linear-gradient(to right,#fd904a,#fd4553)
}
/*弹窗样式*/
.van-picker__columns ul li{
	height: 0.88rem!important;
	line-height: 0.88rem!important;
}
.van-hairline--top-bottom .van-picker__frame{
	height: 88px!important;
}
</style>