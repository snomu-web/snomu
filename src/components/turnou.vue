<template>
	<div class="turnou">
		<van-nav-bar title="转出" left-text="返回" left-arrow @click-left="onClickLeft"/>
		<div class="box">
			<div class="">
				<p class="top_p1">{{ balance }}</p>
				<p class="top_p2">账户余额（元)</p>				
			</div>
			<div class="flex_between_v top_flex">
				<router-link to='/outye' class="flex_p1">转出</router-link>
				<router-link to='/outjf' class="flex_p2">积分转余额</router-link>
			</div>
			<div class="con_p">
				<p class="tex_p1">温馨提示：</p>
				<p class="tex_p2">仅支持余额转出，转出积分可以先转换成余额再进行转出</p>				
			</div>
			<van-list class="all list_box" v-model="loading" :finished="finished" @load="onLoad">
				<div class="list" v-for="(item, index) in list" :key='index' @click="detail(item.id)">
					<div class="flex_between_v list_p">
						<p class="list_p1">转出金额{{ item.sum }}</p>
						<p class="list_p2a" v-if="item.status == 1">转出成功</p>
						<p class="list_p2b" v-if="item.status == 0">待处理</p>
						<p class="list_p2c" v-if="item.status == 2">驳回</p>
					</div>
					<p class="list_p3">
						<span>{{ item.bank }}</span>
						<span>{{ item.createTime }}</span>
					</p>
					<p class="card">**** **** **** {{ item.bankId.slice(9,12) }}</p>
				</div>
			</van-list>
		</div>
	</div>
</template>

<script>
	import { Toast } from 'vant'
	import qs from 'qs'
	export default({
		name: 'turnou',
		data () {
			return {
				card: '123456789012',					//银行卡号
				balance: '0',							//余额
				list: [],								//列表
				pageNum: 1,								//当前页数
				loading: false,
      			finished: false,
      			immediate:false
			}
		},
		created () {
			this.get()
		},
		computed: {
			Cardnumber () {
				return '**** **** **** ' + this.card.slice(9,12)
			}
		},
		methods: {
			//返回
		    onClickLeft () {
		        this.$router.push({path:'/mine'})
	       	},
	       	//转出明细
	       	detail (e) {
	       		this.$router.push({path: '/explicit', query:{'id': e}})	
	       	},
	       	//加载
			onLoad() {
				let that = this
				let pageNum = that.pageNum
				setTimeout(() => {
			        that.addlist(pageNum)
		      	}, 500)
		    },
		    //获取余额
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
			    		that.balance = res.data.data.balance
			    	}else{
			    		Toast(res.data.msg)		    		
			    	}
			    })
			},
			//获取列表
			addlist (pageNum) {
				let that = this
				that.pageNum = that.pageNum + 1
				that.$axios({
			        url: '/api/app/tixianApply/queryTiXianInfo',
			        method: 'POST',
			        data: qs.stringify({
			        	pageNum: pageNum,
			        	userId: localStorage.getItem('userId')
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
			}
		}
	})
</script>

<style scoped>
.turnou{height: 100%;}
.box{padding: 0 .3rem;background: #fff;overflow: hidden;height: 100%; overflow-y: auto;}
.top_p1{text-align: center;font-size: .72rem;color: #FF5651;margin-top: .4rem;margin-bottom: .18rem;}
.top_p2{color: #000000;margin-bottom: .36rem;text-align: center;}
.top_flex{padding:0 .2rem;margin-bottom: .2rem;}
.top_flex a{flex: 1;font-size: .32rem;height: .88rem;line-height: .88rem;text-align: center;border-radius: 88px;}
.flex_p1{border: 2px solid #FF5651; color: #FF5651;margin-right: .5rem;}
.flex_p2{background-image: linear-gradient(135deg, #FD944A 0%, #FD3D54 100%);color: #fff;}
.con_p{padding: 0 .2rem;}
.tex_p1{color: #000000;font-size: .26rem;}
.tex_p2{color: #4A4A4A;font-size: .26rem;}
.list_box{margin-top: .4rem;}
.list{width: 100%;height: 2.4rem;border-radius: 12px;box-shadow:0px 0px 10px #e5e5e5;margin-bottom: .3rem;}
.list_p{height: 1.08rem;padding: 0 .4rem;border-bottom: 2px dashed #D7D7D7;}
.list_p1{color: #030303;font-size: .32rem;}
.list_p2a{color: #00AF61;font-size: .32rem;}
.list_p2b{color: #1B90EB;font-size: .32rem;}
.list_p2c{color: #FF5651;font-size: .32rem;}
.list_p3{color: #555555;font-size: .28rem;padding: 0 .4rem;line-height: .8rem;display: flex;justify-content: space-between;}
.card{padding: 0 .4rem;font-size: .32rem;color: #555555;}
</style>