<template>
  <div id="app" class="lhao">
    <div class="bg">
      <div class="bg_btn" @click="getUrl"></div>
    </div>
  </div>
</template>
        
<script>
export default {
  name: "lianghao_book",
  data: function() {
    return {
    };
  },
  created: function() {
  },
  methods: {
    getUrl: function() {
      let url=window.location.origin+'/static/v3/m/lianghao_act.html?check='+this.itemtype;
      this.bridge.exec('openUrl',{url:url,type:'0'},function(data) {})
    },
  }
};
</script>
<style lang="less" scoped>
.lhao{
  .bg{
    width:750px;
    height:4971px;
    background: url("./images/bg.png") no-repeat 0 0;
    background-size: contain;
    position:relative;
    margin:0 auto;
    .bg_btn{
      width:320px;
      height:67px;
      background: url("./images/btn.png") no-repeat 0 0;
      background-size: contain;
      position:absolute;
      left: 226px;
      top: 1129px;
    }
  }
}
  
</style>
