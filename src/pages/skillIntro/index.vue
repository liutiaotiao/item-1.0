<template>
  <div id="app" class="skill_intro_page">
    <div class="item">
      <span class="title">技能是什么？</span>
      <span class="txt">技能是用户可以提供的线上服务</span>
    </div>
    <div class="item">
      <span class="title">如何获得技能？</span>
      <span class="txt"
        >【添加技能】-选择可以提供的技能服务，根据系统提示上传填写相关信息，等待官方审核，联系运营可加快审核结果。</span
      >
    </div>
    <div class="item">
      <span class="title">技能开启状态</span>
      <span class="txt"
        >技能开启后，会在【个人主页】、【聊天信息】、【约呗】列表展示技能服务；如果想隐藏自己的技能，可将技能设为未开启状态。</span
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'skillIntro'
}
</script>
<style lang="less" scoped>
.skill_intro_page {
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
