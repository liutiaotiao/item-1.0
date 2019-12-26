<template>
  <div id="app" class="lhao">
    <div class="jieshao">
      <div class="jieshao_btn"  @click="JumpToOnlineService">联系客服，立即预约</div>
    </div>

    <!-- toast -->
    <div class="animated fadeInDown" style="position:fixed;left:50%;top: 40%;z-index:9999" v-show="visible">
      <div class="w-toast">{{msg}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "lianghao_book",
  data: function() {
    return {
      msg:'null',
      visible:false,
      appVersionInfo: [0, 0, 0],
    };
  },
  created: function() {
    this.getAppVersion()
  },
  methods: {
    getAppVersion(){
      let APP_VERSION = navigator.userAgent.match(/tuji\/([\d.]+)/i);
      if(APP_VERSION){
        let _version = APP_VERSION[1];//1.8.0
      this.appVersionInfo = [_version.substring(0,1),_version.substring(2,3),_version.substring(4,5)]
      }
      
    },
    show:function(msg){
      this.visible = true;
      this.msg = msg;
      setTimeout(() => {
        this.visible = false;
      }, 3000); 
    },
    JumpToOnlineService:function() {
      if(this.appVersionInfo[0]==1&&this.appVersionInfo[1]>=8){
        this.bridge.exec('jumpToOnlineService', {}, function(data) {})
      }else{
        this.show('请更新至最新版本，或前往个人中心联系客服哦~')
      }
    },
    
  }
};
</script>
<style lang="less" scoped>
.lhao{
  background: #0E0C0D;
  width:750px;
  height:1891px;
  background: #0E0C0D url("./images/jieshao.png") no-repeat 0 0;
  background-size: contain;
  position:relative;
  margin:0 auto;
  margin-bottom: 100px;
  
  .jieshao_btn{
    width:100%;
    height:100px;
    margin:0 auto;
    background:linear-gradient(-90deg,rgba(171,134,78,1) 0%,rgba(250,212,162,1) 100%);
    position:fixed;
    left: 0;
    bottom: 0;
    text-align: center;
    line-height: 100px;
    font-size:32px;
    font-family:PingFang SC;
    font-weight:bold;
    color:rgba(37,30,26,1);
  }
}
.w-toast{
    padding:20px 50px;
    position:relative;
    bottom:10px;
    background-color:rgba(216,183,131,.9);
    color:#000;
    font-size:28px;
    border-radius:100px;
    left: -50%;
    white-space: nowrap;
  }
</style>
