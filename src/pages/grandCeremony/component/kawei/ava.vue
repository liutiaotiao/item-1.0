<style lang="less" scoped>
.polygon-ava-boxF,.polygon-ava-boxF1{
  position: absolute;
  left: 4px;
  top: 4px;
}
.polygon-ava-boxF1, .polygon-ava-boxS1, .polygon-ava-boxT1{
  width: 87px;
  height: 102px;
  overflow: hidden;
  -webkit-mask-image: -webkit-radial-gradient(white, black);
  -webkit-backface-visibility: hidden;
  -moz-backface-visibility: hidden;
}
.polygon-ava-boxF1{
  transform: rotate(120deg);
  -ms-transform: rotate(120deg);
  -moz-transform: rotate(120deg);
  -webkit-transform: rotate(120deg);
}
.polygon-ava-boxS1{
  transform: rotate(-60deg);
  -ms-transform: rotate(-60deg);
  -moz-transform: rotate(-60deg);
  -webkit-transform: rotate(-60deg);
}
.polygon-ava-boxT1{
  transform: rotate(-60deg);
  background: no-repeat 50% center;
  background-size: 125% auto;
  -ms-transform: rotate(-60deg);
  -moz-transform: rotate(-60deg);
  -webkit-transform: rotate(-60deg);
  visibility: visible;
  background-image: url('../../images/tujimoren.png');
}
</style>
<template>
  <div class="polygon-ava-boxF1">
    <div class="polygon-ava-boxS1">
      <div class="polygon-ava-boxT1" v-if='srcUrl' :style='{"background-image":"url("+srcUrl+")"}'>
      </div>
      <div class="polygon-ava-boxT1" v-else>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ava',
  props:{
    srcUrl:{
      type:String,
      default: require('../../images/tujimoren.png')
    }
  },
  data() {
    return {

    }
  }
}
</script>