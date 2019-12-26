<style lang="less" scoped src='./final.less'></style>
<style lang="less">
.eli_txt {
  font-size: 30px;
}
</style>
<template>
  <div>
    <!-- <div style='position:fixed;top:10px;left:10px;width:100px;height:100px;background:red;z-index:1000' @click='aaa'></div> -->
    <div class='final_nav-wrap'>
      <div v-for='(i,index) in 3' :class='["final_nav final_nav0_"+index]' :key='index' @click='onFinalNav(index)'></div>
      <div v-for='(i,index) in 3' :class='["final_nav final_nav1_"+index]' :key='index+"_"' v-show='finalIndex === index'></div>
    </div>
    <div class='final_nav-main'>
      <p class='final_nav-main_p'>
        晋级决赛的<span>{{ finalIndex === 0 ? '9名' : finalIndex === 1 ? '6名' : '3名' }}</span>主播根据每日收获的荣耀值,<br />通过末尾淘汰制角逐年度星主播
      </p>
      <div class='final_contain'>
        <div class='final_contain-0'>
          <ul class='rebirth-contain'>
            <!-- 兔子列表 -->
            <li v-for='(item,index) in rebirthArr' :key="'$' + index">
              <div class='audition-contain-li'>
                <div class='audition-num' v-if='finalIndex === 0'>
                  <div :class='[index <= 2 ? "audition-num-pic audition-num-pic"+index : (index <= 5 && index >= 2) ? "" : "final_eliminate"]' v-html='index >= 6 ?`年度第<span class="eli_txt">${index+1}</span>名` : ""'></div>
                  {{index <= 2? '': (index <= 5 && index >= 2) ? index+1 : '' }}
                </div>
                <div class='audition-num' v-else-if='finalIndex === 1'>
                  <div :class='[index <= 2 ? "audition-num-pic audition-num-pic"+index : "final_eliminate"]' v-html='index >= 3 ?`年度第<span class="eli_txt">${index+1}</span>名` : ""'></div>
                </div>
                <div class='audition-num' v-else-if='finalIndex === 2'>
                  <div :class='[index <= 2 ? "audition-final-pic audition-final-pic"+index : ""]'></div>
                </div>
                <div class='audition-contain-list-main'>
                  <div :class='[index <= 2? "audition-contain-ava audition-contain-ava" + index : "audition-contain-ava_default"]' @click='goFhRoom(item)'>
                    <div class='audition-contain-ava_mg' :class='[index <= 2  ? "" : "audition-contain-small_mg"]' v-if='item["portrait"]' :style="{'background-image':`url(${item['portrait']})`}"></div>
                    <div class='audition-contain-ava_mg' :class='[index <= 2  ? "" : "audition-contain-small_mg"]' v-else></div>
                    <div class='audition-contain-live_mg' v-if='item.live === 1'></div>
                  </div>
                  <div class='audition-contain-list_p'>
                    <p class='audition-contain-list_p1'>{{item.nickname}}</p>
                    <p class='audition-contain-list_p2'>{{item.score}}</p>
                  </div>
                </div>
                <div class='audition-contain_three' @click='onUserFhPop(item)'>
                  <div class='audition-contain_three_ava audition-contain_three_ava0'>
                    <div class="audition-contain_three_default" v-if='item.boss && item.boss[0] && item.boss[0]["portrait"]' :style="{'background-image':`url(${item.boss[0]['portrait']})`}"></div>
                    <div class="audition-contain_three_default" v-else></div>
                  </div>
                  <div class='audition-contain_three_ava audition-contain_three_ava1'>
                    <div class="audition-contain_three_default" v-if='item.boss && item.boss[1] && item.boss[1]["portrait"]' :style="{'background-image':`url(${item.boss[1]['portrait']})`}"></div>
                    <div class="audition-contain_three_default" v-else></div>
                  </div>
                  <div class='audition-contain_three_ava audition-contain_three_ava2'>
                    <div class="audition-contain_three_default" v-if='item.boss && item.boss[2] && item.boss[2]["portrait"]' :style="{'background-image':`url(${item.boss[2]['portrait']})`}"></div>
                    <div class="audition-contain_three_default" v-else></div>
                  </div>
                </div>
              </div>
              <div class='rebirth-title_block' v-if='(finalIndex === 0 && index === 5) || (finalIndex === 1 && index === 2) || (finalIndex === 2 && index === 0)'>
                <div class='rebirth-title_block_P1' v-show='finalIndex === 0 && index === 5'>
                  <span>12月19日 00:00 - 23:59 </span>荣耀值排名前 6 的主播晋级<br />下一轮，第7、8、9名淘汰
                </div>
                <div class='rebirth-title_block_P1' v-show='finalIndex === 1 && index === 2'>
                  <span>12月20日 00:00 - 23:59 </span>荣耀值排名前 3 的主播晋级<br />下一轮，第4、5、6名淘汰
                </div>
                <div class='rebirth-title_block_P1' v-show='finalIndex === 2 && index === 0'>
                  <span>12月21日 00:00 - 23:59 </span>荣耀值排名第一的主播成为<br />兔几年度星主播冠军
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div v-show="loadPop" class="donut"></div>
  </div>
</template>
<script>
import Bus from '../../bus/bus'
export default {
  name: 'final',
  data() {
    return {
      finalIndex: 0,
      rebirthArr: [],
      loadPop: false,
      finalTime:[   // 发版本
        {startTime: new Date('2019/12/19 00:00').getTime(),endTime:new Date('2019/12/19 23:59:59').getTime()},
        {startTime: new Date('2019/12/20 00:00').getTime(),endTime:new Date('2019/12/20 23:59:59').getTime()},
        {startTime: new Date('2019/12/21 00:00').getTime(),endTime:new Date('2020/12/17 23:59:59').getTime()}
      ]
      // finalTime:[   // 发测试
      //   {startTime: new Date('2019/12/15 00:00').getTime(),endTime:new Date('2019/12/15 23:59:59').getTime()},
      //   {startTime: new Date('2019/12/16 00:00').getTime(),endTime:new Date('2019/12/16 23:59:59').getTime()},
      //   {startTime: new Date('2019/12/17 00:00').getTime(),endTime:new Date('2020/12/17 23:59:59').getTime()}
      // ]
    }
  },
  created() {
    //自测使用
    // this.initFinal(new Date('2019/12/17 12:00:00').getTime())
    //  发版用
    // 服务器返回当前时间
    //  Bus.$on('serviceDate', (data) => {
    //   if(data.now) {
    //     this.initFinal(data.now * 1000)
    //   }else{
    //     this.initFinal(Date.now())
    //   }
    // })

    this.initFinal()
  
  },
  methods: {
    aaa() {
      this.loadFinalData(0)
    },
    async initFinal() {
      const data = await this.$http.get(`/x/activity/annual-ceremony`)
      let timer = data.event.now * 1000
      this.finalIndex = this.finalTime.findIndex(item => {
        return item.startTime <= timer && timer <= item.endTime
      })
      this.loadFinalData(this.finalIndex)
    },
    onFinalNav(index) {
      if (index === this.finalIndex) return
      this.loadFinalData(index)
    },
    async loadFinalData(index) {
      this.loadPop = true
      let data = await this.$http.get(`/x/activity/annual-ceremony/stage-5${index + 1}`)
      this.loadPop = false
      const currentTime = data.event && data.event.now
      if (currentTime < data.schedule.begin) {
        this.$toast('赛程暂未开启')
        return
      }
      this.finalIndex = index
      switch (index) {
        case 0:
          this.rebirthArr = data.list.slice(0, 9)
          return
        case 1:
          this.rebirthArr = data.list.slice(0, 6)
          return
        case 2:
          this.rebirthArr = data.list.slice(0, 3)
      }
    },
    async onUserFhPop(host) {
      if(host && host.uid) {
        const data = await this.$http.get(`/x/activity/annual-ceremony/contribution-list?anchor=${host.uid}&stage=5${this.finalIndex+1}`)
        Bus.$emit('onUserPop', data.list)
      }
    },
    goFhRoom(obj) {
      if(! (obj && obj.uid)) return
      this.bridge.exec('jumpToRoomWithID', {
        roomID: obj.uid,
        no: obj.uid,
        islive: obj.live
      }, function(data) {})
    }
  },
  beforeDestroy() {
    Bus.$off('serviceDate')
  }
}
</script>