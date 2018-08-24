<template>
	<div class="unopened">	
		<van-nav-bar
		  title=""
		  left-text="返回"
		  left-arrow
		  @click-left="onClickLeft"
		  
		/>
		<img src="@/assets/unopened.png"/>
		<p>功能暂未开放，尽请期待吧～</p>
	</div>
</template>

<script>
	export default({
		name: 'unopened',
		methods :{
		onClickLeft(){
	    	history.go(-1)
	    },
	}
	})
	
	
</script>

<style scoped>
.unopened{text-align: center;font-size: .3rem;color: #888888;height: 100%;background: #fff;}
img{
	width: 4.2rem;
	height: 4.2rem;
	margin-top: 1.4rem;
	margin-bottom: 0.4rem;
	}
</style>