<style lang="less" scoped src='./rich.less'></style>
<template>
  <div class='rich-warp'>
    <div class='rich-top'>
      <p class='rich-top_p'>富豪榜是根据<span>年度星盛典期间(12月2日 - 12月21日)</span><br />用户<span>累计贡献的荣耀值而进行的排行</span></p>
      <p class='rich-top_p'><span>排名前三</span>的用户成为本年度兔几富豪并享受顶级荣誉的奖励</p>
      <!-- 第二名 -->
      <div class='rich-top-rank2-warp'>
        <div class='rich-top-rank2'>
          <div class='rich-top-rank2-ava' v-if="richTop3[1] && richTop3[1]['portrait']" :style='{"background-image":`url(${richTop3[1]["portrait"]})`}'></div>
          <div class='rich-top-rank2-ava' v-else></div>
          <div class='rich-top-rank2-index'></div>
        </div>
        <p class='rich-top-rank2_p1'>{{richTop3[1] && richTop3[1]['nickname'] || '虚位以待'}}</p>
        <p class='rich-top-rank2_p2'>累计贡献荣耀值<br />{{richTop3[1] && richTop3[1]['score']}}</p>
        <div class='rich-top-rank2_help'>
          <div class='rich-top2_help_ava' @click='goRoom(richTop3[1] && richTop3[1]["anchor"])'>
            <div class="rich-top2_ava" v-if='richTop3[1] && richTop3[1]["anchor"] && richTop3[1]["anchor"]["portrait"]' :style="{'background-image':`url(${richTop3[1]['anchor']['portrait']})`}"></div>
            <div class="rich-top2_ava" v-else></div>
            <div class="rich-top2-live" v-if='richTop3[1] && richTop3[1]["anchor"] && richTop3[1]["anchor"]["live"] === 1'></div>
          </div>
          <div class='rich-top2_help-p'>
            <p class='rich-top2_help_p1'>{{richTop3[1] && richTop3[1]["anchor"] && richTop3[1]["anchor"]["nickname"] || '虚位以待'}}</p>
            <p class='rich-top2_help_p2'>助力主播Top1</p>
          </div>
        </div>
      </div>
      <!-- 第一名 -->
      <div class='rich-top-rank1-warp'>
        <div class='rich-top-rank1'>
          <div class='rich-top-rank1-ava' v-if="richTop3[0] && richTop3[0]['portrait']" :style='{"background-image":`url(${richTop3[0]["portrait"]})`}'></div>
          <div class='rich-top-rank1-ava' v-else></div>
          <div class='rich-top-rank1-index'></div>
        </div>
        <p class='rich-top-rank1_p1'>{{richTop3[0] && richTop3[0]['nickname'] || '虚位以待'}}</p>
        <p class='rich-top-rank1_p2'>累计贡献荣耀值<br /><span>{{richTop3[0] && richTop3[0]['score']}}</span></p>
        <div class='rich-top-rank2_help'>
          <div class='rich-top1_help_ava' @click='goRoom(richTop3[0] && richTop3[0]["anchor"])'>
            <div class="rich-top1_ava" v-if='richTop3[0] && richTop3[0]["anchor"] && richTop3[0]["anchor"]["portrait"]' :style="{'background-image':`url(${richTop3[0]['anchor']['portrait']})`}"></div>
            <div class="rich-top1_ava" v-else></div>
            <div class="rich-top1-live" v-if='richTop3[0] && richTop3[0]["anchor"] && richTop3[0]["anchor"]["live"] === 1'></div>
          </div>
          <div class='rich-top1_help-p'>
            <p class='rich-top1_help_p1'>{{richTop3[0] && richTop3[0]["anchor"] && richTop3[0]["anchor"]["nickname"] || '虚位以待'}}</p>
            <p class='rich-top1_help_p2'>助力主播Top1</p>
          </div>
        </div>
      </div>
      <!-- 第三名 -->
      <div class='rich-top-rank3-warp'>
        <div class='rich-top-rank3'>
          <div class='rich-top-rank3-ava' v-if="richTop3[2] && richTop3[2]['portrait']" :style='{"background-image":`url(${richTop3[2]["portrait"]})`}'></div>
          <div class='rich-top-rank3-ava' v-else></div>
          <div class='rich-top-rank3-index'></div>
        </div>
        <p class='rich-top-rank3_p1'>{{richTop3[2] && richTop3[2]['nickname'] || '虚位以待'}}</p>
        <p class='rich-top-rank3_p2'>累计贡献荣耀值<br />{{richTop3[2] && richTop3[2]['score']}}</p>
        <div class='rich-top-rank2_help'>
          <div class='rich-top2_help_ava' @click='goRoom(richTop3[2] && richTop3[2]["anchor"])'>
            <div class="rich-top2_ava" v-if='richTop3[2] && richTop3[2]["anchor"] && richTop3[2]["anchor"]["portrait"]' :style="{'background-image':`url(${richTop3[2]['anchor']['portrait']})`}"></div>
            <div class="rich-top2_ava" v-else></div>
            <div class="rich-top2-live" v-if='richTop3[2] && richTop3[2]["anchor"] && richTop3[2]["anchor"]["live"] === 1'></div>
          </div>
          <div class='rich-top2_help-p'>
            <p class='rich-top2_help_p1'>{{richTop3[2] && richTop3[2]["anchor"] && richTop3[2]["anchor"]["nickname"] || '虚位以待'}}</p>
            <p class='rich-top2_help_p2'>助力主播Top1</p>
          </div>
        </div>
      </div>
    </div>
    <div class='rich-main'>
      <ul class="rich-main-tilte">
        <li class='rich-main-title_li'>排名</li>
        <li class='rich-main-title_li'>用户及累计贡献荣耀值</li>
        <li class='rich-main-title_li'>助力主播TOP1</li>
      </ul>
      <ul>
        <li class="rich-li" v-for='(item,index) in richArr' :key='index'>
          <div class="rich-li_num">{{index + 4}}</div>
          <div class='rich-li-ava-user'>
            <div class='rich-li-user'>
              <div class='rich-li-default-user' v-if="item.portrait" :style='{"background-image":`url(${item.portrait})`}'></div>
              <div class='rich-li-default-user' v-else></div>
            </div>
            <div class='rich-li-user_p'>
              <p class='rich-li-user_p1'>{{item.nickname || '虚位以待'}}</p>
              <p class='rich-li-user_p2'>{{item.score}}</p>
            </div>
          </div>
          <div class='rich-li-ava-user'>
            <div class='rich-li-host' @click='goRoom(item.anchor)'>
              <div class='rich-li-default-host' v-if="item.anchor && item.anchor['portrait']" :style="{'background-image':`url(${item.anchor && item.anchor['portrait']})`}"></div>
              <div class='rich-li-default-host' v-else></div>
              <div class='rich-li-default-host_live' v-if="item.anchor && item.anchor['live'] === 1"></div>
            </div>
            <p class='rich-li-host_p1'>{{item.anchor && item.anchor['nickname'] || '虚位以待'}}</p>
          </div>
        </li>
        <li class='rich-li_data' v-if='richArr.length === 0'>暂无数据</li>
        <li class='rich-see-more' @click='getMore' v-if='(richArrCopy.length > 10) && flag'></li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: 'rich',
  data() {
    return {
      richTop3:[],
      richArr:[],
      richArrCopy:[],
      flag: true
    }
  },
  created() {
    this.richData()
  },
  methods:{
    async richData() {
      const data = await this.$http.get(`/x/activity/annual-ceremony/customer-list`)
      this.richArrCopy = data.list
      this.richTop3 = data.list.slice(0, 3)
      this.richArr = data.list.slice(3, 10)
    },
    getMore() {
      this.richArr = this.richArrCopy.slice(3,20)
      this.flag = false
    },
     // 进入直播间
    goRoom(obj) {
      if(! (obj && obj.uid)) return
      this.bridge.exec('jumpToRoomWithID', {
        roomID: obj.uid,
        no: obj.uid,
        islive: obj.live
      }, function(data) {})
    },
  }
}
</script>