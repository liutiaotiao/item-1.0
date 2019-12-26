<template>
  <div class="p_itemmall-pay">
    <!-- loading  -->
    <loading :loading="loading"></loading>
    <!-- label -->
    <div class="lable" v-if="info.tips">
      <p>{{ info.tips }}</p>
    </div>
    <!-- item prop select -->
    <div class="p_itemmall-pay-basic">
      <div class="p_itemmall-pay-img-swiper">
        <swiper
          :options="{}"
          :not-next-tick="true"
          @slideChange="slideChangeHandler"
          ref="myswiper"
        >
          <swiper-slide v-for="(c, $index) in covers" :key="$index">
            <div class="p_itemmall-pay-basic-img">
              <img :src="c" />
            </div>
          </swiper-slide>
          <div class="swiper-pagination"></div>
        </swiper>
        <div class="p_itemmall-pay-index">{{ activeIndex + 1 }}/{{ covers.length }}</div>
      </div>
      <div class="p_itemmall-pay-basic-info">
        <div class="p_itemmall-pay-main-info">
          <!-- <img class="p_itemmall-pay-basic-goal" src="./images/slogan.png" /> -->
          <div class="p_itemmall-pay-basic-goal">{{info.apply_for}}</div>
          <span class="p_itemmall-pay-basic-name">{{ info.name }}</span>
        </div>
        <p class="p_itemmall-pay-basic-warm">{{ info.slogan }}</p>
      </div>
    </div>

    <!-- btn-group -->
    <div class="p_itemmall-pay-btngroup">
      <div v-for="(sku, $index) in info.sku" :key="$index">
        <p class="p_itemmall-pay-title">{{ sku.name }}</p>
        <div>
          <!-- :class="[
            sku.slug == 'name' ? 'p_itemmall-type-btns' : 'p_itemmall-pay-btns',
            sku.collect.length == 1 ? 'p_itemmall-type-btns-one' : ''
          ]"-->
          <item-btn
            v-for="(collect, $collectIndex) in sku.collect"
            :key="$collectIndex"
            v-bind="collect"
            :checkStatus="collectStatus[sku.slug] == $collectIndex"
            @click.native="btnClickHandler(sku.slug, $collectIndex)"
            class="p-itemmall-pay-btn"
          ></item-btn>
        </div>
      </div>
      <div class="p_itemmall-pay-input-wrapper" v-if="collectStatus['uid'] == 1">
        <input type="number" class="p_itemmall-pay-input" v-model="toUid" placeholder="请输入对方兔几号" />
        <span class="p_itemmall-pay-input-word" v-html="accepterName ? accepterName : warmWord"></span>
      </div>
    </div>

    <!-- item prop info -->
    <div class="p_itemmall-pay-info">
      <!-- 道具说明 -->
      <p class="p_itemmall-pay-info-title">道具说明</p>
      <img :src="info.large" class="p_itemmall-pay-info-bg" />
      <p class="p_itemmall-pay-info-dp" v-html="info.description"></p>
    </div>

    <div class="p_itemmall-pay-buy-btn" @click="buyClickHandler">
      <p>{{ info.price }}钻石购买</p>
    </div>
  </div>
</template>
<style lang="less" src="./index.less" scoped></style>
<style src="../../assert/css/swiper.min.css"></style>
<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
import itemBtn from "./widget/itemBtn";
import request from "@/utils/request";
import Dialog from "../../widget/dialog/index.js";
import { currentUrlToParams } from "@/utils/app.js";
import Toast from "@/plugin/toast/index.js";
import loading from "@/plugin/loading/index.vue";
export default {
  data() {
    return {
      //status
      loading: false,

      warmWord: "",
      info: {
        sku: []
      },
      id: "",
      toUid: null,
      collectStatus: { uid: 0 },
      accepterName: "",
      // cover variable
      activeIndex: 0,
      covers: []
    };
  },
  created() {
    this.id = currentUrlToParams("id");
    this.refresh();
  },
  methods: {
    async buyClickHandler() {
      // 余额不足
      try {
        if (this.$root.diamond < this.info.price) {
          const rechargeDialog = new Dialog({
            propsData: {
              title: "充值提醒",
              contents: ["您的钻石余额不足", "是否充值？"],
              confirm: "去充值"
            }
          });
          rechargeDialog.$on("confirm", () => {
            this.bridge.exec(
              "onCallNativePay",
              {
                money: "6",
                type: "1",
                return_url: ""
              },
              () => {}
            );
          });
          return;
        }
        this.loading = true;
        await this.$http.post("/mall/preflight?debug", null, {
          params: {
            sid: this.$root.sid,
            id: this.id,
            toUid: this.toUid
          }
        });
        const confirmDialog = new Dialog({
          propsData: {
            title: "确认购买",
            contents: [
              `确认使用<span style="color:#FFC600">${this.info.price}</span>钻购买<span style="color:#FFC600">${this.info.name}</span>?` +
                (this.accepterName
                  ? `并将其 赠送给好友${this.accepterName}（${this.toUid}）？`
                  : "")
            ]
          }
        });
        confirmDialog.$on("confirm", async () => {
          try {
            const { message: payMessage } = await this.$http.post(
              "/mall/checkout?debug",
              null,
              {
                params: {
                  sid: this.$root.sid,
                  id: this.id,
                  toUid: this.toUid
                }
              }
            );

            new Dialog({
              propsData: {
                contents: [payMessage]
              }
            });
            this.refresh();
          } catch (error) {
            new Dialog({
              propsData: {
                contents: [error.message]
              }
            });
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
      try {
        if (!this.id) {
          return;
        }
        this.info = await request.get(`/mall/item/${this.id}?debug`, {
          params: {
            sid: this.$root.sid,
            sku: JSON.stringify(this.collectStatus)
              .replace(/{|}/g, "")
              .replace(/"/g, "")
              .replace(/,/g, ";"),
            toUid: this.toUid
          }
        });
        this.id = this.info.id;
        this.covers = [];
        for (const sku of this.info.sku) {
          this.collectStatus[sku.slug] = sku.current;
          if (sku.slug === "name") {
            for (const c of sku.collect) {
              this.covers.push(c.cover);
            }
            this.activeIndex = sku.current;
            this.swiper.slideTo(this.activeIndex, 0, false);
          }
        }
      } catch (error) {
        console.error(error);
      }
    },
    btnClickHandler(slug, index) {
      this.collectStatus[slug] = index;
      this.refresh();
    },
    // swiper operate
    slideChangeHandler() {
      if (this.collectStatus["name"] == this.swiper.activeIndex) {
        return;
      }
      this.collectStatus["name"] = this.swiper.activeIndex;
      this.refresh();
    }
  },
  computed: {
    swiper() {
      return this.$refs.myswiper.swiper;
    }
  },
  components: {
    itemBtn,
    swiper,
    swiperSlide,
    loading
  },
  watch: {
    toUid() {
      if (!this.toUid) {
        this.warmWord = "";
        this.accepterName = "";
        return;
      }
      if (this.toUid >= 10000000000) {
        this.toUid = this.toUid % 10000000000;
      }
      this.warmWord = "";
      this.$http
        .get(`/public/user/info/${this.toUid}?debug`, {
          params: { sid: this.$root.sid }
        })
        .then(data => {
          if (this.toUid) {
            this.accepterName = data.nickname;
          }
        })
        .catch(e => {
          this.accepterName = "";
          setTimeout(() => {
            if (this.toUid) {
              this.warmWord = "<span style='color:#FF191C'>该用户不存在</span>";
            }
          }, 500);
        });
    },
    "collectStatus.uid": function(newV, oldV) {
      this.toUid = null;
      this.accepterName = "";
      this.warmWord = "";
    }
  }
};
</script>
