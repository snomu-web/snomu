<template>
	<div class="storeList">
		<van-nav-bar title="线上商城" left-text="返回" left-arrow @click-left="onClickLeft" />
		<div class="store-box">
			<ul>
				<li v-for="item in items" @click="goGoods(item.itemId)">
					<!--<router-link to="goodDetails">-->
						<div class="storeimg">
							<img :src="item.itemUrlNew"/>
						</div>
						<div class="store-details">
							<p>{{item.itemDescribe}}</p>
						</div>
						<span class="money">
							¥{{item.price}}
						</span>								
				</li>
				<li>
					<div class="storeimg">
						<img src="../assets/hcicon@3x.png"/>
					</div>
					<div class="store-details">
						<p>fj加深对佛刻录机 死定了房间饭就色东方</p>
					</div>
					<span class="money">
						¥13
					</span>
				</li>
				<li>
					<div class="storeimg">
						<img src="../assets/hcicon@3x.png"/>
					</div>
					<div class="store-details">
						<p>fj加深对佛刻录机 死定了房间饭就色东方</p>
					</div>
					<span class="money">
						¥14
					</span>
				</li>
				
			</ul>
		</div>
	</div>
</template>

<script>
	import qs from 'qs'
	export default {
		name: "integralTrans",
		data() {
			return {
				items:[],
				itemUrlNew:"",
			}
		},
		created() {
			this.gain()
		},
		methods: {		
			onClickLeft() {
				history.go(-1)
			},
			gain(){
				this.$axios({
			        url: '/api/app/item/queryItem',
			        method: 'POST',
			        data: qs.stringify({
			          pageNum: 1
			        })
			      }).then(res => {
			        if (res.data.code == 0) {
			        	var imgs  =res.data.data[2].itemUrlNew
			        	let arr = imgs.split(",")
			        	this.itemUrlNew = arr[0]
			          	this.items = res.data.data
			        } else {
			          Toast(res.data.msg || '查询失败')
			        }
			      })
			},
			goGoods(id){
				
				this.$router.push({path:'/goodDetails',query:{'id':id}});
				console.log(id)
			}
		}
	}
</script>

<style>
*{
	
}
.storeList{
	width: 100%;
	height: 100%;
	background-color: #FAFAFC;
}
.store-box{
	width: 100%;
	height: 100%;
}
.store-box ul{
	height: 100%;
	margin: 0 0.2rem;
}
.store-box ul li{
	display: block;
	float: left;
	width: 3.4rem;
	height: 3.6rem;
	margin: 0.05rem 0.05rem;
	background-color: #FFFFFF;
}
.storeimg{
	width: 100%;
	height: 2.2rem;
}
.storeimg img{
	width: 100%;
	height: 100%;
}
.store-details{
	width: 100%;
	background-color: #FFFFFF;
}
.store-details p{
	font-size: 0.24rem;
	color: #555555;
	height: 0.64rem;
	line-height: 0.32rem;
	margin: 0.2rem 0.38rem 0.1rem 0.2rem;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
	overflow: hidden;
}
.money{
	margin-left: 0.2rem;
	font-size: 0.28rem;
	color: #FF5651;
	letter-spacing: 0;
	text-align: left;
	line-height: 0.28rem;
}
</style>