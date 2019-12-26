<style lang="less" scoped src='./point.less'></style>
<template>
  <div class='point_wrap'>
    <div class='point_nav'>
      <div v-for='(i,index) in 5' :class='"point_nav-block point_nav-block"+i' :key='index' @click='onPointNav(index)'></div>
      <div v-for='(item,index) in 5' :class='"point_nav-block point_nav"+index' :key='index+"_"+index' v-show='pointIndex === index'></div>
    </div>
    <div class='point_p'>
      <p class='point_p1' v-show='(pointIndex !== 4) && (pointIndex !== 3)'>组内<span> 1v1 PK</span>，根据当日<span> 00:00 - 23:59 </span>获得的荣耀值判断胜负胜方<span> +3 </span>积分，败方<span> +1 </span>积分，平局各<span>  +1 </span>积分</p>
      <p class='point_p1' v-show='pointIndex === 3'>组内4名主播PK，根据当日<span>00:00-23:59</span>获得的荣耀值排行<br />第一名<span>+3</span>分，第二名<span>+2</span>分，第三名<span>+1</span>分，第四名<span>+0</span>分</p>
      <p class='point_p1' v-show='pointIndex === 4'>积分赛期间，每天增加的积分都会记录在该榜单上<br />根据最终排名将有<span> 8 </span>名主播晋级</p>
    </div>
    <div >
      <Ctop3 v-if='pointIndex === 0' :showIndex='fourteen' :processIndex='0' :pointArrFst='fourteenArr' :key='pointIndex'/>

      <Ctop3 v-else-if='pointIndex === 1' :showIndex='fifteen' :processIndex='1' :pointArrFst='fifteenArr'  :key='pointIndex'/>

      <Ctop3 v-else-if='pointIndex === 2' :showIndex='sixteen' :processIndex='2' :pointArrFst='sixteenArr'  :key='pointIndex'/>

      <Ctop3 v-else-if='pointIndex === 3' :showIndex='seventeen' :processIndex='3' :pointArrFst='seventeenArr' :key='pointIndex'/>

      <Ctop3 v-else-if='pointIndex === 4' :showIndex='eighteen' :processIndex='4' :pointArr='eighteenArr' :key='pointIndex'/>
    </div>


  </div>
</template>
<script>
import Ctop3 from './components/top3/top3'
export default {
  name: 'point',
  components:{
    Ctop3
  },
  data() {
    return {
      pointIndex: 4,
      fourteen: 1,  // 十四
      fourteenArr:[[], [], [], []],
      fifteen: 0,  // 十五
      fifteenArr:[[], [], [], []],
      sixteen: 0,  // 十六
      sixteenArr: [[], [], [], []],
      seventeen: 2,  //十七
      seventeenArr: [[], [], [], []],
      eighteen: 4,  // 积分总榜单
      eighteenArr:[
          [{promotionIndex:2},{promotionIndex:2},{promotionIndex:2},{promotionIndex:2}],
          [{promotionIndex:1},{promotionIndex:1},{promotionIndex:1},{promotionIndex:1}],
          [{promotionIndex:1},{promotionIndex:1},{promotionIndex:1},{promotionIndex:1}],
          [{promotionIndex:0},{promotionIndex:0},{promotionIndex:0},{promotionIndex:0}]
        ]
    }
  },
  mounted() {
    this.pointProcess()
  },
  methods:{
    onPointNav(index) {
      this.pointIndex = index
      this.pointProcess()
    },
    async pointProcess() {
      this.fourteenArr = [[], [], [], []]
      this.fifteenArr = [[], [], [], []]
      this.sixteenArr = [[], [], [], []]
      this.seventeenArr = [[],[],[],[]]
      this.eighteenArr = [[],[],[],[]]
      // 前四个比赛
      if(this.pointIndex === 0 || this.pointIndex === 1 || this.pointIndex === 2 || this.pointIndex === 3) {
        let data = await this.$http.get(`/x/activity/annual-ceremony/stage-3${this.pointIndex+1}`)
        data.list.forEach((item,index) => {
          if(data.event.now > data.schedule.end) {
            item.games = 'over'
          }
          if(index < 4) {
            this.gamesArr()[0].push(item)
            return
          }
          if(index < 8) {
            this.gamesArr()[1].push(item)
            return
          }
          if(index < 12) {
            this.gamesArr()[2].push(item)
            return
          }
          if(index < 16) {
            this.gamesArr()[3].push(item)
            return
          }
        })
        if(data.event.now < data.schedule.begin){
          this.checkGamesRules(0, 2)
          return
        }else if(data.event.now >= data.schedule.begin && data.event.now <= data.schedule.end) {
          this.checkGamesRules(1, 3)
          this.contrastRate(this.gamesArr())
        }else if(data.event.now > data.schedule.end) {
          this.checkGamesRules(1, 3)
          this.contrastRate(this.gamesArr())
        }
      }else if(this.pointIndex === 4) {
        let data = await this.$http.get(`/x/activity/annual-ceremony/stage-30`)
        data.list.forEach((item,index) => {
          if(index < 4) {
            item.promotionIndex = 2
            item.group = 'A'
            this.eighteenArr[0].push(item)
            return
          }
          if(index < 8) {
            item.promotionIndex = 1
            item.group = 'B'
            this.eighteenArr[1].push(item)
            return
          }
          if(index < 12) {
            item.promotionIndex = 1
            item.group = 'C'
            this.eighteenArr[2].push(item)
            return
          }
          if(index < 16) {
            item.promotionIndex = 0
            item.group = 'D'
            this.eighteenArr[3].push(item)
            return
          }
        })
      } 
    
    },
    checkGame(index,status) {  // index 什么比赛缩影 0-4， status 开始还是未开始
      if(0 === index) {
        this.fourteen = status
        return
      }
      if(1 === index ) {
        this.fifteen = status
        return
      }
      if(2 === index ) {
        this.sixteen = status
        return
      }
      if(3 === index ) {
        this.seventeen = status
        return
      }
    },
    checkGamesRules(status,seventeenStatus) {
      if(this.pointIndex === 0 || this.pointIndex === 1 || this.pointIndex === 2) {
        this.checkGame(this.pointIndex, status)
      }else if( this.pointIndex === 3){   // 第四场比赛特殊处理
        this.checkGame(this.pointIndex, seventeenStatus)
      }
    },
    gamesArr() {
      switch(this.pointIndex){
        case 0 :
          return this.fourteenArr
        case 1 :
          return this.fifteenArr
        case 2 :
          return this.sixteenArr
        case 3 :
          return this.seventeenArr
        default : return
      }
    },
    // 比赛过程中 需要前端判断
    contrastRate(arr) {
      for(let k=0; k < arr.length; k++){
        for(let i=0; i<2; i++) {
          let arr0 = arr[k][0 + (i * 2)]
          let arr1 = arr[k][1  + (i * 2)]
            if( arr0 && arr1){
              if(arr0['score'] > arr1['score']){
                arr0['fisWin'] = 1
                arr1['fisWin'] = 0
              }else if(arr0['score'] < arr1['score']){
                arr0['fisWin'] = 0
                arr1['fisWin'] = 1
              }else{
                arr0['fisWin'] = 1
                arr1['fisWin'] = 0
                arr0['rotate'] = 50
                arr1['rotate'] = 50
                continue
              }
              const all = arr0['score'] + arr1['score']
              arr0['rotate'] = Math.round(arr0['score'] / all * 100)
              arr1['rotate'] = 100 - arr0['rotate']
          }
        }
      }

    }
  }
}
</script>