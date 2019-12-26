<template>
  <div v-if="loading" class="w-loading"></div>
</template>
<script>
export default {
  props: ["loading"]
};
</script>
<style lang="less">
.w-loading {
  z-index: 9;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>