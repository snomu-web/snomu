<template>
	<div class="team">
		<van-nav-bar title="团队情况" left-text="返回" left-arrow @click-left="onClickLeft"/>
		<div class="top">
			我的推荐人：{{ myReferrer }}({{ myReferrerName }})
		</div>
		<p class="top_p">{{ name_fir }}</p>
		<div class="top_tab">
			<van-tabs v-model="active" :line-width='linwid' @click='onClick'>
			  	<van-tab v-for="(item, index) in list" :key='index' :title="item.NAME ? item.NAME : item.userName" :disabled="index === 0 || index === list.length-1">
			  	</van-tab>
			</van-tabs>
		</div>
		<p class="thri_name" @click="change">{{ name_thr }}</p>
		<p class="con">使用说明：单次只展示3级管理，仅展示所选层级的3个直接关机会员，可通过上下滑动查看更多层级，左右点击查看所选层级的更多直接关系！</p>
		<!--弹窗-->
		<van-popup v-model="show" class='pop_box'>
			<div class="pop_div">
				<p v-if="deall">姓名：{{ deall.NAME }}</p>
				<p v-if="deall">账号：{{ deall.userName }}</p>
				<p>会员星级：{{ grade }}</p>
				<p>购买积分额度：{{ sumIntegral }}</p>
				<p>直推数量：{{ count }}</p>
			</div>
		</van-popup>
	</div>
</template>

<script>
	import { Toast } from 'vant'
	import qs from 'qs'
	export default{
		name: 'team',
		data () {
			return {
				myReferrer: '111111111',					//推荐人
				myReferrerName: '111',						//推荐人
				name_fir: '我',								//一级
				name_sec: '',								//二级
				name_thr: '',								//三级
				thrId: '',									//三级id
				show: false,
				active: 1,									//激活标签
				linwid: 0,
				list: [
					{'NAME':'','userId':'', 'userName': ''}
				],
				referrerId: '',								//下级id	
				deall: null,								//账号内容
				grade: '0',									//会员星级
				sumIntegral: '0',							//购买积分额度
				count: '0',									//直推数量
				userId: '',									//查询用户id
			}
		},
		created () {
			this.userId = localStorage.getItem('userId')
			this.getReferrer()
			this.getson()
		},
		mounted () {
			this.list.push('')
			this.list.unshift('')
		},
		methods: {
			//返回
		    onClickLeft () {
		        this.$router.push({path:'/mine'})
	       	},
	       	//标签改变   查询详情
	       	onClick (e, til) {
	       		this.referrerId = this.list[e].userId		//获取用户id
	       		this.deall = this.list[e]					//获取用户信息
	       		this.name_thr = ''							//重置三级用户
	       		this.detail()								//调用用户信息接口
	       		this.getThr(this.referrerId)				//调用查询三级
	       		this.show = true							//弹窗显示
	       	},
	       	//获取推荐人
	       	getReferrer () {
	       		let that = this
				that.$axios({
			        url: '/api/app/relation/queryMyReferrer',
			        method: 'POST',
			        data: qs.stringify({
			        	userId: that.userId
			        })
			    }).then(res => {
			    	if(res.data.code == 0){
			    		that.myReferrer = res.data.data.myReferrer
			    		that.myReferrerName = res.data.data.myReferrerName
			    	}else{
			    		Toast(res.data.msg)		    		
			    	}
			    })
	       	},
	       	//查询下级
	       	getson () {
	       		let that = this
				that.$axios({
			        url: '/api/app/relation/queryRelation',
			        method: 'POST',
			        data: qs.stringify({
			        	userId: that.userId
			        })
			    }).then(res => {
			    	if(res.data.code == 0){
			    		that.list = res.data.data
			    		that.list.push('')
						that.list.unshift('')
						that.active = 1
						that.$nextTick(() => {
							that.getThr(that.list[1].userId)
						})
			    	}else{
			    		Toast(res.data.msg)		    		
			    	}
			    })
	       	},
	       	//查询三级
	       	getThr (userId) {
	       		let that = this
				that.$axios({
			        url: '/api/app/relation/queryRelation',
			        method: 'POST',
			        data: qs.stringify({
			        	userId: userId
			        })
			    }).then(res => {
			    	if(res.data.code == 0){
			    		if (res.data.data.length > 0) {
			    			that.thrId = res.data.data[0].userId
			    			if (res.data.data[0].NAME) {
			    				that.name_thr = res.data.data[0].NAME			    			
			    			} else {
			    				that.name_thr = res.data.data[0].userName
			    			}			    			
			    		}
			    	}else{
			    		Toast(res.data.msg)		    		
			    	}
			    })
	       	},
	       	// 三级切换到二级 二级切换到一级 
	       	change () {
	       		let that = this
	       		that.list = [
					{'NAME':'','userId':'', 'userName': ''}
				]
	       		that.name_fir = that.deall.NAME ? that.deall.NAME : that.deall.userName
	       		that.name_thr = ''
	       		that.userId = that.referrerId
	       		that.getson()
	       	},
	       	//点击详情
	       	detail () {
	       		let that = this
				that.$axios({
			        url: '/api/app/relation/queryDatail',
			        method: 'POST',
			        data: qs.stringify({
			        	referrerId: that.referrerId
			        })
			    }).then(res => {
			    	if(res.data.code == 0){
			    		that.grade = res.data.data.grade
			    		that.sumIntegral = res.data.data.sumIntegral
			    		that.count = res.data.data.count
			    	}else{
			    		Toast(res.data.msg)		    		
			    	}
			    })
	       	}
		}
	}
</script>

<style scoped>
.team{height: 100%;background: #fff;overflow: hidden;}
.top{font-size: .32rem;color: #222222;margin-top: .4rem;padding: 0 .4rem;}
.top_p{color: #FF5651;font-size: .4rem;text-align: center;margin-bottom: .6rem;margin-top: .9rem;}
.top_tab{border-top: .02rem solid #EEEEEE;border-bottom: .02rem solid #EEEEEE;padding: .3rem 0;}
.thri_name{margin-top: .8rem;text-align: center;color: #222222;font-size: .36rem;}
.con{padding: 0 .36rem;color:  #4A4A4A;line-height: 60px;margin-top: 2rem;}
.pop_box{width: 80%;background: #EEEEEE;border-radius: 20px;}
.pop_div{padding:.3rem .5rem 0 .5rem;font-size: .32rem;color: #222222;}
.pop_div p{margin-bottom: .3rem;}
</style>