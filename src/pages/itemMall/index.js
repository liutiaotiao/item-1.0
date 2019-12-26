import Vue from "vue";
import App from "./index.vue";
import "../common";
// import "@/assets/js/swiper.min.js";
// import "@/assets/css/swiper.min.js";
import { currentUrlToParams } from "@/utils/app.js";
import request from "@/utils/request";

new Vue({
  render: h => h(App),
  created() {
    window.webviewWakeUp = data => {
      this.refresh();
    };
    this.bridge.exec("needWakeUp", { type: 1 }, data => {});
    this.bridge.exec("appShareShow", { message: 6 }, data => {});
    this.refresh();
  },
  data() {
    return {
      sid: "",
      diamond: 0
    };
  },
  methods: {
    async refresh() {
      try {
        this.sid = currentUrlToParams("sid");
        this.bridge.exec("getUserInfo", {}, data => {
          if (data.sid) {
            this.sid = data.sid;
          }
          if (this.sid === "null") {
            this.sid = undefined;
          }
          request
            .get("/user/rich/get?debug", {
              params: { sid: this.sid }
            })
            .then(infoData => {
              this.diamond = infoData.diamond;
            })
            .catch(console.error);
        });
      } catch (error) {}
    }
  }
}).$mount("#app");
