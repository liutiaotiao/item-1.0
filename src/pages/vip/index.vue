<style lang="less" scoped>
  .vip-wrap{
    height: calc(100vh - 100px);
    overflow-x: hidden;
    overflow-y: auto;
    position: relative;
    background-color: #fff;
    // -webkit-overflow-scrolling: touch
  }
  .vip-pic1{
    width: 750px;
    height: 1167px;
    background: url('./images/1.png') no-repeat 0 0;
    background-size: cover;
    margin:0 auto;
  }
  .vip-pic2{
    width: 750px;
    height: 1367px;
    background: url('./images/2.png') no-repeat 0 0;
    background-size: cover;
    margin:0 auto;
  }
  .vip-pic3{
    width: 750px;
    height: 1457px;
    background: url('./images/3.png') no-repeat 0 0;
    background-size: cover;
    margin:0 auto;
  }
  .vip-header{
    position: absolute;
    top: 106px;
    left: 0;
    width: 100%;
  }
  .vip-ava{
    width: 97px;
    height: 97px;
    background-image: url('./images/tujimoren.png');
    background-repeat: no-repeat;
    background-position: 0 0;
    background-size: cover;
    border: 2px solid #fff;
    border-radius: 50%;
    margin:0 auto;
    box-sizing: border-box;
  }
  .vip-name{
    margin-top: 3px;
    text-align: center;
    height:52px;
    line-height:52px;
    font-size:30px;
    font-weight:bold;
    color: #7C4D11;
  }
  .vip-name-open{
    color:rgba(255,32,74,1);
  }
  .vip-desc{
    height:46px;
    line-height: 46px;
    font-size:28px;
    font-weight:500;
    color:rgba(112,60,0,1);
    text-align: center;
  }
  .vip-footer-btn{
    position: fixed;
    left: 0;
    bottom: 0;
    text-align: center;
    height: 100px;
    line-height: 100px;
    width: 100%;
    background-image: linear-gradient(to right, #fbe8af , #f7c967);
    font-size:32px;
    color: #723D01;
    font-weight:bold;
  }
  .vip-zs{
    &:before{
      content: '';
      display: inline-block;
      width: 40px;
      height: 32px;
      background: url('./images/hy.png') no-repeat 0 0;
      background-size: cover;
      vertical-align: middle;
      margin-right: 17px;
      position: relative;
      top:-4px;
    }
  }
  
</style>

<template>
<div  id="app">
  <div class="vip-wrap">
    <div class="vip-pic1"></div>
    <div class="vip-pic2"></div>
    <div class="vip-pic3"></div>
    <div class="vip-header">
      <div class="vip-ava"></div>
      <p class="vip-name" :class='{"vip-name-open": vipFlag}'>{{name}}</p>
      <div class="vip-desc" :class='{"vip-zs": vipFlag}'>{{vipFlag? '会员到期时间: ' + vipDate : '立即开通会员，尊享专属特权'}}</div>
    </div>
    <footer class="vip-footer-btn" @click="onVip">{{vipFlag ? '续费VIP会员' : '开通VIP会员'}}</footer>
  </div>
</div>
</template>
<script>

export default {
  name: "vip",
  data() {
    return {
      sid:'',
      vipFlag: false,
      vipDate:'',
      name:''
    }
  },
  created() {
    this.bridgeMethod()
    this.bridge.exec('needWakeUp', {
      type:1 
    }, function() {})
    window.webviewWakeUp = msg => {
      this.bridgeMethod()
    }
  },
  mounted() {
    
  },  
  methods:{
    bridgeMethod() {
      this.bridge.exec('getUserInfo', data => {
        if(!data.sid) {
          bridge.exec('invokeNativeLoginEvent', function(data) {}); 
          return
        }
        this.sid = data.sid
        this.getVipInfo(data.sid)
      })
    },
    async getVipInfo(sid) {
      let data = await this.$http(`/user/info?debug&sid=${sid}`)
      this.name = data.nickname

      if(data.vip && data.vip.status == 0) {
        this.vipFlag = true
        this.vipDate = this.timeFormat(data.vip.endTime)
      }else{
        this.vipFlag = false
      }
    },
    onVip() {
      
      this.bridge.exec('onCallNativeVipBuy', {
        message: this.vipFlag? 1 : 0
      }, function() {})


      // this.bridge.exec('jumpToLuckyPacket', {}, function() {})
    },
    timeFormat(time) {
      if(!time) return ''
      const date = new Date(time * 1000)
      const year = date.getFullYear()
      const month = date.getMonth() + 1 >= 10 ? date.getMonth()+ 1 : '0' + (date.getMonth() + 1)
      const day = date.getDate() >= 10 ? date.getDate() : '0' + date.getDate()
      const hour = date.getHours() >= 10 ? date.getHours() : '0' + date.getHours()
      const minutes = date.getMinutes() >= 10 ? date.getMinutes() : '0' + date.getMinutes()
      return `${year}-${month}-${day} ${hour}:${minutes}`
    }
  },
  filters:{
   
  }
}
</script>
