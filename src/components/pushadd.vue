<template>
	<div class="pushadd">
		<van-nav-bar title="添加新地址" left-text="返回" left-arrow @click-left="onClickLeft"/>
		<div class="flex_between_v">
			<p>收货人姓名</p>
			<input type="text" v-model="name" placeholder="请输入收货人姓名"/>
		</div>
		<div class="flex_between_v">
			<p>联系电话</p>
			<input type="text" v-model="phone" placeholder="请输入联系方式"/>
		</div>
		<div class="flex_between_v">
			<p>所在区域</p>
			<div class="flex1" @click="show = true">
				<span>{{ address }}</span>
				<img src="@/assets/right@3x.png"/>
			</div>
		</div>
		<div class="flex_between_v">
			<p>详细地址</p>
			<input type="text" v-model="detail" placeholder="请输入详细地址"/>
		</div>
		<div class="bom_div">
			<div class="add">
				保存
			</div>		
		</div>
		<van-popup v-model="show" position="bottom" :overlay="true">
			<van-area :area-list="list" :item-height='itheight' @cancel='cancel' @confirm='confirm'/>
		</van-popup>
	</div>
</template>

<script>
	import addressList from '@/components/addressList'
	export default{
		name: 'pushadd',
		data () {
			return {
				show: false,
				itheight: 88,
				name: '',
				phone: '',
				address: '请选择所在区域',
				list: {'province_list': {}, 'city_list': {}, 'county_list': {}},					//地址列表
				detail: ''
			}
		},
		mounted () {
			this.list.province_list = addressList.province_list
			this.list.city_list = addressList.city_list
			this.list.county_list = addressList.county_list
		},
		methods: {
			//返回
		    onClickLeft () {
		        this.$router.push({path:'/addre'})
	       	},
	       	//地址取消
	       	cancel () {
	       		this.show = false
	       	},
	       	//地址确认
	       	confirm (e) {
	       		this.address = e[0].name + '/' + e[1].name + '/' + e[2].name
	       		this.show = false
	       	}
		}		
	}
</script>

<style scoped>
.flex_between_v{background: #fff;height: 1rem;margin-bottom: .1rem;padding: 0 .4rem;}
input{border: 0;font-size: .32rem;flex: 1;}
.flex1{flex: 1;display: flex;justify-content: space-between;}
img{width: .4rem;height: .4rem;}
p{color: #4A4A4A;font-size: .32rem;width: 1.6rem;margin-right: .4rem;}
span{color: #4A4A4A;font-size: .32rem;}
.bom_div{position: fixed;left: 0; bottom: 0;width: 100%;padding: .4rem 0;}
.add{display: block; background-image: linear-gradient(135deg, #FD944A 0%, #FD3D54 100%);border-radius: 126px;height: .88rem;line-height: .88rem;text-align: center;color: #fff;margin: 0 .3rem;font-size: .36rem;}
</style>