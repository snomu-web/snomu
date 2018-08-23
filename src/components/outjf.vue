<template>
	<div class="outjf">
		<van-nav-bar title="积分转余额" left-text="返回" left-arrow @click-left="onClickLeft"/>
		<div class="top">
			<p class="top_p">请输入转换积分</p>
			<input type="number" v-model="sum" class="num" placeholder="请输入您要转入积分的数量"/>
		</div>
		<div class="flex_between_v">
			<p class="p1">当前可用积分：{{ balance }}</p>
			<p class="p2" @click="sum = balance">全部转换</p>
		</div>
		<div class="bom">
			<div class="sub" @click="show = true">
				转出
			</div>			
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
		name: 'outjf',
		data () {
			return {
				balance: '0',
				sum: '',
				payPwd: '',
				show: false
			}
		},
		created () {
			this.get()
		},
		methods: {
			//返回
		    onClickLeft () {
		        this.$router.push({path:'/turnou'})
	       	},
	       	//获取积分
		    get () {
				let that = this
				that.$axios({
			        url: '/api/app/userAcount/queryByBalance',
			        method: 'POST',
			        data: qs.stringify({
			        	userId: localStorage.getItem('userId')
			        })
			    }).then(res => {
			    	if(res.data.code == 0){
			    		that.balance = res.data.data.tixianIntegral
			    	}else{
			    		Toast(res.data.msg)		    		
			    	}
			    })
			},
	       	//确认体现
	       	beforeClose(action, done) {
	       		let that = this
	       		console.log(action)
		      	if (action === 'confirm') {
		        	that.suba()
		        	done()
		      	} else {
		        	done()
		      	}
    		},
	       	suba () {
				let that = this
				that.pageNum = that.pageNum + 1
				that.$axios({
			        url: '/api/app/userAcount/integralToBanlance',
			        method: 'POST',
			        data: qs.stringify({
			        	userId: localStorage.getItem('userId'),
			        	sum: that.sum,
			        	payPwd: that.payPwd
			        })
			    }).then(res => {
			    	if(res.data.code == 0){
			    		Toast(res.data.msg)
			    		that.get ()
			    	}else{
			    		Toast(res.data.msg)
			    	}
			    })
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