<template>
  <div id="app" class="lhao" @click="hidePanel">
    <div class="lh_banner" @click="getbannerUrl"></div>
    <div class="lh_book" @click="getbookkUrl">
      <p>靓号预约，火热开启！专属于你的独家靓号，更实惠，更个性~</p>
      <p>
        <span>立即预约 &gt;</span>
      </p>
    </div>
    <!-- 全部靓号 -->
    <div class="all">
      <div class="all-title">
        全部靓号
        <span @click="showTip">靓号购买说明 &gt;</span>
      </div>
      <!-- 筛选 -->
      <div class="all-checkbox">
        <div class="all-checkbox-item">靓号类型：</div>
        <div class="all-checkbox-select" id="handle" @click="getCouponSelected">
          <span :class="{'up':Selectedtxt===1}"></span>
          {{selectValue}}
        </div>
        <div class="all-checkbox-option animated fadeIn" v-show="Selected">
          <div
            class="all-checkbox-option-item"
            v-for="(item,m) in couponList"
            @click="getSelectedNone(item.name,item.id,m)"
            :class="{'activeindex':selectindex===m}"
          >
            {{item.name}}
            <div class="item-icon" v-show="selectindex===m"></div>
          </div>
        </div>
        <div class="all-checkbox-item">靓号类型：</div>
        <div class="all-checkbox-selectall" id="handleAll" @click="getCouponSelectedAll">
          <span :class="{'up':SelectedtxtAll===1}" @click="getSelectedNoneAll(selectValueAll)"></span>
          {{selectValueAll}}
        </div>
        <div class="all-checkbox-optionall animated fadeIn" v-show="SelectedAll">
          <div
            class="all-checkbox-optionall-item"
            v-for="(item,m) in couponListAll"
            @click="getSelectedNoneAll(item.name,m)"
            :class="{'activeindex':selectAllindex===m}"
          >
            {{item.name}}
            <div class="item-icon" v-show="selectAllindex===m"></div>
          </div>
        </div>
      </div>

      <!-- 列表 -->
      <div class="all-list">
        <div
          class="all-list-item"
          v-for="(item,index) in allData"
          @click="getBuyshow(item.price,item.prettyNo)"
        >
          <div class="all-list-item-icon" :class="'icon'+item.type"></div>
          <div class="all-list-item-tel">{{item.prettyNo}}</div>
          <div class="all-list-item-price">价值¥{{item.price/10}}元</div>
          <div class="all-list-item-buy">立即购买 &gt;</div>
        </div>
      </div>

      <div class="loading" v-show="loading">
        <div class="loadEffect">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div class="loading-txt">加载中</div>
      </div>

      <div class="all-list-empty">
        <div class="all-list-empty-title">暂无更多该规则靓号~</div>
        <div class="all-list-empty-title">可以联系客服预约心仪的独家靓号哦~</div>
        <div class="all-list-empty-line" @click="JumpToOnlineService">
          <span></span>联系客服
        </div>
      </div>
    </div>

    <!-- 购买说明 -->
    <div class="all_tipbg" v-show="isTipShow">
      <div class="all_tip animated bounceInUp">
        <div class="all_close" @click="closeTip"></div>
        <div class="all_tip-top"></div>
        <ul class="all_content">
          <li class="all_row">1、购买靓号的用户，所购买的靓号需手动绑定或者选择赠送给其他人，已绑定的靓号不可转移绑定到其它账号上；</li>
          <li class="all_row">2、成功购买或获赠兔几靓号后，请在30天内完成绑定，如逾期未完成绑定，兔几直播将有权回收该靓号且不退款；</li>
          <li class="all_row">3、每个靓号只能成功赠送给一个用户1次，被赠送用户拒绝后靓号将返回赠送用户账户，不计入赠送次数，靓号成功赠送后不能继续转赠，请赠送时注意；</li>
          <li class="all_row">4、普通用户和贵族都可以购买兔几靓号，但是只能使用普通钻石购买靓号；</li>
          <li class="all_row">5、靓号的绑定是唯一的，绑定新靓号后，所有特权将以新绑定的靓号为准；</li>
          <li
            class="all_row"
          >6、购买靓号后，会附赠30天对应靓号类型的勋章，充值任意金额即可延长勋章有效期；例如：购买神级靓号，可获得「神」靓号勋章，若30天未充值，勋章会失效，但只要充值任意金额即可恢复勋章显示，每次充值有效期会重置30天。</li>
        </ul>
      </div>
    </div>

    <!-- toast -->
    <div
      class="animated fadeInDown"
      style="position:fixed;left:50%;top: 40%;z-index:9999"
      v-show="visible"
    >
      <div class="w-toast">{{msg}}</div>
    </div>
  </div>
</template>
<script>
import _ from "underscore";
export default {
  name: "all",
  data: function() {
    return {
      sid: null,
      // 选择1
      Selected: false,
      selectValue: "全部",
      selectId: 0,
      Selectedtxt: 0,
      couponList: [
        {
          id: "0",
          name: "全部"
        },
        {
          id: "1",
          name: "精品靓号"
        },
        {
          id: "2",
          name: "豪级靓号"
        },
        {
          id: "3",
          name: "尊级靓号"
        },
        {
          id: "5",
          name: "神级靓号"
        }
      ],
      // 选择2
      SelectedAll: false,
      selectValueAll: "全部",
      SelectedtxtAll: 0,
      couponListAll: [
        {
          id: "",
          name: "全部"
        },
        {
          id: "1",
          name: "1-999"
        },
        {
          id: "2",
          name: "1000-4999"
        },
        {
          id: "3",
          name: "5000-9999"
        },
        {
          id: "4",
          name: "10000以上"
        }
      ],
      // 购买说明
      isTipShow: false,
      allData: [],
      checktype: 1,

      start_price: 0,
      end_price: 0,
      Allprice: 1,
      page: 0,

      selectindex: this.check,
      selectAllindex: 0,
      loading: false,

      // toast
      msg: "null",
      visible: false,
      appVersionInfo: [0, 0, 0]
    };
  },

  created: function() {
    this.getUserInfo();
    this.AppShareShow();
    let sid = this.getParameterByName("sid");
    this.sid = sid;

    this.getsid();
    window.webviewWakeUp = data => {
      this.getsid();
    };
    this.initScroller();

    this.getAppVersion();
  },
  methods: {
    getAppVersion() {
      let APP_VERSION = navigator.userAgent.match(/tuji\/([\d.]+)/i);
      if (APP_VERSION) {
        let _version = APP_VERSION[1]; //1.8.0
        this.appVersionInfo = [
          _version.substring(0, 1),
          _version.substring(2, 3),
          _version.substring(4, 5)
        ];
      }
    },
    getsid() {
      this.bridge.exec("getUserInfo", data => {
        if (!data.sid) return;
        this.sid = data.sid;
      });
    },
    show: function(msg) {
      this.visible = true;
      this.msg = msg;
      setTimeout(() => {
        this.visible = false;
      }, 3000);
    },
    getUserInfo() {
      let check = this.getParameterByName("check");
      if (check) {
        if (check == 5) {
          this.selectValue = this.couponList[4].name;
        } else {
          this.selectValue = this.couponList[check].name;
        }
        this.selectId = this.check = check;
        this.selectindex = check;
      }
      this.fetchSelect();
      this.allData = [];
      this.page = 0;
    },
    async fetchSelect() {
      this.page = this.page + 1;
      let data = await this.$http.get(
        `/public/no/list?debug&type=${this.selectId}&start_price=${this.start_price}&end_price=${this.end_price}&page=${this.page}`
      );
      this.totlePage = data.list.totlePage;
      this.allData = this.allData.concat(data.list);
    },
    getCouponSelected() {
      this.Selected = !this.Selected;
      this.Selectedtxt = 1;
    },
    getSelectedNone(name, id, index) {
      //选择类型
      this.Selected = false;
      this.selectValue = name;
      this.selectindex = index;
      this.selectId = id;
      this.Selectedtxt = 0;
      this.fetchSelect();
      this.allData = [];
      this.page = 0;
    },
    getParameterByName(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]);
      return null;
    },
    getBuyshow: function(diamond, id) {
      if (this.sid.length > 6) {
        let url =
          window.location.origin +
          "/static/v3/m/liangh_buy.html?diamond=" +
          diamond +
          "-" +
          id;
        this.bridge.exec("openUrl", { url: url, type: "0" }, function(data) {});
      } else {
        this.bridge.exec("invokeNativeLoginEvent", function(data) {});
      }
    },
    // 选择2
    getCouponSelectedAll() {
      this.SelectedAll = !this.SelectedAll;
      this.SelectedtxtAll = 1;
    },
    getSelectedNoneAll(name, id) {
      //选择价格
      this.SelectedAll = false;
      this.selectValueAll = name;
      this.selectAllindex = id;
      this.SelectedtxtAll = 0;
      this.Allprice = id;
      switch (this.Allprice) {
        case 0:
          this.start_price = "";
          this.end_price = "";
          break;
        case 1:
          this.start_price = "1";
          this.end_price = "999";
          break;
        case 2:
          this.start_price = "1000";
          this.end_price = "4999";
          break;
        case 3:
          this.start_price = "5000";
          this.end_price = "9999";
          break;
        case 4:
          this.start_price = "10000";
          this.end_price = "";
          break;
      }

      this.fetchSelect();
      this.allData = [];
      this.page = 0;
    },
    hidePanel(event) {
      let sp2 = document.getElementById("handle");
      let sp1 = document.getElementById("handleAll");
      if (sp2 || sp1) {
        if (!sp2.contains(event.target)) {
          this.Selected = false;
        }
        if (!sp1.contains(event.target)) {
          this.SelectedAll = false;
        }
      }
    },
    // 购买说明
    showTip: function() {
      this.isTipShow = true;
      this.stop();
    },
    closeTip: function() {
      this.isTipShow = false;
      this.move();
    },
    JumpToOnlineService: function() {
      if (this.appVersionInfo[0] == 1 && this.appVersionInfo[1] >= 8) {
        this.bridge.exec("jumpToOnlineService", {}, function(data) {});
      } else {
        this.show("请更新至最新版本，或前往个人中心联系客服哦~");
      }
    },
    AppShareShow() {
      this.bridge.exec(
        "appShareShow",
        {
          message: "4" //我的靓号
        },
        function(data) {}
      );
    },
    getbannerUrl: function() {
      let url = window.location.origin + "/static/v3/m/lianghao_book.html";
      this.bridge.exec("openUrl", { url: url, type: "0" }, function(data) {});
    },
    getbookkUrl: function() {
      let url = window.location.origin + "/static/v3/m/lianghao_act.html";
      this.bridge.exec("openUrl", { url: url, type: "0" }, function(data) {});
    },
    stop() {
      var scrollTop =
        document.body.scrollTop || document.documentElement.scrollTop;
      document.body.style.width = "100%";
      document.body.style.cssText += "position:fixed;top:-" + scrollTop + "px;";
    },
    move() {
      var body = document.body;
      body.style.position = "";
      var top = body.style.top;
      document.body.scrollTop = document.documentElement.scrollTop = -parseInt(
        top
      );
      body.style.top = "";
    },
    // 分页
    scrollerHandler(e) {
      if (
        window.screen.height + document.scrollingElement.scrollTop >=
        document.scrollingElement.scrollHeight
      ) {
        this.loading = true;
        setTimeout(() => {
          this.fetchSelect();
          this.loading = false;
        }, 1000);
      }
    },
    initScroller() {
      document.addEventListener(
        "scroll",
        _.throttle(this.scrollerHandler.bind(this), 300)
      );
    }
  }
};
</script>
<style src="./index.less" lang="less" scoped></style>