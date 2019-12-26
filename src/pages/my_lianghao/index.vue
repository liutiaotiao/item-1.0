<template>
  <div id="app" class="my_lh">
    <div class="my_tab">
      <div 
      v-for="(item,index) in list" 
      :class="{active:cur==index}" 
      @click="cutTabClick(item,index)" 
      class="my_tab-item">{{item}}</div>
    </div>
    <div class="my_details" v-show="cur==0">
      <div 
      v-for="(item,index) in listInfo"
      class="my_details_item">
      <div class="my_details_item-title">
        <div class="icon" :class="'icon'+item.type"></div>{{item.prettyNo}}
      </div>   
      <div class="my_details_item-li">购买用户：<span> {{item.nickname}}（{{item.uid}}）</span></div>
      <div class="my_details_item-li">购买时间：<span> {{item.dateline}}</span></div>
      <div class="my_details_item-li">
        价&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;格：
        <span v-if="item.channel =='钻石支付' ">  {{item.price}} 钻石</span>
        <span v-else>  {{item.price}} 元</span>
      </div>
      <!-- 我的购买 -->
      <div class="my_details_item-li" v-show="my">状&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;态：
        <span v-show="item.status==3">已赠送</span>
        <span v-show="item.status==2">已绑定</span>
        <span v-show="item.status==0">逾期未绑</span>
        <span v-show="item.status==-1">已回收</span>
        <div class="btn" v-show="item.status==1">
          <div class="btn1" @click="BindgetSHow(item)">绑定</div>
          <div class="btn2" @click="GivegetSHow(item)">赠送</div>
        </div>
      </div>
    </div>
    <div class="my_empty" v-show="cur==0&&isEmpty1">
      <div class="my_empty-icon"></div>
      <div class="my_empty-title1">暂无数据</div>
      <div class="my_empty-title2" @click="getMyLianghaoUrl">前往靓号商城了解详情 &gt;</div>
    </div>
  </div>

  <div class="my_details" v-show="cur==1">
    <div 
    v-for="(item,index) in listInfo2"
    class="my_details_item">
    <div class="my_details_item-title">
      <div class="icon" :class="'icon'+item.type"></div>{{item.prettyNo}}
    </div>   
    <div class="my_details_item-li">购买用户：<span> {{item.nickname}}（{{item.uid}}）</span></div>
    <div class="my_details_item-li">购买时间：<span> {{item.dateline}}</span></div>
    <div class="my_details_item-li">
      价&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;格：
      <span v-if="item.channel =='钻石支付' ">  {{item.price}} 钻石</span>
      <span v-else>  {{item.price}} 元</span>
    </div>
    <!--受赠靓号 -->
    <div class="my_details_item-li" v-show="give">状&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;态：
      <span v-show="item.status==2">已绑定</span>
      <span v-show="item.status==3">已拒绝</span>
      <span v-show="item.status==0">逾期未绑</span>
      <span v-show="item.status==-1">已回收</span>
      <div class="btn"  v-show="item.status==1">
        <div class="btn1"  @click="BindgetSHow(item)">绑定</div>
        <div class="btn2"  @click="RefuseShow(item)">拒绝</div>
      </div>
    </div>
  </div>
  <div class="my_empty" v-show="cur==1&&isEmpty2">
    <div class="my_empty-icon"></div>
    <div class="my_empty-title1">暂无数据</div>
    <div class="my_empty-title2" @click="getMyLianghaoUrl">前往靓号商城了解详情 &gt;</div>
  </div>
</div>

<!-- loading -->
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



<!-- 绑定弹窗 绑定靓号-->
<div class="dialogmy" v-show="dialogmyShow">
  <div class="dialogmy_wrap">
    <div class="dialogmy_wrap-top">
      <div class="dialogmy_wrap-top-title">绑定靓号提示</div>
      <div class="dialogmy_wrap-top-desc">是否确定绑定靓号</div>
      <div class="dialogmy_wrap-top-desc2">
        <div class="dialogmy_wrap-top-desc2-icon" :class="'icon'+prettydata.type"></div>
        {{prettydata.prettyNo}}
      </div>

      <!-- 之前没有账号绑定一个，新靓号 zhanghaoBind-->
      <div class="dialogmy_wrap-top-desc" v-if="userMess_type==0">
        绑定账号：{{prettydata.nickname}} ({{prettydata.uid}})
      </div>

      <!-- 已经有一个低级的然后在绑定一个高级 zhanghaoErBind-->
      <div v-if="userMess_type!=0" >
        <div class="dialogmy_wrap-top-desc">
          绑定账号：{{prettydata.nickname}}(<span :class="'icon'+userMess_type"></span>
        {{userMess_uid}})</div>
        <div class="dialogmy_wrap-top-tishi">
          温馨提示：确认绑定后，所有特权将以新绑定的靓号为准<br/>原靓号会被系统回收
        </div>
      </div>

    </div>
    <div class="dialogmy_wrap-btn">
      <div class="dialogmy_wrap-btn-esc" @click="BindHide">取消</div>
      <div class="dialogmy_wrap-btn-yes" @click="BindgetdialogBind()">确认绑定</div>
    </div>
  </div>
</div> 
<!-- 绑定弹窗 end-->




<!-- 赠送弹窗 赠送一个靓号-->
<div class="dialogmy"  v-show="GiveDialogShow">
  <div class="give">
    <div class="give-top">
      <div class="give-top-title">赠送靓号提示</div>

      <div class="give-top-desc2">
        赠送靓号：<div class="give-top-desc2-icon" :class="'icon'+prettydata.type"></div>
        <span>{{prettydata.prettyNo}}</span>
      </div>
      <div class="give-top-desc">赠送对象的兔几号：</div>
      <!-- 对方靓号输入前 -->
      <div class="give-top-choose" v-show="chooseBefore">
        <input class="give-top-choose-input" v-model="cUid2" type="number" @input="handleInput" placeholder="请输入兔几号" ref="phoneInput" @click="inputClicked">
        <div class="give-top-choose-btn" @click="getChooseAfter">确定</div>
      </div>

      <!-- 对方靓号输入后 -->
      <div class="give-top-after" v-show="chooseAfter">
        <div class="give-top-after-anchor" :style="{'background-image': 'url('+ Userportrait+')'}"></div>
        <div class="give-top-after-title">{{Usernickname}}</div>
        <div class="give-top-after-title">{{Useruid}}</div>
        <div class="give-top-after-btn"  @click="getChooseBefore">更换账号</div>
      </div>

    </div>
    <div class="give-btn">
      <div class="give-btn-esc" @click="GiveHide">取消</div>
      <div class="give-btn-yes" @click="Givegetdialog">确认赠送</div>
    </div>
  </div>
</div> 
<!-- 赠送弹窗  end-->


<!-- 成功 -->
<div class="dialogmy" v-show="prettyNosuccess">
  <div class="refuse success">
    <div class="refuse-top">
      <div class="refuse-top-title">恭喜您</div>
      <div class="refuse-top-icon"></div>
      <div class="refuse-top-desc">{{successDesc}}</div>
    </div>
    <div class="refuse-btn">
      <div class="refuse-btn-yes" @click="close">确定</div>
    </div>
  </div>
</div> 
<!-- 成功 end-->

<!-- 失败 -->
<div class="dialogmy" v-show="prettyNoError">
  <div class="refuse success">
    <div class="refuse-top">
      <div class="refuse-top-title">很遗憾</div>
      <div class="refuse-top-icon2"></div>
      <div class="refuse-top-desc">{{errorDesc}}</div>
    </div>
    <div class="refuse-btn">
      <div class="refuse-btn-yes" @click="close">确定</div>
    </div>
  </div>
</div> 
<!-- 失败 end-->




<!-- 拒绝弹窗 一个靓号-->
<div class="dialogmy" v-show="RefuseDialogmyShow">
  <div class="refuse">
    <div class="refuse-top">
      <div class="refuse-top-title">拒绝靓号提示</div>
      <div class="refuse-top-desc">是否确定拒绝靓号</div>
      <div class="refuse-top-desc2">
        <div class="refuse-top-desc2-icon" :class="'icon'+prettydata.type"></div>
        {{prettydata.prettyNo}}
      </div>
      <div class="refuse-top-tishi">
        温馨提示：拒绝靓号后，靓号将返回赠送用户账户
      </div>
    </div>
    <div class="refuse-btn">
      <div class="refuse-btn-esc" @click="RefuseHide">取消</div>
      <div class="refuse-btn-yes" @click="Refusegetdialog">确定</div>
    </div>
  </div>
</div> 
<!-- 拒绝弹窗 end-->



<!-- toast -->
<div class="animated fadeInDown" style="position:fixed;left:50%;top: 50%;z-index:9999" v-show="visible">
  <div class="w-toast">{{msg}}</div>
</div>


</div>
</template>

<script>
import qs from 'qs'
import axios from 'axios'
import _ from 'underscore'
export default {
  name: "my_lianghao",
  data: function() {
    return {
      isTipShow: false,
      list:['我的购买','受赠靓号'],
      cur:0,
      isEmpty1: false,
      isEmpty2: false,
      listInfo:[],
      listInfo2:[],
      dialogmyShow:false,
      sid: null,
      GiveDialogShow:false,
      status:0,
      zhanghaoBind:false,
      zhanghaoErBind:false,
      // 对方靓号输入前后
      chooseBefore:true,
      chooseAfter:false,

      // 拒绝
      RefuseDialogmyShow:false,
      

      // id
      my:true,
      give:false,
      page:1,
      api:'list',
      prettydata:[],
      successDesc:null,
      errorDesc:null,
      prettyNosuccess:false,
      prettyNoError:false,

      // 赠送
      cUid2:null,
      cUid:null,
      // toast
      msg:'null',
      visible:false,
      duration:2000,
      // 验证用户信息
      Userportrait:null,
      Usernickname:null,
      Useruid:null,
      icon:require('./images/anchor.png'),
      uid:'',
      sid:'',
      // 个人信息
      userMess_uid:null,
      userMess_type:0,

      totlePage:0,

      loading:false,
      wakeup:null
    };
  },
  created:function(){
    // url地址栏 可删
    var sid = this.getParameterByName("sid");
    var uid = this.getParameterByName("uid");
    this.sid = sid;
    this.uid = uid;

    this.AppShareShow();
    this.getUserMess(this.uid)
    this.initScroller()
    if(this.sid==null||this.sid.length<7){
      this.isEmpty1 = true
      this.isEmpty2 = true
      this.bridge.exec('invokeNativeLoginEvent', function(data) {});
      this.gwtWakeup();
      this.getsid()
    }else{
      this.fetch(this.sid)
    }
  },
  methods: {
    gwtWakeup(){
      window.webviewWakeUp = data => {
        let userData
        if (data) {
          try {
            userData = JSON.parse(data);
            this.sid = userData.sid;
            this.fetch(this.sid)
          } catch (e) {}
        }else{
          this.getsid()
        }
      }
    },
    getsid() {
      this.bridge.exec('getUserInfo', data => {
        if(!data.sid) return
         this.sid = data.sid; 
        if(this.sid.length>7){
          this.fetch(this.sid)
          this.gwtWakeup();
          this.getsid(this.sid);
        }else{
          this.isEmpty1 = true
          this.isEmpty2 = true
        }
      })
    },
    loadinga(){
      this.loading = true
      setTimeout(() => {
        this.loading  = false
      }, 2000);
    },
    getUserInfo() {
      this.bridge.exec("getUserInfo", function(data) {
        this.sid = data.sid;
        this.uid = data.uid;
        this.fetch(data.sid)
        this.getUserMess(this.uid)
      });
    },
    inputClicked() {
      if (this.$refs.phoneInput) {
        this.$refs.phoneInput.focus();
      }
    },
    async getUserMess(uid){
      axios.post(`/order/infoExists`,
        qs.stringify({
          'p[no]':this.cUid
        }))
      .then(data => {
        this.userMess_type = data.data.noType
        this.userMess_uid =  data.data.no
      }).catch(e => {})
    },
    show:function(msg){
      this.visible = true;
      this.msg = msg;
      this.cUid = '';
      setTimeout(() => {
        this.visible = false;
      }, 2000); 
    },
    handleInput(e) {
      this.cUid2 = e.target.value.replace(/[^\d]/g, '');
      if(this.cUid2.length==0){
        this.show('不能为空哦~')
      }
    },
    cutTabClick: function(item,index) { 
      this.page = 1
      if(index==0){
        this.my = true
        this.give = false
        this.api = 'list'
        this.fetch(this.sid);
      }else{
        this.api = 'givelist'
        this.give = true
        this.my = false
        this.fetch(this.sid);
      }
      this.cur = index
      
    },
    close(){
      this.prettyNosuccess =false
      this.prettyNoError = false
      this.page = 1
      this.fetch(this.sid)
    },
    // 绑定
    BindHide(){
      this.dialogmyShow = false
    },
    BindgetSHow(data){
      this.dialogmyShow = true
      this.prettydata = data
    },
    BindgetdialogBind(){
      this.dialogmyShow = false
      axios.post(`/user/no/bind?debug`, qs.stringify({
        sid:this.sid,
        prettyNo:this.prettydata.prettyNo,
        billno:this.prettydata.billno,
      })).then(data => {
        setTimeout(() => {
          this.prettyNosuccess = true
          this.successDesc = '绑定成功'
          this.getUserMess(this.uid)
        }, 100);
      }).catch(e => {
        setTimeout(() => {
          this.prettyNoError = true
          this.errorDesc = '绑定失败'
        }, 100); 
      })
    },
    // 赠送
    GivegetSHow(data){
      this.GiveDialogShow = true
      this.prettydata = data
    },
    GiveHide(){
      this.GiveDialogShow = false
    },
    Givegetdialog(){
      if(this.cUid2&&!this.cUid){
        this.show('请先确定兔几号后再赠送~')
      }else if(!this.cUid&&!this.cUid2){
        this.show('请填写赠送对象的兔几号~')
      }else{
        this.GiveDialogShow = false
        axios.post(`/user/no/give?debug`, qs.stringify({
          sid:this.sid,
          prettyId:this.prettydata.prettyId,
          cUid:this.cUid,
        })).then(data => {
          setTimeout(() => {
            this.prettyNosuccess = true
            this.successDesc = '赠送成功'//e.message
            
          }, 100);
        }).catch(e => {
          setTimeout(() => {
            this.prettyNoError = true
            // this.errorDesc = e.message
            this.errorDesc = '赠送失败'
          }, 100); 
        })
      }

    },
    async getChooseAfter(){
      this.cUid = this.cUid2
      if(!this.cUid){
        this.show('请填写赠送对象的兔几号~')
      }else{
        axios.post(`/order/infoExists`,
          qs.stringify({
            'p[no]':this.cUid
          }))
        .then(data => {
          console.log(data.data);
          this.userData =data.data
          let anchor = data.data.avatar
          anchor?this.Userportrait = anchor:this.Userportrait=this.icon
          this.Usernickname = data.data.nickname
          this.Useruid =  data.data.uid
          this.chooseAfter = true
          this.chooseBefore = false
          this.page = 1
          this.fetch(this.sid)
        }).catch(e => {
          if(e.code!==200){
            this.show('请填写正确的兔几号~')
          }
        })
      }

    },
    getChooseBefore(){
      this.chooseAfter = false
      this.chooseBefore = true
    },

    // 拒绝
    RefuseShow(data){
      this.RefuseDialogmyShow = true
      this.prettydata = data
    },
    RefuseHide(){
      this.RefuseDialogmyShow = false
    },
    Refusegetdialog(){
      this.RefuseDialogmyShow = false
      axios.post(`/user/no/bind/off?debug`, qs.stringify({
        sid:this.sid,
        prettyNo:this.prettydata.prettyNo,
        billno:this.prettydata.billno,
      })).then(data => {
        setTimeout(() => {
          this.prettyNosuccess = true
          this.successDesc = '拒绝成功'
        }, 100);
      }).catch(e => {
        setTimeout(() => {
          this.prettyNoError = true
          this.errorDesc = '拒绝失败'
        }, 100); 
      })
    },
    getParameterByName(name){
      var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if (r!=null) return unescape(r[2]); return null;
    },
    async fetch(sid) {
      let data = await this.$http(`/user/no/${this.api}?debug&sid=${sid}&page=${this.page}`)
      this.totlePage = data.totalPage
      if(this.page<=this.totlePage){
        this.page  = this.page+1
      }
      if(this.page > 2){
        if(this.api == 'list'){
          this.listInfo = this.listInfo.concat(data.list)
          this.isEmpty1 =this.listInfo.length === 0
        }else{
          this.listInfo2 = this.listInfo2.concat(data.list)
          this.isEmpty2 =this.listInfo2.length === 0
        }
      }else{
        if(this.api == 'list'){
          this.listInfo = data.list
          this.isEmpty1 =this.listInfo.length === 0
        }else{
          this.listInfo2 = data.list
          this.isEmpty2 =this.listInfo2.length === 0
        }
      }
    },
    AppShareShow(){
      this.bridge.exec('appShareShow', {
        message: '5',//靓号购买说明
      }, function(data) {})
    },
    getMyLianghaoUrl: function(diamond,id) {
      let url=window.location.origin+'/static/v3/m/all.html?check=0';
      this.bridge.exec('openUrl',{url:url,type:'0'},function(data) {})
    },
    // 分页
    scrollerHandler(e) {
      if ((window.screen.height + document.scrollingElement.scrollTop) >= document.scrollingElement.scrollHeight) {

        if(this.page<=this.totlePage){
          this.fetch(this.sid);
          this.loadinga()
        }
        
      }
    },
    initScroller() {
      document.addEventListener('scroll', _.throttle(this.scrollerHandler.bind(this), 300));
    },
  }
};
</script>
<style src="./index.less" lang="less" scoped></style>
