<template>
  <div class="p_itemmall-record">
    <template v-if="records.length">
      <div class="p_itemmall-record-exist">
        <div v-for="(r, $index) in records" :key="$index" class="p_itemmall-record-item">
          <div class="p_itemmall-record-item-img">
            <img :src="r.cover" />
          </div>
          <div class="p_itemmall-record-info">
            <p class="p_itemmall-record-info-name">
              <span>购买 {{ r.name.replace("x", "") }}个</span>
              <span>-{{ r.cost }}钻石</span>
            </p>
            <p class="p_itemmall-record-user">使用人: {{ r.use_for }}</p>
            <p class="p_itemmall-record-date">{{ r.created_at }}</p>
          </div>
        </div>
        <div class="p_itemmall-record-bottom-word" v-if="total==records.length">
          <span>我是有底线的</span>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="p_itemmall-not-record" v-if="total==0">
        <img src="./images/icon.png" />
        <p class="warm">还没有购买过道具哦~</p>
        <!-- <div class="btn" @click="toShopHandle">去购物</div> -->
      </div>
    </template>
  </div>
</template>
<style lang="less" src="./index.less"></style>
<script>
import request from "@/utils/request";
export default {
  data() {
    return {
      records: [],
      page: -1,
      total: -1,
      timeoutId: null
    };
  },
  created() {
    this.refresh();
  },
  mounted() {
    let timeoutId = null;
    window.addEventListener("scroll", () => {
      if (timeoutId) {
        return;
      }
      timeoutId = setTimeout(() => {
        clearTimeout(this.timeoutId);
        this.scrollHandler();
        timeoutId = null;
      }, 500);
    });
  },
  methods: {
    toShopHandle() {
      this.bridge.exec(
        "openUrl",
        {
          url: `${window.location.origin}/static/v3/m/itemMall.html`,
          title: "兔几商城"
        },
        () => {}
      );
    },
    async refresh() {
      try {
        if (
          this.total != -1 &&
          (this.total === 0 || this.total <= this.records.length)
        ) {
          return;
        }
        const data = await request.get("/mall/history?debug", {
          params: {
            sid: this.$root.sid,
            ended_at: Math.floor(Date.now() / 1000),
            created_at: Math.floor(Date.now() / 1000 - 60 * 60 * 24 * 90),
            page: ++this.page,
            per_page: 30
          }
        });
        this.records.push(...data.list);
        this.total = data.page.total;
      } catch (error) {
        this.total = this.records.length;
        console.error(error);
      }
    },
    scrollHandler() {
      const scrollV =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;
      if (document.body.scrollHeight - scrollV - window.innerHeight <= 50) {
        this.refresh();
      }
    }
  }
};
</script>
