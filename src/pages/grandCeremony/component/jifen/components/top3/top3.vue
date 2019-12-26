<style lang="less" scoped src='./top3.less'></style>
<style lang="less" scoped src='../../../haixuan/audition.less'>
</style>
<template>
  <div>
    <!-- 未开始 -->
    <template v-if='showIndex === 0'>
      <div v-for='(item,index) in pointArrFst' :key='index' :class='["point-top3_not point-top3_not"+index]'>
        <div class='point-top3_not-top'>
          <div class='point-top3_not_contain'>

            <div class='point-top3_not_block' @click="goPointRoom(item[0])">
              <div class='point-top3_not-ava'>
                <div class='point-top3_not-ava_b'>
                  <Cava :srcUrl='item[0] && item[0]["portrait"] || ""' />
                </div>
                <div class='point_not-live' v-if='item[0] && item[0]["live"] === 1'></div>
              </div>
              <p class='point_no_p'>{{item[0] && item[0]['nickname'] || '虚位以待'}}</p>
            </div>
            <div class='point-top3_not_block' @click="goPointRoom(item[1])">
              <div class='point-top3_not-ava'>
                <div class='point-top3_not-ava_b'>
                  <Cava :srcUrl='item[1] && item[1]["portrait"] || ""' />
                </div>
                <div class='point_not-live' v-if='item[1] && item[1]["live"] === 1'></div>
              </div>
              <p class='point_no_p'>{{item[1] && item[1]['nickname'] || '虚位以待'}}</p>
            </div>
            <p class='point_no-pk'></p>

          </div>
        </div>

        <div class='point-top3_not-top point-top3_not-bottom'>
          <div class='point-top3_not_contain'>

            <div class='point-top3_not_block' @click="goPointRoom(item[2])">
              <div class='point-top3_not-ava'>
                <div class='point-top3_not-ava_b'>
                  <Cava :srcUrl='item[2] && item[2]["portrait"] || ""' />
                </div>
                <div class='point_not-live' v-if='item[2] && item[2]["live"] === 1'></div>
              </div>
              <p class='point_no_p'>{{item[2] && item[2]['nickname'] || '虚位以待'}}</p>
            </div>
            <div class='point-top3_not_block' @click="goPointRoom(item[3])">
              <div class='point-top3_not-ava'>
                <div class='point-top3_not-ava_b'>
                  <Cava :srcUrl='item[3] && item[3]["portrait"] || ""' />
                </div>
                <div class='point_not-live' v-if='item[3] && item[3]["live"] === 1'></div>
              </div>
              <p class='point_no_p'>{{item[3] && item[3]['nickname'] || '虚位以待'}}</p>
            </div>
            <p class='point_no-pk'></p>
          </div>
        </div>
      </div>
    </template>
    <!-- 前三个 -->
    <template v-if='showIndex === 1'>
      <div v-for='(item,index) in pointArrFst' :key='index' :class='["point-top3 point-top3"+index]'>
        <div class='point-top3-top'>
          <div class="point-top3-contain">
            <div class="point-top3-block">
              <div class='point-top3-ava-wrap'>
                <div class='point-top3-win' v-if='item[0] && item[0]["games"] && item[0]["winner"] === 1'></div>
                <div class='point-top3_ava' @click="goPointRoom(item[0])">
                  <Cava :srcUrl='item[0] && item[0]["portrait"] || ""' />
                </div>
                <div class='point-top3-live' v-if='item[0] && item[0]["live"] === 1'></div>
              </div>
              <div>
                <p class='point_top3_p1'>{{item[0] && item[0]['nickname'] || '虚位以待'}}</p>
                <p class='point_top3_p2'>本日荣耀值: {{item[0] && item[0]['score'] || 0}}</p>
              </div>
              <div class='point-top3-user' @click='onKwUserPop(item[0])'></div>
            </div>

            <div class="point-top3-block">
              <div class='point-top3-ava-wrap'>
                <div class='point-top3-win'  v-if='item[1] && item[1]["games"] && item[1]["winner"] === 1'></div>
                <div class='point-top3_ava' @click="goPointRoom(item[1])">
                  <Cava :srcUrl='item[1] && item[1]["portrait"] || ""' />
                </div>
                <div class='point-top3-live' v-if='item[1] && item[1]["live"] === 1'></div>
              </div>
              <div>
                <p class='point_top3_p1 point_top3_p1_right'>{{item[1] && item[1]['nickname'] || '虚位以待'}}</p>
                <p class='point_top3_p2 point_top3_p2_right'>本日荣耀值: {{item[1] && item[1]['score'] || 0}}</p>
              </div>
              <div class='point-top3-user' @click='onKwUserPop(item[1])'></div>
            </div>

            <div class='point-process-wrap' v-if='(item[0] && item[0]["winner"] === 1) || (item[1] && item[1]["winner"] === 1)'>
              <div class='point-process_1' :style='{"width": (item[0] && item[0]["rotate"] || 0) + "%"  }'></div>
              <div class='point-process_2' :style='{"width": (item[1] && item[1]["rotate"] || 0) + "%"  }'></div>
            </div>
            <div class='point-process-wrap' v-else>
              <div class='point-process_1' :style='{"width": (item[0] && item[0]["rotate"] || 0) + "%"  }'></div>
              <div class='point-process_2' :style='{"width": (item[1] && item[1]["rotate"] || 0) + "%"  }'></div>
            </div>

          </div>
        </div>

        <div class='point-top3-top point-top3-bottom'>
          <div class="point-top3-contain">
            <div class="point-top3-block">
              <div class='point-top3-ava-wrap'>
                <div class='point-top3-win' v-if='item[2] && item[2]["games"] && item[2]["winner"] === 1'></div>
                <div class='point-top3_ava' @click="goPointRoom(item[2])">
                  <Cava :srcUrl='item[2] && item[2]["portrait"] || ""' />
                </div>
                <div class='point-top3-live' v-if='item[2] && item[2]["live"] === 1'></div>
              </div>
              <div>
                <p class='point_top3_p1'>{{item[2] && item[2]['nickname'] || '虚位以待'}}</p>
                <p class='point_top3_p2'>本日荣耀值: {{item[2] && item[2]['score'] || 0}}</p>
              </div>
              <div class='point-top3-user' @click='onKwUserPop(item[2])'></div>
            </div>

            <div class="point-top3-block">
              <div class='point-top3-ava-wrap'>
                <div class='point-top3-win' v-if='item[3] && item[3]["games"] && item[3]["winner"] === 1'></div>
                <div class='point-top3_ava' @click="goPointRoom(item[3])">
                  <Cava :srcUrl='item[3] && item[3]["portrait"] || ""' />
                </div>
                <div class='point-top3-live' v-if='item[3] && item[3]["live"] === 1'></div>
              </div>
              <div>
                <p class='point_top3_p1 point_top3_p1_right'>{{item[3] && item[3]['nickname'] || '虚位以待'}}</p>
                <p class='point_top3_p2 point_top3_p2_right'>本日荣耀值: {{item[3] && item[3]['score'] || 0}}</p>
              </div>
              <div class='point-top3-user' @click='onKwUserPop(item[3])'></div>
            </div>

            <div class='point-process-wrap' v-if='(item[2] && item[2]["winner"] === 1) || (item[3] && item[3]["winner"] === 1)'>
              <div class='point-process_1' :style='{"width": (item[2] && item[2]["rotate"] || 0) + "%"  }'></div>
              <div class='point-process_2' :style='{"width": (item[3] && item[3]["rotate"] || 0) + "%"  }'></div>
            </div>
            <div class='point-process-wrap' v-else>
              <div class='point-process_1' :style='{"width": (item[2] && item[2]["rotate"] || 0) + "%"  }'></div>
              <div class='point-process_2' :style='{"width": (item[3] && item[3]["rotate"] || 0) + "%"  }'></div>
            </div>

          </div>
        </div>

      </div>
    </template>

    <!-- 第四天未开始 -->
    <template v-if='showIndex === 2'>
      <div v-for='(item,index) in pointArrFst' :class='["point-top4_no point-top4_no"+index]' :key='index'>
        <div class='point-top4_no-top'>
          <div class='point-top4_no-contain'>
            <div class='point-top4_no-block' @click="goPointRoom(item[0])">
              <div class='point-top4-no-ava'>
                <Cava :srcUrl='item[0] && item[0]["portrait"] || ""'/>
              </div>
              <div class='point-top4_no-live' v-if='item[0] && item[0]["live"] === 1'></div>
              <p class='point-top4_no-p'>{{item[0] && item[0]['nickname'] || '虚位以待'}}</p>
            </div>
            <div class='point-top4_no-block' @click="goPointRoom(item[1])">
              <div class='point-top4-no-ava'>
                <Cava :srcUrl='item[1] && item[1]["portrait"] || ""'/>
              </div>
              <div class='point-top4_no-live' v-if='item[1] && item[1]["live"] === 1'></div>
              <p class='point-top4_no-p'>{{item[1] && item[1]['nickname'] || '虚位以待'}}</p>
            </div>
          </div>
        </div>
        <div class='point-top4_no-top point-top4_no-bottom'>
          <div class='point-top4_no-contain'>
            <div class='point-top4_no-block' @click="goPointRoom(item[2])">
              <div class='point-top4-no-ava'>
                <Cava :srcUrl='item[2] && item[2]["portrait"] || ""'/>
              </div>
              <div class='point-top4_no-live' v-if='item[2] && item[2]["live"] === 1'></div>
              <p class='point-top4_no-p'>{{item[2] && item[2]['nickname'] || '虚位以待'}}</p>
            </div>
            <div class='point-top4_no-block' @click="goPointRoom(item[3])">
              <div class='point-top4-no-ava'>
                <Cava :srcUrl='item[3] && item[3]["portrait"] || ""'/>
              </div>
              <div class='point-top4_no-live' v-if='item[3] && item[3]["live"] === 1'></div>
              <p class='point-top4_no-p'>{{item[3] && item[3]['nickname'] || '虚位以待'}}</p>
            </div>
          </div>
        </div>


      </div>
    </template>

    <!-- 第四天排行 -->
    <template v-if='showIndex === 3'>
      <div v-for='(itemArr, index) in pointArrFst' :key='index' :class='["point-top4 point-top4_"+index]'>
        <div class='point4-contain'>
           <!-- 兔子列表 -->
          <ul class='audition-contain-list_ul'>
            <li v-for='(item,index) in itemArr' :key='index' class='audition-contain-li'>
              <div class='audition-num'>
                <div  :class='[index <= 2 ? "audition-num-pic audition-num-pic"+index : ""]'></div>
                {{index <= 2 ? '': index+1}}
              </div>
              <div class='audition-contain-list-main'>
                <div :class='[index <= 2 ? "audition-contain-ava audition-contain-ava" + index : "audition-contain-ava_default"]' @click="goPointRoom(item)">
                  <div class='audition-contain-ava_mg' :class='[index <= 2 ? "" : "audition-contain-small_mg"]' v-if='item.portrait' :style="{'background-image':`url(${item.portrait})`}"></div>
                  <div class='audition-contain-ava_mg' :class='[index <= 2 ? "" : "audition-contain-small_mg"]' v-else></div>
                  <div class='audition-contain-live_mg' v-if='item.live === 1'></div>
                </div>
                <div class='audition-contain-list_p'>
                  <p class='audition-contain-list_p1'>{{item.nickname || '虚位以待'}}</p>
                  <p class='audition-contain-list_p2'>{{item.score || 0}}</p>
                </div>
              </div>
              <div class='audition-contain_three' @click='onKwUserPop(item)'>
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
        </div>
      </div>

    </template>

    <!-- 总积分 -->
    <template v-if='showIndex === 4'>
      <div v-for='(arr, index) in pointArr' :key='index' :class='["point-top5 point-top5_"+index]'>
        <div class='point5-contain'>
             <!-- 兔子列表 -->
          <div class='audition-contain-list_ul'>
            <div v-for='(item,index) in arr' :key='index'>
              <div  class='audition-contain-li'>
                <div class='audition-num'>
                  <div  :class='[index <= 2 ? "audition-num-pic audition-num-pic"+index : ""]'></div>
                    {{index <= 2 ? '': index+1}}
                </div>
                <div class='audition-contain-list-main'>
                  <div :class='[index <= 2 ? "audition-contain-ava audition-contain-ava" + index : "audition-contain-ava_default"]' @click="goPointRoom(item)">
                    <div class='audition-contain-ava_mg' :class='[index <= 2 ? "" : "audition-contain-small_mg"]' v-if='item.portrait' :style="{'background-image':`url(${item.portrait})`}"></div>
                    <div class='audition-contain-ava_mg' :class='[index <= 2 ? "" : "audition-contain-small_mg"]' v-else></div>
                    <div class='audition-contain-live_mg' v-if='item.live === 1'></div>
                  </div>
                  <p class='audition-contain-list_p1 point-top5_name'>{{item.nickname || '虚位以待'}}</p>
                </div>
                <div class='point-top5-score'>
                  {{item.score || 0}}
                </div>
              </div>
              <div class='point5_desc-wrap' v-if='index === item.promotionIndex'>
                <div class='point5_desc'>
                  <p>截止<span>12月17日23:59</span>，组内总积分前{{index === 2 ? '三' :  index === 1 ? '二' : '一'}}主播晋级<br />*积分相同时，<span class='point_dir' @click='onGroupList(item)'>积分赛期间该组内总荣耀值</span>多的主播排名在前</p>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
      <CgroupList v-model='groupVisible' :groupListArr='groupListArr' :groupTitle='groupTitle' />
    </template>

  </div>
</template>
<script>
import Cava from '../../../kawei/ava'
import CgroupList from '../groupList'
import Bus from '../../../../bus/bus'

export default {
  name:'top3',
  props:{
    showIndex:{
      type: Number,
      default: -1
    },
    processIndex:{  // 当前活动索引
      type: Number,
      default: -1
    },
    pointArrFst:{
      type: Array,
      default() {
        return [[],[],[],[]]
      }
    },
    pointArr:{
      type: Array,
      default() {
        return [
          [{promotionIndex:2},{promotionIndex:2},{promotionIndex:2},{promotionIndex:2}],
          [{promotionIndex:1},{promotionIndex:1},{promotionIndex:1},{promotionIndex:1}],
          [{promotionIndex:1},{promotionIndex:1},{promotionIndex:1},{promotionIndex:1}],
          [{promotionIndex:0},{promotionIndex:0},{promotionIndex:0},{promotionIndex:0}]
        ]
      }
    }
  },
  components:{
    Cava,
    CgroupList
  },
  data() {
    return {
      groupListArr:[], 
      groupVisible: false,
      groupTitle:''
    }
  },
  mounted() {
 
  },
  methods:{
    async onGroupList(item) {
      this.groupTitle = item.group
      let groupIndex
      switch(item && item.group) {
        case 'A':
          groupIndex = 1
          break
        case 'B':
          groupIndex = 2
          break
        case 'C':
          groupIndex = 3
          break
        case 'D':
          groupIndex = 4
          break
        default: break
      }
      const data = await this.$http.get(`/x/activity/annual-ceremony/stage-39?group=${groupIndex}`)
      this.groupListArr = data.list
      this.groupVisible = true
    },
    // 点击用户贡献榜
    async onKwUserPop(item) {
      if(!(item && item.uid)) return
      const index = this.checkNavIndex()
      const data = await this.$http.get(`/x/activity/annual-ceremony/contribution-list?anchor=${item.uid}&stage=3${index}`)
      Bus.$emit('onUserPop', data.list)
    },
    checkNavIndex() {
      switch(this.processIndex){
        case 0 :
          return 1
        case 1 :
          return 2
        case 2 :
          return 3
        case 3 :
          return 4
        default: return
        
      }
    },
    goPointRoom(obj) {
      if(! (obj && obj.uid)) return
      this.bridge.exec('jumpToRoomWithID', {
        roomID: obj.uid,
        no: obj.uid,
        islive: obj.live
      }, function(data) {})
    }
  }
}
</script>