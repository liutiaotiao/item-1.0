<template>
  <div class="records-filter-component">
    <div class="current_condition">
      <div>
        <span @click="slideDown = !slideDown">{{ current }}</span>
        <span class="filter_arrow down" v-if="!slideDown"></span>
        <span class="filter_arrow up" v-else></span>
      </div>
      <span v-if="diamond > 0" class="month_pay_diamond">{{ `${diamond}钻石` }}</span>
    </div>
    <ul class="filter-month-list" v-if="slideDown">
      <span class="filter-month-arrow"></span>
      <li class="filter-month-li" v-for="(item, index) in monthLst" :key="index" @click="selectHandler(index, item)">
        {{ item }}
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'recordsFilter',
  data: function() {
    return {
      slideDown: false,
      current: '',
      monthLst: []
    }
  },
  props: {
    diamond: {
      type: Number,
      default: 0
    }
  },
  created() {
    this.genMonthLst()
  },
  methods: {
    genMonthLst() {
      const currentYear = new Date().getFullYear()
      const currentMonth = new Date().getMonth() + 1
      this.current = `${currentYear}年${currentMonth}月`
      if (currentMonth === 1) {
        this.monthLst = [`${currentYear}年1月`, `${currentYear - 1}年12月`, `${currentYear - 1}年11月`]
        return
      }
      if (currentMonth === 2) {
        this.monthLst = [`${currentYear}年2月`, `${currentYear}年1月`, `${currentYear - 1}年12月`]
        return
      }
      this.monthLst = [
        `${currentYear}年${currentMonth}月`,
        `${currentYear}年${currentMonth - 1}月`,
        `${currentYear}年${currentMonth - 2}月`
      ]
    },
    selectHandler(index, month) {
      this.current = this.monthLst[index]
      this.slideDown = !this.slideDown
      this.$emit('selectCb', month)
    }
  }
}
</script>

<style lang="less" scoped>
.records-filter-component {
  position: relative;
  .current_condition {
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    padding: 0px 30px;
    background: rgba(244, 244, 244, 1);
    font-size: 26px;
    font-family: PingFang SC;
    font-weight: 500;
    color: rgba(153, 153, 153, 1);
    justify-content: space-between;
  }
  .filter_arrow {
    display: inline-block;
    width: 20px;
    height: 11px;
    margin-left: 10px;
    &.up {
      background: url('./images/up.png');
      background-size: 100% 100%;
    }
    &.down {
      background: url('./images/down.png');
      background-size: 100% 100%;
    }
  }
  .month_pay_diamond {
    font-size: 26px;
    font-family: PingFang SC;
    font-weight: 500;
    color: rgba(153, 153, 153, 1);
  }
  .filter-month-list {
    width: 220px;
    background: #fff;
    position: absolute;
    left: 20px;
    top: 70px;
    box-shadow: 0px 6px 12px 0px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
  }
  .filter-month-arrow {
    display: inline-block;
    position: absolute;
    right: 20px;
    top: -40px;
    border-width: 20px;
    border-color: transparent transparent #fff transparent;
    border-style: solid;
  }
  .filter-month-li {
    width: 220px;
    height: 100px;
    line-height: 100px;
    text-align: center;
    border-bottom: 1px solid #f5f5f5;
    font-size: 26px;
    font-family: PingFang SC;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    &:last-child {
      border-bottom: 0px;
    }
  }
}
</style>
