<style lang="less" scoped src='./host.less'></style>
<template>
  <div>
    <!-- <div style='position:fixed; top:10px;left:10px;width:100px;height:100px;background-color:red' @click='aaa'></div> -->
    <!-- 海选不再前三 -->
    <div class='haixuan'  :class='[hxFlag ? "" : "hx-up"]' v-if="processNav[0]['succ'] === false && processIndex === 0">
      <div class='hx-icon' :class='[hxFlag ? "" : "hx_open"]' @click='hxFlag = !hxFlag'></div>
      <div class='haixuan-top'>
        <div class='haixuan-top1'>
          <p class='haixuan-top_p1'>{{gameInfo.today_livetime}}/3 当日累计直播时长（小时）</p>
          <p class='haixuan-top_p2'>完成任务额外增加 1000 荣誉值</p>
          <div class='haixuan_top-icon' v-show='gameInfo.today_livetime  >= 3'></div>
        </div>
        <div class='haixuan-top1'>
          <p class='haixuan-top_p1'>{{gameInfo.today_score}}/15000 当日累计获得荣誉值</p>
          <p class='haixuan-top_p2'>完成任务额外增加 6000 荣誉值</p>
          <div class='haixuan_top-icon' v-show='gameInfo.today_score >= 15000'></div>
        </div>
      </div>
      <div class='haixuan-bottom'>
        <div class='haixuan-bottom-sanxin'>
          <div class='host_info-left'>
            <div class='host_info_ava'>
              <div class='host_info_ava-default' v-if='anchor && anchor.portrait' :style='{"background-image":`url(${anchor.portrait})`}'></div>
              <div class='host_info_ava-default' v-else></div>
            </div>
            <div class='host_info_p'>
              <p class='host_info_p1'>实时排名:{{gameInfo.rank === -1 ? '99+' : gameInfo.rank }}</p>
              <p class='host_info_p2'>{{anchor && anchor.nickname}}</p>
              <p class='host_info_p3'>海选赛总荣耀值: <span class='host_info_p3-num'>{{gameInfo.score}}</span></p>
            </div>
          </div>
          <div class='host_info-right'>
            <div class='host_info-gong'></div>
            <div class='host_info-boss' @click='onUserPop(anchor)'>
              <div class='host-boss host-boss0'>
                <div class='host-boss_default' v-if='anchor && anchor["boss"] && anchor["boss"][0] && anchor["boss"][0]["portrait"]' :style='{"background-image": `url(${anchor["boss"][0]["portrait"]})`}'></div>
                <div class='host-boss_default' v-else></div>
              </div>
              <div class='host-boss host-boss1'>
                <div class='host-boss_default' v-if='anchor && anchor["boss"] && anchor["boss"][1] && anchor["boss"][1]["portrait"]' :style='{"background-image": `url(${anchor["boss"][1]["portrait"]})`}'></div>
                <div class='host-boss_default' v-else></div>
              </div>
              <div class='host-boss host-boss2'>
                <div class='host-boss_default' v-if='anchor && anchor["boss"] && anchor["boss"][2] && anchor["boss"][2]["portrait"]' :style='{"background-image": `url(${anchor["boss"][2]["portrait"]})`}'></div>
                <div class='host-boss_default' v-else></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 海选赛top3 -->
    <div class='haixuan3' :class='[hx3Flag ? "" : "haixuan3-up"]' v-if="processNav[0]['succ'] === true && processIndex === 0">
      <div class='haixuan3-icon' :class='[hx3Flag ? "" : "haixuan3_open"]' @click='hx3Flag = !hx3Flag'></div>
      <div class='haixuan3_ava'>
        <div class='haixuan3-default' v-if='anchor && anchor.portrait' :style='{"background-image":`url(${anchor.portrait})`}'></div>
        <div class='haixuan3-default' v-else></div>
      </div>
      <div class='haixuan3_txt'>
        <p class='haixuan3_p'>免赛海选，直接晋级</p>
        <p class='haixuan3_p2'>{{anchor && anchor.nickname}}</p>
        <p class='haixuan3_p3'>年度积分排名: <span>{{gameInfo.rank === -1 ? '99+' : gameInfo.rank }}</span></p>
      </div>
    </div>

    <!-- 卡位赛 -->
    <div class='host_info' :class='[kaweiFlag ? "" : "host_info-up"]' v-if="processNav[1]['succ'] === true && processIndex === 1">
      <div class='host_info-icon' :class='[kaweiFlag ? "" : "host_info_open"]' @click='kaweiFlag = !kaweiFlag'></div>
      <div class='host_info-left'>
        <div class='host_info_ava'>
          <div class='host_info_ava-default' v-if='anchor && anchor.portrait' :style='{"background-image":`url(${anchor.portrait})`}'></div>
          <div class='host_info_ava-default' v-else></div>
        </div>
        <div class='host_info_p'>
          <p class='host_info_p1'>实时排名:{{gameInfo.rank === -1 ? '99+' : gameInfo.rank }}</p>
          <p class='host_info_p2'>{{anchor && anchor.nickname}}</p>
          <p class='host_info_p3'>今日奖励荣耀值: <span class='host_info_p3-num'>{{gameInfo.today_reward}}</span></p>
          <p class='host_info_p3'>卡位赛总荣耀值: <span class='host_info_p3-num'>{{gameInfo.score}}</span></p>
        </div>
      </div>
      <div class='host_info-right'>
        <div class='host_info-gong'></div>
        <div class='host_info-boss' @click='onUserPop(anchor)'>
          <div class='host-boss host-boss0'>
            <div class='host-boss_default' v-if='anchor && anchor["boss"] && anchor["boss"][0] && anchor["boss"][0]["portrait"]' :style='{"background-image": `url(${anchor["boss"][0]["portrait"]})`}'></div>
            <div class='host-boss_default' v-else></div>
          </div>
          <div class='host-boss host-boss1'>
            <div class='host-boss_default' v-if='anchor && anchor["boss"] && anchor["boss"][1] && anchor["boss"][1]["portrait"]' :style='{"background-image": `url(${anchor["boss"][1]["portrait"]})`}'></div>
            <div class='host-boss_default' v-else></div>
          </div>
          <div class='host-boss host-boss2'>
            <div class='host-boss_default' v-if='anchor && anchor["boss"] && anchor["boss"][2] && anchor["boss"][2]["portrait"]' :style='{"background-image": `url(${anchor["boss"][2]["portrait"]})`}'></div>
            <div class='host-boss_default' v-else></div>
          </div>
        </div>
      </div>
    </div>


    <!-- 积分赛  晋级16名-->
    <div class='host_info' :class='[jifenFlag ? "" : "host_info-up"]' v-if="processNav[2]['succ'] === true && processIndex === 2 && jifenShow">
      <div class='host_info-icon' :class='[jifenFlag ? "" : "host_info_open"]' @click='jifenFlag = !jifenFlag'></div>
      <div class='host_info-left'>
        <div class='host_info_ava'>
          <div class='host_info_ava-default' v-if='anchor && anchor.portrait' :style='{"background-image":`url(${anchor.portrait})`}'></div>
          <div class='host_info_ava-default' v-else></div>
        </div>
        <div class='host_info_p'>
          <p class='host_info_p1'>实时排名:{{['A','B','C','D'][gameInfo['group'] - 1]}}组第{{gameInfo.rank}}名</p>
          <p class='host_info_p2'>{{anchor && anchor.nickname}}</p>
          <p class='host_info_p3'>今日奖励荣耀值: <span class='host_info_p3-num'>{{gameInfo.today_reward}}</span></p>
          <p class='host_info_p3'>今日总荣耀值: <span class='host_info_p3-num'>{{gameInfo.today_score}}</span></p>
        </div>
      </div>
      <div class='host_info-right'>
        <div class='host_info-gong'></div>
        <div class='host_info-boss' @click='onUserPop(anchor)'>
          <div class='host-boss host-boss0'>
            <div class='host-boss_default' v-if='anchor && anchor["boss"] && anchor["boss"][0] && anchor["boss"][0]["portrait"]' :style='{"background-image": `url(${anchor["boss"][0]["portrait"]})`}'></div>
            <div class='host-boss_default' v-else></div>
          </div>
          <div class='host-boss host-boss1'>
            <div class='host-boss_default' v-if='anchor && anchor["boss"] && anchor["boss"][1] && anchor["boss"][1]["portrait"]' :style='{"background-image": `url(${anchor["boss"][1]["portrait"]})`}'></div>
            <div class='host-boss_default' v-else></div>
          </div>
          <div class='host-boss host-boss2'>
            <div class='host-boss_default' v-if='anchor && anchor["boss"] && anchor["boss"][2] && anchor["boss"][2]["portrait"]' :style='{"background-image": `url(${anchor["boss"][2]["portrait"]})`}'></div>
            <div class='host-boss_default' v-else></div>
          </div>
        </div>
      </div>
    </div>

    <!-- 积分赛 晋级失败 -->
    <div class='jifen_fail' :class='[jifenFailFlag? "" : "haixuan3-up"]' v-if="processNav[2]['succ'] === false && processIndex === 2 && jifenShow">
      <div class='haixuan3-icon' :class='[jifenFailFlag ? "" : "haixuan3_open"]' @click='jifenFailFlag = !jifenFailFlag'></div>
      <div class='haixuan3_ava'>
        <div class='haixuan3-default' v-if='anchor && anchor.portrait' :style='{"background-image":`url(${anchor.portrait})`}'></div>
        <div class='haixuan3-default' v-else></div>
      </div>
      <div class='haixuan3_txt'>
        <p class='haixuan3_p'>{{anchor && anchor.nickname}}</p>
        <p class='haixuan3_p2'>主播已被淘汰，将在12月18日的<br />复活赛争取最后的晋级名额</p>
      </div>
    </div>

    <!-- 复活赛 没有进入 8强-->
    <div class='haixuan'  :class='[fhFailFlag ? "" : "hx-up"]' v-if="processNav[3]['succ'] === false && processIndex === 3 && fuhuoShow">
      <div class='hx-icon' :class='[fhFailFlag ? "" : "hx_open"]' @click='fhFailFlag = !fhFailFlag'></div>
      <div class='haixuan-top'>
        <div class='haixuan-top1'>
          <p class='haixuan-top_p1' :class="[gameInfo.today_livetime >= 3 ?'txt_act' : '']">{{gameInfo.today_livetime }}/3 当日累计直播时长（小时）</p>
          <p class='haixuan-top_p2'>完成任务额外增加 1000 荣誉值</p>
          <div class='haixuan_top-icon' v-show='gameInfo.today_livetime >= 3'></div>
        </div>
        <div class='fuhuo-top1'>
          <p class='fuhuo_top_p1' :class="[gameInfo.total_livetime >= 12 ?'txt_act' : '']">{{gameInfo.total_livetime}}/12 星盛典期间累计直播天数</p>
          <p class='fuhuo_top_p2'>* 单日有效直播≥1小时才可记为一天</p>
          <p class='fuhuo_top_p3'>完成任务额外增加 8000 荣誉值</p>
          <div class='haixuan_top-icon' v-show='gameInfo.total_livetime >= 12'></div>
        </div>
      </div>
      <div class='haixuan-bottom'>
        <div class='haixuan-bottom-sanxin'>
          <div class='host_info-left'>
            <div class='host_info_ava'>
              <div class='host_info_ava-default' v-if='anchor && anchor.portrait' :style='{"background-image":`url(${anchor.portrait})`}'></div>
              <div class='host_info_ava-default' v-else></div>
            </div>
            <div class='host_info_p'>
              <p class='host_info_p1'>实时排名:{{gameInfo.rank === -1 ? '99+' : gameInfo.rank }}</p>
              <p class='host_info_p2'>{{anchor && anchor.nickname}}</p>
              <p class='host_info_p3'>复活赛荣耀值: <span class='host_info_p3-num'>{{gameInfo.score}}</span></p>
            </div>
          </div>
          <div class='host_info-right'>
            <div class='host_info-gong'></div>
            <div class='host_info-boss' @click='onUserPop(anchor)'>
              <div class='host-boss host-boss0'>
                <div class='host-boss_default' v-if='anchor && anchor["boss"] && anchor["boss"][0] && anchor["boss"][0]["portrait"]' :style='{"background-image": `url(${anchor["boss"][0]["portrait"]})`}'></div>
                <div class='host-boss_default' v-else></div>
              </div>
              <div class='host-boss host-boss1'>
                <div class='host-boss_default' v-if='anchor && anchor["boss"] && anchor["boss"][1] && anchor["boss"][1]["portrait"]' :style='{"background-image": `url(${anchor["boss"][1]["portrait"]})`}'></div>
                <div class='host-boss_default' v-else></div>
              </div>
              <div class='host-boss host-boss2'>
                <div class='host-boss_default' v-if='anchor && anchor["boss"] && anchor["boss"][2] && anchor["boss"][2]["portrait"]' :style='{"background-image": `url(${anchor["boss"][2]["portrait"]})`}'></div>
                <div class='host-boss_default' v-else></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

     <!-- 复活赛 晋级决赛 -->
    <div class='fuhuo-succ' :class='[fuhuoFlag ? "" : "haixuan3-up"]' v-if="processNav[3]['succ'] === true && processIndex === 3 && fuhuoShow">
      <div class='haixuan3-icon' :class='[fuhuoFlag ? "" : "haixuan3_open"]' @click='fuhuoFlag = !fuhuoFlag'></div>
      <div class='haixuan3_ava'>
        <div class='haixuan3-default' v-if='anchor && anchor.portrait' :style='{"background-image":`url(${anchor.portrait})`}'></div>
        <div class='haixuan3-default' v-else></div>
      </div>
      <div class='haixuan3_txt'>
        <p class='fuhuo-succ_p1'>{{anchor && anchor.nickname}}</p>
        <p class='fuhuo-succ_p2'></p>
      </div>
    </div>
  


    <!-- 决赛当天 第一天9名主播有浮层、第二天6名主播有浮层、第三天3名主播有浮层 -->
    <div class='host_info' :class='[hostFlag ? "" : "host_info-up"]' v-if="processNav[4]['succ'] === true && (gameInfo.rank <= gameInfo.rankShow) && processIndex === 4">
      <div class='host_info-icon' :class='[hostFlag ? "" : "host_info_open"]' @click='hostFlag = !hostFlag'></div>
      <div class='host_info-left'>
        <div class='host_info_ava'>
          <div class='host_info_ava-default' v-if='anchor && anchor.portrait' :style='{"background-image":`url(${anchor.portrait})`}'></div>
          <div class='host_info_ava-default' v-else></div>
        </div>
        <div class='host_info_p'>
          <p class='host_info_p1'>实时排名:{{gameInfo.rank === -1 ? '99+' : gameInfo.rank }}</p>
          <p class='host_info_p2'>{{anchor && anchor.nickname}}</p>
          <p class='host_info_p3'>今日奖励荣耀值: <span class='host_info_p3-num'>{{gameInfo.today_reward}}</span></p>
          <p class='host_info_p3'>今日总荣耀值: <span class='host_info_p3-num'>{{gameInfo.score}}</span></p>
        </div>
      </div>
      <div class='host_info-right'>
        <div class='host_info-gong'></div>
        <div class='host_info-boss' @click='onUserPop(anchor)'>
          <div class='host-boss host-boss0'>
            <div class='host-boss_default' v-if='anchor && anchor["boss"] && anchor["boss"][0] && anchor["boss"][0]["portrait"]' :style='{"background-image": `url(${anchor["boss"][0]["portrait"]})`}'></div>
            <div class='host-boss_default' v-else></div>
          </div>
          <div class='host-boss host-boss1'>
            <div class='host-boss_default' v-if='anchor && anchor["boss"] && anchor["boss"][1] && anchor["boss"][1]["portrait"]' :style='{"background-image": `url(${anchor["boss"][1]["portrait"]})`}'></div>
            <div class='host-boss_default' v-else></div>
          </div>
          <div class='host-boss host-boss2'>
            <div class='host-boss_default' v-if='anchor && anchor["boss"] && anchor["boss"][2] && anchor["boss"][2]["portrait"]' :style='{"background-image": `url(${anchor["boss"][2]["portrait"]})`}'></div>
            <div class='host-boss_default' v-else></div>
          </div>
        </div>
      </div>
    </div>

    <!-- 名次 // 冠军 亚军 季军 -->
    <div class='rank-info' :class='[succFlag ? "" : "haixuan3-up", rank === 1 ? "rank-info_1" : rank === 2 ? "rank-info_2" : rank === 3 ? "rank-info_3" : ""]' v-if="processNav[4]['succ'] === true && gameInfo.rankShow === -100 && processIndex === 4">
      <div class='haixuan3-icon' :class='[succFlag ? "" : "haixuan3_open"]' @click='succFlag = !succFlag'></div>
      <div class='haixuan3_ava'>
        <div class='haixuan3-default' v-if='anchor && anchor.portrait' :style='{"background-image":`url(${anchor.portrait})`}'></div>
        <div class='haixuan3-default' v-else></div>
      </div>
      <div class='haixuan3_txt'>
        <p class='fuhuo-succ_p1'>{{anchor && anchor.nickname}}</p>
        <p class='rank_p2' :class='[rank === 1 ? "fuhuo-succ_p2_1" : rank === 2 ? "fuhuo-succ_p2_2" : rank === 3 ? "fuhuo-succ_p2_3" : "rank_p2-p3"]'>
          {{rank > 3 ? `年度星主播第${rank}名` : ''}}
        </p>
      </div>
    </div>
  </div>
  
</template>
<script>

import Bus from '../../bus/bus'
export default {
  name: 'host',
  data() {
    return {
      rid:'',
      userPop: false,
      stage:'',

      currentTime:Date.now(),

      hxFlag: true,  // 海选赛不在前三
      hx3Flag: true,  //海选前三
      kaweiFlag: true, //卡位赛
      jifenFlag: true, //积分赛 晋级
      jifenFailFlag: true, //积分赛 晋级失败
      jifenShow: false,
      fuhuoFlag: true, //复活晋级
      fuhuoShow: false,
      fhFailFlag: true, //复活赛 没进入8强
      hostFlag: true,  // 决赛情况

      anchor:{}, //主播信息
      gameInfo:{}, //比赛信息

      rank: -1,  // 冠军 亚军 季军
      succFlag: true, // 冠军 亚军 季军
      processIndex: -1,  // 0海选  1卡位  2积分  3复活  4决赛
      processNav:[
        {
          // succ:false,startTime: new Date('2019/12/2 00:00').getTime(),endTime:new Date('2019/12/8 23:59:59').getTime()  //海选 上线
          succ:false,startTime: new Date('2019/12/2 00:00').getTime(),endTime:new Date('2019/12/4 23:59:59').getTime()  //海选 测试
        },
        {
          // succ:false,startTime: new Date('2019/12/9 00:00').getTime(),endTime:new Date('2019/12/13 23:59:59').getTime()  // 卡位 上线
          succ:false,startTime: new Date('2019/12/5 00:00').getTime(),endTime:new Date('2019/12/9 23:59:59').getTime()  // 卡位  测试
        },
        {
          succ:false,startTime: new Date('2019/12/14 00:00').getTime(),endTime:new Date('2019/12/17 23:59:59').getTime()  // 积分赛 上线
          // succ:false,startTime: new Date('2019/12/10 00:00').getTime(),endTime:new Date('2019/12/17 23:59:59').getTime()  // 积分赛 测试
        },
        {
          succ:false,startTime: new Date('2019/12/18 00:00').getTime(),endTime:new Date('2019/12/18 23:59:59').getTime() //复活赛
        },
        {
          succ:false,startTime: new Date('2019/12/19 00:00').getTime(),endTime:new Date('2019/12/21 23:59:59').getTime()  //总决赛
        }
      ],
      pointTime:[  // 积分赛 上线
        { startTime: new Date('2019/12/14 00:00').getTime(),endTime:new Date('2019/12/14 23:59:59').getTime()},
        { startTime: new Date('2019/12/15 00:00').getTime(),endTime:new Date('2019/12/15 23:59:59').getTime()},
        { startTime: new Date('2019/12/16 00:00').getTime(),endTime:new Date('2019/12/16 23:59:59').getTime()},
        { startTime: new Date('2019/12/17 00:00').getTime(),endTime:new Date('2019/12/17 23:59:59').getTime()},
      ],
      //  pointTime:[  // 积分赛 测试
      //   { startTime: new Date('2019/12/10 00:00').getTime(),endTime:new Date('2019/12/11 23:59:59').getTime()},
      //   { startTime: new Date('2019/12/15 00:00').getTime(),endTime:new Date('2019/12/15 23:59:59').getTime()},
      //   { startTime: new Date('2019/12/16 00:00').getTime(),endTime:new Date('2019/12/16 23:59:59').getTime()},
      //   { startTime: new Date('2019/12/17 00:00').getTime(),endTime:new Date('2019/12/17 23:59:59').getTime()},
      // ],
      // finalTime:[  // 决赛 测试
      //   { startTime: new Date('2019/12/15 00:00').getTime(),endTime:new Date('2019/12/15 23:59:59').getTime()},
      //   { startTime: new Date('2019/12/16 00:00').getTime(),endTime:new Date('2019/12/16 23:59:59').getTime()},
      //   { startTime: new Date('2019/12/17 00:00').getTime(),endTime:new Date('2020/12/17 23:59:59').getTime()},
      // ],
      finalTime:[  // 决赛 上线
        { startTime: new Date('2019/12/19 00:00').getTime(),endTime:new Date('2019/12/19 23:59:59').getTime()},
        { startTime: new Date('2019/12/20 00:00').getTime(),endTime:new Date('2019/12/20 23:59:59').getTime()},
        { startTime: new Date('2019/12/21 00:00').getTime(),endTime:new Date('2020/12/19 23:59:59').getTime()},
      ]
    }
  },
  created() {
     //服务器返回当前时间  自测使用
    // this.currentTime = new Date('2019/12/20 10:00').getTime()
    // this.loadHostData(100437)


    //服务器返回当前时间
    Bus.$on('serviceDate', (data) => {
      if(data.now) {
        this.currentTime = data.now * 1000
      }else{
        this.currentTime = Date.now()
      }
      this.bridge.exec('currentRoomID', roomId => {
        if (!roomId || (roomId == 'null' || roomId == 0 || roomId == -1)) return
        this.rid = roomId
        this.loadHostData(roomId)
      })
    })


  },
  methods:{
    aaa() {
      console.log(this.processNav[4]['succ'] , this.gameInfo.rankShow  , this.processIndex)
    },
    initHost() {
      if(this.processIndex === 2) {
        let index = this.pointTime.findIndex(item => {
          return item.startTime <= this.currentTime && this.currentTime <= item.endTime
        })
        this.stage = index + 1
        return
      }

      if(this.processIndex === 4) {
        let index = this.finalTime.findIndex(item => {
          return item.startTime <= this.currentTime && this.currentTime <= item.endTime
        })
        this.stage = index + 1
        return
      }


    },
    async loadHostData(rid) {
      const data = await this.$http.get(`/x/activity/annual-ceremony/anchor-info?anchor=${rid}`)
      this.anchor = data.anchor
      this.processIndex = (data.event && data.event.stage || 0) - 1
      this.initHost()
      //   海选赛
      if(data.event.stage === 1) {
        if(data.anchor.top3 === -1) {  // 不再前三
          this.processNav[this.processIndex]['succ'] = false
          this.gameInfo.rank = data.anchor.rank
          this.gameInfo.score = data.anchor.score
          this.gameInfo.today_livetime = this.hoursFilter(data.anchor.today_livetime)
          this.gameInfo.today_score = data.anchor.today_score
        }else{
          this.processNav[this.processIndex]['succ'] = true // 再前三
          this.gameInfo.rank = data.anchor.top3 
        }
      }

      //   卡位赛
      if(data.event.stage === 2) {
        if( data.anchor.rank <= 32 && data.anchor.rank !== -1) {
          this.processNav[this.processIndex]['succ'] = true
          this.gameInfo.rank = data.anchor.rank
          this.gameInfo.score = data.anchor.score
          this.gameInfo.today_reward = data.anchor.today_reward
        }

      }
      // 积分赛
      if(data.event.stage === 3 ) {
        if(data.anchor.rank === -1 && data.anchor.group === -1) {
            this.jifenShow = false
        }else if(data.anchor.group === -1 && data.anchor.rank !== -1) {
           this.processNav[this.processIndex]['succ'] = false  //未进入16强
           this.jifenShow = true
        } else{
          this.processNav[this.processIndex]['succ'] = true
          this.jifenShow = true
          this.gameInfo.group =  data.anchor.group
          this.gameInfo.rank = data.anchor.rank
          this.gameInfo.today_score = data.anchor.today_score  // 今日总荣耀值
          this.gameInfo.today_reward = data.anchor.today_reward   // 今日奖励荣耀值
        }
      }

      // 复活赛
      if(data.event.stage === 4 ) {       
        if(data.anchor.rank === 0) {   //进入前8
          this.processNav[this.processIndex]['succ'] = true
          this.fuhuoShow = true
        }else if(data.anchor.rank === -1){
           this.fuhuoShow = false
        }else{
          this.fuhuoShow = true
          this.processNav[this.processIndex]['succ'] = false
          this.gameInfo.rank = data.anchor.rank
          this.gameInfo.score = data.anchor.score
          this.gameInfo.today_livetime =  this.hoursFilter(data.anchor.today_livetime)
          this.gameInfo.total_livetime = data.anchor.total_livetime
        }
      }

      // 决赛
      if(data.event.stage === 5 && data.anchor.rank !== -1) {
        this.processNav[this.processIndex]['succ'] = true

        this.rank = data.anchor.rank
        this.gameInfo.rank = data.anchor.rank
        this.gameInfo.score = data.anchor.score
        this.gameInfo.today_reward = data.anchor.today_reward
//上线
        const one = new Date('2019/12/19 23:59:59').getTime()
        const two = new Date('2019/12/20 23:59:59').getTime()
        const three = new Date('2019/12/21 23:59:59').getTime()
// 测试

        // const one = new Date('2019/12/15 23:59:59').getTime()
        // const two = new Date('2019/12/16 23:59:59').getTime()
        // const three = new Date('2019/12/17 23:59:59').getTime()


        const current = data.event.now * 1000
        if(current <= one) { //第一天显示前9
          this.gameInfo.rankShow = 9
        }else if(current <= two) {   //第二天显示前6
          this.gameInfo.rankShow = 6
        }else if(current <= three) {   //第二天显示前3
          this.gameInfo.rankShow = 3
        }else{
          this.gameInfo.rankShow = -100
        }
      }

    },
    hoursFilter(time) {
      if(!time) 0
      return Math.floor(Number(time) / 3600)
    },
    async onUserPop(host) {
      if(host && host.uid) {
        const data = await this.$http.get(`/x/activity/annual-ceremony/contribution-list?anchor=${host.uid}&stage=${this.processIndex + 1}${this.stage}`)
        Bus.$emit('onUserPop', data.list)
      }
    }
  },
  beforeDestroy() {
    Bus.$off('serviceDate')
  }
}
</script>