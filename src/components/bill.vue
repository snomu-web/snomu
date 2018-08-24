<template>
	<div class="bill">
		<van-nav-bar title="我的账单" left-text="返回" left-arrow @click-left="onClickLeft"/>
		<div class="flex_between_v top_sel">
			<div class="flex_center sel_p" @click="showA = true">
				<p>{{ popA }}</p>
				<img class="btn" src="@/assets/btn_triangle@3x.png"/>
			</div>
			<div class="line">				
			</div>
			<div class="flex_center sel_p" @click="">
				<p>{{ popB }}</p>
				<img class="btn" src="@/assets/btn_triangle@3x.png"/>
			</div>
		</div>
		<van-list class="all list_box" v-model="loading" :finished="finished" @load="onLoad">
			<div class="list" v-for="(item, index) in list" :key='index' @click="detail(item.id,item.tixianIncome)">
				<div class="flex_between_v list_p">
					<p class="list_p1">{{ item.msg }}</p>
					<p class="list_p2" v-if="item.tixianIncome <= 0">{{ item.tixianIncome + item.balanceIncome + item.shopIncome + item.fixIncome }}</p>
					<p class="list_p2" v-else>+{{ item.tixianIncome + item.balanceIncome + item.shopIncome + item.fixIncome }}</p>
				</div>
				<p class="list_p3" >消费时间：{{ item.createTime }}</p>
			</div>
		</van-list>
		<div class="" v-if="list.length == 0" style="text-align: center;">
			暂无数据
		</div>
		<!--弹窗1-->
		<van-popup v-model="showA" position="bottom" :overlay="true">
		 	<van-picker show-toolbar :columns="columnsA" :item-height='iteh' @cancel="showA = false" @confirm="onConfirmA"/>
		</van-popup>
		<!--弹窗2-->
		<van-popup v-model="showB" position="bottom" :overlay="true">
		 	<van-picker show-toolbar :columns="columnsB" :item-height='iteh' @cancel="showB = false" @confirm="onConfirmB"/>
		</van-popup>
	</div>
</template>

<script>
	import { Toast } from 'vant'
	import qs from 'qs'
	export default{
		name: 'bill',
		data () {
			return {
				iteh: 88,
				showA: false,
				showB: false,
				columnsA: ['全部', '充值', '购买积分', '提现', '转账', '购物', '积分释放', '佣金'],
				type: '',					//类型
				columnsB: ['全部', '余额', '购物积分', '转出积分', '期权'],
				popA: '全部',
				popB: '货币种类',
				list: [],					//列表
				pageNum: 1,					//当前页数
				loading: false,
      			finished: false,
      			immediate:false
			}
		},
		methods: {
			//返回
		    onClickLeft () {
		        this.$router.push({path:'/mine'})
	        },
	        //弹窗1确认
	        onConfirmA (value, index) {
	        	this.popA = value
	        	this.type = index + 1
	        	this.list = []
	        	if (index == 0) {
	        		this.type = ''
	        	}
	        	this.addlist(1)
	        	this.showA = false
	        },
	        //弹窗2确认
	        onConfirmB (e) {
	        	this.popB = e
	        	this.showB = false
	        },
	        //加载
			onLoad() {
				let that = this
				let pageNum = that.pageNum
				setTimeout(() => {
			        that.addlist(pageNum)
		      	}, 500)
		    },
			//获取列表
			addlist (pageNum) {
				let that = this
				that.pageNum = that.pageNum + 1
				that.$axios({
			        url: '/api/app/income/queryBill',
			        method: 'POST',
			        data: qs.stringify({
			        	pageNum: pageNum,
			        	userId: localStorage.getItem('userId'),
			        	type: that.type
			        })
			    }).then(res => {
			    	if(res.data.code == 0){
			    		for (let i = 0; i < res.data.data.length; i++) {
				          	that.list.push(res.data.data[i]);
				      	}
			    		that.loading = false
			    		that.immediate = false
			    		if ( pageNum >= res.data.page.pages) {
			    			that.finished = true
			    		}
			    	}else{
			    		Toast(res.data.msg)		    		
			    	}
			    })
			},
	        //订单详情
	        detail (e, a) {	        	
	        	this.$router.push({path: '/detail'})
	        }
		}
	}
</script>

<style scoped>
.bill{height: 100%;background: #fff;overflow: hidden; overflow-y: auto;}
.top_sel{margin: .2rem .3rem .3rem .3rem;}
.sel_p,.line{height: .88rem;}
.sel_p{width: 3rem;background: #F5F5F5;border-radius: 12px;;}
.line{border: .5px solid #D7D7D7;}
.btn{width: .32rem;height: .16rem;margin-left: .2rem;}
.list_box{padding: 0 .3rem;}
.list{width: 100%;height: 2rem;border-radius: 12px;box-shadow:0px 0px 10px #e5e5e5;margin-bottom: .3rem;}
.list_p{height: 1.08rem;padding: 0 .4rem;border-bottom: 2px dashed #D7D7D7;}
.list_p1{color: #030303;font-size: .36rem;}
.list_p2{color: #00AF61;font-size: .36rem;}
.list_p3{color: #555555;font-size: .28rem;padding: 0 .4rem;height: .9rem;line-height: .9rem;}
</style>