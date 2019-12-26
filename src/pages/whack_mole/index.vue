<template>
  <div id="app" class="whackmole">
    <div class="whack_top"></div>

    <!-- 地鼠 -->
    <div class="whack_main">
		<div>
			<div class="whack_main-desc">赢节日勋章、座驾和海量钻石</div>
			<div class="whack_main-desc2" @click="getplayBool">游戏玩法</div>
			<div class="whack_main-luck" @click="getlucklistShow()"></div>
			<div class="whack_main-jiangli" @click="getjiangliBool()"></div>
		</div>

		<div class="main-bg-down"></div>
		<div class="whack_main-whack">
			<div class="whack-box">
				<div class="whack-list" v-for="(item,index) in list" :key="index">
					<div class="whack-list-icon"  v-show="item.shows==1&&boomAllow" @click="getKnock(index)" :class="[{clear:aClear==1},{act:aClear==0}]"></div>
					<div class="whack-list-boom" v-show="boom==index"></div>
					<div class="whack-list-dim" v-show="boom==index&&hammer.type==3">
						
						<div class="whack-list-dim-txt" v-show="hammer.diamond>0">+{{hammer.diamond}}</div>
						<div class="whack-list-dim-txt" v-show="hammer.diamond==0">没有奖励哦</div>
						<div class="whack-list-dim-icon"  v-show="hammer.diamond>0"></div>
					</div>
					<div class="whack-list-dong"></div>
				</div>
			</div>
			<div class="whack-dump dump1" v-show="dumpShowBool" :class="['dp'+boomActive,'choose'+dumpcur]"></div>
		</div>

		<ul class="whack_main-choose">
			<li  
			v-for="(t,index) in dump" 
			:key="index" 
			@click="getdump(index)"
			>
				<div class="choose-icon" :class="{act:dumpcur==index}">
					<div class="choose-icon-img" :class="'d'+index"></div>
				</div>
				<div class="choose-dim" :class="{act:dumpcur==index}">{{t}}钻</div>
			</li>
		</ul>
		<div class="whack_main-start" @click="getStartGame()" v-show="startBool"></div>
		<div class="whack_main-end"   @click="getEndGame()"   v-show="!startBool"></div>
		<div class="whack_main-auto">
			<div class="auto-checked" @click="getAutoGameTrue">
				<div class="auto-checked-icon" v-show="checkedbool"></div>
			</div>
			<div class="auto-txt">自动打</div>
		</div>

		<!-- 充值 -->
		<div class="whack_main-pay">
			<div class="pay">我的钻石：<span>{{diamonds}}</span></div>
			<div class="pay-btn" @click="getOnCallNativePay()"></div>
			<div class="pay2">已打(次)：<span>{{hit}}</span></div>
		</div>
		<div class="whack_main-zhongjiang" @click="getwinPrizeBool()"></div>
    </div>


	<!-- 倒计时 -->
	<div class="whack_time" v-show="countDownBool">
		<div class="whack_time-warp">
			<div class="whack_time-bg"></div>
			<div class="whack_time-time3s">{{count}}</div>
		</div>
		
	</div>

    <!-- 中奖公告 -->
    <div class="whack_notice">
      <div class="notice">
        <div class="notice-item" v-for="(t,$index) in AnchorRank" :key="$index">
		  {{t.ctime|dateTime}} &nbsp;&nbsp;{{t.nickname}}&nbsp;&nbsp;获得<span>&nbsp;&nbsp;&nbsp;{{t.prize}}</span>
        </div>
		<div class="empty" v-show="empty"></div>
      </div>
    </div>

    <!-- 好运加油站 -->
    <div class="whack_luck">
      <div class="luck_title">每天消耗一定的钻石数，系统自动发放奖励，每天最多发放1次</div>
      <div class="luck_progress">
        <div class="luck_progress-border"></div>
        <div class="luck_progress-content" :style="{width: pross}"></div>
		<div class="luck_progress-txt">{{consume}}</div>
      </div>
      <div class="luck_txt1">{{mind}}钻石</div>
      <div class="luck_txt2">{{middimd}}钻石</div>
      <div class="luck_icon">
        <div class="luck_icon-img"></div>
		<div class="luck_icon-ff" v-show="consume>=mind"></div>
        <div class="luck_icon-desc">勋章*1天</div>
      </div>
      <div class="luck_icon2">
        <div class="luck_icon2-img"></div>
		<div class="luck_icon-ff" v-show="consume>=maxd"></div>
        <div class="luck_icon2-desc">座驾*1天</div>
      </div>
    </div>

    <!--弹窗 好运榜-->
    <div class="animated fadeInDown whacktips" v-show="giftsBool">
      <div class="warp" :class="{warpdata:tabcur==1}" >
        <div class="close" @click="closetips(0)"></div>
        <div class="list" >
			<div class="list-tab">
				<div class="list-tab-item" @click="tabClick(0)"></div>
				<div class="list-tab-item tabdata" @click="tabClick(1)"></div>
			</div>
			

			<div v-show="tabcur==0">
				<div class="list-details">
					<div class="list-details-tab" :class="{act:dcur==0}" @click="getdaily(0)">日榜</div>
					<div class="list-details-tab" :class="{act:dcur==1}" @click="getdaily(1)">总榜</div>
				</div>
				<div class="daily-tab" v-show="dcur==0">
					<div 
					class="daily-tab-item" 
					v-for="(t,index) in day" 
					:key="index"
					@click="getDayTab(index)"
					:class="{act:daycur==index}"
					>
					{{t}}</div>
				</div>
				<div class="daily-desc" v-show="dcur==0">每天消耗的钻石数排名</div>
				<div class="daily-desc" v-show="dcur==1">消耗的总钻石数排名</div>
				<ul class="daily-head"><li v-for="(t,index) in head"  :key=index>{{t}}</li></ul>
				<ul class="daily-warp" :class="{heightnext:dcur==1}">
					<li class="daily-warp-item" 
						v-for="(t,index) in luckArr" 
						:key="index"
						>
						<div class="itembox">
							<div class="item-no" :class="'no'+index" v-show='index<3'></div>
							<div class="item-no" v-show='index>=3'>{{index+1}}</div>
							<div class="item-anchor" :style="{background: 'url('+ (t.portrait?t.portrait:defaultimg)+')','backgroundSize': 'contain'}"></div>
							<div class="item-name">{{t.nickname}}</div>
							<div class="item-level" :class="t.levelact+''"><div class="item-level-txt">{{t.level}}</div></div>
							<div class="item-dim">{{t.consume}}</div>
						</div>
						<div class="daily-warp-card" v-show="index==0&&dcur==0">截至当日23:59,日榜第一名获得座驾*1天</div>
					</li>
					<div class="emptyluck" v-show="emptyluck"></div>
				</ul>
			</div>
			<div v-show="tabcur==1">
				<div class="data">
					<div class="data-icon"></div>
					<div class="jiangli"><div class="jiangli-list" v-for="(t,index) in arr" :key="index">{{t}}</div></div>
					<div class="data-desc">*奖励在活动结束后3个工作日内发放</div>
				</div>
			</div>
		</div>
      </div>
    </div>
    <!--弹窗 -->

	<!-- 弹框 游戏玩法 -->
	<div class="animated fadeInDown whacktips" v-show="playBool">
      <div class="play" :class="{warpdata:tabcur==1}" >
        <div class="close" @click="close(0)"></div>
		<div class="playtitle"></div>
		<div class="playdesc" v-for="(t,index) in plays" :key="index">{{t}}</div>
      </div>
    </div>
	<!-- 弹框 游戏玩法 end-->

	<!-- 弹框 奖励列表 -->
	 <div class="animated fadeInDown whacktips"  v-show="jiangliBool">
      <div class="jianglitips">
        <div class="close" @click="close(0)"></div>
      </div>
    </div>
	<!-- 弹框 游戏玩法 end-->


	<!-- 弹框 中奖记录 -->
	<div class="animated fadeInDown whacktips" v-show="winPrizeBool">
      <div class="play" >
        <div class="close" @click="closetips(0)"></div>
		<div class="wintitle"></div>
		<div class="win-warp">
			<div class="win-warp-tiem"  v-for="(t,index) in winRecord" :key="index">
				{{t.ctime|dateTime}} &nbsp;&nbsp;&nbsp;&nbsp;获得&nbsp;&nbsp;<span>{{t.prize}}</span>
			</div>
		</div>
		<div class="win-desc">*仅展示最近100条记录</div>
		<div class="empty" v-show="emptyRecord"></div>
      </div>
    </div>
	<!-- 弹框 中奖记录 end-->

	<!-- 弹框 中奖啦 -->
	<div class="animated fadeInDown whacktips" v-show="winBool">
      <div class="play zj" >
        <div class="close" @click="close(0)"></div>
		<div class="zjtitle"></div>
		<!-- 勋章:1，坐骑:2 -->
		<div class="zj-warp" v-show="hammer.type==1">
			<div class="zj-warp-icon" :style="{'background-image': 'url('+ (hammer.image)+')','background-size': 'contain'}"></div>
			<div class="zj-warp-title">{{hammer.name}}×{{hammer.number}}{{hammer.unit}}</div>
			<div class="zj-warp-desc">*奖励直接发放到账户中</div>
		</div>
		<div class="zj-warp" v-show="hammer.type==2">
			<div class="zj-warp-icon" :style="{'background-image': 'url('+ (hammer.image)+')'}"></div>
			<div class="zj-warp-title">{{hammer.name}}{{hammer.number}}{{hammer.unit}}</div>
			<div class="zj-warp-desc">*奖励直接发放到账户中</div>
		</div>
      </div>
    </div>
	<!-- 弹框 中奖啦 end-->

	<!-- 弹框 余额不足-->
	<div class="animated fadeInDown whacktips" v-show="OnCallNativePayBool">
      <div class="play turnon" >
		<div class="paytitle">钻石不足，请先充值</div>
		<div class="auto-warp">
			<div class="auto-btn1" @click="close(0)">取消</div>
			<div class="pay-btn2" @click="getOnCallNativePay()"></div>
		</div>
      </div>
    </div>
	<!-- 弹框 余额不足 -->


	<!-- 弹框 确认  开启-->
	<div class="animated fadeInDown whacktips" v-show="AlerTrueBool">
      <div class="play turnon" >
		<div class="autotitle">确认开始</div>
		<div class="auto-warp">
			<div class="auto-warp-desc">每次打地鼠将按照锤子种类消耗钻石</div>
			<div class="auto-btn1" @click="close(0)">取消</div>
			<div class="auto-btn2" @click="getStartGameTrue()">确定</div>
		</div>
      </div>
    </div>
	<!-- 弹框 确认 -->

	<!-- 弹框 确认  自动打-->
	<div class="animated fadeInDown whacktips" v-show="AlertautoBool">
      <div class="play auto" >
		<div class="autotitle">开启自动打地鼠</div>
		<div class="auto-warp">
			<div class="auto-warp-desc1"> 勾选自动打地鼠后，系统自动一秒打一次地鼠，奖励请在中奖记录中查看。</div>
			<div class="auto-warp-desc2">  (开启后，点击结束游戏可以取消，若不取消，将会一直消耗到钻石数不足为止！)</div>
			<div class="auto-btn1" @click="close(0)">我再想想</div>
			<div class="auto-btn2" @click="getCheckedbool()">确定开启</div>
		</div>
      </div>
    </div>
	<!-- 弹框 确认 -->
  </div>
</template>

<script>
import Toast from "@/plugin/toast/index.js";
import _ from "underscore";
import qs from "qs";
import axios from "axios";
export default {
  name: "whackmole",
  data: function() {
    return {
		list: [
			{
			shows: 0
			},
			{
			shows: 0
			},
			{
			shows: 0
			},
			{
			shows: 0
			},
			{
			shows: 0
			},
			{
			shows: 0
			},
			{
			shows: 0
			},
			{
			shows: 0
			},
			{
			shows: 0
			}
		],
		cur: 0,
		free: [],
		daycur:0,
		day: ['12.31','1.1','1.2','1.3','1.4','1.5','1.6'],
		luckday: ['20191231','20200101','20200102','20200103','20200104','20200105','20200106'],
		head: ["排名",'昵称','钻石数'],
		boom: 10, //砸]
		boomAllow:true,
		boomActive: 10,
		boomActive2:0,
		dumpShowBool: false,

		giftsBool: false, //奖励列表
		winPrizeBool:false,//中奖记录
		winBool:false,
		empty:false,
		emptyRecord:false,
		winRecord:[],
		//中奖end

		tabcur:0,
		dcur:0,
		arr:['1、第一名获得勋章“好运年年”*30天','2、第二名获得勋章“好运年年”*20天','3、第三名获得勋章“好运年年”*10天'],
		dumpcur:2, 
		dump:['100','50','10','6'],
		//   游戏玩法
		playBool:false,
		plays:[
			'1、点击开始游戏，使用鼠标或手指点击（即锤子敲击）冒出的地鼠有几率获得翻倍钻石，勋章和座驾奖励，钻石翻倍以消耗钻石为基数进行翻倍，但也可能没有奖励哦；',
			'2、每次打地鼠需消耗钻石，最低6钻石，最高100钻石，没有打到地鼠不消耗钻石；',
			'3、自动打默认每秒打一次；注意开启自动打，若不取消将会一直游戏，持续到钻石数不足；',
			'4、重复获得勋章和座驾会累计天数，最多累计30天，勋章累计一定的天数会自动升级，累计30天升级到2阶段，升级后原有的勋章被顶替。',
			'5、钻石，勋章，座驾奖励直接分发到帐户中，如遇网络延迟将在24小时内发放。'
		],
		// 奖励列表
		jiangliBool:false,
		checkedbool:false,
		// 余额不足
		OnCallNativePayBool:false,

		// 公告
		AnchorRank:[],
		// 倒计时
		count: 3,
		timer: null,
		countDownBool:false,  
		startBool:true,
		// 好运榜
		luckArr:[],
		emptyluck:false,
		defaultimg: require("./images/anchor.png"),
		// 动画清理
		aClear:0,
		// 确认弹框
		AlertautoBool:false,
		AlerTrueBool:false,
		// 基本信息
		me:[],
		hit:null,
		diamonds:0,
		consume:0,
		pross:null,
		mind:2020,
		middimd:88888,
		maxd:100000,
		// 砸地鼠结果
		hammer:[],

		// 起始时间
		start:1577116799,//1577807999  12.31
		end:1578326399,
		now:Math.round(new Date() / 1000),
    };
  },
  created: function() {
	setInterval(this.showMarquee, 2000);
	// 地址栏
	this.sid = this.getParameterByName("sid");
	this.fetch();
	this.getDiamonds();

	// 客户端
	this.dumpRandom = this.getRandomNumberByRange(0, 8);
	this.bridge.exec("getUserInfo", data => {
        if(data.sid){
			this.getBridge(data.sid);
        } 
	});
	window.webviewWakeUp = data => {
        let userData;
        if (data) {
            try {
            userData = JSON.parse(data);
            this.getBridge(userData.sid);
            } catch (e) {}
        }
	}

	this.bridge.exec('appShareShow', { message: '0' }, function(data) {})
  },
  filters: {
    dateTime: function time(value) {
      var now = new Date(value * 1000);
      var y = now.getFullYear()
      var m = now.getMonth() + 1;
      var d = now.getDate();
      return (m < 10 ? "0" + m : m) + "." + (d < 10 ? "0" + d : d) + " " + now.toTimeString().substr(0, 5);
    }
  },
  methods: {
	getBridge(sid){//客户端
		this.sid = sid
		this.fetch();
		this.getDiamonds();
	},
	// 地鼠动画
	showMarquee: function() {
      setTimeout(() => {
        this.AnchorRank.push(this.AnchorRank[0]);
        this.AnchorRank.shift();
      }, 500)
    },
    getRandomNumberByRange(start, end) {
      return Math.floor(Math.random() * (end - start) + start);
    },
    getAnimated(choose) {
	  if(choose==0){
		  this.startBool = false
			if(this.checkedbool){
				if(this.diamonds<this.dump[this.dumpcur]){
					this.OnCallNativePayBool = true
				}else{
					this.getAutoAnimated()//自动打
				}
			}
			let num;
			this.timerstart = setInterval(() => {
				_.each(this.list, (item, index) => {
				item["shows"] = 0;
				});
				num = this.getRandomNumberByRange(2, 5);
				this.free = this.whackRandom(num, 0, 8);
				_.each(this.free, (item, index) => {
				this.list[item]["shows"] = 1;
				});
			}, 2000);
	  }
		
	  
    },
    whackRandom(num, from, to) {
      let arr = [];
      let json = {};
      let needNum;
      if (from - to >= 0) {
        return "起始值要小于末尾值";
      }
      if (to - from == to) {
        needNum = parseInt(to) + 1;
      } else {
        needNum = to - from;
      }
      if (num > needNum) {
        return;
      } else {
        while (arr.length < num) {
          let ranNum = Math.ceil(Math.random() * needNum) - 1;
          if (!json[ranNum]) {
            json[ranNum] = 1;
            arr.push(ranNum);
          }
        }
        return arr;
      }
    },
    // 地鼠动画 end
    getKnock(index) {
		this.boom = index;
		this.boomActive = index;
		this.boomActive2 = index
		this.dumpShowBool = true;
		this.boomAllow = false
		setTimeout(() => {
			this.boom = 10;
			this.dumpShowBool = false;
			this.boomAllow = true
		}, 1000);
		if(this.diamonds<this.dump[this.dumpcur]){
			this.OnCallNativePayBool = true
		}else{
			this.getKnockAjax()
		}
	},
	getKnockAjax(){
		axios.post(
			`/g/activity/2020-yuandan/`,
			qs.stringify({
			sid: this.sid,
			hammer: this.dumpcur+1, //锤子类型
			count: 1, //打次数
			})
		)
		.then(data => {
			this.hammer = data.prize[0]
			this.diamonds = data.me.balance
			this.hit = data.me.hit
			this.consume = data.me.consume
			if(this.hammer.type<3&&!this.checkedbool){
				this.winBool = true
			}
		})
		.catch(e => {
			console.log('e',e);
		});
		// this.getDiamonds();
		this.pross = this.GetPercent(this.consume,this.maxd)
	},
	getaClear(){
		this.aClear = 1
		setTimeout(() => {
			this.aClear = 0
		}, 500);
	},
    getAutoAnimated() {
	  //自动打
	  this.getaClear();//清理动画
	  if (!this.timer2) {
			let auto;
			this.timer2 = setInterval(() => {
				if (this.checkedbool) {
					auto = this.getRandomNumberByRange(0, 8);
					this.getKnock(auto);
				} else {
				clearInterval(this.timer2);
					this.timer2 = null;
				}
			}, 2000)
		}
		
	},
	getAutoGameTrue(){
		if(!this.checkedbool){
			this.AlertautoBool = true
		}else{
			this.getCheckedboolFalse()
		}
	},
	getParameterByName(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]);
      return null;
	},
	GetPercent(num, total) {
		num = parseFloat(num);
		total = parseFloat(total);
		if (isNaN(num) || isNaN(total)) {
			return "-";
		}
		return total <= 0 ? "0%" : (Math.round(num / total * 10000) / 100.00)+"%";
	},
	async fetch() {
	  //排行榜
      await this.$http(
        `/g/activity/2020-yuandan?sid=${this.sid}`
      )
        .then(data => {
			this.me = data.me
			this.consume = data.me.consume
			this.hit = data.me.hit
			this.AnchorRank = data.record;
			this.empty = data.record.length === 0;
			this.start = data.event.begin
			this.end = data.event.end
			this.now = data.event.now
        })
        .catch(e => {
          this.empty = true;
		});
	   this.pross = this.GetPercent(this.consume,this.maxd)
	},
	async getDiamonds(){
		let data = await this.$http(`/user/info?debug=true&sid=${this.sid}`);
        this.diamonds = data.rich.diamond;
	},
	tabClick(curs) {
      this.tabcur = curs;
	},
	getdaily(curs){
		this.dcur = curs;
		if(this.dcur == 0){
			this.getgiftsBool(0);
		}else{
			this.getgiftsBool(1);
		}
	},
	getDayTab(curs){
		this.daycur = curs;
		this.getgiftsBool(0);
	},
	getdump(curs){
		this.dumpcur = curs;
	},
	getlucklistShow(){
		if(this.sid=='(null)'||!this.sid){
			this.bridge.exec("invokeNativeLoginEvent", function(data) {});
		}else{
			this.giftsBool = true
			this.getgiftsBool(0);
		}
	},
	async getgiftsBool(all){//好运榜
		var datas,days
		if(all==0){//日榜
			days = this.luckday[this.daycur]
		}else{
			days = '00000000'
		}
		await this.$http(
		`/g/activity/2020-yuandan/luckylist?sid=${this.sid}&day=${days}`
		)
		.then(data => {
			var datas = data.list
			this.emptyluck = data.list.length === 0;
			_.each(datas, (item, index) => {
				var f = item.level / 16;
				if((item.level % 16) > 0) {
					var name = Math.ceil(f);
				} else {
					var name = Math.floor(f);
				};
				item["levelact"] = '_act'+name;
			});
			this.luckArr = datas;
		})
		.catch(e => {
			this.empty = true;
		});
		this.stop();
	},
	getplayBool(){
		this.playBool = true;
	},
	getjiangliBool(){
		if(this.sid=='(null)'||!this.sid){
			this.bridge.exec("invokeNativeLoginEvent", function(data) {});
		}else{
			this.jiangliBool = true;
		}
	},
	async getwinPrizeBool(){//中奖记录
		//排行榜
		if(this.sid=='(null)'||!this.sid){
			this.bridge.exec("invokeNativeLoginEvent", function(data) {});
		}else{
			this.winPrizeBool = true;
			this.stop();
			await this.$http(
				`/g/activity/2020-yuandan/record?sid=${this.sid}`
			)
			.then(data => {
				this.winRecord = data.list;
				this.emptyRecord = data.list.length === 0;
			})
			.catch(e => {
				this.emptyRecord = true;
			});
		}
		
	},
	getOnCallNativePay(){
      var _url = window.location.origin + window.location.pathname
      this.bridge.exec('onCallNativePay', {
        money: '6',
        type: '1',
        return_url: _url,
      }, function(data) {})
	},
	getCheckedboolFalse(){
		this.checkedbool = !this.checkedbool
	},
	getCheckedbool(){
		this.AlertautoBool = false
		this.checkedbool = !this.checkedbool
		if(this.startBool==false&&this.checkedbool){
			this.getAnimated(0);
			this.getaClear();//清理动画
		}else{
			this.boom = 10;
			this.dumpShowBool = false;
			this.boomAllow = true
			this.getAnimated(1);
		}
	},
	getStartGame(){//开始游戏
		if(this.now>=this.start&&this.now<this.end){
			if(this.sid=='(null)'||!this.sid){
				this.bridge.exec("invokeNativeLoginEvent", function(data) {});
			}else{
				this.AlerTrueBool = true;
				this.boomAllow = true	
			}
		}else{
			new Toast({ message: "不在活动时间内哦~" });
		}
	},
	getStartGameTrue(){
		this.AlerTrueBool = false;
		this.countdown()//倒计时
		setTimeout(() => {
			this.getAnimated(0);		
		}, 2000);
		this.getaClear();//清理动画	
	},
	getEndGame(){//结束游戏
		// this.getaClear();//清理动画
		this.getAnimated(1);
		this.startBool = true
		clearInterval(this.timer2)
		clearInterval(this.timerstart)
		this.timer2 = null
		this.timerstart =null
		_.each(this.list, (item, index) => {item["shows"] = 0});
		this.boomAllow = false
		// this.checkedbool = false
	},
	countdown() {
		this.countDownBool = true
        let code = 3;
		if (!this.timer) {
			this.count = code;
			this.timer = setInterval(() => {
				if (this.count > 1 && this.count <= code) {
					this.count--;
				} else {
					clearInterval(this.timer);
						this.timer = null;
						this.countDownBool = false
					}
			}, 1000)
		}
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
    closetips() {
	  this.giftsBool    = false;
	  this.winPrizeBool = false;
	  this.move();
	},
	close() {
	  this.playBool     = false;
	  this.jiangliBool  = false;
	  this.winBool      = false;
	  this.AlerTrueBool = false;
	  this.AlertautoBool = false;
	  this.OnCallNativePayBool =false;
    }
  }
};
</script>
<style src="./index.less" lang="less" scoped></style>
