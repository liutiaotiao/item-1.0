<template>
  <div id="app" class="lhao"  @click="hidePanel">
    <div class="lh_banner"></div>
    <div class="lh_book">
  		<p>靓号预约，火热开启！专属于你的独家靓号，更实惠，更个性~</p>
  		<p><span>立即预约 &gt;</span></p>
  	</div>
    <!-- 全部靓号 -->
  	<div class="all">
     <div class="all-title">全部靓号<span @click="showTip">靓号购买说明 &gt;</span></div>
     <!-- 筛选 -->
     <div class="all-checkbox">
        <div class="all-checkbox-item">靓号类型：</div>
        <div class="all-checkbox-select" id="handle" @click="getCouponSelected">
          <span 
          :class="{'up':Selectedtxt===1}"
          @click="getSelectedNone(selectValue)"
           ></span>{{selectValue}}
        </div>
        <div class="all-checkbox-option animated fadeIn"  v-show="Selected" >
            <div class="all-checkbox-option-itemall">全部</div>
            <div 
              class="all-checkbox-option-item"  
              v-for="(item,m) in couponList"
              @click="getSelectedNone(item.name)"
              >{{item.name}}
              <div class="item-icon"></div>
            </div>
        </div>

        <div class="all-checkbox-item">靓号类型：</div>
        <div class="all-checkbox-selectall" id="handleAll" @click="getCouponSelectedAll">
          <span 
          :class="{'up':SelectedtxtAll===1}"
          @click="getSelectedNoneAll(selectValueAll)"
           ></span>{{selectValueAll}}
        </div>
        <div class="all-checkbox-optionall animated fadeIn"  v-show="SelectedAll">
            <div class="all-checkbox-optionall-itemall">全部</div>
            <div 
              class="all-checkbox-optionall-item"  
              v-for="(item,m) in couponListAll"
              @click="getSelectedNoneAll(item.name)"
              >{{item.name}}
              <div class="item-icon"></div>
            </div>
        </div>
     </div>

     <!-- 列表 -->
     <div class="all-list">
       <div class="all-list-item">
         <div class="all-list-item-icon"></div>
         <div class="all-list-item-tel">199202</div>
         <div class="all-list-item-price">价值¥999元</div>
       </div>

       <div class="all-list-item">
         <div class="all-list-item-icon"></div>
         <div class="all-list-item-tel">199202</div>
         <div class="all-list-item-price">价值¥999元</div>
       </div>

       <div class="all-list-item">
         <div class="all-list-item-icon"></div>
         <div class="all-list-item-tel">199202</div>
         <div class="all-list-item-price">价值¥999元</div>
       </div>

       <div class="all-list-item">
         <div class="all-list-item-icon"></div>
         <div class="all-list-item-tel">199202</div>
         <div class="all-list-item-price">价值¥999元</div>
       </div>

       <div class="all-list-item">
         <div class="all-list-item-icon"></div>
         <div class="all-list-item-tel">199202</div>
         <div class="all-list-item-price">价值¥999元</div>
       </div>

     </div>


     <div class="all-list-empty">
        <div class="all-list-empty-title">暂无更多该规则靓号~</div>
        <div class="all-list-empty-title">可以联系客服预约心仪的独家靓号哦~</div>
        <div class="all-list-empty-line"><span></span>联系客服</div>
     </div>
    </div>    

    <!-- 购买说明 -->
    <div class="all_tipbg" v-show="isTipShow">
      <div class="all_close" @click="closeTip"></div>
      <div class="all_tip animated bounceInUp">
        <div class="all_tip-top"></div>
         <ul class="all_content">
          <li class="all_row">1、购买靓号的用户，所购买的靓号需手动绑定或者选择赠送给其他人，已绑定的靓号不可转移绑定到其它账号上；</li>
          <li class="all_row">2、成功购买或获赠兔几靓号后，请在30天内完成绑定，如逾期未完成绑定，兔几直播将有权回收该靓号且不退款；</li>
          <li class="all_row">3、每个靓号只能成功赠送给一个用户1次，被赠送用户拒绝后靓号将返回赠送用户账户，不计入赠送次数，靓号成功赠送后不能继续转赠，请赠送时注意；</li>
          <li class="all_row">4、普通用户和贵族都可以购买兔几靓号，但是只能使用普通钻石购买靓号；</li>
          <li class="all_row">5、靓号的绑定是唯一的，绑定新靓号后，所有特权将以新绑定的靓号为准；</li>
          <li class="all_row">6、购买靓号后，会附赠30天对应靓号类型的勋章，充值任意金额即可延长勋章有效期；例如：购买神级靓号，可获得「神」靓号勋章，若30天未充值，勋章会失效，但只要充值任意金额即可恢复勋章显示，每次充值有效期会重置30天。</li>
        </ul>
      </div>
    </div>



  </div>
</template>
        
<script>
import _ from 'underscore'
export default {
  name: "lianghao",
  props: {
    visible: Boolean,
    sid:String,
    data:Object,
    allShow: Boolean,
  },
  data: function() {
    return {
      bridgeosid:null,
      // 选择1
      Selected:false,
      selectValue:'全部',
      Selectedtxt:0,
      couponList:[
        {
          id: '1',
          name: '精品靓号'
        },
        {
          id: '2',
          name: '豪级靓号'
        },
        {
          id: '3',
          name: '尊级靓号'
        },
        {
          id: '4',
          name: '神级靓号'
        }
      ],
      // 选择2
      SelectedAll:false,
      selectValueAll:'全部',
      SelectedtxtAll:0,
      couponListAll:[
        {
          id: '1',
          name: '1-999'
        },
        {
          id: '2',
          name: '1000-4999'
        },
        {
          id: '3',
          name: '5000-9999'
        },
        {
          id: '4',
          name: '10000以上'
        }
      ],

      // 购买说明
      isTipShow: false,
    };
  },
  computed: {
    data() {
    }
  },
  created:function(){
  	this.fetch();
  },
  
  methods: {
    fetch() {
      console.log(this.data);
    },
    getCouponSelected(){
      this.Selected = true
      this.Selectedtxt  = 1
    },
    getSelectedNone(value,el){
      this.Selected = false
      this.selectValue = value
      this.Selectedtxt  = 0
    },
    // 选择2
    getCouponSelectedAll(){
      this.SelectedAll = true
      this.SelectedtxtAll  = 1
    },
    getSelectedNoneAll(value,el){
      this.SelectedAll = false
      this.selectValueAll = value
      this.SelectedtxtAll  = 0
    },
    hidePanel (event){
      let sp2 = document.getElementById("handle");
      let sp1 = document.getElementById("handleAll");
      if(sp2||sp1){
        if(!sp2.contains(event.target)){
        this.Selected= false;
        }
        if(!sp1.contains(event.target)){
        this.SelectedAll= false;
        }
      }
    },

    // 购买说明
    showTip: function() {
      this.isTipShow = true;
    },
    closeTip: function() {
      this.isTipShow = false;
    },
  },
  
};
</script>
<style src="./index.less" lang="less" scoped></style>
