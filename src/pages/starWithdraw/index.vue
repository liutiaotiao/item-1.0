<template>
  <div id="app" class="star_withdraw_page">
    <!-- <header class="withdraw_t-header">
      <div class="withdraw_t-header-left"></div>
      <div class="withdraw_t-header-center">零钱提现</div>
      <div class="withdraw_t-header-right" @click="routerLinkRecord">提现记录</div>
    </header> -->
    <main class="withdraw_t-main">
      <div class="withdraw_t-main-balance">
        <div class="withdraw_t-main-coin">
          <span class="withdraw_t-main-withdraw_num">{{ starAmount || 0 }}</span>
          <div class="withdraw_t-main-money">约{{ parseFloat((starAmount || 0) / 10).toFixed(2) }}元</div>
        </div>
        <p class="withdraw_t-main-unit">星动余额</p>
      </div>
      <!-- 提现方式 -->
      <div class="bind-wx">
        <div class="type">
          <div class="title">提现方式</div>
          <div class="type-btn">
            <div class="wx btn active"><img src="./images/wx.png" class="icon" />微信</div>
          </div>
        </div>
      </div>
      <!-- 用户信息 -->
      <div class="user-info">
        <div class="user">
          <div
            class="avatar"
            v-if="user.account && user.account[0].ext"
            :style="{ 'background-image': `url(${user.account && user.account[0].ext})` }"
          ></div>
          <div class="avatar" v-else></div>
          <div class="nickname">{{ (user.account && user.account[0].holder) || '设置微信提现账户' }}</div>
        </div>
        <div class="link" v-if="!user.account" @click="onBand('wx')">去绑定微信号</div>
        <div class="link" v-if="user.account && !userInfo.mobile" @click="onBand('phone')">去绑定手机号</div>
        <div class="link-bind" v-if="user.account && userInfo.mobile">已绑定</div>
      </div>
      <!-- 提现金额 -->
      <div class="money-card">
        <div class="title">提现金额<span class="tips">（提现金额需满100，且是10的倍数）</span></div>
        <div class="money-card_wrap">
          <span class="rmb_sign">¥</span>
          <input
            type="text"
            class="withdraw_amount"
            id="star_withdraw_amount"
            v-model="withdrawAmount"
            placeholder="请输入提现金额"
            @click="goFoucus"
            @blur="blurHandler"
          />
        </div>
      </div>
      <!-- 提现说明 -->
      <div class="rules">
        <div class="rule-title">提现说明</div>
        <div class="rule">
          1.由于微信支付需要实名制，非实名用户账号无法支持提现，请务必将提现的微信号进行实名认证。(只能绑定一个微信号)
        </div>
        <div class="rule">2.单笔提现金额最低100元，最高500元。</div>
        <div class="rule">3.提现申请将在1-3个工作日内审核到账，请耐心等待。</div>
        <div class="rule">4.多笔提现不能同时进行，请在当前提现结束后，再发起新的提现。</div>
        <div class="rule">5.前往[提现记录]页，可查询每一笔提现记录和提现进度。</div>
      </div>
    </main>
    <footer>
      <!-- 确认按钮 -->
      <div class="withdraw-action">
        <div class="txt">
          所需星动：<span>{{ !isNaN(withdrawAmount) ? Number(withdrawAmount) * 10 : 0 }}</span>
        </div>
        <div class="btn disable" v-if="withdrawAmount !== '' && Number(withdrawAmount) * 10 > starAmount">
          星动余额不足
        </div>
        <div class="btn" @click="goWithDraw" v-else>立即提现</div>
      </div>
      <!-- 绑定微信弹窗 -->
      <div class="msgBox" v-if="wxPropStatus">
        <div class="mask animated fadeIn" @click="wxPropStatus = false"></div>
        <div class="box animated fadeInUp">
          <div class="head"></div>
          <p class="head_txt">微信未绑定</p>
          <div class="confirm" @click="onBindWx">立即绑定</div>
        </div>
      </div>
      <!-- 温馨提示弹窗 -->
      <div class="msgBox" v-if="msgProp.status">
        <div class="mask animated fadeIn"></div>
        <div class="prompt_pop animated fadeInUp">
          <h3 class="prompt_pop_title">温馨提示</h3>
          <p class="prompt_pop_txt">{{ msgProp.txt }}</p>
          <div class="prompt_pop_btn-warp">
            <div class="prompt_pop-btn" @click="msgProp.status = false">取消</div>
            <div class="prompt_pop-btn prompt_pop-btn-active" @click="handleClickProp(msgProp.type)">
              {{ msgProp.type === 0 ? '立即绑定' : msgProp.type === 1 ? '立即前往' : '去验证' }}
            </div>
          </div>
        </div>
      </div>
      <!-- toast -->
      <div class="toast animated fadeInUp" v-show="toast.status">
        <div class="toast-txt">
          {{ toast.txt }}
        </div>
      </div>
      <!-- 温馨提示 -->
      <div class="prompt" :class="[sliderPrompt ? 'prompt_show' : '']">
        <div class="prompt_main">
          <p class="prompt_main-title">温馨提示</p>
          <p>目前还有等待处理的提现申请，</p>
          <p>请稍后再试～</p>
          <div class="prompt_know" @click="sliderPrompt = false">知道了</div>
        </div>
      </div>
    </footer>
    <div class="donut" v-show="loading"></div>
  </div>
</template>

<script>
import { currentUrlToParams } from '@/utils/app.js'
import xsign from '../../utils/xtools.go.js'
import myAjax from './lib/myAjax.js'

export default {
  name: 'starWithdraw',
  data() {
    return {
      sid: '',
      userInfo: {},
      loading: false,
      withdrawAmount: '',
      starAmount: 0, // 星动余额
      user: {}, // 接口返回账户信息
      sliderPrompt: false,
      wxPropStatus: false, // 微信绑定弹窗
      msgProp: {
        status: false,
        txt: '为了您的账户安全，请先绑定手机号',
        type: 0 // 0:绑定手机号， 1: 立即前往， 2: 去验证
      },
      toast: {
        status: false,
        txt: ''
      },
      timer: null
    }
  },
  created() {
    document.title = '提现零钱'

    this.bridge.exec('needWakeUp', {
      type: 1
    }, data => {})

    this.bridgeLoad()

    this.bridge.exec('appShareShow', { message: '7' }, function(data) {})

    window.webviewWakeUp = data => {
      this.bridgeLoad()
    }

    // this.sid = currentUrlToParams('sid')
    // if (this.sid) {
    //   this.getStarBalance()
    //   this.getWithdraw()
    // }
  },
  methods: {
    bridgeLoad() {
      this.bridge.exec('getUserInfo', data => {
        if (!data.sid) return
        this.sid = data.sid
        this.userInfo = data
        this.getStarBalance()
        this.getWithdraw()
      })
    },
    loadStatus(flag, delay = 0) {
      if (flag) {
        this.timer = setTimeout(() => {
          this.loading = true
        }, delay)
      } else {
        this.timer && clearTimeout(this.timer)
        this.loading = false
      }
    },
    goFoucus() {
      console.log('goFoucus')
      document.getElementById('star_withdraw_amount').focus()
    },
    blurHandler() {
      console.log('blurHandler')
      window.scrollTo(0, 0)
    },
    // 星动余额
    async getStarBalance() {
      try {
        this.loadStatus(true)
        const data = await this.$http(`/x/app/starmove/total?debug&sid=${this.sid}`)
        if (data) {
          this.loadStatus(false)
          this.starAmount = data.num
        }
      } catch (e) {
        this.$toast(e)
      }
    },
    // 提现金额列表
    getWithdraw() {
      try {
        let headers = {
          'x-requested-with': 'XMLHttpRequest'
        }
        xsign('GET', `/g/withdraw/amount-list`, `sid=${this.sid}&channel=1`, '', headers)

        myAjax({
          url: `/g/withdraw/amount-list?sid=${this.sid}&channel=1`,
          type: 'get',
          headers,
          success: res => {
            if (res.code === 0) {
              this.user = res.data.user
            } else {
              this.$toast(res.message)
            }
          }
        })
      } catch (error) {
        console.log('error', error)
      }
    },
    // 绑定
    onBand(type) {
      if (type === 'wx') {
        this.onBindWx()
      } else if (type === 'phone') {
        this.onBindPhone()
      }
    },
    // 立即提现
    goWithDraw() {
      try {
        if (Number(this.withdrawAmount) < 100 || Number(this.withdrawAmount) % 10 !== 0) {
          this.$toast('提现金额需满100，且是10的倍数')
          return
        }
        if (Number(this.withdrawAmount) > 500) {
          this.$toast('最大提现金额500')
          return
        }
        if (!this.user.account) {
          // 微信绑定
          this.wxPropStatus = true
          return
        }
        if (!this.userInfo.mobile) {
          // 手机绑定
          this.msgProp.status = true
          this.msgProp.txt = '为了保障您的财产安全,请先绑定手机号'
          this.msgProp.type = 0
          return
        }
        if (this.user.status === -1) {
          this.timer && clearTimeout(this.timer)
          this.timer = setTimeout(() => {
            this.toast.status = true
            this.toast.txt = '提现账号存在异常,请联系客服处理'

            setTimeout(() => {
              this.toast.status = false
            }, 3000)
          }, 400)

          return
        }

        if (Number(this.withdrawAmount) * 10 > this.starAmount) {
          this.msgProp.status = true
          this.msgProp.txt = '星动不足～'
          this.msgProp.type = 1
          return
        }

        this.loadStatus(true)

        try {
          let headers = {
            'x-requested-with': 'XMLHttpRequest'
          }
          xsign('GET', `/g/withdraw/amount-list`, `sid=${this.sid}&channel=1`, '', headers)

          myAjax({
            url: `/g/withdraw/amount-list?sid=${this.sid}&channel=1`,
            type: 'get',
            headers,
            success: res => {
              if (res.code === 0) {
                this.loadStatus(false)
                this.user = res.data.user

                if (this.user.status === 1) {
                  this.sliderPrompt = true
                }

                if (this.user.status === 0) {
                  // 正常
                  this.msgProp.status = true
                  this.msgProp.txt = '为了保障您的财产安全，需要先进行手机号验证'
                  this.msgProp.type = 2
                  return
                }
              } else {
                this.$toast(res.message)
              }
            }
          })
        } catch (error) {
          console.log('error', error)
        }
      } catch (error) {
        this.loadStatus(false)
      }
    },
    // 跳转手机号验证
    routerLinkPhone() {
      const moneyHolderObj = {
        money: Number( this.withdrawAmount ) * 100,
        holder: this.user.account && this.user.account[0].holder,
        channel: 1,
      }
      this.bridge.exec(
        'openUrl',
        {
          // url: `${window.location.origin}/static/v2/m/boot/coinValidation/index.html?moneyHolder=${Number(
          //   this.withdrawAmount
          // ) * 100}-${this.user.account && this.user.account[0].holder}-1`,
          url: `${window.location.origin}/static/v2/m/boot/coinValidation/index.html?moneyHolder=${encodeURI(JSON.stringify(moneyHolderObj))}`,
          title: '提现验证',
          type: '0'
        },
        data => {
          this.msgProp.status = false
        }
      )
    },
    // 绑定微信
    onBindWx() {
      this.bridge.exec('bindUserWX', data => {
        this.wxPropStatus = false
      })
    },
    // 绑定手机号
    onBindPhone() {
      this.bridge.exec('bindPhoneWithType', { type: '1' }, data => {
        this.msgProp.status = false
      })
    },
    // 温馨提示
    handleClickProp(type) {
      //  0:绑定手机号， 1: 余额不足立即前往， 2: 去验证
      switch (type) {
        case 0:
          this.onBindPhone()
          return
        case 1:
          return
        case 2:
          this.routerLinkPhone()
          return
        default:
          return
      }
    },
    routerLinkRecord() {
      this.bridge.exec(
        'openUrl',
        {
          url: `${window.location.origin}/static/v2/m/boot/coinRecord/index.html`,
          title: '提现记录',
          type: '0'
        },
        data => {
          this.msgProp.status = false
        }
      )
    }
  }
}
</script>

<style lang="less" scoped>
@import './index.less';
</style>
