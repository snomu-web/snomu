<template>
	<div class="packge">
		<van-nav-bar title=""left-text="返回" left-arrow @click-left="onClickLeft"/>
    	<div class="box">
    		
    	</div>
	</div>
</template>
<script>
import { Toast } from 'vant'
import qs from 'qs'
export default {
  name: 'Integral',
  data() {
    return {
     titel:"体验版"
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
.box{
	width: 100%;
	height: 100%;
	background: url(../assets/bg_jifenxiangqing@2x.png);
}
</style>