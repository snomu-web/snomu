<template>
	<div class="detail">
		<van-nav-bar title="账单明细" left-text="返回" left-arrow @click-left="onClickLeft"/>
		<div class="box">
			<div class="flex_between_v top">
				<p class="til_p1">{{ msg }}</p>
				<p class="til_p2">{{ tixianIncome }}</p>
			</div>
			<div class="flex_between">
				<p class="con_p1">扣款详情：</p>
				<div class="">
					<p class="con_p2">购物积分 <span>{{ shopIncome }}</span></p>
					<p class="con_p2">提现积分 <span>{{ tixianIncome }}</span></p>
					<p class="con_p2">余额 <span>{{ balanceIncome }}</span></p>
				</div>
			</div>
			<div class="bom">
				<div class="flex_between_v">
					<p class="bom_p1">分类：</p>					
					<p class="bom_p2" v-if="transactionType == 1">充值</p>
					<p class="bom_p2" v-if="transactionType == 2">购买积分</p>
					<p class="bom_p2" v-if="transactionType == 3">提现</p>
					<p class="bom_p2" v-if="transactionType == 4">转账</p>
					<p class="bom_p2" v-if="transactionType == 5">购物</p>
					<p class="bom_p2" v-if="transactionType == 6">积分释放</p>
					<p class="bom_p2" v-if="transactionType == 7">佣金</p>
					
				</div>
				<div class="flex_between_v">
					<p class="bom_p1">创建时间：</p>
					<p class="bom_p2">{{ createTime }}</p>
				</div>
				<div class="flex_between_v">
					<p class="bom_p1">订单号：</p>
					<p class="bom_p2">{{ id }}</p>
				</div>
				<div class="flex_between_v">
					<p class="bom_p1">支持货币种类：</p>
					<p class="bom_p2" v-if="currencyType == 1">可转积分(提现积分)</p>
					<p class="bom_p2" v-if="currencyType == 2">余额</p>
					<p class="bom_p2" v-if="currencyType == 3">购物积分</p>
					<p class="bom_p2" v-if="currencyType == 4">期权</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { Toast } from 'vant'
	import qs from 'qs'
	export default{
		name: 'detail',
		data () {
			return {
				id: '000000000000000',			//账单编号
				sign: '',						//收入支出 0支出 1收入
				msg: '',						//名称
				balanceIncome: 0,				//余额
				currencyType: 1,				//支持货币种类
				fixIncome: 0,					//期权
				shopIncome: 0,					//购物积分
				tixianIncome: 0,				//提现积分
				transactionType: '1',			//分类
				createTime: 0,					//时间
			}
		},
		created () {
			this.id = this.$route.query.id
			if (this.$route.query.sign > 0) {
				this.sign = 1
			} else {
				this.sign = 0
			}
			this.get()
		},
		methods: {
			//返回
		    onClickLeft () {
		        this.$router.push({path:'/bill'})
	       	},
	       	//获取信息
			get () {
				let that = this
				that.$axios({
			        url: '/api/app/income/queryBillDetail',
			        method: 'POST',
			        data: qs.stringify({
			        	userId: localStorage.getItem('userId'),
			        	id: that.$route.query.id,
			        	sign: that.sign
			        })
			    }).then(res => {
			    	if(res.data.code == 0){
			    		that.id = res.data.data.id
			    		that.msg = res.data.data.msg
			    		that.balanceIncome = res.data.data.balanceIncome
			    		that.createTime = res.data.data.createTime
			    		that.currencyType = res.data.data.currencyType
			    		that.fixIncome = res.data.data.fixIncome
			    		that.shopIncome = res.data.data.shopIncome
			    		that.tixianIncome = res.data.data.tixianIncome
			    		that.transactionType = res.data.data.transactionType
			    	}else{
			    		Toast(res.data.msg)		    		
			    	}
			    })
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