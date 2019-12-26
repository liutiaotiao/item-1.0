<template>
  <div id="app" class="star_intro_page">
    <div class="item">
      <span class="title">星动是什么？</span>
      <span class="txt">星动是【兔几直播】交友体系的货币单位。赚取的星动可直接提现。</span>
    </div>
    <div class="item">
      <span class="title">如何获得星动？</span>
      <span class="txt"
        >用户在【约呗】添加您为好友时，送出的交友礼物所产生的返点。</span
      >
    </div>
    <div class="item">
      <span class="title">如何提现？</span>
      <span class="txt"
        >在【我的】页面，点击【我的技能】进入到【我的技能】页面，点击“提现”按钮进入【提现】页面；绑定提现微信和手机号后，即可输入金额进入提现流程。</span
      >
    </div>
    <div class="item">
      <span class="title">提现多久到账？</span>
      <span class="txt">提现申请后，1-3个工作日到账，如遇节假日，到账时间可能会出现延迟，请耐心等待。</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'starIntro'
}
</script>
<style lang="less" scoped>
.star_intro_page {
  padding: 40px 30px;
  .item {
    margin-bottom: 50px;
  }
  .title {
    font-size: 30px;
    font-family: PingFang SC;
    font-weight: bold;
    color: rgba(34, 34, 34, 1);
    display: block;
    padding-bottom: 15px;
  }
  .txt {
    font-size: 28px;
    font-family: PingFang SC;
    font-weight: 500;
    color: rgba(102, 102, 102, 1);
    line-height: 40px;
  }
}
</style>
