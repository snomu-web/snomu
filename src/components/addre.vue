<template>
	<div class="addre">
		<van-nav-bar title="收货地址" left-text="返回" left-arrow @click-left="onClickLeft"/>
		<van-radio-group v-model="radio" class='mabom18'>
		    <van-radio :name="item.id" class='top_ul' v-for='(item, index) in list' :key='index'>
		  		<div class="top_li2">
		  			<p class="top_p1">{{ item.name }} {{ item.phone }}</p>
		  			<p class="top_p2 maboto">{{ item.province }}{{ item.city }}{{ item.region }}</p>
		  			<p class="top_p2">{{ item.shippingAddress }}</p>
		  		</div>
		  		<div class="top_li1 flex_between_v">
		  			<p @click.stop="moren(item.id)">默认地址</p>
		  			<div class="flex_between_v">
		  				<p class="flex_between_v" @click="editLink(JSON.stringify(item))"><img class="bianji" src="@/assets/btn_bianji@2x.png"/><span class="top_span">编辑</span></p>
		  				<p class="flex_between_v malef6" @click.stop="del(item,$event)"><img class="shanchu" src="@/assets/btn_shanchu@2x.png"/><span class="top_span">删除</span></p>
		  			</div>
		  		</div>
		    </van-radio>
		</van-radio-group>
		<div class="bom_div">
			<router-link to='/pushadd' class="add">
				添加新地址
			</router-link>		
		</div>
		<!--删除框-->
		<van-popup v-model="delshow">
				<p class="pop_p1">执行删除后将无法还原，请<br/>您谨慎删除～</p>
			<div class="flex_start_v">
				<p class="pop_p2" @click="delshow = false">取消</p>
				<p class="pop_p3" @click='deladd'>确认</p>
			</div>
		</van-popup>
	</div>
</template>

<script>
	import { Toast } from 'vant'
	import qs from 'qs'
	export default({
		name: 'addre',
		data () {
			return {
				list: [],					//地址列表
				radio: '',					//选中项
				delshow: false,				//弹窗
				addId: ''					//地址id
			}
		},
		created () {
			this.get()
		},
		methods: {
			//返回
		    onClickLeft () {
		        this.$router.push({path:'/mine'})
	        },
	        //编辑
			editLink (e) {
				this.$router.push({path:'/addedit',query:{'item': e}})
			},
			//获取地址列表
			get () {
	       		let that = this
				that.$axios({
			        url: '/api/app/shopAddress/queryAddress',
			        method: 'POST',
			        data: qs.stringify({
			        	userId: localStorage.getItem('userId')
			        })
			    }).then(res => {
			    	if(res.data.code == 0){
			    		that.list = res.data.data
			    		for (let i = 0; i < res.data.data.length; i++) {
			    			if (res.data.data[i].isDefault == 1) {
			    				that.radio = res.data.data[i].id
			    				return false
			    			}
			    		}
			    	}else{
			    		Toast(res.data.msg)		    		
			    	}
			    })
	       	},
	       	//设置默认地址
	       	moren (e) {
	       		let that = this
				that.$axios({
			        url: '/api/app/shopAddress/onlyAddress',
			        method: 'POST',
			        data: qs.stringify({
			        	userId: localStorage.getItem('userId'),
			        	id: e
			        })
			    }).then(res => {
			    	if(res.data.code == 0){			    		
			    		Toast(res.data.msg)
			    		that.radio = e
			    	}else{
			    		Toast(res.data.msg)		    		
			    	}
			    })
	       	},
	       	//删除地址弹窗
	       	del (e) {
	       		
	       		this.delshow = true
	       		this.addId = e.id
	       	},
	       	//删除确认
	       	deladd () {
	       		let that = this
				that.$axios({
			        url: '/api/app/shopAddress/deleteAddress',
			        method: 'POST',
			        data: qs.stringify({
			        	id: that.addId
			        })
			    }).then(res => {
			    	if(res.data.code == 0){
			    		this.delshow = false
			    		that.get()
			    	}else{
			    		Toast(res.data.msg)		    		
			    	}
			    })
	       	}
		}
	})
</script>

<style scoped>
.malef6{margin-left: .6rem;}
.mabom18{margin-bottom: 1.85rem;}
.top_ul{position: relative;display: flex;background: #fff;margin-bottom: .2rem;min-height: 2.8rem;}
.top_li1{height: .82rem;padding-right: .3rem;padding-left: .8rem;border-top: 2px solid #E5E5E5;}
.top_li2{padding: .3rem .4rem;width: 100%;background: #fff;border-top: 2px solid #EEEEEE;}
.top_p1{font-size: .32rem;color: #000000;}
.top_p2{font-size: .28rem;color: #4A4A4A;}
.top_span{margin-left: .06rem;color: #777777;font-size: .26rem;}
.bom_div{position: fixed;left: 0; bottom: 0;width: 100%;padding: .4rem 0;}
.bom_li{ width: 6.9rem;height: .88rem;background: #005BAB;border-radius: 8px;margin: auto;}
.bom_p{flex: 1;color: #fff;text-align: center;}
.van-popup{width: 5.7rem;height: 3rem;border-radius: 12px;text-align: center;}
.pop_p1{font-size: .32rem;color: #4A4A4A;height: 2.12rem;line-height:.48rem;padding-top: .4rem; box-sizing: border-box; border-bottom: 2px solid #eee;}
.pop_p2{flex: 1;border-right: 2px solid #EEEEEE;font-size: .32rem;color: #4A4A4A;height: .86rem;line-height: .86rem;}
.pop_p3{flex: 1;color: #888888;font-size: .32rem;height: .86rem;line-height: .86rem;}
.add{display: block; background-image: linear-gradient(135deg, #FD944A 0%, #FD3D54 100%);border-radius: 126px;height: .88rem;line-height: .88rem;text-align: center;color: #fff;margin: 0 .3rem;font-size: .36rem;}
.bianji{width: .32rem;height: .32rem;}
.shanchu{width: .36rem;height: .32rem;}
.maboto{margin-top: .2rem;margin-bottom: .1rem;}
</style>