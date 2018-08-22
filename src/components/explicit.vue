<template>
	<div class="explicit">
		<van-nav-bar title="转出明细" left-text="返回" left-arrow @click-left="onClickLeft"/>
		<div class="box">
			<div class="top">
				流水号：152445120733
			</div>
			<div class="con">
				<div class="flex_between_v">
					<p class="con_p1">创建时间：</p>
					<p class="con_p2">04.23  18:10</p>
				</div>
				<div class="flex_between_v">
					<p class="con_p1">处理时间：</p>
					<p class="con_p2">04.23  18:10</p>
				</div>
				<div class="flex_between_v">
					<p class="con_p1">处理方式：</p>
					<p class="con_p2 cp1">转出成功</p>
					<p class="con_p2 cp2" v-if="0">待处理</p>
					<p class="con_p2 cp3" v-if="0">驳回</p>
				</div>
				<div class="flex_between_v">
					<p class="con_p1">处理意见：</p>
					<p class="con_p2">账户存在风险，无法完成转出服务</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default({
		name: 'explicit',
		data () {
			return {
			}
		},
		methods: {
			//返回
		    onClickLeft () {
		        this.$router.push({path:'/turnou'})
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