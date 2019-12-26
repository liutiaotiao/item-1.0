<style lang="less" scoped>
.reward-warp{
  width: 100%;
}
.reward-nav{
  width: 707px;
  height: 96px;
  background: url('../../images/aaaimg-reward/re.png') no-repeat 0 0;
  background-size: cover;
  margin: 30px auto;
  position: relative;
  .reward_nav0{
    position: absolute;
    left: 0;
    top: 0;
    width: 230px;
    height: 96px;
    // background-color:rgba(233, 111, 23, 0.4);
    z-index:1;
  }
  .reward_nav1{
    width: 230px;
    height: 96px;
    // background-color:rgba(1, 233, 1, 0.4);
    position: absolute;
    left: 230px;
    top: 0;
    z-index:1;
  }
  .reward_nav2{
    width: 246px;
    height: 96px;
    // background-color:rgba(2, 0, 111, 0.4);
    position: absolute;
    left: 460px;
    top: 0;
    z-index:1;
  }
}
.reward-nav_list{
  width: 750px;
  margin:0 auto;
}
.reward-nav_list0{
  width: 750px;
  height: 7060px;
  background: url('../../images/aaaimg-reward/top3.png') no-repeat 0 0;
  background-size: cover;
}
.reward-nav_list1{
  width: 750px;
  height: 4497px;
  background: url('../../images/aaaimg-reward/no-top3.png') no-repeat 0 0;
  background-size: cover;
}
.reward_btn{
  width: 260px;
  height: 96px;
  background: no-repeat 0 0;
  background-size: cover;
  position: absolute;
}
.reward_nav-btn0{
  background-image: url('../../images/aaaimg-reward/re_btn0.png');
  left: 0;
  top: 0;
}
.reward_nav-btn1{
  width: 253px;
  background-image: url('../../images/aaaimg-reward/re_btn1.png');
  left: 220px;
  top: 0;
}
.reward_nav-btn2{
  width: 261px;
  height: 95px;
  background-image: url('../../images/aaaimg-reward/re_btn2.png');
  left: 460px;
  top: 0;
}
.reward-nav_list3{
  width: 750px;
  height: 5203px;
  background: url('../../images/aaaimg-reward/fuhao-top3.png') no-repeat 0 0;
  background-size: cover;
}
  
</style>
<template>
  <div class='reward-warp'>
    <div class='reward-nav'>
      <div v-for='(i,index) in 3' :key='i' :class="['reward_nav'+index]" @click='rewardIndex = index'></div>
      <div v-for='(i,index) in 3' :key='i+"_"+i' :class="['reward_btn reward_nav-btn'+index]" v-show='rewardIndex === index'></div>
    </div>
    <div class='reward-nav_list'>
      <div class='reward-nav_list0' v-show='rewardIndex === 0'></div>
      <div class='reward-nav_list1' v-show='rewardIndex === 1'></div>
      <div class='reward-nav_list3' v-show='rewardIndex === 2'></div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'reward',
  data() {
    return {
      rewardIndex:0
    }
  }
}
</script>