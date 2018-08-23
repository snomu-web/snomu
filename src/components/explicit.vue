<template>
	<div class="explicit">
		<van-nav-bar title="转出明细" left-text="返回" left-arrow @click-left="onClickLeft"/>
		<div class="box">
			<div class="top">
				流水号：{{ serialNum }}
			</div>
			<div class="con">
				<div class="flex_between_v">
					<p class="con_p1">创建时间：</p>
					<p class="con_p2">{{ createTime }}</p>
				</div>
				<div class="flex_between_v">
					<p class="con_p1">处理时间：</p>
					<p class="con_p2">{{ auditTime }}</p>
				</div>
				<div class="flex_between_v">
					<p class="con_p1">处理方式：</p>
					<p class="con_p2 cp1" v-if="status == 1">转出成功</p>
					<p class="con_p2 cp2" v-if="status == 0">待处理</p>
					<p class="con_p2 cp3" v-if="status == 2">驳回</p>
				</div>
				<div class="flex_between_v">
					<p class="con_p1">处理意见：</p>
					<p class="con_p2">{{ reason }}</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { Toast } from 'vant'
	import qs from 'qs'
	export default({
		name: 'explicit',
		data () {
			return {
				id: '',									//账单id
				serialNum: '1111111111',				//流水号
				createTime: '2018-01-01 00:00:00',		//创建时间
				auditTime: '2018-01-01 00:00:00',		//结束时间
				status: 1,								//处理方式 :0@申请中;1@已通过;2@未通过
				reason: ''								//处理意见
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
	       	//获取信息
	       	get () {
				let that = this
				that.pageNum = that.pageNum + 1
				that.$axios({
			        url: '/api/app/tixianApply/queryTixianDetail',
			        method: 'POST',
			        data: qs.stringify({
			        	id: that.$route.query.id
			        })
			    }).then(res => {
			    	if(res.data.code == 0){
			    		that.serialNum = res.data.data.serialNum
			    		that.createTime = res.data.data.createTime
			    		that.auditTime = res.data.data.auditTime
			    		that.status = res.data.data.status
			    		that.reason = res.data.data.reason
			    	}else{
			    		Toast(res.data.msg)		    		
			    	}
			    })
			}
		}
	})
</script>

<style scoped>
.box{background: #fff;padding: 0 .4rem;}
.top{font-size: .36rem;color: #222222;height: 1.16rem;line-height: 1.16rem;border-bottom: 2px dashed #D7D7D7;}
.con{padding: .4rem 0;}
.flex_between_v{margin-bottom: .4rem;}
.flex_between_v:last-child{margin-bottom: 0;}
.con_p1{font-size: .32rem;color: #4A4A4A;}
.con_p2{font-size: .32rem;color: #000000;text-align: right;}
.cp1{color: #00AF61;}
.cp2{color: #1B90EB;}
.cp3{color: #FF5651;}
</style>