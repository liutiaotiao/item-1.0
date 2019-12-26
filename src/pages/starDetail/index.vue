<template>
  <div id="app" class="star-detail-warp">
    <month-filter @selectCb="filterMonthHandler"></month-filter>
    <div class="content">
      <div class="content-list">
        <ul class="record_list">
          <li v-for="(item, index) in recordList" class="record_item" :key="index">
            <div class="item_left">
              <span class="item_name">
                <span class="bold">{{ starType(item.type) }}</span>
                <span>{{ ` ${item.gift_name} ` }}</span>
                <span>{{isNaN(item.gift_num) ? '' : `x${item.gift_num}`}}</span>
              </span>
              <span class="item_time">{{ item.created_at }}</span>
            </div>
            <div class="item_right">
              <span class="item_num">{{ `${item.action === 1 ? '+' : '-'}${item.num}星动` }}</span>
            </div>
          </li>
        </ul>
        <div class="content-more-tip"><span v-show="showLoading">数据获取中...</span></div>

        <div class="content-more-tip" v-show="recordList.length && pageNum > lastPage">亲～没有啦</div>
      </div>
      <div class="content-tip2" v-show="recordList.length == 0 && !showLoading">
        <div class="empty"></div>
        <div>还没有获得星动</div>
      </div>
    </div>
  </div>
</template>

<script>
import monthFilter from '../../components/monthFilter/index.vue'
import { currentUrlToParams } from '@/utils/app.js'
const scrollLoad = require('./lib/scrollLoad.js')
const records = require('./lib/record.js')

export default {
  name: 'starDetail',
  data: function() {
    return {
      isLogin: false,
      sid: '',
      uid: '',
      recordList: [],
      coin: '0',
      showLoading: false,
      currentMonth: '',
      pageNum: 1,
      pageSize: 20,
      lastPage: 1
    }
  },
  created() {
    this.currentMonth = `${new Date().getFullYear()}-${new Date().getMonth()+1}`
    // this.sid = currentUrlToParams('sid')
    // if (this.sid) {
    //   this.isLogin = true
    //   this.getListData()
    // }
    this.bridge.exec('getUserInfo', data => {
      if (data.sid) {
        this.sid = data.sid
        this.isLogin = true
        this.getListData()
      } else {
        this.isLogin = false
      }
    })
    // 隐藏客户端左上角按钮
    this.bridge.exec('appShareShow', { message: '3' }, function(data) {})
    scrollLoad({
      onLoadHandler: this.getListData.bind(this)
    })
  },
  components: {
    'month-filter': monthFilter
  },
  methods: {
    starType(type) {
      switch(type) {
        case 1: 
          return '送礼加好友'
        case 3: 
          return '提现'
        case 4: 
          return '提现退回'
        default:
          return '未知'
      }
    },
    filterMonthHandler(month) {
      this.pageNum = 1
      this.recordList = []
      const sDate = month.replace('年', '-').replace('月', '')
      this.getListData({
        sDate
      })
    },
    async getListData(opt = {}) {
      this.showLoading = true
      if (this.pageNum > this.lastPage) {
        this.showLoading = false
        return false
      }
      try {
        const params = {
          ...{ sid: this.sid, page: this.pageNum, size: this.pageSize, sDate: this.currentMonth },
          ...opt
        }
        const data = await this.$http.get('/x/app/starmove/batch', {
          params
        })
        if (data) {
          this.showLoading = false
          this.recordList = this.recordList.concat(data.list)
          this.lastPage = data.page.last_page
          this.pageNum += 1
        }
      } catch (e) {
        this.$toast(e)
        this.showLoading = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
.star-detail-warp {
  .content-list {
    width: 690px;
    margin: 0 auto;
    margin-top: 10px;
  }

  .record_item {
    height: 120px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #eee;
    .item_left {
      display: flex;
      flex-direction: column;
    }
    .item_name {
      font-size: 28px;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(34, 34, 34, 1);
      padding-bottom: 23px;
      .bold {
        font-weight: 500;
      }
    }
    .item_time {
      font-size: 24px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #cccccc;
    }
    .item_num {
      font-size: 32px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #fdb800;
      &.green {
        color: #23c993;
      }
    }
    .item_right {
      display: flex;
      flex-direction: column;
    }
  }

  .content-tip {
    margin-top: 82px;
    font-size: 30px;
    font-weight: bold;
    color: rgba(176, 176, 176, 1);
    text-align: center;
  }

  .content-tip2 {
    margin-top: 200px;
    font-size: 30px;
    font-weight: bold;
    color: rgba(176, 176, 176, 1);
    text-align: center;
    margin-bottom: 250px;
  }

  .empty {
    margin: 10px auto;
    width: 295px;
    height: 210px;
    background: url('./images/empty.png') no-repeat 0 0;
    background-size: contain;
  }

  .coin-card_header-num-wrap {
    margin-top: 30px;
    position: relative;
  }
  .coin-card_header-num {
    display: inline-block;
    max-width: 400px;
    font-size: 60px;
    font-weight: 600;
    color: rgba(34, 34, 34, 1);
    line-height: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .content-more-tip {
    height: 30px;
    font-size: 30px;
    box-sizing: border-box;
    text-align: center;
    margin-top: 20px;
    font-weight: bold;
    color: #b0b0b0;
  }
}
</style>
