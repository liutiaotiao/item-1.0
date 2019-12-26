<template>
  <div id="app" class="diamond_record_page">
    <div class="head_fixed">
      <div class="head">
        <div class="head_section expense" :class="{ active: headTab === 'pay' }" @click="switchHeadTab('pay')">
          <span class="txt1">月支出(钻石)</span>
          <span class="txt2">{{ payDiamond }}</span>
        </div>
        <div
          class="head_section recharge"
          :class="{ active: headTab === 'recharge' }"
          @click="switchHeadTab('recharge')"
        >
          <span class="txt1">月充值(钻石)</span>
          <span class="txt2">{{ rechareDiamond }}</span>
        </div>
      </div>
      <div class="tab_wrap" v-if="headTab === 'pay'">
        <ul class="tab_list">
          <li
            v-for="tab in tabList"
            class="tab_item"
            :key="tab.key"
            :class="{ active: currentTab.name === tab.name }"
            @click="switchTab(tab)"
          >
            {{ tab.name }}
          </li>
        </ul>
      </div>
      <month-filter @selectCb="filterMonthHandler" :diamond="monthPayDiamond"></month-filter>
    </div>
    <div class="content content-pay" v-if="headTab === 'pay'">
      <div class="content-list" v-if="recordList.length">
        <r-list :listType="currentTab.name" :list="recordList"></r-list>
        <div class="content-more-tip"><span v-show="showLoading">数据获取中...</span></div>
        <div class="content-more-tip" v-show="recordList.length && pageNum > lastPage">亲～没有啦</div>
      </div>
      <div class="content-tip2" v-show="recordList.length == 0 && !showLoading">
        <div class="empty"></div>
        <div>暂无记录~</div>
      </div>
    </div>
    <div class="content content-recharge" v-if="headTab === 'recharge'">
      <div class="content-list" v-if="rechargeList.length">
        <r-list :listType="'充值'" :list="rechargeList"></r-list>
        <div class="content-more-tip"><span v-show="showLoading">数据获取中...</span></div>
        <div class="content-more-tip" v-show="rechargeList.length && pageNum > lastPage">亲～没有啦</div>
      </div>
      <div class="content-tip2" v-show="rechargeList.length == 0 && !showLoading">
        <div class="empty"></div>
        <div>暂无记录~</div>
      </div>
    </div>
  </div>
</template>

<script>
import rList from './components/list.vue'
import monthFilter from '../../components/monthFilter/index.vue'
import { currentUrlToParams } from '@/utils/app.js'
const records = require('./lib/record.js')

export default {
  name: 'diamondRecord',
  data: function() {
    return {
      isLogin: false,
      sid: '',
      uid: '',
      // 充值钻石
      rechareDiamond: 0,
      // 消费钻石
      payDiamond: 0,
      // 月消费钻石
      monthPayDiamond: 0,
      headTab: 'pay', // 'pay' | 'recharge'
      currentTab: { name: '礼物', key: 'gift' },
      tabList: [
        {
          name: '礼物',
          key: 'gift'
        },
        {
          name: '贵族',
          key: 'noble'
        },
        {
          name: '背包道具',
          key: 'bag'
        },
        {
          name: '商城购买',
          key: 'store'
        },
        {
          name: 'VIP会员',
          key: 'vip'
        },
        {
          name: '交友礼物',
          key: 'friend'
        },
        {
          name: '其他',
          key: 'other'
        }
      ],
      currentMonth: `${new Date().getFullYear()}-${new Date().getMonth() + 1}`,
      monthStart: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-1`,
      monthEnd: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date(
        new Date().getFullYear(),
        new Date().getMonth() + 1,
        0
      ).getDate()}`,
      showLoading: false,
      lastRequestTime: 0,
      pageNum: 0,
      pageSize: 10,
      lastPage: 1,
      recordList: [],
      rechargeList: []
    }
  },
  created() {
    if (sessionStorage.getItem('diamondRecordTab')) {
      this.currentTab = JSON.parse(sessionStorage.getItem('diamondRecordTab'))
    }
    // this.sid = currentUrlToParams('sid')
    // if (this.sid) {
    //   this.isLogin = true
    //   this.initFetch()
    // }
    this.bridge.exec('getUserInfo', data => {
      if (data.sid) {
        this.sid = data.sid
        this.isLogin = true
        this.initFetch()
      } else {
        this.isLogin = false
      }
    })
    // 隐藏客户端左上角按钮
    this.bridge.exec('appShareShow', { message: '3' }, function(data) {})
  },
  components: {
    'r-list': rList,
    'month-filter': monthFilter
  },
  methods: {
    initFetch() {
      this.getTotal()
      this.getList()
    },
    switchHeadTab(tab) {
      if (tab.name === this.currentTab.name) {
        return
      }
      this.headTab = tab
      this.resetData()
      if (tab === 'pay') {
        this.getList()
      }
      if (tab === 'recharge') {
        this.getOrderList()
        window.removeEventListener('scroll', this.scrollHandler, false)
        this.onLoadHandler = null
        this.onLoadHandler = this.getOrderList.bind(this)
        this.scrollLoad()
      }
    },
    switchTab(tab) {
      if (tab.name === this.currentTab.name) {
        return
      }
      this.currentTab = tab
      this.resetData()
      this.getList()
      sessionStorage.setItem('diamondRecordTab', JSON.stringify(tab))
    },
    resetData() {
      this.pageNum = 0
      this.lastPage = 1
      this.recordList = []
      this.rechargeList = []
      this.monthPayDiamond = 0
    },
    scrollLoad(opt) {
      window.addEventListener('scroll', this.scrollHandler, false)
    },
    scrollHandler() {
      const wHeight = window.innerHeight
      const scrollHeight = document.body.scrollHeight
      const scrollTop = document.body.scrollTop || document.documentElement.scrollTop
      if (scrollTop + wHeight >= scrollHeight - 50) {
        if (Date.now() - this.lastRequestTime < 500) {
          return false
        } else {
          this.lastRequestTime = Date.now()
          typeof this.onLoadHandler === 'function' && this.onLoadHandler()
        }
      }
    },
    getList() {
      const key = this.currentTab.key
      window.removeEventListener('scroll', this.scrollHandler, false)
      this.onLoadHandler = null
      switch (key) {
        case 'gift':
          this.getGiftList()
          this.onLoadHandler = this.getGiftList.bind(this)
          this.scrollLoad()
          break
        case 'noble':
          this.getNobleList()
          this.onLoadHandler = this.getNobleList.bind(this)
          this.scrollLoad()
          break
        case 'bag':
          this.getBagList()
          this.onLoadHandler = this.getBagList.bind(this)
          this.scrollLoad()
          break
        case 'store':
          this.getStoreList()
          this.onLoadHandler = this.getStoreList.bind(this)
          this.scrollLoad()
          break
        case 'vip':
          this.getVipList()
          this.onLoadHandler = this.getVipList.bind(this)
          this.scrollLoad()
          break
        case 'friend':
          this.getFreiendGiftList()
          this.onLoadHandler = this.getFreiendGiftList.bind(this)
          this.scrollLoad()
          break
        case 'other':
          this.getOtherList()
          this.onLoadHandler = this.getOtherList.bind(this)
          this.scrollLoad()
          break
      }
    },
    // 钻石当月消费与充值总额
    async getTotal() {
      try {
        const data = await this.$http.get(`/x/app/star/total?sid=${this.sid}&sDate=${this.currentMonth}`)
        this.rechareDiamond = data.rechare_diamond
        this.payDiamond = data.pay_diamond
      } catch (err) {
        err && this.$toast(err)
      }
    },
    filterMonthHandler(date) {
      // console.log('date', date)
      const dateStr = date.replace('年', '-').replace('月', '')
      const dateArr = dateStr.split('-')
      this.currentMonth = dateStr
      this.monthStart = `${dateStr}-1`
      this.monthEnd = `${dateStr}-${new Date(dateArr[0], dateArr[1], 0).getDate()}`
      this.resetData()
      this.getTotal()
      if (this.headTab === 'pay') {
        this.getList()
      } else {
        this.getOrderList()
      }
    },
    getcloseWebview() {
      this.bridge.exec('qmliveClosePage', {}, function(data) {})
    },
    replaceAll(str, search, replacement) {
      return str.replace(new RegExp(search, 'g'), replacement)
    },
    async getGiftList(opt = {}) {
      if (this.pageNum > this.lastPage) {
        this.showLoading = false
        return false
      }
      this.showLoading = true
      const params = {
        ...{
          sid: this.sid,
          page: this.pageNum,
          size: this.pageSize,
          type: 2,
          from: this.monthStart,
          to: this.monthEnd
        },
        ...opt
      }
      try {
        const data = await this.$http.post(`/user/getConsumeList?debug&sid=${this.sid}`, { p: params })
        if (data) {
          this.recordList = this.recordList.concat(data.data)
          this.monthPayDiamond = Number(data.coin)
          this.showLoading = false
          this.lastPage = data.pageNb
          this.pageNum += 1
        }
      } catch (err) {
        err && this.$toast(err)
        this.showLoading = false
      }
    },
    async getNobleList(opt = {}) {
      if (this.pageNum > this.lastPage) {
        this.showLoading = false
        return false
      }
      this.showLoading = true
      const params = {
        ...{
          sid: this.sid,
          page: this.pageNum,
          size: this.pageSize,
          startTime: this.monthStart,
          endTime: this.monthEnd
        },
        ...opt
      }
      try {
        const data = await this.$http.get('/public/noble/consume?debug', { params })
        if (data) {
          this.recordList = this.recordList.concat(data.list)
          this.monthPayDiamond = data.amount
          this.showLoading = false
          this.lastPage = Math.ceil(data.total / 10)
          this.pageNum += 1
        }
      } catch (err) {
        err && this.$toast(err)
        this.showLoading = false
      }
    },
    async getBagList(opt = {}) {
      if (this.pageNum > this.lastPage) {
        this.showLoading = false
        return false
      }
      this.showLoading = true
      const params = {
        ...{
          sid: this.sid,
          page: this.pageNum,
          size: this.pageSize,
          from: this.monthStart,
          to: this.monthEnd
        },
        ...opt
      }
      try {
        const data = await this.$http.get('/bag/log?debug', { params })
        if (data) {
          this.recordList = this.recordList.concat(data.record)
          this.monthPayDiamond = 0
          this.showLoading = false
          this.lastPage = Math.ceil(data.total / 10)
          this.pageNum += 1
        }
      } catch (err) {
        err && this.$toast(err)
        this.showLoading = false
      }
    },
    async getStoreList(opt = {}) {
      if (this.pageNum > this.lastPage) {
        this.showLoading = false
        return false
      }
      this.showLoading = true
      this.monthStart = this.replaceAll(this.monthStart, '-', '/')
      this.monthEnd = this.replaceAll(this.monthEnd, '-', '/')
      const params = {
        ...{
          sid: this.sid,
          page: this.pageNum,
          per_page: this.pageSize,
          created_at: new Date(`${this.monthStart} 00:00:01`).getTime() / 1000,
          ended_at: new Date(`${this.monthEnd} 23:59:59`).getTime() / 1000
        },
        ...opt
      }
      try {
        const data = await this.$http.get('/mall/history?debug', { params })
        if (data) {
          this.recordList = this.recordList.concat(data.list)
          this.monthPayDiamond = data.me.cost
          this.showLoading = false
          this.lastPage = data.page.last_page
          this.pageNum += 1
        }
      } catch (err) {
        err && this.$toast(err)
        this.showLoading = false
      }
    },
    async getVipList(opt = {}) {
      if (this.pageNum > this.lastPage) {
        this.showLoading = false
        return false
      }
      this.showLoading = true
      const params = {
        ...{
          sid: this.sid,
          page: this.pageNum,
          size: this.pageSize,
          from: this.monthStart,
          to: this.monthEnd
        },
        ...opt
      }
      try {
        const data = await this.$http.get('/vip/history?debug', { params })
        if (data) {
          this.recordList = this.recordList.concat(data.list)
          this.monthPayDiamond = data.coin
          this.showLoading = false
          this.lastPage = Math.ceil(data.total / 10)
          this.pageNum += 1
        }
      } catch (err) {
        err && this.$toast(err)
        this.showLoading = false
      }
    },
    async getFreiendGiftList(opt = {}) {
      if (this.pageNum > this.lastPage) {
        this.showLoading = false
        return false
      }
      this.showLoading = true
      if (this.pageNum === 0) {
        this.pageNum++
      }
      const params = {
        ...{
          sid: this.sid,
          page: this.pageNum,
          size: this.pageSize,
          sDate: this.currentMonth,
        },
        ...opt
      }
      try {
        const data = await this.$http.get('/x/app/starmove/gift/batch', { params })
        if (data) {
          this.recordList = this.recordList.concat(data.list)
          this.monthPayDiamond = 0
          this.showLoading = false
          this.lastPage = data.page.last_page
          this.pageNum += 1
        }
      } catch (err) {
        err && this.$toast(err)
        this.showLoading = false
      }
    },
    async getOtherList(opt = {}) {
      if (this.pageNum > this.lastPage) {
        this.showLoading = false
        return false
      }
      this.showLoading = true
      const params = {
        ...{
          sid: this.sid,
          page: this.pageNum,
          size: this.pageSize,
          from: this.monthStart,
          to: this.monthEnd
        },
        ...opt
      }
      try {
        const data = await this.$http.get('/user/getTradeRecord?debug', { params })
        if (data) {
          this.recordList = this.recordList.concat(data.lists)
          this.monthPayDiamond = data.coin
          this.showLoading = false
          this.lastPage = Math.ceil(data.total / 10)
          this.pageNum += 1
        }
      } catch (err) {
        err && this.$toast(err)
        this.showLoading = false
      }
    },
    async getOrderList(opt = {}) {
      if (this.pageNum > this.lastPage) {
        this.showLoading = false
        return false
      }
      this.showLoading = true
      const params = {
        ...{
          sid: this.sid,
          page: this.pageNum,
          size: this.pageSize,
          status: 0,
          sDate: this.currentMonth
        },
        ...opt
      }
      try {
        const data = await this.$http.post(`/x/app/star/getOrderList?debug&sid=${this.sid}`, { p: params })
        if (data) {
          if (data.data) {
            this.rechargeList = this.rechargeList.concat(data.data)
          }
          this.monthPayDiamond = 0
          this.showLoading = false
          this.lastPage = data.pageNb
          this.pageNum += 1
        }
      } catch (err) {
        err && this.$toast(err)
        this.showLoading = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import './index.less';
</style>
