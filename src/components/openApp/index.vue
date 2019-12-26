<template>
  <div class="open-app-component">
    <div class="app_info">
      <img src="./images/logo.png" alt="logo" class="app_logo" />
      <div class="txt_wrap">
        <span class="txt1">兔几直播-遇见最美的Ta</span>
        <span class="txt2">更多精彩 点击打开APP</span>
      </div>
    </div>
    <div class="open_btn" id="downloadButton">打开</div>
  </div>
</template>
<script>
import shareInstall from '../../utils/shareInstall.js'
export default {
  name: 'openApp',
  data: function() {
    return {}
  },
  created() {
    shareInstall('downloadButton')
  },
  methods: {}
}
</script>

<style lang="less" scoped>
.open-app-component {
  width: 750px;
  height: 120px;
  background: rgba(1, 1, 1, 1);
  opacity: 0.8;
  position: absolute;
  left: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 30px;
  z-index: 100;
  .app_info {
    display: flex;
  }
  .app_logo {
    width: 82px;
    height: 82px;
    border-radius: 14px;
  }
  .txt_wrap {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;
    padding-left: 20px;
  }
  .txt1 {
    font-size: 28px;
    font-family: PingFang SC;
    font-weight: bold;
    color: rgba(255, 255, 255, 1);
    padding-bottom: 10px;
  }
  .txt2 {
    font-size: 24px;
    font-family: PingFang SC;
    font-weight: 500;
    color: rgba(204, 204, 204, 1);
  }
  .open_btn {
    width: 117px;
    height: 51px;
    line-height: 51px;
    text-align: center;
    border: 2px solid rgba(255, 219, 1, 1);
    border-radius: 26px;
    font-size: 26px;
    font-family: PingFang SC;
    font-weight: bold;
    color: rgba(255, 213, 12, 1);
  }
}
</style>
