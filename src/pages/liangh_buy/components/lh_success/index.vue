<template>
  <div id="app" class="lhbuy_success">
    <div class="lhbuy_icon"></div>
    <div class="lhbuy_title">购买靓号成功</div>
    <div class="lhbuy_desc">可前往【我的靓号】进行绑定或赠送</div>
    <div class="lhbuy_my" @click="getBuyshow">我的靓号</div>
    <div class="lhbuy_back"  @click="showTip">返回</div>

  </div>
</template>
        
<script>
export default {
  name: "lhbuy_success",
  props: {
    visible: Boolean,
    sid: String,
  },
  data: function() {
    return {
      isTipShow: false,
    };
  },
  created:function(){
  	
  },
  methods: {
    showTip: function() {
      this.$emit('visible', false)
      this.$emit('dataName', 99)
    },
    getBuyshow: function(diamond) {
      let url=window.location.origin+'/static/v3/m/my_lianghao.html';
      this.bridge.exec('openUrl',{url:url,type:'0'},function(data) {})
    },
    getLianghaoShow: function(diamond) {
      let url=window.location.origin+'/static/v3/m/lianghao.html';
      this.bridge.exec('openUrl',{url:url,type:'0'},function(data) {})
    }
  }
};
</script>
<style src="./index.less" lang="less" scoped></style>
