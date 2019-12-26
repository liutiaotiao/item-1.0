<template>
  <div id="app" class="skill_share_page">
    <swiper :options="swiperOption" v-if="bgList.length > 1">
      <!-- :style="{ backgroundImage: `url(${item})`, height: `${bgGeight}px` }" -->
      <swiper-slide
        v-for="(item, $index) in bgList"
        :key="$index"
      >
        <img :src="item" class="swiper-slide-img">
      </swiper-slide>
    </swiper>
    <div class="bg-single">
      <img :src="bgList[0]" class="swiper-slide-img">
    </div>
    <div class="content">
      <div class="name">
        <span>{{ streamerInfo.nickname || '' }}</span>
        <span class="age" v-if="streamerAge > 0">{{ streamerAge }}</span>
      </div>
      <div class="location">
        <span class="distance" v-if="streamerInfo.distance > 0">{{ `${streamerInfo.distance}km` }}</span>
        <span>{{ streamerInfo.position || '' }}</span>
      </div>
      <div class="hobby">
        {{ `擅长：${streamerInfo.detail || ''}` }}
      </div>
      <div class="btnWrap">
        <span class="btn" @click="goOpenApp">{{ skillInfo.name }}</span>
        <span class="btn more" @click="goOpenApp">TA的更多技能</span>
      </div>
    </div>
    <div class="footer">
      <open-app></open-app>
    </div>
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import openApp from '../../components/openApp/index.vue'
import { currentUrlToParams } from '@/utils/app.js'

export default {
  name: 'skillShare',
  data() {
    return {
      swiperOption: {
        loop: true,
        // autoplay: {
        //   delay: 3000
        // }
      },
      bgGeight: window.innerHeight,
      uid: '',
      skillid: '',
      streamerInfo: {},
      skillInfo: {},
      streamerAge: 0,
      bgList: []
    }
  },
  mounted() {
    this.uid = currentUrlToParams('uid')
    this.skillid = currentUrlToParams('skillid')
    this.dynamic_id = currentUrlToParams('dynamic_id')
    this.getRecommend()
  },
  components: {
    'open-app': openApp,
    swiper,
    swiperSlide
  },
  methods: {
    async getRecommend() {
      try {
        const data = await this.$http.get(`/public/skill/dynamic?debug&uid=${this.uid}&dynamic_id=${this.dynamic_id}`)
        if (data) {
          this.streamerInfo = data
          this.skillInfo = this.streamerInfo && this.streamerInfo.skill_detail
          this.bgList = this.streamerInfo.pic_list
          // console.log('this.bgList', this.bgList)
          if (this.streamerInfo.birth && this.streamerInfo.birth.split('-').length) {
            this.streamerAge = new Date().getFullYear() - Number(this.streamerInfo.birth.split('-')[0])
          }
        }
      } catch (err) {
        err && this.$toast(err)
      }
    },
    triggerClick(dom) {
      if (document.createEvent) {
        var evt = document.createEvent('MouseEvents')
        evt.initEvent('click', true, false)
        dom.dispatchEvent(evt)
      } else if (document.createEventObject) {
        dom.fireEvent('onclick')
      } else if (typeof dom.onclick == 'function') {
        dom.onclick()
      }
    },
    goOpenApp() {
      this.triggerClick(document.getElementById('downloadButton'))
    }
  }
}
</script>
<style lang="less">
.skill_share_page {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  .bg-single {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #333;
  }
  .swiper-container {
    height: 100%;
    background: #333;
  }
  .swiper-slide {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .swiper-slide-img {
    width: 100%;
    height: auto;
    margin: 0 auto;
  }
  .content {
    z-index: 10;
    width: 100%;
    height: 576px;
    background: url('./images/shadow.png') no-repeat;
    background-size: 100% 100%;
    position: absolute;
    bottom: 120px;
    left: 0;
    padding: 294px 30px 0px;
  }
  .name {
    font-size: 30px;
    font-family: PingFang SC;
    font-weight: bold;
    color: rgba(255, 255, 255, 1);
    margin-bottom: 19px;
  }
  .age {
    display: inline-block;
    width: 42px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    background: url('./images/age_bg.png') no-repeat;
    background-size: 100% 100%;
    font-size: 22px;
    font-family: PingFang SC;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    margin-left: 7px;
  }
  .location {
    font-size: 24px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #fff;
    margin-bottom: 26px;
  }
  .distance {
    font-size: 24px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #ffb412;
    margin-right: 15px;
  }
  .hobby {
    font-size: 24px;
    font-family: PingFang SC;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    opacity: 0.7;
    margin-bottom: 26px;
    line-height: 26px;
  }
  .btnWrap {
    display: flex;
    align-items: flex-end;
  }
  .btn {
    display: inline-block;
    width: 260px;
    height: 60px;
    background: #2a9dff;
    border-radius: 30px;
    line-height: 60px;
    text-align: center;
    font-size: 24px;
    font-family: PingFang SC;
    font-weight: bold;
    color: rgba(255, 255, 255, 1);
    &.more {
      background: #ff2a6a;
      margin-left: 20px;
    }
  }
  .footer {
    z-index: 10;
  }
}
</style>
