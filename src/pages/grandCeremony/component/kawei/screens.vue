<style lang="less" scoped src='../haixuan/audition.less'></style>
<style lang="less" scoped src='./screens.less'></style>
<template>
  <div class='audition-contain-wrap'>
    <div class='audition-contain'>
      <p class='audition-contain_title'>
        截止<span>12月13日23:59</span>，根据卡位赛期间的荣耀值排名<br />晋级前<span>16</span>名主播，并确定分组
      </p>
      <p class='audition-contain_line'></p>
      <div class='screens-nav'>
        <div class='screens-nav-btn' :class="[screensNav===0?'screens-honr2':'screens-honr1']" @click='onScreenNav(0)'></div>
        <div class='screens-nav-btn screens-promotion' :class="[screensNav===1?'screens-promotion2':'screens-promotion1']" @click='onScreenNav(1)'></div>
      </div>
      <div v-if='screensNav===0'>
        <ul class='audition-contain-list-header'>
          <li class='audition-list'>排名</li>
          <li class='audition-list'>主播及荣耀值</li>
          <li class='audition-list'>用户贡献榜</li>
        </ul>
        <!-- 兔子列表 -->
        <ul class='audition-contain-list_ul'>
          <li v-for='(item,index) in screenLimit' :key="'$' + index" class='audition-contain-li'>
            <div class='audition-num'>
              <div  :class='[(index <= 2 && page === 1) ? "audition-num-pic audition-num-pic"+index : ""]'></div>
              {{(index <= 2  && page === 1)? '': (page - 1) * limit + (index + 1) }}
            </div>
            <div class='audition-contain-list-main'>
              <div :class='[(index <= 2 && page === 1) ? "audition-contain-ava audition-contain-ava" + index : "audition-contain-ava_default"]' @click='goKwRoom(item)'>
                <div class='audition-contain-ava_mg' :class='[(index <= 2 && page === 1) ? "" : "audition-contain-small_mg"]' v-if='item.portrait' :style="{'background-image':`url(${item.portrait})`}"></div>
                <div class='audition-contain-ava_mg' :class='[(index <= 2 && page === 1) ? "" : "audition-contain-small_mg"]' v-else></div>
                <div class='audition-contain-live_mg' v-if='item.live === 1'></div>
              </div>
              <div class='audition-contain-list_p'>
                <p class='audition-contain-list_p1'>{{item.nickname}}</p>
                <p class='audition-contain-list_p2'>{{item.score}}</p>
              </div>
            </div>
            <div class='audition-contain_three' @click='onUserKwPop(item)'>
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
          </li>
        </ul>
        <!-- pager -->
        <div class='audition-pager'>
          <div class='audition-pager-p' :class = '[page === 1 ? "" : "audition-pager_active"]' @click='prevPageKw'>上一页</div>
          <div class='audition-pager-p'><span class="audition-pager_active">{{page}}</span>&nbsp;/&nbsp;<span>{{total}}</span></div>
          <div class='audition-pager-p' :class='[page === total ? "" : "audition-pager_active"]' @click='nextPageKw'>下一页</div>
        </div>
      </div>
      <div v-if="screensNav===1">
        <div class='screens-main'>
          <p class='screens-main_p1'>卡位赛期间，以下名单仅为实时参考</p>
          <p class='screens-main_p2'>最终晋级及分组名单将于12月13日23:59后确定</p>
        </div>
        <!-- A -->
        <div class='screens-contain-A'>
          <div class='screens-title screens-A-title'></div>
          <p class='screens-A-num'>卡位赛第1、2、3、4名</p>
          <div class='screens-A-ava-wrap'>
            <div class="screens-A-ava-contain" @click='goKwRoom(screenA[0])'>
              <div class='screens-A-ava-item screens-A-ava-item0'>
                <Cava :srcUrl='screenA[0] && screenA[0]["portrait"] || ""' />
              </div>
              <div class='screens-A-ava_index screens-A-ava_index0'>第1名</div>
              <p class='screens-A-ava_p screens-A-ava_p0' v-html="(screenA[0] && screenA[0]['nickname'] || '虚位以待').length>5 ? `${screenA[0] && screenA[0]['nickname'].slice(0,4)}<br />${screenA[0] && screenA[0]['nickname'].slice(4)}` : screenA[0] && screenA[0]['nickname'] || '虚位以待'"></p>
            </div>
            <div class="screens-A-ava-contain" @click='goKwRoom(screenA[1])'>
              <div class='screens-A-ava-item screens-A-ava-item1'>
                <Cava :srcUrl='screenA[1] && screenA[1]["portrait"] || ""' />
              </div>
              <div class='screens-A-ava_index screens-A-ava_index1'>第2名</div>
              <p class='screens-A-ava_p screens-A-ava_p1' v-html="(screenA[1] && screenA[1]['nickname'] || '虚位以待').length>5 ? `${screenA[1] && screenA[1]['nickname'].slice(0,4)}<br />${screenA[1] && screenA[1]['nickname'].slice(4)}` : screenA[1] && screenA[1]['nickname'] || '虚位以待'"></p>
            </div>
            <div class="screens-A-ava-contain" @click='goKwRoom(screenA[2])'>
              <div class='screens-A-ava-item screens-A-ava-item2'>
                <Cava :srcUrl='screenA[2] && screenA[2]["portrait"] || ""' />
              </div>
              <div class='screens-A-ava_index screens-A-ava_index2'>第3名</div>
              <p class='screens-A-ava_p screens-A-ava_p2' v-html="(screenA[2] && screenA[2]['nickname'] || '虚位以待').length>5 ? `${screenA[2] && screenA[2]['nickname'].slice(0,4)}<br />${screenA[2] && screenA[2]['nickname'].slice(4)}` : screenA[2] && screenA[2]['nickname'] || '虚位以待'"></p>
            </div>
            <div class="screens-A-ava-contain" @click='goKwRoom(screenA[3])'>
              <div class='screens-A-ava-item screens-A-ava-item3'>
                <Cava :srcUrl='screenA[3] && screenA[3]["portrait"] || ""'  />
              </div>
              <div class='screens-A-ava_index screens-A-ava_index3'>第4名</div>
              <p class='screens-A-ava_p screens-A-ava_p3' v-html="(screenA[3] && screenA[3]['nickname'] || '虚位以待').length>5 ? `${screenA[3] && screenA[3]['nickname'].slice(0,4)}<br />${screenA[3] && screenA[3]['nickname'].slice(4)}` : screenA[3] && screenA[3]['nickname'] || '虚位以待'"></p>
            </div>
          </div>
        </div>
        <!-- B -->
        <div class='screens-contain-A'>
          <div class='screens-title screens-B-title'></div>
          <p class='screens-A-num'>卡位赛第5、8、9、12名</p>
          <div class='screens-A-ava-wrap'>
            <div class="screens-A-ava-contain" @click='goKwRoom(screenB[0])'>
              <div class='screens-A-ava-item screens-A-ava-item3'>
                <Cava :srcUrl='screenB[0] && screenB[0]["portrait"] || ""'  />
              </div>
              <div class='screens-A-ava_index screens-A-ava_index3'>第5名</div>
              <p class='screens-A-ava_p screens-A-ava_p3' v-html="(screenB[0] && screenB[0]['nickname'] || '虚位以待').length>5 ? `${screenB[0] && screenB[0]['nickname'].slice(0,4)}<br />${screenB[0] && screenB[0]['nickname'].slice(4)}` : screenB[0] && screenB[0]['nickname'] || '虚位以待'"></p>
            </div>
            <div class="screens-A-ava-contain" @click='goKwRoom(screenB[1])'>
              <div class='screens-A-ava-item screens-A-ava-item3'>
                <Cava :srcUrl='screenB[1] && screenB[1]["portrait"] || ""' />
              </div>
              <div class='screens-A-ava_index screens-A-ava_index3'>第8名</div>
              <p class='screens-A-ava_p screens-A-ava_p3' v-html="(screenB[1] && screenB[1]['nickname'] || '虚位以待').length>5 ? `${screenB[1] && screenB[1]['nickname'].slice(0,4)}<br />${screenB[1] && screenB[1]['nickname'].slice(4)}` : screenB[1] && screenB[1]['nickname'] || '虚位以待'"></p>
            </div>
            <div class="screens-A-ava-contain" @click='goKwRoom(screenB[2])'>
              <div class='screens-A-ava-item screens-A-ava-item3'>
                <Cava :srcUrl='screenB[2] && screenB[2]["portrait"] || ""' />
              </div>
              <div class='screens-A-ava_index screens-A-ava_index3'>第9名</div>
              <p class='screens-A-ava_p screens-A-ava_p3' v-html="(screenB[2] && screenB[2]['nickname'] || '虚位以待').length>5 ? `${screenB[2] && screenB[2]['nickname'].slice(0,4)}<br />${screenB[2] && screenB[2]['nickname'].slice(4)}` : screenB[2] && screenB[2]['nickname'] || '虚位以待'"></p>
            </div>
            <div class="screens-A-ava-contain" @click='goKwRoom(screenB[3])'>
              <div class='screens-A-ava-item screens-A-ava-item3'>
                <Cava :srcUrl='screenB[3] && screenB[3]["portrait"] || ""' />
              </div>
              <div class='screens-A-ava_index screens-A-ava_index3'>第12名</div>
              <p class='screens-A-ava_p screens-A-ava_p3' v-html="(screenB[3] && screenB[3]['nickname'] || '虚位以待').length>5 ? `${screenB[3] && screenB[3]['nickname'].slice(0,4)}<br />${screenB[3] && screenB[3]['nickname'].slice(4)}` : screenB[3] && screenB[3]['nickname'] || '虚位以待'"></p>
            </div>
          </div>
        </div>
        <!-- C -->
        <div class='screens-contain-A'>
          <div class='screens-title screens-C-title'></div>
          <p class='screens-A-num'>卡位赛第6、7、10、11名</p>
          <div class='screens-A-ava-wrap'>
            <div class="screens-A-ava-contain" @click='goKwRoom(screenC[0])'>
              <div class='screens-A-ava-item screens-A-ava-item3'>
                <Cava :srcUrl='screenC[0] && screenC[0]["portrait"] || ""' />
              </div>
              <div class='screens-A-ava_index screens-A-ava_index3'>第6名</div>
              <p class='screens-A-ava_p screens-A-ava_p3' v-html="(screenC[0] && screenC[0]['nickname'] || '虚位以待').length>5 ? `${screenC[0] && screenC[0]['nickname'].slice(0,4)}<br />${screenC[0] && screenC[0]['nickname'].slice(4)}` : screenC[0] && screenC[0]['nickname'] || '虚位以待'"></p>
            </div>
            <div class="screens-A-ava-contain" @click='goKwRoom(screenC[1])'>
              <div class='screens-A-ava-item screens-A-ava-item3'>
                <Cava :srcUrl='screenC[1] && screenC[1]["portrait"] || ""' />
              </div>
              <div class='screens-A-ava_index screens-A-ava_index3'>第7名</div>
              <p class='screens-A-ava_p screens-A-ava_p3' v-html="(screenC[1] && screenC[1]['nickname'] || '虚位以待').length>5 ? `${screenC[1] && screenC[1]['nickname'].slice(0,4)}<br />${screenC[1] && screenC[1]['nickname'].slice(4)}` : screenC[1] && screenC[1]['nickname'] || '虚位以待'"></p>
            </div>
            <div class="screens-A-ava-contain" @click='goKwRoom(screenC[2])'>
              <div class='screens-A-ava-item screens-A-ava-item3'>
                <Cava :srcUrl='screenC[2] && screenC[2]["portrait"] || ""' />
              </div>
              <div class='screens-A-ava_index screens-A-ava_index3'>第10名</div>
              <p class='screens-A-ava_p screens-A-ava_p3' v-html="(screenC[2] && screenC[2]['nickname'] || '虚位以待').length>5 ? `${screenC[2] && screenC[2]['nickname'].slice(0,4)}<br />${screenC[2] && screenC[2]['nickname'].slice(4)}` : screenC[2] && screenC[2]['nickname'] || '虚位以待'"></p>
            </div>
            <div class="screens-A-ava-contain" @click='goKwRoom(screenC[3])'>
              <div class='screens-A-ava-item screens-A-ava-item3'>
                <Cava :srcUrl='screenC[3] && screenC[3]["portrait"] || ""' />
              </div>
              <div class='screens-A-ava_index screens-A-ava_index3'>第11名</div>
              <p class='screens-A-ava_p screens-A-ava_p3' v-html="(screenC[3] && screenC[3]['nickname'] || '虚位以待').length>5 ? `${screenC[3] && screenC[3]['nickname'].slice(0,4)}<br />${screenC[3] && screenC[3]['nickname'].slice(4)}` : screenC[3] && screenC[3]['nickname'] || '虚位以待'"></p>
            </div>
          </div>
        </div>
        <!-- D -->
        <div class='screens-contain-A'>
          <div class='screens-title screens-D-title'></div>
          <p class='screens-A-num'>卡位赛第13、14、15、16名</p>
          <div class='screens-A-ava-wrap' @click='goKwRoom(screenD[0])'>
            <div class="screens-A-ava-contain">
              <div class='screens-A-ava-item screens-A-ava-item3'>
                <Cava :srcUrl='screenD[0] && screenD[0]["portrait"] || ""' />
              </div>
              <div class='screens-A-ava_index screens-A-ava_index3'>第13名</div>
              <p class='screens-A-ava_p screens-A-ava_p3' v-html="(screenD[0] && screenD[0]['nickname'] || '虚位以待').length>5 ? `${screenD[0] && screenD[0]['nickname'].slice(0,4)}<br />${screenD[0] && screenD[0]['nickname'].slice(4)}` : screenD[0] && screenD[0]['nickname'] || '虚位以待'"></p>
            </div>
            <div class="screens-A-ava-contain" @click='goKwRoom(screenD[1])'>
              <div class='screens-A-ava-item screens-A-ava-item3'>
                <Cava :srcUrl='screenD[1] && screenD[1]["portrait"] || ""' />
              </div>
              <div class='screens-A-ava_index screens-A-ava_index3'>第14名</div>
              <p class='screens-A-ava_p screens-A-ava_p3' v-html="(screenD[1] && screenD[1]['nickname'] || '虚位以待').length>5 ? `${screenD[1] && screenD[1]['nickname'].slice(0,4)}<br />${screenD[1] && screenD[1]['nickname'].slice(4)}` : screenD[1] && screenD[1]['nickname'] || '虚位以待'"></p>
            </div>
            <div class="screens-A-ava-contain" @click='goKwRoom(screenD[2])'>
              <div class='screens-A-ava-item screens-A-ava-item3'>
                <Cava :srcUrl='screenD[2] && screenD[2]["portrait"] || ""' />
              </div>
              <div class='screens-A-ava_index screens-A-ava_index3'>第15名</div>
              <p class='screens-A-ava_p screens-A-ava_p3' v-html="(screenD[2] && screenD[2]['nickname'] || '虚位以待').length>5 ? `${screenD[2] && screenD[2]['nickname'].slice(0,4)}<br />${screenD[2] && screenD[2]['nickname'].slice(4)}` : screenD[2] && screenD[2]['nickname'] || '虚位以待'"></p>
            </div>
            <div class="screens-A-ava-contain" @click='goKwRoom(screenD[3])'>
              <div class='screens-A-ava-item screens-A-ava-item3'>
                <Cava :srcUrl='screenD[3] && screenD[3]["portrait"] || ""' />
              </div>
              <div class='screens-A-ava_index screens-A-ava_index3'>第16名</div>
              <p class='screens-A-ava_p screens-A-ava_p3' v-html="(screenD[3] && screenD[3]['nickname'] || '虚位以待').length>5 ? `${screenD[3] && screenD[3]['nickname'].slice(0,4)}<br />${screenD[3] && screenD[3]['nickname'].slice(4)}` : screenD[3] && screenD[3]['nickname'] || '虚位以待'"></p>
            </div>
          </div>
        </div>
      
      </div>
    </div>
  </div>
</template>
<script>
import Cava from './ava'
import Bus from '../../bus/bus'
export default {
  name: 'screens',
  components:{
    Cava
  },
  data() {
    return {
      screensNav: 0,
      screenAll:[],
      screenLimit:[],
      total: 0,
      page: 1,
      limit: 8,
      screenA:[],
      screenB:[],
      screenC:[],
      screenD:[]
    }
  },
  created() {
    this.screenData()
  },
  methods:{
    // 卡位赛数据
    async screenData() {
      let data = await this.$http.get(`/x/activity/annual-ceremony/stage-2`)
      this.cleanData()
      this.screenAll = data.list || []
      this.screenLimit = data.list && data.list.slice(0, this.limit) || []
      this.total = Math.ceil(this.screenAll.length / this.limit)
      const arr = this.screenAll.slice(0, 16)
      arr.forEach(item => {
        switch (item.rank) {
          case 1 :
          case 2 :
          case 3 :
          case 4 :
            this.screenA.push(item)
            return
          case 5 :
          case 8 :
          case 9 :
          case 12 :
            this.screenB.push(item)
            return
          case 6 :
          case 7 :
          case 10 :
          case 11 :
            this.screenC.push(item)
            return
          case 13 :
          case 14 :
          case 15 :
          case 16 :
            this.screenD.push(item)
            return
        }
      })
    },
    cleanData() {
      this.screenA = [],
      this.screenB = [],
      this.screenC = [],
      this.screenD = []
    },
    // 下一页
    nextPageKw() {
      if(this.total === this.page) return
      ++this.page
      this.conPage()
    },
    // 上一页
    prevPageKw() {
      if(this.page === 1) return
      --this.page
      this.conPage()
    },
    conPage() {            
      let currentLen = this.limit * (this.page - 1)
      this.screenLimit =  this.screenAll.slice(currentLen, currentLen + this.limit)
    },
    // 进入直播间
    goKwRoom(obj) {
      if(! (obj && obj.uid)) return
      this.bridge.exec('jumpToRoomWithID', {
        roomID: obj.uid,
        no: obj.uid,
        islive: obj.live
      }, function(data) {})
    },
    // 点击用户贡献榜
    async onUserKwPop(item) {
      const data = await this.$http.get(`/x/activity/annual-ceremony/contribution-list?anchor=${item.uid}&stage=2`)
      Bus.$emit('onUserPop', data.list)
    },
    onScreenNav(index) {
      if(this.screensNav === index) return
      this.screensNav = index
      this.screenData()
    }
    
  }
}
</script>