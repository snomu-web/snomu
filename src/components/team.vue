<template>
	<div class="team">
		<van-nav-bar title="团队情况" left-text="返回" left-arrow @click-left="onClickLeft"/>
		<div class="top">
			我的推荐人：13912345533（小包总）
		</div>
		<p class="top_p">{{ name_fir }}</p>
		<div class="top_tab">
			<van-tabs v-model="active" :line-width='linwid' @click='onClick'>
			  	<van-tab v-for="(item, index) in list" :key='index' :title="item.name" :disabled="index === 0 || index === list.length-1">
			  	</van-tab>
			</van-tabs>
		</div>
		<p class="thri_name">{{ name_thr }}</p>
		<p class="con">使用说明：单次只展示3级管理，仅展示所选层级的3个直接关机会员，可通过上下滑动查看更多层级，左右滑动查看所选层级的更多直接关系！</p>
		<!--弹窗-->
		<van-popup v-model="show" class='pop_box'>
			<div class="pop_div">
				<p>姓名：张新发</p>
				<p>账号：15912342324</p>
				<p>会员星级：无</p>
				<p>购买积分额度：10000</p>
				<p>直推数量：4</p>
			</div>
		</van-popup>
	</div>
</template>

<script>
	export default{
		name: 'team',
		data () {
			return {
				name_fir: '',
				name_sec: '',
				name_thr: '',
				show: false,
				active: 1,									//激活标签
				linwid: 0,
				list: [
					{'name':'张大新','index':1},
					{'name':'张新发','index':2},
					{'name':'春华','index':3},
					{'name':'李真名','index':4}
				]
			}
		},
		mounted () {
			this.list.push('')
			this.list.unshift('')
			this.name_fir = this.list[1].name
		},
		methods: {
			//返回
		    onClickLeft () {
		        this.$router.push({path:'/mine'})
	       	},
	       	//标签改变
	       	onClick (e, til) {
	       		this.show = true
	       		this.name_thr = til
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