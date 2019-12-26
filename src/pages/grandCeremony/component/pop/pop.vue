<style lang="less" scoped>
.pop-curt{
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, .7);
  position: fixed;
  left: 0;
  top: 0;
  z-index:6;
}
.pop_union{
  position: absolute;
  top: 250px;
  left: 50%;
  transform: translateX(-50%);
  margin-left:6px;
  // width: 687px;
  width: 515px;
  height: 532px;
  background: url('../../images/aaimg-popup/gonghuizhan.png') no-repeat 0 0;
  background-size: cover;
}
.pop-close{
  width: 60px;
  height: 60px;
  position: absolute;
  right: 0;
  top: 0;
}
.pop_union_ok{
  width: 420px;
  height: 110px;
  position: absolute;
  top: 260px;
  left: 50px;
}
.pop_ticket{
  background-image: url('../../images/aaimg-popup/niandupiao.png');
}
.pop_schedule{
  background-image: url('../../images/aaimg-popup/weikaiqi.png');
}
.pop_integral{
  background-image: url('../../images/aaimg-popup/niandujifen.png');
}
.pop_succ{
  background-image: url('../../images/aaimg-popup/lingqu-success.png');
}
// background: #FFCD81;
.pop_succ_title{
  margin-top: 180px;
  font-size: 34px;
  font-weight: 500;
  color: #a5905d;
  line-height:58px;
  text-align: center;
}
.pop_succ_txt{
  font-size:38px;
  font-weight: bold;
  color: #FFCD81;
  line-height:58px;
  text-align: center;
}
.pop_succ_ok{
  width: 420px;
  height: 110px;
  position: absolute;
  top: 320px;
  left: 10px;
}
.pop_fail{
  background-image: url('../../images/aaimg-popup/linqu-error.png');
}
.pop_fail-phone{
  background-image: url('../../images/aaimg-popup/lingqu-error-phone.png')
}
.pop_bind_phone{
  width: 400px;
  height: 90px;
  position: absolute;
  top: 270px;
  left: 80px;
    // background: rgba(255,255,4,0.3);
}
.pop_know{
  top: 380px;
}
// .pop_nostart{
//   width: 750px;
//   font-size: 36px;
//   color: #CDAE68;
//   text-align: center;
//   position: absolute;
//   top: 50%;
//   margin-left: -100px;
// }

</style>
<template>
  <div class='pop-curt' v-show='popStauts'>
    <!-- <div class='pop-curt-next' v-show='popStauts'> -->
      <!-- 工会战未开启 -->
      <div class='pop_union' v-show='popUnio'>
        <div class="pop-close" @click='onClosePop("popUnio")'></div>
        <div class="pop_union_ok" @click='onClosePop("popUnio")'></div>
      </div>

      <!-- 年度票领取规则 -->
      <div class='pop_union pop_ticket' v-show='popTicket'>
        <div class="pop-close" @click='onClosePop("popTicket")'></div>
      </div>
      
      <!-- 赛程未开始 -->
      <div class='pop_union pop_schedule' v-show='popSchedule'>
        <div class="pop-close" @click='onClosePop("popSchedule")'></div>
      </div>

      <!-- <p class='pop_nostart' v-show='popSchedule'>该赛程尚未开始</p> -->

      <!-- 年度积分 -->
      <div class='pop_union pop_integral' v-show='popIntegral'>
        <div class="pop-close" @click='onClosePop("popIntegral")'></div>
      </div>

      <!-- 领取成功 -->
      <div class='pop_union pop_succ' v-show='popSucc'>
        <div class="pop-close" @click='onClosePop("popSucc")'></div>
        <p class='pop_succ_title'>恭喜您获得</p>
        <p class='pop_succ_txt'>{{pop_succTxt}}</p>
        <div class="pop_succ_ok" @click='onClosePop("popSucc")'></div>
      </div>

      <!-- 领取失败 本日没充值-->
      <div class='pop_union pop_fail' v-show='popFail'>
        <div class="pop-close" @click='onClosePop("popFail")'></div>
        <div class="pop_succ_ok" @click='onClosePop("popFail")'></div>
      </div>

      <!-- 领取失败 phone 问题 -->
      <div class='pop_union pop_fail-phone' v-show='popFailPhone '>
        <div class="pop-close" @click='onClosePop("popFailPhone")'></div>
        <div class="pop_bind_phone" @click="onBindPhone"></div>
        <div class="pop_bind_phone pop_know" @click='onClosePop("popFailPhone")'></div>
      </div>

    <!-- </div> -->
    

  </div>
</template>
<script>
export default {
  name: 'pop',
  data() {
    return {

      userInfo:{},


      popStauts: false,

      popUnio: false, // 工会战
      popTicket: false, // 年度票
      popSchedule: false, //赛程未开始
      popIntegral: false, // 年度积分
      popSucc: false,  // 领取成功
      popFail: false,   //领取失败 没充值
      popFailPhone: false,  //领取失败，没绑定手机

      pop_succTxt: '',  // 奖励名字

      userInfo:{}
    }
  },
  created() {
  
  },
  methods:{
    rewardTxt(str) {
      this.pop_succTxt = str
    },
    showPop(str) {
      this[str] = true
      this.popStauts = true
    },
    onClosePop(str) {
      this[str] = false
      this.popStauts = false
    },
    // 绑定手机
    onBindPhone() {
      if(!this.userInfo.mobile){
        this.bridge.exec('bindPhoneWithType',{type:'1'},  data => {
          this.onClosePop('popFailPhone')
        })
      }
    }
  }
}
</script>