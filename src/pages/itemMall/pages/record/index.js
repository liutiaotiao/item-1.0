import Vue from "vue";
import App from "./index.vue";
import "@/pages/common";
import { currentUrlToParams } from "@/utils/app.js";

new Vue({
  render: h => h(App),
  created() {
    if (!this.sid) {
      this.sid = currentUrlToParams("sid");
      this.bridge.exec("getUserInfo", {}, data => {
        if (data.sid) {
          this.sid = data.sid;
        }
        if (this.sid === "null") {
          this.sid = undefined;
        }
      });
      window.webviewWakeup = () => {
        this.refresh();
      };
    }
  },
  data() {
    return {
      sid: ""
    };
  },
  methods: {
    refresh() {}
  }
}).$mount("#app");
