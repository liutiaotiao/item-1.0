<style lang="less" scoped src='./audition.less'></style>
<template>
<!-- 海选赛 -->
  <div class='audition-wrap'>
    <div class="audition-three">
      <div class='audition-ava-contain'>
        <!-- icon -->
        <div class='audition-ava_icon' @click='onAuditionIcon'></div>
        <!-- 第二名 -->
        <div class='audition-ava-list'>
          <div class='audition-ava-bg2'>
            <div class="audition-boxF">
              <div class="audition-boxS" @click='goRoom(top3[1])'>
                <div class="audition-boxT" v-if="top3[1] && top3[1]['portrait']" :style="{'background-image':`url(${top3[1]['portrait']})`}" >
                </div>
                <div class="audition-boxT" v-else>
                </div>
              </div>
            </div>
          </div> 
          <div class='audition-ava-live audition-ava-live2' v-if="top3[1] && top3[1]['live'] === 1"></div>
          <p class='audition-ava-name audition-ava-name2'>{{top3[1] && top3[1]['nickname'] || '虚位以待'}}</p>
        </div>
        <!-- 第一名 -->
        <div class='audition-ava-list'>
          <div class='audition-ava-bg1'>
            <div class="audition-boxF1">
              <div class="audition-boxS1" @click='goRoom(top3[0])'>
                <div class="audition-boxT1" v-if="top3[0] && top3[0]['portrait']" :style="{'background-image':`url(${top3[0]['portrait']})`}" >
                </div>
                <div class="audition-boxT1" v-else>
                </div>
              </div>
            </div>
          </div> 
          <div class='audition-ava-live audition-ava-live1' v-if="top3[0] && top3[0]['live'] === 1"></div>
          <p class='audition-ava-name audition-ava-name1'>{{top3[0] && top3[0]['nickname'] || '虚位以待'}}</p>
        </div>
        <!-- 第三名 -->
        <div class='audition-ava-list'>
          <div class='audition-ava-bg3'>
            <div class="audition-boxF">
              <div class="audition-boxS" @click='goRoom(top3[2])'>
                <div class="audition-boxT" v-if="top3[2] && top3[2]['portrait']" :style="{'background-image':`url(${top3[2]['portrait']})`}" >
                </div>
                <div class="audition-boxT" v-else>
                </div>
              </div>
            </div>
          </div> 
          <div class='audition-ava-live audition-ava-live3' v-if="top3[2] && top3[2]['live'] === 1"></div>
          <p class='audition-ava-name audition-ava-name3'>{{top3[2] && top3[2]['nickname'] || '虚位以待'}}</p>
        </div>
      </div>
    </div>

    <div class='audition-contain-wrap'>
      <div class='audition-contain'>
        <p class='audition-contain_title'>
          截止<span>12月8日23:59</span>，根据荣耀值排名晋级另外<span>29</span>名主播
        </p>
        <p class='audition-contain_line'></p>
        <div>
          <ul class='audition-contain-list-header'>
            <li class='audition-list'>排名</li>
            <li class='audition-list'>主播及荣耀值</li>
            <li class='audition-list'>用户贡献榜</li>
          </ul>
          <!-- 兔子列表 -->
          <ul class='audition-contain-list_ul' v-if='auditionArr.length > 0'>
            <li v-for='(item,index) in auditionArr' :key='index' class='audition-contain-li'>
              <div class='audition-num'>
                <div  :class='[(index <= 2 && currentIndex === 1) ? "audition-num-pic audition-num-pic"+index : ""]'></div>
                {{(index <= 2 && currentIndex === 1) ? '': currentIndex === 4 ? index + 30  : index + 1 + ((currentIndex-1) * 10)}}
              </div>
              <div class='audition-contain-list-main'>
                <div :class='[index <= 2 ? "audition-contain-ava audition-contain-ava" + index : "audition-contain-ava_default"]' @click='goRoom(item)'>
                  <div class='audition-contain-ava_mg' :class='[index <= 2 ? "" : "audition-contain-small_mg"]' v-if='item.portrait' :style="{'background-image':`url(${item.portrait})`}"></div>
                  <div class='audition-contain-ava_mg' :class='[index <= 2 ? "" : "audition-contain-small_mg"]' v-else></div>
                  <div class='audition-contain-live_mg' v-if='item.live === 1'></div>
                </div>
                <div class='audition-contain-list_p'>
                  <p class='audition-contain-list_p1'>{{item.nickname}}</p>
                  <p class='audition-contain-list_p2'>{{item.score}}</p>
                </div>
              </div>
              <div class='audition-contain_three' @click='onUserPop(item)'>
                <div class='audition-contain_three_ava audition-contain_three_ava0'>
                  <div class="audition-contain_three_default" v-if="item['boss'] && item['boss'][0] && item['boss'][0]['portrait']" :style="{'background-image':`url(${item['boss'][0]['portrait']})`}"></div>
                  <div class="audition-contain_three_default" v-else></div>
                </div>
                <div class='audition-contain_three_ava audition-contain_three_ava1'>
                  <div class="audition-contain_three_default" v-if="item['boss'] && item['boss'][1] && item['boss'][1]['portrait']" :style="{'background-image':`url(${item['boss'][1]['portrait']})`}"></div>
                  <div class="audition-contain_three_default" v-else></div>
                </div>
                <div class='audition-contain_three_ava audition-contain_three_ava2'>
                  <div class="audition-contain_three_default" v-if="item['boss'] && item['boss'][2] && item['boss'][2]['portrait']" :style="{'background-image':`url(${item['boss'][2]['portrait']})`}"></div>
                  <div class="audition-contain_three_default" v-else></div>
                </div>
              </div>
            </li>
          </ul>
          <div v-else class='audition-contain-no-data'>暂无数据</div>
        </div>
        <div class='audition-29' v-show='currentIndex <= 3'>
          <p class='audition-29_p'>截止<span>12月8日23:59</span>，以上主播成功晋级年度<span>32</span>强<br />并在次日获得年度星盛典封面装饰<span>20</span>天</p>
        </div>
        <!-- pager -->
        <div class='audition-pager'>
          <div class='audition-pager-p' :class="[ currentIndex == 1 ? '' : 'audition-pager_active']" @click='onPrev'>上一页</div>
          <div class='audition-pager-p'><span class="audition-pager_active">{{currentIndex}}</span>&nbsp;/&nbsp;<span>{{pagerTotal}}</span></div>
          <div class='audition-pager-p' :class="[ currentIndex == pagerTotal ? '' : 'audition-pager_active']" @click='onNext'>下一页</div>
        </div>
      </div>
    </div>




  </div>
</template>
<script>
import Bus from '../../bus/bus'
export default {
  name: 'audition',
  props:['sid'],
  data() {
    return {
      // sid:'',
      top3:[], // 前三名
      auditionAllArr:[],  //所有主播
      auditionArr:[],  // 分页展示
      currentIndex: 1, // 当前第几页


    }
  },
  created() {
     this.auditionData()
  },
  methods:{
    async auditionData() {
      const data = await this.$http.get(`/x/activity/annual-ceremony/stage-1`)
      this.top3 = data.top3
      this.auditionAllArr = data.list
      this.auditionArr = this.auditionAllArr.slice(0, 10)
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
    // 上一页
    onPrev() {
      if(this.currentIndex === 1) return
      this.currentIndex--
      switch(this.currentIndex) {
        case 1 :
          this.auditionArr = this.auditionAllArr.slice(0, 10)
          return
        case 2 :
          this.auditionArr = this.auditionAllArr.slice(10, 20)
          return
        default :
          this.auditionArr = this.auditionAllArr.slice(20, 29)
          return
      }

    },
    // 下一页
    onNext() {
      if(this.pagerTotal === this.currentIndex) return
      this.currentIndex++
      switch(this.currentIndex) {
        case 2 :
          this.auditionArr = this.auditionAllArr.slice(10, 20)
          return
        case 3 :
          this.auditionArr = this.auditionAllArr.slice(20, 29)
          return
        default :
          this.auditionArr = this.auditionAllArr.slice(29, 50)
          return
      }
    },
    // 点击用户贡献榜
    async onUserPop(item) {
      const data = await this.$http.get(`/x/activity/annual-ceremony/contribution-list?anchor=${item.uid}&stage=1`)
      Bus.$emit('onUserPop', data.list)
    },
    // 点击积分 icon
    onAuditionIcon() {
      Bus.$emit('onIntegral')
    }
  },
  computed: {
    pagerTotal() {
      return (this.auditionAllArr.length >= 29 ? 4 : Math.ceil(this.auditionAllArr.length / 10)) || 1
    }
  }
}
</script>