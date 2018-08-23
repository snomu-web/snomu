<template>
	<div class="details">
		<van-nav-bar title="体验版" left-text="返回" left-arrow @click-left="onClickLeft"/>
    	<div class="box">
    		<p class="box-bj">投资1000000元x倍收益</p>
    		<p class="box-sy">单日收益释放50积分</p>
    		<p class="box-js">购买积分产品会扣除对应余额，返还积分除转出外还可用于线上线下消费</p>
    		<button @click="goumai">立即抢购</button>
    		<p class="box-fx" @click="fengxian">《风险提醒》</p>
    	</div>
    	<!--密码弹窗-->
    	<van-popup v-model="pswshow" :overlay="true">
		  <div class="tan">
		  	<div class="heard">
		  		请输入支付密码
		  	</div>
		  	<div class="zhuti">
		  		<p class="zhuti-a">1000000元</p>
		  		<p class="zhuti-b">投资1000000元X倍收益</p>
		  	</div>
		  	<input type="" name="pasw" id="pasw" value="" placeholder="输入支付密码"/>
		  	<div class="affirm" @click="affirm">
		  		确认支付
		  	</div>
		  </div>
		</van-popup>
		<!--支付结果弹窗-->
		<van-popup v-model="resultshow" :overlay="true">
		  <div class="result-box">
		  	<img src="../../build/logo.png"/>
		  	<p class="resule-msg">失败</p>
		  	<div class="guanbi" @click="guanbi">确认</div>
		  </div>
		</van-popup>
	</div>
	
</template>
<script>
import { Popup } from 'vant';
import qs from 'qs'
export default {
  name: 'packageDetails',
  data() {
    return {
    	pswshow: false,
    	resultshow:true
    }
  },
  mounted() {
    
  },
  computed: {},
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
//  协议
    fengxian(){
    	window.location.href = "http://www.snomu.com/fengxian"
    },
//  显示密码窗
    goumai(){
    	this.pswshow = true
    },
//  确认购买
    affirm(){
    	let that = this
		that.$axios({
			method: 'POST',
			url: '',
			data: qs.stringify({
				
			}),

		}).then(res => {
			if(res.data.code == 0){
				Toast(res.data.msg)
			}else{
				Toast(res.data.msg)
			}
			
		})
   	},
// 	关闭返回结果弹窗
   	guanbi(){
   		this.resultshow = false
   	}
  }
}
</script>
<style scoped="scoped">
*{
	box-sizing: border-box;
}
.details{
	width: 100%;
	height: 100%;
	background: url("../assets/bg_jifenxiangqing@2x.png");
    background-size:100% 100%;
    background-size:cover;
    overflow: hidden;
}
.box-bj{
	width: 100%;
	font-size: 0.6rem;
	color: #FFF1DA;
	text-align: center;text-align: center;
	margin-top: 3.26rem;
}
.box-sy{
	font-size: 0.4rem;
	color: #FFF1DA;
	text-align: center;
	width: 100%;
	height: 0.8rem;
	line-height: 0.8rem;
}
.box-js{
	font-size: 0.3rem;
	color: #FFEFD4;
	letter-spacing: 0;
	height: 0.8rem;
	line-height: 0.4rem;
	margin: 0 auto;
	margin: 0 0.46rem;
	text-align: center;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
	overflow: hidden;
}
button{
	display: block;
	width: 6.7rem;
	height: 0.88rem;
	text-align: center;
	margin: 0 auto;
	color: #fd654e;
	border: none;
	border-radius: 0.44rem;
	background-color: #ffd477;
	position: fixed;
	left: 50%;
    margin-left: -3.45rem;
	bottom: 1.56rem;
}
.box-fx{
	font-size: 0.32rem;
	color: #FFE2AE;
	letter-spacing: 0;
	text-align: center;
	margin: 0 auto;
	position: fixed;
	left: 50%;
	margin-left: -0.96rem;
	bottom: 0.82rem;
}
.tan{
	width: 6.1rem;
	height: 5.1rem;
	border-radius: 5px;
	padding: 0 0.3rem;
}
.heard{
	height: 0.96rem;
	border-bottom: 1px solid #EEEEEE ;
	font-size: 0.36rem;
	color: #000000;
	letter-spacing: 0;
	line-height: 0.96rem;
}
.zhuti{
	height: 2rem;
	border-bottom: 1px solid #EEEEEE;
	
}
.zhuti-a{
	font-size: 0.48rem;
	color: #000000;
	letter-spacing: 0;
	text-align: center;
	line-height: 0.48rem;
	padding-top: 0.5rem;
}
.zhuti-b{
	font-size: 0.32rem;
	color: #777777;
	letter-spacing: 0;
	text-align: center;
	height: 0.72rem;
	line-height: 0.72rem;
}
#pasw{
	height: 1rem;
	border: none;
	font-size: 0.32rem;
	line-height: 1rem;
}
.affirm{
	height: 1.08rem;
	line-height: 1.08rem;
	text-align: center;
	color: #FF5651;
	font-size: 0.36rem;
}
.result-box{
	width: 6.1rem;
	height: 4rem;
	padding-top: 0.5rem;
}
.result-box img{
	display: block;
	width: 1.2rem;
	height: 1.2rem;
	margin: 0 auto;
}

.resule-msg{
	height: 1rem;line-height: 1rem;text-align: center;
	font-size: 0.36rem;
	color: #000000;
}
.guanbi{
	height: 1.2rem;
	line-height: 1.2rem;
	color: #777777;
	font-size: 0.36rem;
	text-align: center;
	border-top: 2px solid #EEEEEE;
}
</style>