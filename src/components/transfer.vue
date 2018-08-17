<template>
	<div class="Transfer">
		<van-nav-bar title="转账"left-text="返回" left-arrow @click-left="onClickLeft" />
    	<div class="account">
    		<div class="me">
    			对方账户
    		</div>
    		<input class="adverse" placeholder="请输入您要转入的手机号">
    			
    		
    	</div>
    	<div class="hint">
    		温馨提示：请确认待转入账户（手机号）的准确性，完成转账将无法退
    	</div>
    	<button>下一步</button>
	</div>
</template>
<script>
import { Toast } from 'vant'
import qs from 'qs'
export default {
  name: 'Transfer',
  data() {
    return {
     
    }
  },
  mounted() {
    
  },
  computed: {},
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
  }
}
</script>
<style scoped="scoped">
.account{
	width: 100%;
	height: 2.4rem;
	background-color: #F7FAFD;
}
.me{
	box-sizing: border-box;
	margin-left: 48px;
	font-size: 0.32rem;
	color: #222222;
	height: 1.28rem;
	line-height: 1.28rem;
}
.adverse{
	box-sizing: border-box;
	border: none;
	background-color: #F7FAFD;
	margin-left: 48px;
	font-size: 0.4rem;
	color: #9E9E9E;
}
.hint{
	font-size: 26px;
	color: #777777;
	line-height: 40px;
	box-sizing: border-box;
	margin: 0 48px;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
	overflow: hidden;
}
button{
	width: 6.7rem;
	height: 0.88rem;
	border-radius: 0.44rem;
	margin: 0 auto;
	margin-top: 94px;
	display: block;
	border: none;
	font-size: 36px;
	color: #FFFFFF;
	text-align: center;
	background:linear-gradient(to right,#fd904a,#fd4553)
}
</style>