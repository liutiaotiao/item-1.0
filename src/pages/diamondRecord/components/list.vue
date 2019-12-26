<template>
  <div>
    <div class="record_list" v-if="listType === '礼物'">
      <div class="record-item-component record_item" v-for="(item, index) in list" :key="index">
        <div class="item_left">
          <img :src="parseIcon(item.gifturl)" class="giftImg" v-if="!isIphone"/>
          <div class="item_left_intro">
            <span class="item_name">{{ `送给 ${item.nick} ${item.name} x${item.count}` }}</span>
            <span class="item_time">{{ item.time }}</span>
          </div>
        </div>
        <div class="item_right">
          <span class="item_num">{{ item.coin + '钻石' }}</span>
        </div>
      </div>
    </div>

    <div class="record_list" v-if="listType === '贵族'">
      <div class="record-item-component record_item" v-for="(item, index) in list" :key="index">
        <div class="item_left">
          <img :src="nobleConfig[item.level].icon" class="nobleIcon" />
          <div class="item_left_intro">
            <span class="item_name">{{ `${getNoblePayType(item)} ${nobleConfig[item.level].name} x1个月` }}</span>
            <span class="item_time">{{ item.dateline }}</span>
          </div>
        </div>
        <div class="item_right">
          <span class="item_num">{{ '-' + item.coin + '钻石' }}</span>
        </div>
      </div>
    </div>

    <div class="record_list" v-if="listType === '背包道具'">
      
      <div class="record-item-component record_item" v-for="(item, index) in list" :key="index">
        <div class="item_left">
          <img :src="parseIcon(item.pic)" class="nobleIcon"  v-if="!isIphone"/>
          <div class="item_left_intro">
            <span class="item_name">{{ `送给 ${item.relationName} ${item.name} x${item.num}` }}</span>
            <span class="item_time">{{ item.dateline }}</span>
          </div>
        </div>
        <div class="item_right"></div>
      </div>
    </div>

    <div class="record_list" v-if="listType === '商城购买'">
      <div class="record-item-component record_item" v-for="(item, index) in list" :key="index">
        <div class="item_left">
          <img :src="item.cover" class="mallItemImg" v-if="!isIphone"/>
          <div class="item_left_intro">
            <span class="item_name">{{ item.name }}</span>
            <span class="item_time">{{ item.created_at }}</span>
          </div>
        </div>
        <div class="item_right">
          <span class="item_num">{{ '-' + item.cost + '钻石' }}</span>
        </div>
      </div>
    </div>

    <div class="record_list" v-if="listType === 'VIP会员'">
      <div class="record-item-component record_item" v-for="(item, index) in list" :key="index">
        <div class="item_left_intro">
          <span class="item_name">{{ item.orderMsg }}</span>
          <span class="item_time">{{ item.dateline }}</span>
        </div>
        <div class="item_right">
          <span class="item_num">{{ '-' + item.diamond + '钻石' }}</span>
        </div>
      </div>
    </div>

    <div class="record_list" v-if="listType === '交友礼物'">
      <div class="record-item-component record_item" v-for="(item, index) in list" :key="index">
        <div class="item_left">
          <img :src="item.gift_info && item.gift_info.gift_url" class="giftImg" v-if="!isIphone"/>
          <div class="item_left_intro">
            <span class="item_name">{{ `送给 ${item.username} ${item.gift_name} x${item.num}` }}</span>
            <span class="item_time">{{ item.created_at }}</span>
          </div>
        </div>
        <div class="item_right">
          <span class="item_num">{{ item.gift_info && item.gift_info.diamond_cost + '钻石' }}</span>
        </div>
      </div>
    </div>

    <div class="record_list" v-if="listType === '其他'">
      <div class="record-item-component record_item" v-for="(item, index) in list" :key="index">
        <div class="item_left_intro">
          <span class="item_name">{{ item.name }}</span>
          <span class="item_time">{{ item.dateline }}</span>
        </div>
        <div class="item_right">
          <span class="item_num">{{ '-' + item.value + '钻石' }}</span>
        </div>
      </div>
    </div>

    <div class="record_list" v-if="listType === '充值'">
      <div class="record-item-component record_item" v-for="(item, index) in list" :key="index">
        <div class="item_left_intro">
          <span class="item_name">{{ `+${item.coin}钻石` }}</span>
          <span class="item_time">{{ item.create_at }}</span>
        </div>
        <div class="item_right">
          <span class="item_num black">{{ '-' + item.rmb + '元' }}</span>
          <span class="item_status">{{ item.status }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import nobleConfig from '../lib/noble.js'

export default {
  name: 'recordList',
  data: function() {
    return {
      isIphone: /iphone/i.test(window.navigator.userAgent),
      nobleConfig
    }
  },
  props: {
    listType: {
      type: String,
      default: '礼物'
    },
    list: {
      type: Array,
      default: []
    }
  },
  created() {
    // console.log('this.list', this.list)
  },
  methods: {
    parseIcon(str) {
      str = str || ''
      if (location.protocol !== 'https:') {
        return str.replace(/^x:/, 'http://test-cdn.xiu.dftoutiao.com/')
      } else {
        return str.replace(/^x:/, 'https://xiu.cdn.uugtv.com/')
      }
    },
    getNoblePayType(record) {
      if (record.recver === record.sender) {
        if (record.renewal) {
          return '续费'
        } else {
          return '开通'
        }
      } else {
        return '赠送'
      }
    }
  }
}
</script>

<style lang="less" scoped>
.record-item-component {
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #eee;
  .item_left {
    display: flex;
  }
  .giftImg {
    width: 52px;
    height: 64px;
    margin-right: 26px;
  }
  .nobleIcon {
    width: 64px;
    height: 58px;
    margin-right: 26px;
  }
  .mallItemImg {
    width: auto;
    height: 58px;
    margin-right: 26px;
  }
  .item_left_intro {
    display: flex;
    flex-direction: column;
  }
  .item_name {
    font-size: 28px;
    font-family: PingFang SC;
    font-weight: 500;
    color: rgba(34, 34, 34, 1);
    padding-bottom: 23px;
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
    &.black {
      color: #222222;
    }
  }
  .item_status {
    font-size: 24px;
    font-family: PingFang SC;
    font-weight: 500;
    color: rgba(253, 184, 0, 1);
    line-height: 40px;
    padding-top: 10px;
  }
  .item_right {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
}
</style>
