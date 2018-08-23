<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
*{margin: 0;padding: 0;}
html{height: 100%;font-family: PingFangSC-Regular}
body{font-size:.28rem;height: 100%;color: #555555;background: #F5F5F5;}
div{box-sizing: border-box;}
a{text-decoration: none;color: #4A4A4A;}
#app {font-family: 'Avenir', Helvetica, Arial, sans-serif;height: 100%;width:100%;padding-top: .88rem;}
.flex_start{display: flex; justify-content: flex-start;flex-wrap: wrap;}
.flex_center_v{display: flex; justify-content: center;}
.flex_start_v{display: flex; justify-content: flex-start; align-items: center;}
.flex_end{display: flex; justify-content: flex-end;}
.flex_end_v{display: flex; justify-content: flex-end; align-items: center;}
.flex_between{display: flex; justify-content: space-between;}
.flex_between_v{display: flex; justify-content: space-between; align-items: center;}
.flex_around{display: flex; justify-content: space-around;}
.flex_around_v{display: flex; justify-content: space-around; align-items: center;}
.flex_center{display: flex; justify-content: center; align-items: center;}
.vertical_v{display: flex; align-items: center;}
.flex_c{display: flex;flex-direction: column; align-items: center;}
/*底部提交按钮样式*/
.peo_bom{background: #FFFFFF;position: fixed;bottom: 0;padding: .26rem .5rem;width: 100%;border-top: 1px solid #E5E5E5;}
.sub{width: 100%;height: .88rem;line-height: .88rem; background-image: linear-gradient(-90deg, #FF9400 0%, #FF6808 100%);border-radius: 44px;text-align: center;color: #fff;font-size: .32rem;}

/*弹窗样式*/
.van-toast--text{min-width: 4.4rem !important;font-size: .28rem !important;padding: .24rem !important;}
/*导航栏样式*/
.van-nav-bar{height: .88rem;line-height: .88rem;background-color: rgba(255,255,255,0.82);border-bottom: 1px solid #E5E5E5;position: fixed;top: 0;width: 100%;}
.van-nav-bar__title{font-size: .36rem !important;color: #222222;}
.van-nav-bar .van-icon{color: #222222;font-size: .28rem;}
.van-nav-bar__text{font-size: .24rem;color: #222222;}
.wallet .van-nav-bar,.integralTrans .van-nav-bar{position: fixed;top: 0;width: 100%;}
.til{background-image: linear-gradient(-90deg, #FF9400 100%, #FF6808 0%);}
.til .van-nav-bar__title{color: #fff;}
/*加载样式*/
.van-list__loading .van-loading{width:.32rem;height: .32rem;margin-right: .1rem;}
.van-list__loading-text{font-size: .26rem;line-height: 1rem;}
/*单选cell*/
.van-cell{padding:.4rem .3rem;font-size:.28rem;color:#222222;border-bottom: 2px solid #e5e5e5;line-height: normal;}
.van-cell:last-child{border: 0;}
.van-radio .van-icon-check{color: #DFDFDF;}
.van-radio .van-icon{font-size: .4rem;}
.van-radio__input{height: .4rem;}
.van-radio .van-icon-checked{color: #FF6A08;}
.buyinDetail .van-cell{padding:.26rem .3rem;font-size:.28rem;color:#222222;border:0;line-height: normal;}
.buyinDetail .van-cell__value--alone{color: #666666;}
/*卖出列表单选*/
.saleorder .van-tabs{position: fixed;top: .88rem;z-index: 5;}
.saleorder .van-radio{background: #fff;margin-top: .2rem;padding: 0 .3rem;position: relative;color: #999999;font-size: .24rem;}
.saleorder .van-radio__label{width: 100%;margin-left: 0;line-height: normal;}
.saleorder .van-radio__input{position: absolute;top: .15rem;left: .3rem;}
/*地址页单选*/
.addre .van-radio__input{height: .4rem;margin-left: .3rem;position: absolute;bottom: .18rem;}
.addre .van-radio .van-icon{font-size: .38rem;}
.addre .van-radio .van-icon-checked{color: #FF5651;}
.addre .van-radio__label{width: 100% !important;line-height: normal;}
.addre .van-radio{overflow: inherit;}
/*选择器*/
.van-picker-column li{padding: 0 .1rem !important;}
.van-picker-column{font-size: .4rem !important;}
.van-picker__toolbar{height: .8rem !important;line-height: .8rem !important;}
.van-hairline--top-bottom::after{border-width:.02rem 0 !important;}
.van-picker__cancel, .van-picker__confirm{padding: 0 .3rem !important;color: #000 !important;}
.van-toast--text{min-width: 4.4rem !important;font-size: .28rem !important;padding: .24rem !important;}

/*步进器组件*/
.van-stepper__minus, .van-stepper__plus{
	width: 0.48rem!important;
	height: 0.48rem!important;
}
.van-stepper__input{
	width: 0.8rem!important;
	height: 0.48rem!important;
	font-size: 0.28rem!important;
}
.van-stepper{
	width: 1.8rem!important;
	height: 0.48rem!important;
}
.van-stepper__minus::before, .van-stepper__plus::before{
	width: .18rem;
  height: 2px;
}
.van-stepper__minus::after, .van-stepper__plus::after {
    width: 2px;
    height: .18rem;
}
/*购物车结算组件*/
.van-submit-bar{
	bottom: 1rem;
	padding: 0 0.2rem;
}
.van-submit-bar__bar{
	height: 1.2rem;
	font-size: 0.28rem;
}
.van-submit-bar__price-decimal{
	font-size: 0.28rem;
}
.van-submit-bar .van-button{
	width: 2rem;
	height: 0.88rem;
	border-radius: 100px;
	font-size: 0.32rem;
}
.van-checkbox__icon .van-icon{
	width: 0.32rem;
	height: 0.32rem;
	font-size: 0.24rem;
	line-height: 0.32rem;
}
.van-button--danger{
	background-image: linear-gradient(135deg, #FD944A 0%, #FD3D54 100%);
	border: 0;
}
/*多选*/
.commodity .van-checkbox__icon--round{height: .84rem;}
.commodity .van-checkbox__label{position: relative;display: block;}
.commodity .van-checkbox__icon,.commodity  .van-checkbox__label{line-height: normal;}
.van-checkbox__icon--checked .van-icon{border-color: #FD3D54;background-color: #FD3D54;}
/*默认弹窗*/
.van-dialog{font-size: .32rem;border-radius: .08rem;}
.van-dialog__message{padding: .6rem .4rem;font-size: .4rem;color: #030303;}
.van-button--large{height: 1rem;line-height: .96rem;border-radius:.06rem;}
.van-button{font-size: .32rem;}
.van-dialog__confirm, .van-dialog__confirm:active{color: #4A4A4A;}
.van-button--default{border: 1px solid #e5e5e5 !important;}
.van-loading--black{width: .4rem;height: .4rem;}
.van-field .van-cell__title{max-width: 1.8rem;}
.outjf .van-cell, .outye .van-cell{padding: .8rem .3rem;font-size: .36rem;display: flex;align-items: center;}
/*标签样式*/
.van-tabs--line{height: .88rem;width: 100%;}
.van-tabs--line .van-tabs__wrap{height: .88rem;}
.van-tabs__wrap--scrollable .van-tab{flex: 0 0 33.4%;}
.van-tab{opacity: 0.8;}
.van-tab{font-size:.28rem;line-height:.88rem;}
.top_tab .van-hairline--top-bottom::after{border: 0;}
.team .van-tabs__line{height: 0 !important;}
.team .van-tabs__wrap--scrollable .van-tabs__nav{}
.team .van-tab{color: #222222;font-size: .32rem;}
.team .van-tab--active{color: #222222;font-size: .4rem;border-left: .02rem solid #EEEEEE;border-right: .02rem solid #EEEEEE;}
</style>
