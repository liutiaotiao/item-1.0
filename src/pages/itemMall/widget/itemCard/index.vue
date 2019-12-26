<template>
  <div class="w_itemmall-itemcard">
    <div class="w_itemmall-itemcard-wrapper">
      <img :src="cover " alt />
      <div v-if="discount" class="w_itemmall-itemcard-discont">
        <span>{{ discount }}折</span>
      </div>
    </div>
    <div class="w_itemmall-itemcard-name">{{ name }} {{ext && ext.expired?`(${ext.expired}日)`:''}}</div>
    <div class="w_itemmall-itemcard-worth">{{ price }}钻/{{ext&&ext.num>1?ext.num:''}}个</div>
  </div>
</template>
<style lang="less" src="./index.less" scoped></style>
<script>
export default {
  name: "item-card",
  props: ["id", "name", "cover", "price", "original_price", "discount", "ext"],
  data() {
    return {};
  }
};
</script>
