<template>
	<div class="mine">
		<van-nav-bar class='til' title="海汇"/>
		<div class="min_top flex_start">
			<div class="flex_between_v top_tel">
				<div class="flex_between_v">
					<img class="tx_img" src="@/assets/pic_touxiang@2x.png"/>
					<p class="phone_top">{{phoneSlice}}</p>					
				</div>
				<div class="">
					<div class="flex_start_v">
						<img class="star_img" src="@/assets/icon_star@3x.png"/>
						<p class="star_p">{{ userGradeName }}星会员</p>
					</div>
				</div>				
			</div>			
			<div class="min_sec">
				<div class="top_con">
					<div class="flex_between_v con_d1">
						<p class="">余额（元）</p>
						<router-link to='/turnou' class="flex_between_v">
							<img src="@/assets/btn_chongzhi@3x.png" style="width: 1.6rem; height: .6rem;"/>
							<p class="y_p1">转出</p>								
						</router-link>
					</div>
					<p class="y_p2">20000</p>
					<div class="flex_between_v marcon">
						<div class="flex1">
							<p class="y_p3">10000000</p>
							<p class="y_p4">累计购买(元)</p>
						</div>
						<div class="y_texcen flex1">
							<p class="y_p3">5500</p>
							<p class="y_p4">累计收益积分</p>
						</div>
						<div class="y_texrgh flex1">
							<p class="y_p3">500</p>
							<p class="y_p4">今日收益</p>
						</div>
					</div>
					<div class="flex_between_v ">
						<div class="flex1">
							<p class="y_p3">10000000</p>
							<p class="y_p4">购物积分</p>
						</div>
						<div class="y_texcen flex1">
							<p class="y_p3">5500</p>
							<p class="y_p4">转出积分</p>
						</div>
						<div class="y_texrgh flex1">
							<p class="y_p3">500</p>
							<p class="y_p4">期权</p>
						</div>
					</div>
				</div>
			</div>
			<router-link to='/myteam' class="flex_between_v list_div border0 pad0">
				<div class="flex_start_v">
					<img src="@/assets/tdicon@2x.png" style="width: .28rem; height: .34rem;"/>
					<p class="list_p1">神农牧币包</p>
				</div>
				<img src="@/assets/commone_btn_in@2x.png" class="right_img"/>
			</router-link>
		</div>
		<div class="min_list">
			<router-link to='/bill' class="flex_between_v list_div">
				<div class="flex_start_v">
					<img src="@/assets/icon_Shape@2x.png" style="width: .28rem; height: .34rem;"/>
					<p class="list_p1">我的账单</p>
				</div>
				<img src="@/assets/commone_btn_in@2x.png" class="right_img"/>
			</router-link>
			<router-link to='/team' class="flex_between_v list_div">
				<div class="flex_start_v">
					<img src="@/assets/icon_team@2x.png" style="width: .36rem; height: .34rem;"/>
					<p class="list_p1">团队情况</p>
				</div>
				<img src="@/assets/commone_btn_in@2x.png" class="right_img"/>
			</router-link>
			<router-link to='/peodata' class="flex_between_v list_div">
				<div class="flex_start_v">
					<img src="@/assets/icon_people@2x.png" style="width: .36rem; height: .34rem;"/>
					<p class="list_p1">个人资料</p>
				</div>
				<img src="@/assets/commone_btn_in@2x.png" class="right_img"/>
			</router-link>
			<router-link to='/addre' class="flex_between_v list_div border0">
				<div class="flex_start_v">
					<img src="@/assets/icon_shouhuo@2x.png" style="width: .36rem; height: .32rem;"/>
					<p class="list_p1">收货地址</p>
				</div>
				<img src="@/assets/commone_btn_in@2x.png" class="right_img"/>
			</router-link>
			<div class="flex_between_v list_div matop16" @click="show = true">
				<div class="flex_start_v">
					<img src="@/assets/icon_phone@2x.png" style="width: .32rem; height: .32rem;"/>
					<p class="list_p1">客服电话</p>
				</div>
				<p class="list_p1">400-1111-1111</p>
			</div>
			<router-link to='/setmine' class="flex_between_v list_div">
				<div class="flex_start_v">
					<img src="@/assets/icon_shezhi @2x.png" style="width: .36rem; height: .36rem;"/>
					<p class="list_p1">设置</p>
				</div>
				<img src="@/assets/commone_btn_in@2x.png" class="right_img"/>
			</router-link>
		</div>
		<!--电话弹出框-->
		<van-popup v-model="show">
			<p class="pop_p1">400-1111-1111</p>
			<div class="pop_bom">
				<p class="pop_p2" @click="show = false">取消</p>
				<a href="tel:400-1111-1111" class="pop_p2">呼叫</a>
			</div>
		</van-popup>
	</div>
</template>

<script>
	import { Toast } from 'vant'
	import qs from 'qs'
	export default({
		name: 'mine',
		data () {
			return {
				telephone: '11111111111',			//手机号
				buyOrderNum: 0,						//买入订单数
				cansaleOrder: 0,					//可卖出订单数
				freezeOrderNum: 0,					//冻结中订单数
				price: 0,							//冻结金额
				saleOrderNum: 0,					//卖出中订单数
				salePrice: 0,						//售出钱包
				scheduleMoney: 0,					//排单币
				scheduleProfit: 0,					//直推收益
				userGradeName: 0,					//用户会员名称
				show: false
			}
		},
		created () {
			this.getdeatil()
		},
		computed: {
			phoneSlice () {
				return this.telephone.slice(0,3) + '****' + this.telephone.slice(7,11)
			}
		},
		methods: {
			//账户资料
			getdeatil () {
				let that = this
		        that.$axios({
		      	  	url: '/api/app/walletInfo/getWalletInfo',
		       		method: 'POST',
		        	data: qs.stringify({
		          		userId: localStorage.getItem('userId')
		        	})
		      	}).then(res => {
			        if (res.data.code == 0) {
			          	that.telephone = res.data.data.telephone
			          	that.buyOrderNum = res.data.data.buyOrderNum
			          	that.cansaleOrder = res.data.data.cansaleOrder
			          	that.freezeOrderNum = res.data.data.freezeOrderNum
			          	that.price = res.data.data.price
			          	that.saleOrderNum = res.data.data.saleOrderNum
			          	that.salePrice = res.data.data.salePrice
			          	that.scheduleMoney = res.data.data.scheduleMoney
			          	that.scheduleProfit = res.data.data.scheduleProfit
			          	that.userGradeName = res.data.data.userGradeName
			        } else {
			          	Toast(res.data.msg)
			        }
		      	})
			},
			pass () {
				// 未设置二级密码
				// this.$router.push({path:'/secondLevel'})
				//已设置二级密码
				this.$router.push({path:'/secondnav'})
			}
		}
	})
</script>

<style scoped>
a{box-sizing: border-box;}
.border0{border: 0 !important;}
.pad0{padding: 0 !important;}
.matop16{margin-top: .16rem;}
.mine{position: relative;}
.min_top{background: #fff;width: 100%;color: #fff;display: flex;padding: 0 .3rem;margin-bottom: .16rem;}
.tx_img{width: .8rem;height: .8rem;margin-right: .14rem;}
.top_tel{height: .8rem;width: 100%; margin: .18rem 0;}
.phone_top{font-size: .36rem; color: #222222;}
.hy_img{width: .28rem;height: .28rem;}
.star_img{width: .56rem;height: .56rem; margin-right: -.28rem;z-index: 9;}
.star_p{background-image: linear-gradient(-135deg, #685B3E 100%, #232323 0%);border-radius: 30px;width: 1.76rem;height: .44rem;line-height: .44rem;text-align: center;font-size: .24rem;}
.font12{font-size: .24rem;}
.top_con{width: 100%;height: 100%;border-radius: 20px;background: url(../assets/bg_my@3x.png) 50% 0;background-size: 108% 108%; overflow: hidden;padding: .3rem .4rem;}
.flex_clu_v{display: flex;flex-direction: column;justify-content: space-between;flex: 1;}
.top_p1{font-size: .24rem;color: #666666;width: 1.7rem;}
.top_p2{color: #222222;}
.min_list{margin-bottom: .2rem;}
.list_div{height: .9rem;width: 100%;font-size: .3rem; border-bottom: 2px solid #E5E5E5;padding: 0 .3rem;background: #fff;}
.list_p1{color: #666666;margin-left: .1rem;}
.border0{border: 0;}
.right_img{width: .4rem; height: .4rem;}
.min_sec{width: 100%;height: 4rem;}
.con_d1{overflow: hidden;}
.y_p1{width: 1.2rem;height: .6rem;border:1px solid #fff;text-align: center;line-height: .6rem;border-radius: .6rem;margin-left: .3rem;color: #fff;}
.y_p2{font-size: .72rem;margin-bottom: .3rem;}
.y_p3{font-size: .32rem;}
.y_p4{font-size: .24rem;}
.y_texcen{text-align: center;}
.y_texrgh{text-align: right;}
.marcon{margin-bottom: .28rem;}
.flex1{flex: 1;}
/*弹窗*/
.van-popup{width: 6.34rem;height: 2.92rem; border-radius: 12px; text-align: center;border-radius: 24px;color: #222222;}
.pop_bom{position: absolute;bottom: 0;width: 100%;display: flex;height: 1rem;line-height: 1rem;border-top: 2px solid #E5E5E5;}
.pop_p1{margin: .76rem 0 .58rem 0;font-size: .44rem;color: #030303;}
.pop_p2{flex: 1;text-align: center;color: #4A4A4A;font-size: .32rem;}
.pop_bom p{border-right: 2px solid #E5E5E5;}
/*弹窗结束*/
</style>