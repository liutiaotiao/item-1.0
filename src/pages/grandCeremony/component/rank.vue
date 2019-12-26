<style lang="less" src='./rank.less' scoped></style>
<style lang="less">
.zbb-toast.is-placemiddle{
  // color:#d8b26b;
  padding-left:70px;
  padding-right: 70px;
}
</style>

<template>
    <div class='grand-progress'>
      <!-- <div style='position:fixed;top:10px;left:10px;width:100px;height:100px;background:green;z-index:10'></div> -->
      <div v-for='(i,index) in processNav' :class='["grand-progress-block grand-progress_"+index]' :key='index' @click="onProcess(index)"></div>
      <div  v-for="(item,index) in processNav" class='grand-options' :key="'$'+index">
        <!-- 日期 -->
        <div class='grand-game-data' :class="[ (item.active || item.going) ? 'grand-game-data' + index : '']" v-show='(item.active || item.going)'></div>
        <!-- 状态 -->
        <!-- 已经开始 -->
        <div class='grand-game-status_start' :class="[(item.active || item.going) ? 'grand-game-status_start' + index : '']" v-show='item.going'></div>
        <!-- 选中 -->
        <div class='grand-game-status_active' :class="[(item.active || item.going) ? 'grand-game-status_active' + index : '']" v-show='item.active'></div>
        <!-- 文本 -->
        <div class="grand-game-txt" :class="[(item.active || item.going) ? 'grand-game-txt' + index : '']" v-show='(item.active || item.going)'></div>
        <!-- N进32 -->
        <div class="grand-game-rule-wrap" :class="['grand-game-rule-wrap'+index]">
          <div class='grand-game-rule' :class="[item.active ? ' grand-game-rule' + index : '']" v-show='item.active'></div>
        </div>
      </div>
      <main class="grand-rank-main">
        <Caudition v-if="processIndex === 0" />
        <Cscreens v-if="processIndex === 1" />
        <Cpoint v-if="processIndex === 2" />
        <Crebirth v-if="processIndex === 3" />
        <Cfinal v-if='processIndex === 4' />
      </main>

    </div>
</template>
<script>
import Caudition from './haixuan/audition' //海选赛
import Cscreens from './kawei/screens'  //卡位赛
import Cpoint from './jifen/point' //积分赛
import Crebirth from './fuhuo/rebirth' // 复活赛
import Cfinal from './juesai/final' // 决赛

import Bus from '../bus/bus'


export default {
  name: 'rank',
  components:{
    Caudition,
    Cscreens,
    Cpoint,
    Crebirth,
    Cfinal
  },
  data() {
    return {
      processNav:[
        {
          active:false,going:false,startTime: new Date('2019/12/2 00:00').getTime(),endTime:new Date('2019/12/8 23:59:59').getTime() // 上线
          // active:false,going:false,startTime: new Date('2019/12/2 00:00').getTime(),endTime:new Date('2019/12/4 23:59:59').getTime() //测试
        },
        {
          active:false,going:false,startTime: new Date('2019/12/9 00:00').getTime(),endTime:new Date('2019/12/13 23:59:59').getTime()  // 上线
          // active:false,going:false,startTime: new Date('2019/12/5 00:00').getTime(),endTime:new Date('2019/12/9 23:59:59').getTime()   //测试
        },
        {
          active:false,going:false,startTime: new Date('2019/12/14 00:00').getTime(),endTime:new Date('2019/12/17 23:59:59').getTime()  // 上线
          // active:false,going:false,startTime: new Date('2019/12/10 00:00').getTime(),endTime:new Date('2019/12/12 23:59:59').getTime()  //测试
        },
        {
          active:false,going:false,startTime: new Date('2019/12/18 00:00').getTime(),endTime:new Date('2019/12/18 23:59:59').getTime() //上线
          // active:false,going:false,startTime: new Date('2019/12/13 00:00').getTime(),endTime:new Date('2019/12/13 23:59:59').getTime() //测试
        },
        {
          active:false,going:false,startTime: new Date('2019/12/19 00:00').getTime(),endTime:new Date('2020/12/21 23:59:59').getTime() //上线
          // active:false,going:false,startTime: new Date('2019/12/15 00:00').getTime(),endTime:new Date('2020/12/21 23:59:59').getTime() //测试
        }
      ],
      processMaxIndex: -1, // 当前开启的比赛最大的索引
      processIndex: -1, //当前选中或者正在展示的比赛索引~~~
    }
  },
  created() {
    // 开发自测使用
    // const timer = new Date('2019/12/20 10:00').getTime()
    // this.initAct(timer)

    // 发版用
    //服务器返回当前时间
    Bus.$on('serviceDate', (data) => {
      if(data.now) {
        this.initAct(data.now * 1000)
      }else{
        this.initAct(Date.now())
      }
    })

  },
  methods:{
    initAct(timer) {
      this.processMaxIndex = this.processNav.findIndex(item => {
        return item.startTime <= timer && item.endTime >= timer
      })
      this.processIndex =  this.processMaxIndex
      for(let i=0; i <= this.processMaxIndex; i++) {
        this.processNav[i]['going'] = true
      }
      this.processNav[this.processMaxIndex]['active'] = true
    },
    // 时间未到的比赛 点击不展示
    onProcess(index) {
      
      if(index > this.processMaxIndex) {
        this.$toast('赛程暂未开启')
        return
      }
      this.processIndex = index
      this.processNav.forEach((item,idx) => {
        if(idx === index){
          this.processIndex =  index
          item.active = true
        }else{
          item.active = false
        }
      })

    }
  },
  beforeDestroy() {
    Bus.$off('serviceDate')
  }
}
</script>