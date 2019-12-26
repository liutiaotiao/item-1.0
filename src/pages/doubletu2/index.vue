<template>
  <div id="app" class="double">
    <div class="tutop">
        <div class="tutoptitle1">{{uptime}}-{{downtime}}</div>
        <div class="tutoptitle2">{{begin_time}}-{{end_time}}</div>
    </div>

    <div class="tutab">
      <div class="tutab-general" :class="{act:tabcur==0}" @click="tabClick(0)"></div>
      <div class="tutab-superior" :class="{act:tabcur==1}" @click="tabClick(1)"></div>
    </div>

    <!-- main -->
    <div class="tumain" :class="{superior:tabcur==1}">
      <!-- animated -->
      <div class="tumain-animated">
        <div class="animated" :class="{superior:tabcur==1}">
          <div class="animated-desc" v-show="tabcur==0"></div>
          <div class="animated-superior" v-show="tabcur==1"></div>
        </div>
        <!-- general -->
        <div class="general-b" v-show="tabcur==0">
          <div class="_tips">
            <div class="_tips_title" v-show="defaults==0&&timefetch>0">{{timejian10s}}s后停止购买</div>
            <div class="_tips_title" v-show="defaults==1">结果正在揭晓中</div>
            <div class="_tips_title" v-show="nowStatus==0">当前不在活动时间内</div>
          </div>
          <div class="_tips_count">
            <div class="_tips_count_a">已有{{member_1}}人购买</div>
            <div class="_tips_count_b">已有{{member_2}}人购买</div>
          </div>
          <div class="_wangqi" @click="getMyRecord"></div>
          <div class="_title">
            <span class="dian1"></span>
            第{{UpdateArr.name?UpdateArr.name:1}}轮
            <span class="dian1"></span>
          </div>
          <div class="_top"></div>
          <div class="_bottom"></div>

          <div class="_default" v-show="defaults==0"></div>

          <div class="ing" v-show="defaults==1">
            <div class="tuzi1 tuzi_animated"></div>
            <div class="tuzi2 tuzi2_animated"></div>
            <div class="tuzi1ligth light"></div>
            <div class="tuzi2ligth light2"></div>
          </div>

          <!-- 倒计时 -->
          <div class="_countdown" v-show="defaults==2">
            <div class="_countdown-bg"></div>
            <div class="_countdown-time3s">{{time3s}}</div>
          </div>

          <div class="_end" v-show="defaults==3">
            <div class="_end-tu1" v-show="UpdateArr.now==1"></div>
            <div class="_end-tu2" v-show="UpdateArr.now==2"></div>
          </div>
        </div>

        <!-- superior -->
        <div class="superior-b" v-show="tabcur==1">
          <div class="_tips">
            <div class="_tips_title" v-show="defaults2==0&&timefetch2>0">{{time2jian10s}}s后停止购买</div>
            <div class="_tips_title" v-show="defaults2==1">结果正在揭晓中</div>
            <div class="_tips_title" v-show="nowStatus==0">当前不在活动时间内</div>
          </div>

          <div class="_tips_count">
            <div class="_tips_count_a">已有{{member_1}}人购买</div>
            <div class="_tips_count_b">已有{{member_3}}人购买</div>
            <div class="_tips_count_c">已有{{member_2}}人购买</div>
          </div>
          <div class="_wangqi" @click="getMyRecord2"></div>
          <div class="_zhuli" @click="getzhuliShowBool">
            <div class="_zhuli_title">剩余{{bonus}}次</div>
          </div>
          <div class="_title">
            <span class="dian1"></span>
            第{{UpdateArr.name?UpdateArr.name:1}}轮
            <span class="dian1"></span>
          </div>
          <div class="_top"></div>
          <div class="_bottom"></div>

          <div class="_default" v-show="defaults2==0"></div>

          <div class="ing" v-show="defaults2==1">
            <div class="tuzi1 tuzi_animated"></div>
            <div class="tuzi2 tuzi2_animated"></div>
            <div class="tuzi1ligth light"></div>
            <div class="tuzi2ligth light2"></div>
          </div>

          <!-- 倒计时 -->
          <div class="_countdown" v-show="defaults2==2">
            <div class="_countdown-bg"></div>
            <div class="_countdown-time3s">{{time3s2}}</div>
          </div>

          <div class="_end" v-show="defaults2==3">
            <div class="_end-tu1" v-show="UpdateArr.now==1"></div>
            <div class="_end-tu2" v-show="UpdateArr.now==3"></div>
            <div class="_end-tu3" v-show="UpdateArr.now==2"></div>
          </div>
        </div>
        <!--the end -->
      </div>

      <!-- buy -->
      <div class="tubuy" v-show="tabcur==0">
        <div class="tubuy-title">
          <div class="tubuy-top">
            <div class="tubuy-txt">
              我的钻石
              <span>{{diamonds}}</span>
            </div>
            <div class="tubuy-dim"></div>
            <div class="tubuy-btn" @click="getonCallNativePay"></div>
          </div>
        </div>
        <div class="tubuy-zhu">（*暂不支持贵族钻石）</div>
        <div class="tubuy-choose">
          <div class="tubuy-choose-txt">购买金额：</div>
          <div class="tubuy-chooselist">
            <div
              class="tubuy-choose-list"
              v-for="(item,index) in dimArr"
              :class="{active:cur==index&&priceClassBool==0}"
              @click="cutTabClick(index,item,0)"
              :key="index"
            >
              {{item}}
              <span class="tubuy-choose-list-dim"></span>
              <span class="tubuy-choose-list-choosed-icon"></span>
            </div>
            <div
              class="tubuy-choose-listend"
              :class="{active:priceClassBool==1}"
              @click="cutTabClick(99,0,1)"
            >
              <div class="tubuy-choose-listend-input">
                <input
                  placeholder="请输入钻石数"
                  class="txt-input"
                  v-model="input"
                  type="number"
                  @input="handleInput"
                />
              </div>
              <div class="tubuy-choose-listend-choosed-icon"></div>
            </div>
          </div>
          <div class="tubuy-choose-desc">*普通场每个洞允许购买钻石{{Mindim}}-{{Maxdim}}，超出范围无法完成购买</div>

          <div class="tubuy-btn">
            <div class="tubuy-btn-one">
              <div class="tubuy-btn-one-btn" @click="getTipsboolQueren(price,1,sid)"></div>
              <div class="tubuy-btn-one-desc">您1号洞已购{{bought1}}钻</div>
            </div>
            <div class="tubuy-btn-two">
              <div class="tubuy-btn-two-btn" @click="getTipsboolQueren(price,2,sid)"></div>
              <div class="tubuy-btn-two-desc">您2号洞已购{{bought2}}钻</div>
            </div>
          </div>
        </div>
        <div class="_record" @click="getTipsboolMyRecord1(sid)"></div>
      </div>

      <!-- buy2 -->
      <div class="tubuy2" v-show="tabcur==1">
        <div class="tubuy-title">
          <div class="tubuy-top">
            <div class="tubuy-txt">
              我的钻石
              <span>{{diamonds}}</span>
            </div>
            <div class="tubuy-dim"></div>
            <div class="tubuy-btn" @click="getonCallNativePay"></div>
          </div>
        </div>
        <div class="tubuy-zhu">（*暂不支持贵族钻石）</div>

        <div class="tubuy-choose">
          <div class="tubuy-choose-txt">购买金额：</div>
          <div class="tubuy-chooselist">
            <div
              class="tubuy-choose-list"
              v-for="(item,index) in dimArr2"
              :class="{active:cur2==index&&priceClassBool2==0}"
              @click="cutTabClick2(index,item,0)"
              :key="index"
            >
              {{item}}
              <span class="tubuy-choose-list-dim"></span>
              <span class="tubuy-choose-list-choosed-icon"></span>
            </div>
            <div
              class="tubuy-choose-listend"
              :class="{active:priceClassBool2==1}"
              @click="cutTabClick2(99,0,1)"
            >
              <div class="tubuy-choose-listend-input">
                <input
                  placeholder="请输入钻石数"
                  class="txt-input"
                  v-model="input2"
                  type="number"
                  @input2="handleInput"
                />
              </div>
              <div class="tubuy-choose-listend-choosed-icon"></div>
            </div>
          </div>
          <div class="tubuy-choose-desc">*贵宾场每个洞允许购买钻石{{Mindim}}-{{Maxdim}}，超出范围无法完成购买</div>

          <div class="tubuy-btn">
            <div class="tubuy-btn-one">
              <div class="tubuy-btn-one-btn" @click="getTipsboolQueren2(price2,1,sid)"></div>
              <div class="tubuy-btn-one-desc">您1号洞</div>
              <div class="tubuy-btn-one-desc">已购{{bought1}}钻</div>
              <div class="tubuy-btn-discount">{{odds_1}}倍返还</div>
            </div>
            <div class="tubuy-btn-two">
              <div class="tubuy-btn-two-btn" @click="getTipsboolQueren2(price2,3,sid)"></div>
              <div class="tubuy-btn-two-desc">您兔子不见了</div>
              <div class="tubuy-btn-two-desc">已购{{bought3}}钻石</div>
              <div class="tubuy-btn-discount tu">{{odds_3}}倍返还</div>
            </div>
            <div class="tubuy-btn-three">
              <div class="tubuy-btn-three-btn" @click="getTipsboolQueren2(price2,2,sid)"></div>
              <div class="tubuy-btn-three-desc">您2号洞</div>
              <div class="tubuy-btn-three-desc">已购{{bought2}}钻</div>
              <div class="tubuy-btn-discount">{{odds_2}}倍返还</div>
            </div>
          </div>
        </div>
        <div class="_record" @click="getTipsboolMyRecord2(sid)"></div>
      </div>
    </div>

    <!-- list -->
    <div class="tulist">
      <div class="tubang-warp">
        <div
          class="tubang-warp-row"
          v-for="(item,index) in AnchorRank"
          v-show="!empty"
          :key="index"
          v-if="index<5"
        >
          <div class="tubang-warp-row-no" v-show="index<3" :class="'no'+index"></div>
          <div class="tubang-warp-row-no" v-show="index>=3">{{index+1}}</div>
          <div
            class="tubang-warp-row-anchor"
            :style="{background: 'url('+ (item.portrait?item.portrait:defaultAvatars)+')','backgroundSize': 'contain'}"
          ></div>
          <div class="tubang-warp-row-title">{{item.nickname}}</div>
          <div class="tubang-warp-row-dim">{{item.cost}}</div>
          <div class="tubang-warp-row-xunzhang" v-show="index<3" :class="'xunz'+index"></div>
          <div class="tubang-warp-row-xunzhang2" v-show="index>=3">_</div>
        </div>

        <div class="tubang_empty" v-show="empty"></div>
      </div>
    </div>
    <!-- desc -->
    <div class="tudesc"></div>

    <!-- 弹框 确认提示-->
    <div class="animated fadeInDown tutips" v-show="tipsboolQueren">
      <div class="tutips_rowwq tutips_tishi">
        <div class="tutips_rowwq_close" @click="close(0)"></div>

        <div class="t-c">
          <div class="t-tishi-c-title"></div>
          <div class="t-c-desc">
            您确定要花费
            <span>{{price}}</span>钻石购买
            <span>第{{UpdateArr.name}}轮</span>
          </div>
          <div class="t-c-desc"  v-show="code<3">钻石兔出现在<span>{{code}}号洞</span></div>
          <div class="t-c-desc" v-show="code==3">钻石兔出现在<span> 兔子不见了</span></div>

          <div class="t-c-btn" @click="getBuyAjax(cur,sid,uid)">确认</div>
          <div class="t-tishi-wqbottom">（确认购买即视为消费，将消耗相应数量的钻石）</div>
        </div>
      </div>
    </div>
    <div class="animated fadeInDown tutips" v-show="tipsboolQueren2">
      <div class="tutips_rowwq tutips_tishi2">
        <div class="tutips_rowwq_close tishi2" @click="close(0)"></div>

        <div class="t-c">
          <div class="t-tishi-c-title tishi2"></div>
          <div class="t-c-desc tishi2">
            您确定要花费
            <span>{{price2}}</span>钻石购买
            <span>第{{UpdateArr.name}}轮</span>
          </div>
          <div class="t-c-desc tishi2"  v-show="code2<3">钻石兔出现在<span>{{code2}}号洞</span></div>
          <div class="t-c-desc tishi2" v-show="code2==3">钻石兔出现在<span> 兔子不见了</span></div>
          <div class="t-c-btn" @click="getBuyAjax2(cur2,sid,uid)">确认</div>
          <div class="t-tishi-wqbottom tishi2">（确认购买即视为消费，将消耗相应数量的钻石）</div>
        </div>
      </div>
    </div>
    <!-- 弹框 确认提示end-->

    <!-- 弹框  余额不足-->
    <div class="animated fadeInDown tutips" v-show="tipsboolCoin">
      <div class="tutips_rowwq coin">
        <div class="tutips_rowwq_close " @click="close(0)"></div>
        <div class="t-c">
          <div class="tip-coin-c-title"></div>
          <div class="tip-coin-c-desc">您的余额不足哦，请先去充值</div>
          <div class="tip-coin-c-btn1" @click="close(0)">取消</div>
          <div class="tip-coin-c-btn2" @click="getonCallNativePay">充值</div>
        </div>
      </div>
    </div>
    <div class="animated fadeInDown tutips" v-show="tipsboolCoin2">
      <div class="tutips_rowwq coin2">
        <div class="tutips_rowwq_close tishi2" @click="close(0)"></div>
        <div class="t-c">
          <div class="tip-coin-c-title tishi2"></div>
          <div class="tip-coin-c-desc tishi2">您的余额不足哦，请先去充值</div>
          <div class="tip-coin-c-btn1 tishi2" @click="close(0)">取消</div>
          <div class="tip-coin-c-btn2" @click="getonCallNativePay">充值</div>
        </div>
      </div>
    </div>
    <!-- 弹框 余额不足end-->

    <!-- 弹框 翻倍提示-->
    <div class="animated fadeInDown tutips" v-show="tipsboolFanbei">
      <div class="tutips_rowwq tutips_fanbei">
        <div class="tutips_rowwq_close" @click="close(0)"></div>

        <div class="t-c">
          <div class="tutips_fanbei-content-title"></div>
          <div class="t-c-desc">第{{UpdateArr.name}}轮钻石兔出现在{{UpdateArr.now}}号洞，恭喜您获得</div>
          <div class="t-c-dim">
            {{mine_bonus}}
            <span>钻石</span>
          </div>
          <div class="t-c-btn" @click="close(0)">开心收下</div>
        </div>
      </div>
    </div>
    <div class="animated fadeInDown tutips" v-show="tipsboolFanbei2">
      <div class="tutips_rowwq tutips_fanbei tishi2">
        <div class="tutips_rowwq_close tishi2" @click="close(0)"></div>

        <div class="t-c">
          <div class="tutips_fanbei-content-title tuji2"></div>
          <div class="t-c-desc tishi2" v-show="UpdateArr.now<3">第{{UpdateArr.name}}轮钻石兔出现在{{UpdateArr.now}}号洞，恭喜您获得</div>
          <div class="t-c-desc tishi2" v-show="UpdateArr.now==3">第{{UpdateArr.name}}轮钻石兔未出现，恭喜您获得</div>
          <div class="t-c-dim tishi2">
            {{mine_bonus}}{{mine_append}}
            <span>钻石</span>
          </div>
          <div class="t-c-btn" @click="close(0)">开心收下</div>
        </div>
      </div>
    </div>
    <!-- 弹框 翻倍提示end-->

    <!-- 弹框 再接再厉-->
    <div class="animated fadeInDown tutips" v-show="tipsboolHard1">
      <div class="tutips_rowwq tutips_fanbei">
        <div class="tutips_rowwq_close" @click="close(0)"></div>

        <div class="t-c">
          <div class="t_hard-title"></div>
          <div class="t_hard-desc">第{{UpdateArr.name}}轮钻石兔出现在{{UpdateArr.now}}号洞</div>
          <div class="t_hard-desc">再来一轮，马上回血</div>
          <div class="t-c-btn" @click="close(0)">再来一轮</div>
        </div>
      </div>
    </div>
    <div class="animated fadeInDown tutips" v-show="tipsboolHard2">
      <div class="tutips_rowwq tutips_fanbei tishi2">
        <div class="tutips_rowwq_close tishi2" @click="close(0)"></div>

        <div class="t-c tishi2">
          <div class="t_hard-title tishi2"></div>
          <div
            class="t_hard-desc tishi2"
            v-show="UpdateArr.now<3"
          >第{{UpdateArr.name}}轮钻石兔出现在{{UpdateArr.now}}号洞</div>
          <div class="t_hard-desc tishi2" v-show="UpdateArr.now==3">第{{UpdateArr.name}}轮钻石兔未出现</div>
          <div class="t_hard-desc tishi2">再来一轮，马上回血</div>
          <div class="t-c-btn" @click="close(0)">再来一轮</div>
        </div>
      </div>
    </div>
    <!-- 弹框 再接再厉end-->

    <!-- 弹框 我的记录-->
    <div class="animated fadeInDown tutips" v-show="tipsboolMyRecord1">
      <div class="tutips_rowwq">
        <div class="tutips_rowwq_close" @click="close(0)"></div>

        <div class="t-c">
          <div class="t_record-title"></div>
          <div class="t_record-tab">
            <div class="t_record-tab-item one">轮数</div>
            <div class="t_record-tab-item">购买1号</div>
            <div class="t_record-tab-item">购买2号</div>
            <div class="t_record-tab-item">返还钻石数</div>
          </div>

          <div class="t-c-itembox">
            <div class="t_record-item" v-for="(item,index) in myRecordArr" :key="index">
              <div class="t_record-item-li one">{{item.name}}</div>
              <div class="t_record-item-li list1">{{item.bought[1]}}</div>
              <div class="t_record-item-li list2">{{item.bought[2]}}</div>
              <div class="t_record-item-li">{{item.bonus}}</div>
            </div>
            <div class="tubang_empty" style="width:100%" v-show="emptyrecord"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="animated fadeInDown tutips" v-show="tipsboolMyRecord2">
      <div class="tutips_rowwq tutips_record">
        <div class="tutips_rowwq_close tishi2" @click="close(0)"></div>

        <div class="t-c">
          <div class="t_record-title tishi2"></div>
          <div class="t_record-tab tushi2">
            <div class="t_record-tab-item2 one">轮数</div>
            <div class="t_record-tab-item2">购买1号</div>
            <div class="t_record-tab-item2">未出现</div>
            <div class="t_record-tab-item2">购买2号</div>
            <div class="t_record-tab-item2">返还钻石</div>
          </div>

          <div class="t-c-itembox">
            <div class="t_record-item tishi2" v-for="(item,index) in myRecordArr" :key="index">
              <div class="t_record-item-li2 one">{{item.name}}</div>
              <div class="t_record-item-li2 bgli list1">{{item.bought[1]}}</div>
              <div class="t_record-item-li2 list3">{{item.bought[3]}}</div>
              <div class="t_record-item-li2 bgli list2">{{item.bought[2]}}</div>
              <div class="t_record-item-li2">{{item.bonus}}</div>
            </div>
            <div class="tubang_empty tishi2" style="width:100%" v-show="emptyrecord"></div>
          </div>
        </div>
      </div>
    </div>
    <!-- 弹框 我的记录end-->

    <!-- 助力金弹框 -->
    <div class="animated fadeInDown tutips" v-show="zhuliShowBool">
      <div class="tutips_rowwq zhulijin">
        <div class="tutips_rowwq_close tishi2" @click="close(0)"></div>
        <div class="zhulijin_icon"></div>
      </div>
    </div>

    <!-- 往期数据 -->
    <div class="animated fadeInDown tutips" v-show="tipsboolWangqi">
      <div class="tutips_rowwq">
        <div class="tutips_rowwq_close" @click="close(0)"></div>
        <div class="t-c">
          <div class="t-c-title"></div>
          <div class="t-c-tab">
            <div class="t-c-tab-item one">轮数</div>
            <div class="t-c-tab-item">出现在1号洞</div>
            <div class="t-c-tab-item">出现在2号洞</div>
          </div>
          <div class="t-c-itembox">
            <div class="t-c-item" v-for="(item,index) in WangqiArr" :key="index">
              <div class="t-c-item-li one">{{item.name}}</div>
              <div class="t-c-item-li">
                <span v-show="item.result==1"></span>
              </div>
              <div class="t-c-item-li">
                <span v-show="item.result==2"></span>
              </div>
            </div>
            <div class="tubang_empty" v-show="emptywangqi"></div>
          </div>

          <div class="t-c-wqbottom"></div>
        </div>
      </div>
    </div>
    <div class="animated fadeInDown tutips" v-show="tipsboolWangqi2">
      <div class="tutips_rowwq tutips_record">
        <div class="tutips_rowwq_close tishi2" @click="close(0)"></div>
        <div class="t-c">
          <div class="t-c-title tishi2"></div>
          <div class="t-c-tab2">
            <div class="t-c-tab-item one">轮数</div>
            <div class="t-c-tab-item">出现在1号洞</div>
            <div class="t-c-tab-item">出现在2号洞</div>
            <div class="t-c-tab-item">未出现</div>
          </div>
          <div class="t-c-itembox2">
            <div class="t-c-item2 tushi2" v-for="(item,index) in WangqiArr" :key="index">
              <div class="t-c-item-li one">{{item.name}}</div>
              <div class="t-c-item-li">
                <span v-show="item.result==1"></span>
              </div>
              <div class="t-c-item-li">
                <span v-show="item.result==2"></span>
              </div>
              <div class="t-c-item-li">
                <span v-show="item.result==3"></span>
              </div>
            </div>
            <div class="tubang_empty" v-show="emptywangqi"></div>
          </div>

          <div class="t-c-wqbottom tishi2"></div>
        </div>
      </div>
    </div>


    <!-- 往期数据 end -->

    <!-- toast -->
    <div style="position:fixed;left:50%;top: 50%;z-index:9999" v-show="visible">
      <div class="w-toast animated fadeInDown">{{msg}}</div>
    </div>
    <!-- toast end-->
  </div>
</template>
        
<script>
import qs from "qs";
import axios from "axios";
export default {
  name: "doubletu2",
  data: function() {
    return {
        type: 0, //1普通 2贵宾
        tabcur: 0,
        dimArr: [],
        priceClassBool: 0,
        cur: 0,
        price: 10,
        price2: 10,
        AnchorRank: [],
        sid: null,
        input: null,
        empty: true,
        defaultAvatars: require("./images/default-avatar.png"),
        diamonds: 0,
        dimArr2: [],
        priceClassBool2: 0,
        cur2: 0,
        input2: null,
        _count2: 0,
        bonus:0,
        nowStatus:0,
        //
        defaults: 0, //0 默认情况  1开奖10s  2开奖结果
        win: false,
        wintu: 0,

        timefetch: 0,
        time50s: 0,
        timejian10s: 0,
        status3: 0,
        time3s: 0,

        defaults2: 0,
        timefetch2: 0,
        UpdateArr2: [],
        wintu2: 0,
        time250s: 0,
        time2jian10s: 0,
        time3s2: 0,
        //   tipsboolWangqi
        tipsboolWangqi1: false,
        WangqiArr1: [],
        emptywangqi1: false,

        tipsboolWangqi2: false,
        WangqiArr2: [],
        emptywangqi2: false,

        recordShow: false,
        recordShow2: false,
        disabled: false,
        //弹框确认1
        actnone: false,
        tipsboolQueren: false,
        code: 0,
        //弹框确认2
        actnone2: false,
        tipsboolQueren2: false,
        code2: 0,
        // toast
        msg: "null",
        visible: false,
        duration: 3000,

        //余额不足
        tipsboolCoin: false,
        tipsboolCoin2: false,
        bought1: null,
        bought2: null,
        bought3: null,
        Mindim: 0,
        Maxdim: 0,

        //   开奖信息
        UpdateArr: [], //now本次开奖情况 1 一号 2 二号 3 不出现（未开奖为null）
        member_1: 0,
        member_2: 0,
        member_3: 0,
        mine_bonus: 0,
        mine_append: null,

        //   禁止购买
        notAllowBuy: false,

        //   翻倍
        tipsboolFanbei: false,
        tipsboolFanbei2: false,

        //我的记录
        tipsboolMyRecord1: false,
        tipsboolMyRecord2: false,
        myRecordArr: [],
        pages: 1,
        emptyrecord: false,

        //   再接再厉
        tipsboolHard1: false,
        tipsboolHard2: false,
        //   助力金
        zhuliShowBool: false,
        uid: null,
        //   时间udate
        uptime:null,
        downtime:null,
        timeArr:[],
        begin_time:null,
        end_time:null,

        //   往期数据
        tipsboolWangqi:false,
        tipsboolWangqi2:false,
        WangqiArr: [],
        emptywangqi: false,
        // 返回倍数
        odds_1:0,
        odds_2:0,
        odds_3:0,
    };
  },
  created: function() {
    this.getTime();
      // 地址栏
    this.sid = this.getParameterByName("sid");
    this.uid = this.getParameterByName("uid");
    this.getBridgeSid(this.sid)
    // this.getBridgeInfo();
    window.webviewWakeUp = data => {
        let userData;
        if (data) {
            try {
            userData = JSON.parse(data);
            this.sid = userData.sid;
            this.getDiamonds(this.sid);
            this.getrabbit(0,1, this.sid);
            // 开奖信息
            this.getKaijiangInfo(1, this.sid);
            if(this.sid){
                this.timekj();
            }
            this.fetch(this.sid);
            this.getMyRecordInfo(this.sid)
            } catch (e) {}
        }
    }
    this.bridge.exec("currentRoomID", uid => {
        this.getBridgeUid(uid);
    });
    this.bridge.exec("getUserInfo", data => {
        if(data.sid){
            this.sid = data.sid;
            this.getDiamonds(this.sid);
            this.getrabbit(0,1, this.sid);
            // 开奖信息
            this.getKaijiangInfo(1, this.sid);
            if(this.sid){
            this.timekj();
            }
            this.fetch(this.sid);
            this.getMyRecordInfo(this.sid)
        }
            
    });
  },
  methods: {
    getBridgeUid(uid) {
      this.uid = uid;
    },
    getBridgeSid(sid) {
        if(sid){
            this.sid = sid;
            this.getDiamonds(this.sid);
            this.getrabbit(0,1, this.sid);
            // 开奖信息
            this.getKaijiangInfo(1, this.sid);
            if(this.sid){
            this.timekj();
            }
            this.fetch(this.sid);
            this.getMyRecordInfo(this.sid)
        }   
    },
    tabClick(curs) {
      this.tabcur = this.type = curs;
      if(this.sid){
        this.getrabbit(0,curs + 1,this.sid);
        this.fetch(this.sid);
        this.getMyRecordInfo(this.sid)
      }
      if(curs==0){
        this.cutTabClick(0,0,0)
      }else{
        this.cutTabClick2(0,0,0)
      } 
    },
    getParameterByName(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]);
      return null;
    },
    async fetch(sid) {
      this.sid = sid;
      //排行榜
      await this.$http(
        `/x/activity/rabbit2/rank?sid=${this.sid}&type=${this.type}`
      )
        .then(data => {
          this.AnchorRank = data.list;
          this.empty = data.list.length === 0;
        })
        .catch(e => {
          this.empty = true;
        });
    },
    async getrabbit(status,type, sid) {
      
      this.notAllowBuy = false; //允许购买
      // 基本信息
      this.sid = sid;
      let rabbit = await this.$http.get(
        `/x/activity/rabbit2?sid=${this.sid}&type=${type}`
      );
      if (this.tabcur == 0&&status==0) {
        this.dimArr = rabbit.chips;
        this.price = this.dimArr[0]
      } else if (this.tabcur == 1&&status==0){
        this.dimArr2 = rabbit.chips;
        this.price2 = this.dimArr2[0]
      }
      this.bought1 = rabbit.bought[1];
      this.bought2 = rabbit.bought[2];
      this.bought3 = rabbit.bought[3];
      this.Maxdim  = rabbit.max;
      this.Mindim  = rabbit.min;
      this.bonus   = rabbit.bonus
      this.odds_1 = rabbit.odds[1]
      this.odds_2 = rabbit.odds[2]
      this.odds_3 = rabbit.odds[3]
      if(this.timejian10s <0){
        this.defaults= 4
        this.getKaijiangInfo(201,this.sid);
      }  
      if(this.time2jian10s <0){
        this.defaults2 = 4
        this.getKaijiangInfo(201,this.sid);
      } 
    },
    async getKaijiangInfo(hhh, sid) {
        // if(hhh==201){
        //     console.log('stop and run',hhh);
        // }
      let type = this.tabcur;
      //   let sid = this.getParameterByName("sid");
      this.sid = sid;
      await this.$http
        .get(`/x/activity/rabbit2/result?sid=${this.sid}&type=${type + 1}`)
        .then(kaijiang => {
          this.UpdateArr = kaijiang;
          this.timefetch = kaijiang.ttl;
          this.timefetch2 = kaijiang.ttl;
          this.member_1 = kaijiang.member[1];
          this.member_2 = kaijiang.member[2];
          this.member_3 = kaijiang.member[3];
          this.mine = kaijiang.mine;
          this.nowStatus = kaijiang.status;
          kaijiang.mine.append?this.mine_append = '+'+kaijiang.mine.append:this.mine_append = '';
          this.mine_bonus = kaijiang.mine.bonus;
          this.getCode50(kaijiang.ttl);
          this.get2Code50();
        })
        .catch(e => {
        });
    },
    async getTime(){
      let data = await this.$http(`/udata/udata/getdata?cate=rabbittwo_time_control&_app=tjzb`);
      this.uptime = this.getnum(data[0].uptime)
      this.downtime = this.getnum(data[0].downtime)
      this.begin_time = this.gettime(data[0].begin_time)
      this.end_time = this.gettime(data[0].end_time)
    },
    getnum: function(value) {
      var timestamp = Date.parse(value.replace(/-/g, '/'))
      var now = new Date(timestamp)
      var mm = now.getMonth()+1
      var dd = now.getDate()
      return `${mm}月${dd}日`
    },
    gettime:function(soure){
      return soure.substring(0, 2)+":"+soure.substring(2, 4)
    },
    timekj() {
      return setInterval(() => {
        this.getKaijiangInfo(2,this.sid);
      }, 5000);
    },
    async getDiamonds(sid) {
      //钻石
      //   let sid = this.getParameterByName("sid");
      this.sid = sid;
      let data = await this.$http(`/user/info?debug=true&sid=${this.sid}`);
      this.diamonds = data.rich.normalDiamond;
    },
    cutTabClick(index, item, num) {
      this.cur = index;
      this.price = item;
      if (index == 99 && item == 0 && num == 1) {
        this.priceClassBool = 1;
        this.cur = 99
      } else {
        this.priceClassBool = 0;
      }
    },
    cutTabClick2(index, item, num) {
      this.cur2 = index;
      this.price2 = item;
      if (index == 99 && item == 0 && num == 1) {
        this.priceClassBool2 = 1;
        this.cur2 = 99
      } else {
        this.priceClassBool2 = 0;
      }
    },
    handleInput(e) {
      this.input = e.target.value.replace(/[^\d]/g, "");
      if (this.input) {
        // this.show('钻石数不能少于'+this.Mindim+'哦~');
      } else if (!this.input) {
        this.show("钻石数只能为数字哦~");
      }
    },
    getCode50(num) {
      var code = this.timefetch;
      if (!this.timer) {
        this.time50s = code;
        this.timejian10s = code - 10;
        if(code - 10<0){
           this.getKaijiangInfo(999,this.sid); 
        }else{
            this.timer = setInterval(() => {
                if (this.time50s > 0 && this.time50s <= code) {
                    this.timejian10s--;
                    this.time50s--;
                    this.defaults = 0;
                    if (this.time50s == 10) {
                    this.notAllowBuy = true; //禁止购买
                    } else if (this.time50s < 10) {
                    this.timejian10s == "";

                    if (this.time50s==9||this.time50s==8||this.time50s==7||this.time50s==6) {
                        this.defaults = 1;
                    } else if (this.time50s == 5) {
                        this.getKaijiangInfo(3,this.sid); //开奖
                        this.defaults = 1;
                    } else if (this.time50s == 4) {
                        this.defaults = 2;
                        this.countdown();
                    }else if (this.time50s == 3||this.time50s == 2) {
                        this.defaults = 2;
                    }else if (this.time50s == 1) {
                        this.defaults = 3;
                        this.getWinInfo();
                        this.getMyRecordInfo(this.sid)
                        clearInterval(this.timer);
                        this.timer = "";
                        if(this.timejian10s <0){
                            this.timejian10s = 50
                            setTimeout(() => {
                                this.getrabbit(0,this.tabcur+1,this.sid);
                                this.notAllowBuy = false; //允许购买
                                this.getKaijiangInfo(999,this.sid);
                                this.defaults = 0;
                                this.cutTabClick(0,0,0)
                            }, 2000);
                        } 
                    }
                    }
                }
            }, 1000);
        }
            
      }
    },
    get2Code50() {
      var code = this.timefetch2;
      if (!this.timer2) {
        this.time250s = code;
        this.time2jian10s = code - 10;
        if(code - 10<0){
           this.getKaijiangInfo(5,this.sid);
        }else{
            this.timer2 = setInterval(() => {
                if (this.time250s > 0 && this.time250s <= code) {
                    this.time2jian10s--;
                    this.time250s--;
                    this.defaults2 = 0;
                    if (this.time250s == 10) {
                    this.notAllowBuy2 = true; //禁止购买
                    } else if (this.time50s < 10) {
                    this.time2jian10s == "";
                    if (this.time250s==9||this.time250s==8||this.time250s==7||this.time250s==6) {
                        this.defaults2 = 1;
                    } else if (this.time250s == 5) {
                        this.defaults2 = 1;
                        this.getKaijiangInfo(4,this.sid); //开奖
                    } else if (this.time250s == 4) {
                        this.defaults2 = 2;
                        this.countdown2();
                    } else if (this.time250s == 3||this.time250s == 2) {
                        this.defaults2 = 2;
                    }else if (this.time250s == 1) {
                        this.defaults2 = 3;
                        this.getWinInfo();
                        clearInterval(this.timer2);
                        this.timer2 = "";
                        this.getMyRecordInfo(this.sid)
                        if(this.time2jian10s <0){
                            this.time2jian10s = 50
                            setTimeout(() => {
                                this.getrabbit(0,this.tabcur+1,this.sid);
                                this.notAllowBuy2 = false; //允许购买
                                this.getKaijiangInfo(5,this.sid);
                                this.defaults2 = 0;
                                this.cutTabClick2(0,0,0)
                            }, 2000);
                        }
                    }
                    }
                }
            }, 1000);
        }
            
      }
    },
    getWinInfo() {
      if (this.mine.joined == 1 && this.mine.win && this.tabcur == 0&&this.mine_bonus!==0) {
        this.tipsboolFanbei = true;
        setTimeout(() => {
          this.tipsboolFanbei = false;
          this.getrabbit(0,this.tabcur+1,this.sid);
        }, 2000);
      } else if (this.mine.joined == 1 && !this.mine.win && this.tabcur == 0) {
        this.tipsboolHard1 = true;
        setTimeout(() => {
          this.tipsboolHard1 = false;
          this.getrabbit(0,this.tabcur+1,this.sid);
        }, 2000);
      } else if (this.mine.joined == 1 && this.mine.win && this.tabcur == 1&&this.mine_bonus!==0) {
        this.tipsboolFanbei2 = true;
        setTimeout(() => {
          this.tipsboolFanbei2 = false;
          this.getrabbit(0,this.tabcur+1,this.sid);
        }, 2000);
      } else if (this.mine.joined == 1 && !this.mine.win && this.tabcur == 1) {
        this.tipsboolHard2 = true;
        setTimeout(() => {
          this.tipsboolHard2 = false;
          this.getrabbit(0,this.tabcur+1,this.sid);
        }, 2000);
      } else if (this.mine.joined == 0) {
        this.getrabbit(0,this.tabcur+1,this.sid);
      }
      this.getDiamonds(this.sid);
    },
    countdown() {
      if (!this.timer3) {
        this.time3s = 3;
        this.timer3 = setInterval(() => {
          if (this.time3s > 0 && this.time3s <= 3) {
            this.time3s--;
          } else if (this.time3s == 0) {
            clearInterval(this.timer3);
            this.timer3 = "";
          }
        }, 1000);
      }
    },
    countdown2() {
      if (!this.timer32) {
        this.time3s2 = 3;
        this.timer32 = setInterval(() => {
          if (this.time3s2 > 0 && this.time3s2 <= 3) {
            this.time3s2--;
          } else if (this.time3s2 == 0) {
            clearInterval(this.timer32);
            this.timer32 = "";
          }
        }, 1000);
      }
    },
    newFuncName(data) {
      this.recordShow = false;
      this.recordShow2 = false;
      this.move();
    },
    newFuncName2(data) {
      this.recordShow = false;
      this.recordShow2 = false;
      this.move();
    },
    show(msg) {
      this.visible = true;
      this.msg = msg;
      setTimeout(() => {
        this.visible = false;
      }, 3000);
    },
    getTipsboolQueren(price,code, sid) {
      //确认弹框
      //   let sid = this.getParameterByName("sid");
      this.sid = sid;
      this.price = price
      if (!this.sid || this.sid.length < 7) {
        this.bridge.exec("invokeNativeLoginEvent", function(data) {});
      } else if (!this.actnone && this.sid) {
        if (!this.disabled) {
          if (this.price == 0 && !this.input) {
            this.show("钻石数不能为空哦~");
          } else if (this.price == 0 && this.input > this.Maxdim) {
            this.show("钻石数不能超过" + this.Maxdim + "哦~");
          } else if (this.price == 0 && this.input < this.Mindim) {
            this.show("土豪，一次至少" + this.Mindim + "钻石哦~");
          } else {
            this.tipsboolQueren = true;
            this.stop();
            if (this.price == 0 &&this.input <= this.Maxdim &&this.input >= this.Mindim) {
              this.price = this.input;
            }
            this.code = code;
          }
        } else {
          this.show("正在开奖，不能在此阶段购买哦~");
          
        }
      } else {
        this.show("活动未开始");
      }
    },
    getTipsboolQueren2(price,num, sid) {
      //确认弹框
      //   let sid = this.getParameterByName("sid");
      this.sid = sid;
      if (!this.sid || this.sid.length < 7) {
        this.bridge.exec("invokeNativeLoginEvent", function(data) {});
      } else if (!this.actnone2 && this.sid) {
        if (!this.disabled) {
          if (this.price2 == 0 && !this.input2) {
            this.show("钻石数不能为空哦~");
          } else if (this.price2 == 0 && this.input2 > this.Maxdim) {
            this.show("钻石数不能超过" + this.Maxdim + "哦~");
          } else if (this.price2 == 0 && this.input2 < this.Mindim) {
            this.show("土豪，一次至少" + this.Mindim + "钻石哦~");
          } else {
            
            if (this.price2 == 0 &&this.input2 <= this.Maxdim &&this.input2 >= this.Mindim) {
              this.price2 = this.input2;
            }
            this.code2 = num;
            this.tipsboolQueren2 = true;
            this.stop();
          }
        } else {
          this.show("正在开奖，不能在此阶段购买哦~");
        }
      } else {
        this.show("活动未开始");
      }
    },
    getBuyAjax(count, sid,uid) {
        this.move()
        this.sid = sid;
        var _count = this.dimArr[count];
        if(count == 99){
            _count = this.price = this.input
        }
        this.tipsboolQueren = false;
        if (this.diamonds < _count) {
            this.tipsboolCoin = true;
        } else if (!this.notAllowBuy) {
            axios.post(
                `/x/activity/rabbit2`,
                qs.stringify({
                sid: this.sid,
                type: 1, //购买轮号
                bet: this.code, //购买洞号
                action: _count, //购买钻石数量
                owid: this.uid //房间信息
                })
            )
            .then(data => {
                this.show("购买成功~");
                this.getDiamonds(this.sid);
                this.getrabbit(1,1,this.sid);
                this.cur = count
                this.fetch(this.sid);
            })
            .catch(e => {
                this.show(e.message);
            });
        } else {
            this.show("开奖期间不能购买哦~");
        }
    },
    getBuyAjax2(count, sid,uid) {
      this.move()
      this.sid = sid;
      var _count2 = (this._count2 = this.dimArr2[count]);
      if(count == 99){
        _count2 = this.price2 = this.input2
      }
      this.tipsboolQueren2 = false;
      if (this.diamonds < _count2) {
        this.tipsboolCoin2 = true;
      } else {
          
        axios
          .post(
            `/x/activity/rabbit2`,
            qs.stringify({
              sid: this.sid,
              type: 2, //购买轮号
              bet: this.code2, //购买洞号
              action: _count2, //购买钻石数量
              owid: this.uid //房间信息ƒ
            })
          )
          .then(data => {
            this.show("购买成功~");
            this.getDiamonds(this.sid);
            this.getrabbit(1,2,this.sid);
            this.cur2 = count
            this.fetch(this.sid);
          })
          .catch(e => {
            this.show(e.message);
          });
      }
    },
    getonCallNativePay() {
      //充值
      var _url = window.location.origin + window.location.pathname;
      this.bridge.exec(
        "onCallNativePay",
        {
          money: "6",
          type: "1",
          return_url: _url
        },
        function(data) {}
      );
    },
    async getTipsboolMyRecord1(sid) {
      //我的记录

      //   let sid = this.getParameterByName("sid");
      this.sid = sid;
      if (!this.sid || this.sid.length < 7) {
        this.bridge.exec("invokeNativeLoginEvent", function(data) {});
      } else {
        this.tipsboolMyRecord1 = true;
        this.stop();
        let data = await this.$http(
          `/x/activity/rabbit2/history?sid=${this.sid}&type=1}}`
        )
          .then(data => {
            this.emptyrecord = data.list.length === 0;
            this.myRecordArr = data.list;
          })
          .catch(e => {
            this.emptyrecord = true;
          });
      }
    },
    async getTipsboolMyRecord2(sid) {
      //我的记录

      //   let sid = this.getParameterByName("sid");
      this.sid = sid;
      if (!this.sid || this.sid.length < 7) {
        this.bridge.exec("invokeNativeLoginEvent", function(data) {});
      } else {
        this.tipsboolMyRecord2 = true;
        this.stop();
        let data = await this.$http(
          `/x/activity/rabbit2/history?sid=${this.sid}&type=2}}`
        )
          .then(data => {
            this.emptyrecord = data.list.length === 0;
            this.myRecordArr = data.list;
          })
          .catch(e => {
            this.emptyrecord = true;
          });
      }

    },
    getzhuliShowBool() {
      this.zhuliShowBool = true;
    },
    async getMyRecord() {
        // 往期数据1
      this.tipsboolWangqi = true;
      this.stop();
    },
    async getMyRecord2() {
        // 往期数据2
      this.tipsboolWangqi2 = true;
      this.stop();
    },
    async getMyRecordInfo(sid){
      this.sid = sid
      let data = await this.$http(
        `/x/activity/rabbit2/board?debug=true&sid=${this.sid}&type=${this.type+1}`
      );
      this.WangqiArr = data.list;
      this.emptywangqi = data.list.length === 0;
    },
    stop() {
      var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
      document.body.style.width = '100%';
      document.body.style.cssText += 'position:fixed;top:-' + scrollTop + 'px;';
    },
    move() {
      var body = document.body;
      body.style.position = '';
      var top = body.style.top;
      
      document.body.scrollTop = document.documentElement.scrollTop = -parseInt(top);
    },
    close() {
      this.tipsboolQueren = false;
      this.tipsboolQueren2 = false;
      this.tipsboolCoin = false;
      this.tipsboolCoin2 = false;
      this.tipsboolFanbei = false;
      this.tipsboolFanbei2 = false;
      this.tipsboolMyRecord1 = false;
      this.tipsboolMyRecord2 = false;
      this.tipsboolHard1 = false;
      this.tipsboolHard2 = false;
      this.zhuliShowBool = false;
      this.tipsboolWangqi = false;
      this.tipsboolWangqi2 = false;
      this.move();
    }
  }
};
</script>
<style src="./index.less" lang="less" scoped></style>