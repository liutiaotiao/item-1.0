<template>
  <div class="w_itemmail-dialog">
    <p class="w_itemmail-dialog-title">{{ title }}</p>
    <p
      v-for="(content, $index) in contents"
      :key="$index"
      v-html="content"
      class="w_itemmail-dialog-content"
    ></p>
    <div class="w_itemmail-dialog-btns">
      <div @click="$parent.closeHandler">{{ cancel || "取消" }}</div>
      <div @click="confirmHandler">{{ confirm || "确认" }}</div>
    </div>
  </div>
</template>

<style lang="less" src="./index.less" scoped></style>
<style lang="less" src="@/assets/css/dialog.less"></style>
<script>
export default {
  data() {
    return {};
  },
  props: ["title", "contents", "cancel", "confirm"],
  methods: {
    confirmHandler() {
      this.$parent.$emit("confirm");
      this.$parent.closeHandler();
    }
  }
};
</script>
