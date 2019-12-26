<style lang="less" scoped>
.rebirth-wrap{
  width: 710px;
  padding-top: 249px;
  padding-bottom: 65px;
  background-image: url('../../images/aaaimg-fuhuo/fuhuo_top.png'), url('../../images/aaaimg-fuhuo/fuhuo-bottom.png');
  background-position: top center, bottom center;
  background-size: contain;
  background-repeat: no-repeat, no-repeat;
  margin:0 auto;
}
.rebirth-bod{
  min-height: 400px;
  width: 710px;
  border-left:2px solid rgba(94,77,52,1);
  border-right:2px solid rgba(94,77,52,1);
  box-sizing: border-box;
  margin: 0 auto;
  position: relative;
}
.rebirth-contain{
  padding: 0 23px 40px 24px;
  box-sizing: border-box;
}
.rebirth-title_block{
  margin-left: -24px;
  width: 710px;
  .rebirth-title_block_bg {
    width: 667px;
    height: 107px;
    background: url('../../images/aaaimg-fuhuo/fuhuo-title.png') no-repeat 0 0;
    background-size: cover;
    margin: 16px auto;
  }
}
.rebirth-more{
  width: 133px;
  height: 46px;
  background: url('../../images/aaaimg-fuhuo/fuhuo-seemore.png') no-repeat 0 0;
  background-size: cover;
  margin:0 auto;
}
</style>
<style lang="less" scoped src='../haixuan/audition.less'></style>
<template>
  <div class='rebirth-wrap'>
    <div class='rebirth-bod'>
      <ul class='rebirth-contain'>
        <!-- 兔子列表 -->
        <li v-for='(item,index) in rebirthArr' :key="'$' + index">
          <div class='audition-contain-li'>
              <div class='audition-num'>
              <div  :class='[index <= 2 ? "audition-num-pic audition-num-pic"+index : ""]'></div>
              {{index <= 2? '': index+1 }}
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
          <div class='rebirth-title_block' v-if='index === 0'>
            <div class='rebirth-title_block_bg'></div>
          </div>
        </li>
      </ul>
      <div class='rebirth-more' v-if='rebirthArr.length !== rebirthTotal.length' @click='onRebirthMore'></div>
    </div>
  </div>
</template>
<script>
import Bus from '../../bus/bus'
export default {
  name: 'fuhuo',
  data() {
    return {
      rebirthArr:[],
      rebirthTotal:[]
    }
  },
  created() {
    this.loadRebirthData()
  },
  methods:{
    async loadRebirthData() {
      let data = await this.$http.get(`/x/activity/annual-ceremony/stage-4`)
      this.rebirthTotal = data.list.slice(0, 24)
      this.rebirthArr = data.list.slice(0, 10)
    },
    // 进入直播间
    goFhRoom(obj) {
      if(! (obj && obj.uid)) return
      this.bridge.exec('jumpToRoomWithID', {
        roomID: obj.uid,
        no: obj.uid,
        islive: obj.live
      }, function(data) {})
    },
    // 点击用户贡献榜
    async onUserFhPop(item) {
      const data = await this.$http.get(`/x/activity/annual-ceremony/contribution-list?anchor=${item.uid}&stage=4`)
      Bus.$emit('onUserPop', data.list)
    },
    onRebirthMore() {
      this.rebirthArr = this.rebirthTotal
    }
  }
}
</script>