<style lang="less">
  body{
    background-color:#000;
  }
</style>
<style src="./index.less" lang="less" scoped></style>
  
<template>
  <div id="app" :class='[rid ? "app_mg" : ""]'>
    <!-- <div style='position:fixed;top:10px;left:10px;width:100px;height:100px;background:red;z-index:10' @click='aaa'></div> -->
    <div class="grand-ceremonynd-wrap" @scroll="appScroll" ref='scrollWarp'>
      <div class="grand-ceremonynd-bg">
        <div class='grand-rich' @click='onRich'></div>
        <p class="grand-ceremonynd-date">2019年12月2日～2019年12月21日</p>
      </div>

      <div class="grand-nav-wrap">
        <div v-for="(list, index) of 4" :key="list + ' _ ' + list" class="grand-nav-opacity" @click="onNavList(index)"></div>
        <div v-for="(item, index) in 4" class="grand-nav" :class="['grand-nav'+index]" :style="{'display':index===activeIndex?'block':'none'}" :key="index"></div>
      </div>
      <Crank v-if='activeIndex === 1' />
      <Creward v-if='activeIndex === 2' />
      <Crich v-if='activeIndex === 4' />

      <div class='grand_nav-rule' v-show='activeIndex===0'>
        <div class='grand_nav-wrap' :class='[fixedFlag ? "grand_nav-fixed" : ""]'  ref='nav'>
          <div v-for='(i,index) in 6' :key="'$'+index" :class='["grand_nav grand_nav_default"+index]' @click='onRulesNav(index)'></div>
          <div v-for='(i,index) in 6' :key='index' :class='["grand_nav grand_nav"+index]' v-show=" index === rulesIndex"></div>
        </div>
        <div class='grand_nav-wrap_placeholder' v-show='fixedFlag'></div>
        <div class='rules-wrap'>
          <!-- 年度礼物 -->
          <div name="rules_0_0" ref='rules0' class='g_rules rules_annualGift'>
            <div class='rules_receive' :class="[activeInfo.reward === 1 ? 'rules_receive_have' : activeInfo.reward === 2 ? 'rules_receive_btn' : '']" @click='onReward(activeInfo)'></div>
            <p class='rules_receive-p' @click='onReceiveRulse'></p>
          </div>
          <!-- 海选赛 -->
          <div name="rules_1_1" ref='rules1' class='g_rules rules_audition'></div>
          <!-- 卡位赛 -->
          <div name="rules_2_2" ref='rules2' class='g_rules rules_screens'></div>
          <!-- 积分赛 -->
          <div name="rules_3_3" ref='rules3' class='g_rules rules_integral'></div>
          <!-- 复活赛 -->
          <div name="rules_4_4" ref='rules4' class='g_rules rules_resurrection'></div>
          <!-- 总决赛 -->
          <div name="rules_5_5" ref='rules5' class='g_rules rules_final'></div>
        </div>
      </div>

    </div>
    <!-- 用户贡献榜弹窗 -->
    <CuserList v-model='userListVisible' :userListArr='userListData' />

    <Cpop ref='pop' />
    <!-- <CHost /> -->
    <CHost v-if='rid' />
  </div>
</template>
<script>
import Bus from './bus/bus.js'
import Crank from './component/rank'   // 排行
import Crich from './component/fuhao/rich'  //富豪榜
import Creward from './component/reward/reward'

import Cpop from './component/pop/pop' //弹窗
import CHost from './component/host/host' //浮层

import CuserList from './component/userList/userList'  

import axios from 'axios'

export default {
  name: 'grandCeremony',
  components:{
    Crank,
    Crich,
    Cpop,
    CHost,
    Creward,
    CuserList
  },
  data() {
    return {
      sid:'',
      rid:'',
      activeIndex: 1, // 当前展示nav 索引

      userListVisible:false,
      userListData:[],

      activeInfo:{},

      fixedFlag: false,
      offsetTop: 0,
      rulesIndex:0, 
      rules0: 0,
      rules1: 0,
      rules2: 0,
      rules3: 0,
      rules4: 0,
      rules5: 0,
 
    }
  },

  created() {
    
 
    this.loginData()

    window.webviewWakeUp = msg => {
      this.loginData()
    }
   
  },
  mounted() {

    // document.documentElement.setAttribute("lang","zh-cmn-Hans")
    // 海选赛积分
    Bus.$on('onIntegral',() => {
      this.$refs.pop.showPop('popIntegral')
    })

    Bus.$on('onUserPop', (arr) => {
      // this.userListData = []
      this.userListData = arr
      this.userListVisible = true
    })

  },
  methods: {
    aaa() {
      console.log(this.sid)
      console.log(this.activeInfo)
    },
   
    loginData() {
      // 自测使用
      // this.loadActiveInfo()

      // 发版放开  ********************
      this.bridge.exec('getUserInfo', data => {
        if(!data.sid) {
          this.loadActiveInfo()
          return
        }
        this.sid = data.sid;
        this.userInfo = data //userInfo.mobile
        this.loadActiveInfo() // 活动详情
      });
      this.bridge.exec('currentRoomID', roomId => {
        if (!roomId || (roomId == 'null' || roomId == 0 || roomId == -1)) return
        this.rid = roomId
      })
    },
    rulesMounted() {
      this.offsetTop = this.$refs.nav && this.$refs.nav.offsetTop
      this.rules0 = this.$refs.rules0 && this.$refs.rules0.offsetTop
      this.rules1 = this.$refs.rules1 && this.$refs.rules1.offsetTop
      this.rules2 = this.$refs.rules2 && this.$refs.rules2.offsetTop
      this.rules3 = this.$refs.rules3 && this.$refs.rules3.offsetTop
      this.rules4 = this.$refs.rules4 && this.$refs.rules4.offsetTop
      this.rules5 = this.$refs.rules5 && this.$refs.rules5.offsetTop
    },
    onNavList(index) {
      if(index === 3) {
        const date = new Date('2019/12/25 00:00:00').getTime()
        if(Date.now() < date) {
          this.$refs.pop.showPop('popUnio')
          return
        }
        this.bridge.exec('openUrl',{
        'url': `${window.location.origin}/static/v2/m/boot/GuildWars12/index.html` ,
        'title': '12月公会战',
        'type':'0'
        },function(data) {})
        return
      }
   
      if(index === 1) {
        this.loadActiveInfo()
      }
      this.activeIndex=index
      if(index === 0 && this.rules0 === 0) {
        this.$nextTick(() => {
          this.rulesMounted()
        })
      }
    },
    appScroll(env) {
      if(this.offsetTop === 0) return
      const scrollTop = env.target.scrollTop || env.srcElement.scrollTop
      if((scrollTop + 7) > this.offsetTop) {
        this.fixedFlag = true
      }else{
        this.fixedFlag = false
      } 
      const scTop = scrollTop + 51
      if(scTop > this.rules5 ) {
        this.rulesIndex = 5
        return
      }
      if(scTop > this.rules4 ) {
        this.rulesIndex = 4
        return
      }
      if(scTop > this.rules3 ) {
        this.rulesIndex = 3
        return
      }
      if(scTop > this.rules2 ) {
        this.rulesIndex = 2
        return
      }
      if(scTop > this.rules1 ) {
        this.rulesIndex = 1
        return
      }  
      if(scTop > this.rules0 ) {
        this.rulesIndex = 0
        return
      }
    },
    onRulesNav(index) {
      this.fixedFlag = true
      if(index === this.rulesIndex) return
      this.rulesIndex = index
      
      switch(index) {
        case 0 :
          this.$refs.scrollWarp.scrollTop = this.rules0 - 50
          return
        case 1 :
          this.$refs.scrollWarp.scrollTop = this.rules1 - 50
          return
        case 2 :
          this.$refs.scrollWarp.scrollTop = this.rules2 - 50
          return
        case 3 :
          this.$refs.scrollWarp.scrollTop = this.rules3 - 50
          return
        case 4 :
          this.$refs.scrollWarp.scrollTop = this.rules4 - 50
          return
        case 5 :
          this.$refs.scrollWarp.scrollTop = this.rules5 - 50
          return
      }
    },
    // 活动信息
    async loadActiveInfo() {
      const data = await this.$http.get(`/x/activity/annual-ceremony?sid=${this.sid}`)
      this.activeInfo = data.me || {}
      Bus.$emit('serviceDate', data.event)
      if(data.event.now >= data.event.end) {
        this.activeInfo.reward = 2 // 活动结束
        return
      }
      // if(this.activeInfo && this.activeInfo.reward === 1) {  // 已经领取
      //   this.activeInfo.reward = 1
      // }
    },
    // 领取奖励
    async onReward(obj) {
      if (!this.sid) {
        this.bridge.exec('invokeNativeLoginEvent', function(data) {});  //跳转登陆页面
        return;
      }

      if(obj && (obj.reward === 1 || obj.reward === 2)) {
        return
      }

      if(obj && obj.mobind === 0) {
        this.$refs.pop.showPop('popFailPhone')
        return
      }
      if(obj && obj.recharge < 10) {
        this.$refs.pop.showPop('popFail')
        return
      }

      let data  = await this.$http.post(`/x/activity/annual-ceremony?sid=${this.sid}`)
      
      this.$refs.pop.rewardTxt(`${data.name} X ${data.number}`)
      this.$refs.pop.showPop('popSucc')
      this.activeInfo.reward = 1
     
    },
    // 年度票领取规则
    onReceiveRulse() {
      this.$refs.pop.showPop('popTicket')
    },
    // 富豪榜
    onRich() {
      this.activeIndex = 4
    },
    // 排行中未开始的比赛
    // notStartPop(index) {
    //   this.$refs.pop.showPop('popSchedule')
    // }
  
  },
  beforeDestroy() {
    Bus.$off('onIntegral')
    Bus.$off('onUserPop')
  }
}
</script>
