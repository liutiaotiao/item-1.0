<template>
  <div id="app" class="lhao_desc">
    <div class="lhao_desc_li">1、购买靓号的用户，所购买的靓号需手动绑定或者选择赠送给其他人，已绑定的靓号不可转移绑定到其它账号上；</div>
    <div class="lhao_desc_li">2、成功购买或获赠兔几靓号后，请在30天内完成绑定，如逾期未完成绑定，兔几直播将有权回收该靓号且不退款；</div>
    <div class="lhao_desc_li">3、每个靓号只能成功赠送给一个用户1次，被赠送用户拒绝后靓号将返回赠送用户账户，不计入赠送次数，靓号成功赠送后不能继续转赠，请赠送时注意；</div>
    <div class="lhao_desc_li">4、普通用户和贵族都可以购买兔几靓号，但是只能使用普通钻石购买靓号；</div>
    <div class="lhao_desc_li">5、靓号的绑定是唯一的，绑定新靓号后，所有特权将以新绑定的靓号为准；</div>
    <div class="lhao_desc_li">6、购买靓号后，会附赠30天对应靓号类型的勋章，充值任意金额即可延长勋章有效期；例如：购买神级靓号，可获得「神」靓号勋章，若30天未充值，勋章会失效，但只要充值任意金额即可恢复勋章显示，每次充值有效期会重置30天。</div>
  </div>
</template>
        
<script>
export default {
  name: "lianghao",
  data: function() {
    return {
    };
  },
  created: function() {
  },
  methods: {
  }
};
</script>
<style  lang="less" scoped>
  .lhao_desc{
    padding: 38px 30px;
    .lhao_desc_li{
      font-size:28px;
      font-family:PingFang SC;
      font-weight:500;
      color:rgba(34,34,34,1);
      line-height:46px;
    }
  }
</style>
