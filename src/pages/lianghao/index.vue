<template>
  <div id="app" class="lhao">
    <div class="lh_banner"  @click="getbannerUrl"></div>
    <div class="lh_book" @click="getbookkUrl">
      <p>靓号预约，火热开启！专属于你的独家靓号，更实惠，更个性~</p>
      <p><span>立即预约 &gt;</span></p>
    </div>

    <div class="lh_warp">
      <div class="lh_warp-tab">
        <div
          v-for="(item,index) in listArr"
          :class="{active:cur==index,active0:cur==0,active1:cur==1,active2:cur==2,active3:cur==3}"
          @click="cutTabClick(item, index)"
          class="lh_warp-tab-item"
        >
          <p>{{item.name}}</p>
          <div class="lh_warp-tab-item-img" :class="'img'+index"></div>
          <div class="lh_warp-tab-item_active" v-show="cur==index">
            <span class="bot" :class="'act'+index"></span>
            <span class="top"></span>
          </div>
        </div>
      </div>

      <div class="lh_warp-details">
        <div class="lh_warp-details-item"
          v-for="(item,index) in itemArr"
          @click="getBuyshow(item.price,item.prettyNo)">
          <div class="lh_warp-details-item-img" :class="'icon'+itemtype" ></div>
          <div class="lh_warp-details-item-tel">{{item.prettyNo}}</div>
          <div class="lh_warp-details-item-price">价值¥{{item.price/10}}元</div>
         <div class="lh_warp-details-item-buy">立即购买 &gt;</div>
        </div>

      </div>
    </div>
    <div class="lh_more" @click="getAllshow">查看更多靓号 &gt;</div>
  </div>
</template>
        
<script>
import all from "@/pages/lianghao/components/lianghao_all/index";
import _ from 'underscore'
export default {
  name: "lianghao",
  data: function() {
    return {
      // tab
      list: ["精品靓号", "豪级靓号", "尊级靓号", "神级靓号"],
      cur: 0,
      sid: null,
      allShow: false,
      listArr:[],
      itemArr:[],
      itemtype:1,
      allData:[],
    };
  },
  components: {
    'all':all,
  },
  created: function() {
    this.getUserInfo();
    this.AppShareShow();

    
  },
  methods: {
    getsid() {
      this.bridge.exec('getUserInfo', data => {
        if(!data.sid) return
          this.sid = data.sid;
      })
    },
    login(sid){
      this.sid =sid;
    },
    getParameterByName(name){
      var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if (r!=null) return unescape(r[2]); return null;
    },
    getUserInfo() {
      this.bridge.exec("getUserInfo", function(data) {
        this.sid = data.sid;
        this.fetch(data.sid)
      });
      // url地址栏  
      var sid = this.getParameterByName("sid");
      this.sid = sid;
      this.fetch(sid)
      this.login()
      if(sid==null||sid.length<7){
        // this.bridge.exec('invokeNativeLoginEvent', function(data) {});
        window.webviewWakeUp = data => {
          let userData
          if (data) {
            try {
              userData = JSON.parse(data);
              this.sid = userData.sid;
              this.fetch(this.sid)

            } catch (e) {}
          }
        }
        this.getsid()
      }
    },
    login(){
      this.bridge.exec('needWakeUp',{type:'1'},function(data) {})
    },
    cutTabClick(item, index) {
      this.cur = index;
      this.itemArr = this.listArr[index].list
      this.itemtype = this.listArr[index].type
    },
    getAllshow: function() {
      // this.allShow = true;
      let url=window.location.origin+'/static/v3/m/all.html?check='+this.itemtype;
      this.bridge.exec('openUrl',{url:url,type:'0'},function(data) {})
    },
    getBuyshow: function(diamond,id) {
      let isAndroid = /android/i.test(navigator.userAgent)
      if(isAndroid){
        if(this.sid.length>6){
          let url=window.location.origin+'/static/v3/m/liangh_buy.html?diamond='+diamond+'-'+id;
          this.bridge.exec('openUrl',{url:url,type:'0'},function(data) {})
        }else{
          this.bridge.exec('invokeNativeLoginEvent', function(data) {}); 
        }
      }else{
        if(this.sid.length>6){
          let url=window.location.origin+'/static/v3/m/liangh_buy.html?diamond='+diamond+'-'+id;
          this.bridge.exec('openUrl',{url:url,type:'0'},function(data) {})
        }else{
          this.bridge.exec('invokeNativeLoginEvent', function(data) {}); 
        }
      }
      
    },
    async fetch(sid) {
      let data = await this.$http(`/public/no/list?debug&sid=${sid}&is_first_page=1`)
      this.listArr = []
      _.each(data.desc, (item, index) => {
        _.each(data.list, (list, num) => {
          if (item.type == num) {
            item['list'] = list
          }
        })
        this.listArr.push(item)
        this.itemArr = this.listArr[0].list
        this.itemtype = this.listArr[0].type
      })
    },
    AppShareShow(){
      this.bridge.exec('appShareShow', {
        message: '4',//我的靓号
      }, function(data) {})
    },

    getbannerUrl: function() {
      let url=window.location.origin+'/static/v3/m/lianghao_book.html';
      this.bridge.exec('openUrl',{url:url,type:'0'},function(data) {})
    },
    getbookkUrl: function() {
      let url=window.location.origin+'/static/v3/m/lianghao_act.html';
      this.bridge.exec('openUrl',{url:url,type:'0'},function(data) {})
    },
  }
};
</script>
<style src="./index.less" lang="less" scoped></style>
