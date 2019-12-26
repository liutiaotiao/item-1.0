<template>
  <div :class="{'w_itemmall-pay-item-btn':true,'w_itemmall-pay-item-btn-check':checkStatus}">
    <span>{{name}}</span>
    <div v-if="discount" class="w_itemmall-pay-item-btn-discount">{{discount}}折</div>
  </div>
</template>
<style lang="less" src="./index.less" scoped></style>
<script>
export default {
  data() {
    return {};
  },
  props: ["name", "checkStatus", "discount"]
};
</script>