<template>
  <div id="app" class="lh_buy">

    <div class="buyheader frist">
      <div class="buyheader-title">购买账号：</div>
      <div class="buyheader-icon"  :style="{'background-image': `url(${portrait?portrait:icon})`}"></div>
      <div class="buyheader-name">{{nickname}}</div>
      <div class="buyheader-uid">兔几号：{{uid}}</div>
    </div>

    <div class="buyheader">
      <div class="buyheader-title">购买靓号：</div>
      <div class="buyheader-pretty" :class="'pretty'+prettyInfo.type"></div>
      <div class="buyheader-prettyid">{{prettyInfo.prettyNo}}</div>
    </div>

    <div class="buyheader last">
      <div class="buyheader-title">应付金额：</div>
      <div class="buyheader-prettyid">{{diamond}} 普通钻石</div>
    </div>

    <div class="buytitle-tq"><span></span>靓号特权：</div>                
    <ul class="buytitle-tqlist">
      <li>1、永久靓号标识，尽显尊贵</li>
      <li v-show="prettyInfo.type==1">2、直播间精品靓号勋章，与众不同</li>
      <li v-show="prettyInfo.type==2">2、直播间豪级靓号勋章，与众不同</li>
      <li v-show="prettyInfo.type==3">2、直播间尊级靓号勋章，与众不同</li>
      <li v-show="prettyInfo.type==5">2、直播间神级靓号勋章，与众不同</li>
      <li>3、购买即得海量用户经验，快速升级</li>
      <li>4、成功购买触发全站广播，闪耀全场</li>
    </ul>

    <div class="buytitle-buydesc"><span></span>靓号购买说明：</div>
    <div class="buytitle-tqlist">
      <li>1、购买靓号的用户，所购买的靓号需手动绑定或者选择赠送给其他人，已绑定的靓号不可转移绑定到其它账号上；</li>
      <li>2、成功购买或获赠兔几靓号后，请在30天内完成绑定，如逾期未完成绑定，兔几直播将有权回收该靓号且不退款；</li>
      <li>3、普通用户和贵族都可以购买兔几靓号，但是只能使用普通钻石购买靓号；</li>
      <li>4、靓号的绑定是唯一的，绑定新靓号后，所有特权将以新绑定的靓号为准。</li>
    </div>


    <div class="buypay" v-if="myDiamond>=diamond">
      <div class="buypay-diamond">当前可用普通钻石：{{myDiamond}}</div>
      <div class="buypay-btn" @click="getDialogShow">{{diamond}}钻石 立即支付</div>
    </div>

    <div class="buypay" v-else>
      <div class="buypay-diamond">当前可用普通钻石不足（剩余{{myDiamond}}普通钻石)</div>
      <div class="buypay-btn" @click="getOnCallNativePay">钻石不足  立即充值</div>
    </div>



    <!-- 弹窗 -->
    <div class="dialog" v-show="dialogShow">
      <div class="dialog_wrap">
        <div class="dialog_wrap-top">
          <div class="dialog_wrap-top-title">靓号购买提示</div>
          <div class="dialog_wrap-top-desc">是否确定购买靓号</div>
          <div class="dialog_wrap-top-desc2">
            <div class="dialog_wrap-top-desc2-icon" :class="'pretty'+prettyInfo.type"></div>
            {{prettyInfo.prettyNo}}（{{diamond}}钻石）
          </div>
          <div class="dialog_wrap-top-desc">购买账号：{{nickname}}（{{uid}}）</div>
        </div>
        <div class="dialog_wrap-btn">
          <div class="dialog_wrap-btn-esc" @click="getDialogHide">取消</div>
          <div class="dialog_wrap-btn-yes" @click="getBuyAjax">确定</div>
        </div>
      </div>
    </div>



    <!-- 弹窗 购买失败-->
    <div class="dialog" v-show="dialogError">
      <div class="dialog_wrap error">
        <div class="dialog_wrap-top error">
          <div class="dialog_wrap-top-title">购买失败</div>
          <div class="dialog_wrap-top-desc">{{dialogErrorTxt}}</div>
        </div>
        <div class="dialog_wrap-btn error">
          <div class="dialog_wrap-btn-esc" @click="getBuyError">取消</div>
          <div class="dialog_wrap-btn-yes" @click="getBuyError">确定</div>
        </div>
      </div>
    </div>

    <!-- toast -->
    <div class="animated fadeInDown" style="position:fixed;left:50%;top: 50%;z-index:9999" v-show="visible">
      <div class="w-toast">{{msg}}</div>
    </div>

    <success v-show="buySuccess"  @visible='getBuyAjax' @dataName='newFuncName' ></success>
    <!-- 购买成功 -->
  </div>
</template>
        
<script>
import success from "@/pages/liangh_buy/components/lh_success/index";
import qs from 'qs'
import axios from 'axios'
export default {
  name: "lh_buy",
  data: function() {
    return {
      allShow: false,
      myDiamond:0,
      diamond:0,
      buypayBtn:null,
      dialogShow:false,
      buySuccess:false,
      bridgeosid: null,
      prettyNo:null,
      prettyInfo:[],
      sid:null,
      portrait:null,
      nickname:null,
      uid:null,
      icon:require('./images/anchor.png'),
      dialogError:false,
      dialogErrorTxt:null,
      no:0,
      childByValue:0,
      // toast
      msg:'null',
      visible:false,
      duration:3000,

      awaitError:0
    };
  },
  components:{
    'success':success,
  },
  created: function() {
   
    this.getUserInfo();
    
    // url地址栏 可删
    var sid = this.getParameterByName("sid");
    this.sid = sid;
    this.fetch()
  },
  methods: {
    getParameterByName(name){
      var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if (r!=null) return unescape(r[2]); return null;
    },
    getUserInfo() {
      this.bridge.exec("getUserInfo", function(data) {
        this.sid = data.sid;
        this.fetch();
      });


    let str = this.getParameterByName("diamond");
    if(str){
      let index = str .lastIndexOf("-")
      this.diamond=str.substring(0,index);
      this.prettyNo = str.substring(index+1,str.length);
    }
       
      
    },
    async fetch() {
      
      let data = await this.$http(`/user/info?debug=true&sid=${this.sid}`)
      this.myDiamond = data.rich.normalDiamond;
      await this.$http(`/user/no/info?debug=true&sid=${this.sid}&prettyNo=${this.prettyNo}`).then(data => {
        this.prettyInfo = data
      }).catch(e => {
        this.awaitError=1
        this.show('该靓号已下架，请重新选择哦~')
        setTimeout(() => {
          this.getLianghaoUrl();
        }, 3000);
      })

      let icon = this.prettyInfo.user_info.portrait 
      let nickname = this.prettyInfo.user_info.nickname
      let uid = this.prettyInfo.user_info.uid

      icon?this.portrait = icon:this.portrait=this.icon
      nickname?this.nickname = nickname:this.nickname=""
      uid?this.uid = uid:this.uid=""

    },
    show:function(msg){
      this.visible = true;
      this.msg = msg;
      setTimeout(() => {
        this.visible = false;
      }, 3000); 
    },
    getLianghaoUrl: function() {
      let url=window.location.origin+'/static/v3/m/lianghao.html';
      this.bridge.exec('openUrl',{url:url,type:'0'},function(data) {})
    },
    getDialogShow() {
      if(this.awaitError==1){
        this.show('该靓号已下架，暂时不能购买哦~')
      }else{
        this.dialogShow = true
        this.childByValue = 0
      }
        
    },
    getDialogHide() {
      this.dialogShow = false
    },
    newFuncName(data){
      if(data == 99){
        this.buySuccess = false
        this.childByValue = data
        this.getClose();
      }
    },
    getBuyAjax(visible) {
      let data
      let client
      let isAndroid = /android/i.test(navigator.userAgent)
      this.dialogShow = false
      isAndroid? client = 'android' : client = 'ios'
      axios.post(`/user/no/buy?debug`, qs.stringify({
        sid:this.sid,
        channel:'diamond',
        prettyId:this.prettyInfo.prettyId,
        client:client,
      })).then(data => {
        this.buySuccess = visible
      }).catch(e => {
        this.dialogErrorTxt = e.message
        if(this.childByValue!=99){
          this.dialogError = true
        }
      })
    },
    getBuyError() {
      this.dialogError = false
    },
    getOnCallNativePay(){
      var _url = window.location.origin + window.location.pathname
      this.bridge.exec('onCallNativePay', {
        money: '6',
        type: '1',
        return_url: _url,
      }, function(data) {})
    },
    getClose(){
      this.bridge.exec('qmliveClosePage', function(data) {});
    }
  }
};
</script>
<style src="./index.less" lang="less" scoped></style>
