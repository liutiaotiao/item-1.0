<template>
  <div id="app" class="record">
    <div class="animated fadeInDown tutips" v-show="tipsboolWangqi">
      <div class="tutips_rowwq">
        <div class="tutips_rowwq_close" @click="showTip(0)"></div>
        <div class="t-c">
          <div class="t-c-title"></div>
          <div class="t-c-tab">
            <div class="t-c-tab-item one">轮数</div>
            <div class="t-c-tab-item">出现在1号洞</div>
            <div class="t-c-tab-item">出现在2号洞</div>
          </div>
          <div class="t-c-itembox">
            <div class="t-c-item" v-for="(item,index) in WangqiArr" :key="index">
              <div class="t-c-item-li one">{{item.name}}</div>
              <div class="t-c-item-li">
                <span v-show="item.result==1"></span>
              </div>
              <div class="t-c-item-li">
                <span v-show="item.result==2"></span>
              </div>
            </div>
            <div class="tubang_empty" v-show="emptywangqi"></div>
          </div>

          <div class="t-c-wqbottom"></div>
        </div>
      </div>
    </div>
  </div>
</template>
        
<script>
export default {
  name: "record",
  props: {
    visible: Boolean,
    sid: String,
    tips:Number
  },
  data: function() {
    return {
      isTipShow: false,
      WangqiArr: [],
      tipsboolWangqi: false,
      emptywangqi: false,
    };
  },
  created: function() {
    this.getTipsboolWangqi();
  },
  methods: {
    showTip: function(num) {
      this.$emit("visible", false);
      this.$emit("dataName", num);
    },
    async getTipsboolWangqi() {
      this.tipsboolWangqi = true;
      let data = await this.$http(
        `/x/activity/rabbit2/board?debug=true&sid=${this.sid}&type=1`
      );
      this.WangqiArr = data.list;
      this.emptywangqi = data.list.length === 0;
    },
  }
};
</script>
<style src="./index.less" lang="less" scoped></style>
