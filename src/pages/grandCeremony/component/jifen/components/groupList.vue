<style lang="less" scoped>
  .user-list-warp{
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100%;
    background-color: rgba(0, 0, 0, .6);
    z-index:6;
    .user-list-pop{
      width: 687px;
      height: 710px;
      background: url('../../../images/aaaimg-jiifen/groupList.png') no-repeat 0 0;
      background-size: cover;
      margin: 0px auto;
      position: relative;
      left:2px;
      top: 50%;
      margin: -450px auto 0 auto;
    }
    .user-list-contain{
      position: absolute;
      top: 190px;
      width: 670px;
      height: 500px;
      overflow-y: auto;
      &::-webkit-scrollbar-track { background: #28221a; }  // 滚动槽
      &::-webkit-scrollbar-thumb {background: linear-gradient(#b59860, #c6ac70ed); border-radius: 10px; }  //滚动条样式
      &::-webkit-scrollbar{ width: 10px }  // 宽度
    }
    .user_item{
      height: 120px;
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      border-bottom: 1px solid #222222;
    }
    .user_item-num{
      width: 120px;
      text-align: center;
      font-size:30px;
      font-weight:bold;
      color:rgba(255,205,129,1);
    }
    .user_item-numPic{
      width: 61px;
      height: 50px;
      background: no-repeat 0 0;
      background-size: cover;
      margin:0 auto;
    }
    .user_item-numPic0{
      background-image: url('../../../images/aaimg-pop/user_0.png');
    }
    .user_item-numPic1{
      background-image: url('../../../images/aaimg-pop/user_1.png');
    }
    .user_item-numPic2{
      background-image: url('../../../images/aaimg-pop/user_2.png');
    }
  }
  .user_item_ava{
    flex: 1;
    margin-left: 26px;
    width: 354px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .user_item_ava-tu{
    width: 70px;
    height: 85px;
    background: no-repeat 0 0;
    background-size: cover;
    position: relative;
  }
  .user_item_ava-tu0{
    background-image: url('../../../images/aaimg-pop/user_tu0.png');
  }
  .user_item_ava-tu1{
    background-image: url('../../../images/aaimg-pop/user_tu1.png');
  }
  .user_item_ava-tu2{
    background-image: url('../../../images/aaimg-pop/user_tu2.png');
  }
  .user-item-radius{
    width: 70px;
    height: 70px;
    border:2px solid #BC965B;
    border-radius: 50%;
    position: relative;
  }
  .user-item-default-ava{
    width: 66px;
    height: 66px;
    background: url('../../../images/tujimoren.png') no-repeat 0 0;
    background-size: cover;
    border-radius: 50%;
    position: absolute;
    top: 17px;
    left: 2px;
  }
  .user-item-default-mg{
    top: 0px;
    left: 0px;
  }
  .user_item_ava_p{
    padding-left: 13px;
    font-size:26px;
    font-weight:500;
    color:rgba(255,205,129,1);
  }
  .user-score{
    width: 170px;
    font-size:24px;
    font-weight:500;
    color:rgba(176,144,95,1);
  }
  .user-list-pop_close{
    position: absolute;
    width: 50px;
    height: 50px;
    right: 0;
    top: 0;
    touch-action: none
  }
  .user_item-nodata{
    height: 120px;
    width: 100%;
    line-height: 120px;
    border-bottom: 1px solid #222222;
    color: #b0925b;
    font-size: 32px;
    font-weight: 600;
    text-align: center;
  }
  .group-title{
    position: absolute;
    left: 50%;
    top: 40px;
    transform: translateX(-50%);
    width: 481px;
    height: 45px;
    line-height: 49px;
    font-size: 38px;
    background: url('../../../images/aaaimg-jiifen/group_title.png') no-repeat 25px 0;
    background-size: 451px 45px;
    color: #9b7d4c;
  }
</style>
<template>
  <div class='user-list-warp' v-show='groupListStatus'>
    <div class='user-list-pop'>
      <div class='user-list-pop_close' @click='onGroupCose("groupListStatus")'></div>
      <p class='group-title'>{{groupTitle}}</p>
      <div class='user-list-contain'>
        <div class="user_item"  v-for='(item,index) in groupListArr' :key='index'>
          <div class="user_item-num">
            <div v-if='index <= 2' :class='["user_item-numPic user_item-numPic"+index]'></div>
            {{index <= 2 ? '' : index+1}}
          </div>
          <div class='user_item_ava'>
            <div :class="[index <= 2 ? 'user_item_ava-tu user_item_ava-tu' + index : 'user-item-radius']">
              <div class='user-item-default-ava' :class="[index <= 2 ? '' : 'user-item-default-mg']" v-if='item.portrait' :style='{"background-image":`url(${item.portrait})`}'></div>
              <div class='user-item-default-ava' :class="[index <= 2 ? '' : 'user-item-default-mg']" v-else></div>
            </div>
            <p class='user_item_ava_p'>{{item.nickname}}</p>
          </div>
          <p class='user-score'>{{item.score}}</p>
        </div>
        <div class="user_item-nodata" v-if='groupListArr.length === 0'>
          暂无数据
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'userList',
  props:{
    value:{
      type:Boolean,
      default: false
    },
    groupListArr:{
      type:Array,
      default(){return []}
    },
    groupTitle:{
      type: String,
      default: ''
    }
  },
  data() {
    return {
      groupListStatus: this.value
    }
  },
  methods:{
    onGroupCose() {
      this.groupListStatus = false
    }
  },
  watch: {
    value(val) {
      this.groupListStatus = val;
    },
    groupListStatus(val) {
      this.$emit('input', val)
    }

  }
}
</script>