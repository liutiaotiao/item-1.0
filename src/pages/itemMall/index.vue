<template>
  <div class="p_itemmall">
    <loading :loading="loading"></loading>
    <div class="p_itemmall-slideshow">
      <swiper
        :options="{
          autoplay: { delay: 6 * 1000 },
          loop: true,
          pagination: {
            el: '.swiper-scrollbar'
          }
        }"
      >
        <swiper-slide v-for="(s, $index) in slideshows" :key="$index">
          <img :src="s.pic" @click="junpHandler(s)" />
        </swiper-slide>
        <div class="swiper-scrollbar p_itemmall-scrollbar" slot="scrollbar"></div>
      </swiper>
    </div>

    <div class="p_itemmall-wrapper">
      <!-- 每日特惠 -->
      <div class="p_itemmall-daily">
        <div class="image-box">
          <div class="odd-lable">剩余{{ limitSaleItem.left }}次</div>
          <img :src="limitSaleItem.cover" />
        </div>
        <div class="daily-lable">
          <span class="word-lable">每日特惠</span>
          每个账号限购{{ limitSaleItem.limit }}次
        </div>
        <div class="operate-wrapper">
          <div class="info-box">
            <p class="money-text">
              {{ limitSaleItem.price }}钻
              <span>{{ limitSaleItem.original_price }}钻</span>
            </p>
            <p class="dp-text">{{ limitSaleItem.name }}</p>
          </div>
          <div class="btn" @click="buyLimitSaleHandler">购买</div>
        </div>
      </div>

      <!-- 限时折扣 -->
      <div class="p_itemmall-sale">
        <div class="p_itemmall-sale-title">
          <div class="p_itemmall-sale-title-icon"></div>
          <p class="p_itemmall-sale-title-time">
            <span>{{ min }}</span>:
            <span>{{ sec }}</span>后刷新
          </p>
        </div>
        <div class="p_itemmall-notice">
          <div class="p_itemmall-notice-icon"></div>
          <swiper
            :options="{
              height: 40,
              direction: 'vertical',
              autoplay: { 
                delay: 6 * 1000 ,
                stopOnLastSlide:true
              }
            }"
          >
            <template v-if="alerts.length">
              <swiper-slide v-for="(a, $index) in alerts" :key="$index">
                <div class="p_itemmall-notice-icon-wrapper">
                  <p class="p_itemmall-notice-text">
                    {{ a.nickname }}以
                    <span>{{ a.cost }}钻</span>
                    购得
                    <span>{{ a.name }}</span>!惊喜就在折扣商店
                  </p>
                </div>
              </swiper-slide>
            </template>
            <template v-else>
              <swiper-slide>
                <div class="p_itemmall-notice-icon-wrapper">
                  <p class="p_itemmall-notice-text">{{ defaultAlert }}</p>
                </div>
              </swiper-slide>
            </template>
          </swiper>
        </div>
        <div class="p_itemmall-sale-body">
          <item-card
            v-for="(saleI, $index) in saleItems"
            :key="$index"
            @click.native="cardClick(saleI)"
            v-bind="saleI"
          ></item-card>
          <template v-if="saleItems.length - 3">
            <div class="p_item-struct-box"></div>
          </template>
        </div>
        <p class="p_itemmall-sale-warm">注：限时折扣内购买道具仅限本人使用</p>
      </div>

      <!-- 道具商城 -->
      <div class="p_itemmall-item">
        <p class="p_itemmall-item-title">道具商城</p>
        <div class="p_itemmall-item-body">
          <item-card
            v-for="(i, $index) in items"
            :key="$index"
            v-bind="i"
            @click.native="toPayHandler(i)"
          ></item-card>
          <template v-if="items.length % 3 && 3 - (items.length % 3)">
            <div
              class="p_item-struct-box"
              v-for="($index, itemNull) in new Array(3 - (items.length % 3))"
              :key="$index"
            ></div>
          </template>
        </div>
      </div>

      <!-- 坐骑商城 -->
      <div class="p_itemmall-ride">
        <p class="p_itemmall-ride-title">
          坐骑商城
          <span>炫酷坐骑，全场瞩目</span>
        </p>
        <div class="p_itemmall-ride-body">
          <item-card
            v-for="(rideI, $index) in rideItems"
            :key="$index"
            v-bind="rideI"
            @click.native="toPayHandler(rideI)"
          ></item-card>
          <template v-if="rideItems.length % 3 && 3 - (rideItems.length % 3)">
            <div
              class="p_item-struct-box"
              v-for="($index, itemNull) in new Array(
                3 - (rideItems.length % 3)
              )"
              :key="$index"
            ></div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
<style src="./assert/css/swiper.min.css"></style>
<style lang="less" src="./index.less" scoped></style>
<style lang="less">
.p_itemmall-slideshow {
  .p_itemmall-scrollbar {
    bottom: 20px;
    background-color: transparent;
    .swiper-pagination-bullet {
      width: 8px;
      height: 8px;
      border: 1px solid rgba(255, 250, 233, 1);
      border-radius: 50%;
      background-color: transparent;
    }
    .swiper-pagination-bullet-active {
      background-color: #ffffff;
    }
  }
}
</style>
<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
import itemCard from "./widget/itemCard/index.vue";
import Dialog from "./widget/dialog/index.js";
import request from "../../utils/request";
import Toast from "@/plugin/toast/index.js";
import loading from "@/plugin/loading/index.vue";
export default {
  name: "item-mall",
  data() {
    return {
      // status
      loading: false,
      // limitSale
      limitSaleItem: {},

      saleItems: [],
      items: [],
      rideItems: [],
      alerts: [],
      defaultAlert: "",

      // timeoutId
      timeoutId: undefined,
      mainTimeoutId: undefined,

      //倒计时
      timestamp: Date.now() + 5 * 1000,
      //min sec
      min: "00",
      sec: "00",

      // top 轮播图
      slideshows: []
    };
  },
  methods: {
    junpHandler(slide) {
      this.bridge.exec(
        "openUrl",
        { url: slide.link, title: slide.name },
        () => {}
      );
    },
    toPayHandler(item) {
      if (!this.$root.sid) {
        this.bridge.exec("invokeNativeLoginEvent", () => {});
        return;
      }

      this.bridge.exec(
        "openUrl",
        {
          url: `${window.location.origin}/static/v3/m/pay.html?id=${item.id}`,
          title: `${item.name}`
        },
        () => {}
      );
    },
    async cardClick(item, backFn) {
      if (!this.$root.sid) {
        this.bridge.exec("invokeNativeLoginEvent", () => {});
        return;
      }

      if (this.$root.diamond < item.price) {
        const rechargeDialog = new Dialog({
          propsData: {
            title: "充值提醒",
            contents: ["您的钻石余额不足", "是否充值？"],
            confirm: "去充值"
          }
        });

        rechargeDialog.$on("confirm", () => {
          this.bridge.exec("onCallNativePay", {}, () => {});
        });
        return;
      }

      try {
        this.loading = true;
        await this.$http.post("/mall/preflight?debug", null, {
          params: {
            sid: this.$root.sid,
            id: item.id
          }
        });

        const confirmDialog = new Dialog({
          propsData: {
            title: "确认购买",
            contents: [
              `确认使用<span style="color:#FFC600">${item.price}</span>钻购买<span style="color:#FFC600">${item.name}</span>?`
            ]
          }
        });

        confirmDialog.$on("confirm", async () => {
          try {
            const data = await this.$http.post("/mall/checkout?debug", null, {
              params: {
                sid: this.$root.sid,
                id: item.id
              }
            });
            console.log(backFn, typeof backFn == "function");
            if (backFn && typeof backFn == "function") {
              console.log("test");
              backFn();
            }
            new Toast({ message: data.message });
          } catch (error) {
            if (error && error.message) new Toast({ message: error.message });
          }
        });
      } catch (error) {
        new Dialog({
          propsData: {
            contents: [error.message]
          }
        });
      } finally {
        this.loading = false;
      }
    },
    async refresh() {
      if (this.mainTimeoutId) {
        clearTimeout(this.mainTimeoutId);
      }
      try {
        const data = await request.get("/mall/promo?debug");
        this.saleItems = data.list;
        this.alerts = data.horn.recent || [];
        this.defaultAlert = data.horn.welcome;

        this.timestamp = Date.now() + data.countdown * 1000;

        this.mainTimeoutId = setTimeout(() => {
          this.refresh(this.mainTimeoutId);
        }, data.countdown * 1000);
      } catch (error) {
        console.error(error);
        this.mainTimeoutId = setTimeout(() => {
          this.refresh(this.mainTimeoutId);
        }, 5 * 1000);
      }
    },
    timeRefresh() {
      if (this.timeoutId) {
        clearTimeout(this.timeoutId);
      }
      if (this.timestamp < Date.now()) {
        this.refresh();
        return;
      }

      const formatZero = v => {
        return v >= 10 ? v : "0" + v;
      };
      const interval = (this.timestamp - Date.now()) / 1000;
      this.min = formatZero(Math.floor(interval / 60));
      this.sec = formatZero(Math.floor(interval % 60));
      this.timeoutId = setTimeout(() => {
        this.timeRefresh(this.timeoutId);
      }, 1 * 1000);
    },
    async refresOItems() {
      try {
        const data = await request.get("/mall/categories?debug");
        this.items = data.list[0].items;
        this.rideItems = data.list[1].items;
      } catch (error) {
        console.error(error);
      }
    },
    async refreshSlide() {
      try {
        this.slideshows = await request.get(
          "/udata/udata/getdata?cate=app_tool_list_banner&_app=tjzb"
        );
      } catch (error) {
        console.error(error);
      }
    },

    // limit sale operate
    async refreshLimitSale() {
      try {
        this.limitSaleItem = await this.$http.get("/mall/daily?debug", {
          params: {
            sid: this.$root.sid
          }
        });
      } catch (error) {
        console.error(error);
      }
    },
    buyLimitSaleHandler() {
      this.cardClick(this.limitSaleItem, () => {
        this.refreshLimitSale();
      });
    }
  },
  created() {
    this.bridge.exec("appShareShow", { message: 6 }, () => {});
    this.refresh();
    this.refresOItems();
    this.refreshSlide();
    this.refreshLimitSale();
  },
  watch: {
    timestamp() {
      this.timeRefresh();
    }
  },
  components: {
    itemCard,
    swiper,
    swiperSlide,
    loading
  }
};
</script>
