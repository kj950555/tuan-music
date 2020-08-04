<template>
  <div class="audio clearfix">
    <audio ref="audio">您的浏览器不支持 audio 元素。</audio>
    <div class="fl">
      <i class="icon iconfont">&#xe77d;</i>
    </div>
    <div class="fl">
      <i class="icon iconfont">&#xe62c;</i>
    </div>
    <div class="fl player">
      <i class="play iconfont" @click="PlaySuspend">{{isSwitchover? '&#xe6ad;': '&#xe667' }}</i>
    </div>
    <div class="fl">
      <i class="icon iconfont">&#xe62d;</i>
    </div>
    <div class="fl">
      <i class="icon iconfont">&#xe66c;</i>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isSwitchover: false,
    };
  },

  methods:{
    async AudioPlayer(){
      let audio= this.$refs.audio
      console.log(audio);
    },


    PlaySuspend(){
      if(this.isSwitchover == false){
        this.isSwitchover=true
      }else{
        this.isSwitchover=false
      }
    }
  }
};
</script>

<style lang="less" scoped>
.audio {
  width: 90%;
  height: 80px;
  line-height: 80px;
  .icon {
    font-size: 35px;
    margin: 0 10px;
  }
  .play {
    font-size: 35px;
    color: #ffffff;
  }
  .player {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background-image: linear-gradient(to top, #801e88, #f5466c);
    color: #fff;
  }
}
</style>