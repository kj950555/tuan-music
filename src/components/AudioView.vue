<template>
  <div class="audio-view clearfix" ref="AudioView">
    <audio ref="audio">您的浏览器不支持 audio 元素。</audio>
    <!-- 进度条 -->
    <div class="schedule" ref="schedule"></div>
    <!-- 图片 -->
    <div class="picture fl">
      <img class="img-scale" :src="image" alt />
    </div>
    <!-- 信息 -->
    <div class="message fl clearfix">
      <div class="song-name">
        <span>{{name}}</span>
      </div>
      <div class="singer">
        <span>{{singer}}</span>
      </div>

    </div>
    <!-- 播放组件 -->
    <div class="bnt fr clearfix">
      <div class="fl">
        <i class="icon iconfont">&#xe62c;</i>
      </div>
      <div class="fl player">
        <i class="play iconfont" @click="PlaySuspend">{{isSwitchover? '&#xe6ad;': '&#xe667' }}</i>
      </div>
      <div class="fl">
        <i class="icon iconfont">&#xe62d;</i>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    name: [String],
    singer: [String],
    image: [String],
    AudioPath: [String],
  },

  data() {
    return {
      isSwitchover: false,
      audio: null,
      music: {
        // 音乐播放情况
        playing: true,
        // 播放时长
        currentTime: 0,
        // 最大最小
        maxTime: "00:00",
        minTime: "00:00",
        // 进度条
        step: 0,
        // 进度条标签
        schedule:null,
        // 最大长度
        minW :0
      },

      // 定时器
      timer: null,
    };
  },
  mounted() {
    this.AudioPlayer();
  },
  methods: {
    // 监听audio标签
    async AudioPlayer() {
      this.audio = this.$refs.audio;
      this.music.schedule = this.$refs.schedule
      this.minW =this.$refs.AudioView.offsetWidth
      console.log(this.minW);
      // console.log('标签==>', this.audio);
      this.audio.src = this.AudioPath;
    
      // 监听audio标签音频是否缓存
      this.audio.addEventListener("loadeddata", () => {
        // 判断是否播放歌曲
        if (this.audio.play) {
          //  获取歌曲长度
          this.music.currentTime = this.audio.duration;
          //  转换时间
          this.music.maxTime = this.RunningTime(this.music.currentTime);
          // console.log("时间==》", this.music.maxTime);

          console.log(this.isSwitchover);
          this.timer = setInterval(() => {
            // 当前时间
            this.music.minTime = this.RunningTime(this.audio.currentTime);
            // console.log("当前时间==》", this.music.minTime);
            this.music.step = this.dragMoove(this.audio.currentTime , this.audio.duration)
            // console.log('进度条==>', this.music.step);
              
              // console.log('W===>', this.minW*(this.music.step/100));
              this.music.schedule.style.width = this.minW*(this.music.step/100)+'px'
          }, 1000);
        }
      });
    },
    // 时间转换
    RunningTime(time) {
      // 获取多少分钟
      let minute = time / 60;
      let minutese = parseInt(minute);
      // 加0
      if (minutese < 10) {
        minutese = "0" + minutese;
      }
      // 获取秒
      let second = time % 60;
      second = parseInt(second);
      // 加0
      if (second < 10) {
        second = "0" + second;
      }
      return minutese + ":" + second;
    },
    // 清除定时器
    eliminate(stest) {
      clearTimeout(stest);
    },

    // 进度条
    dragMoove(MinTime, MaxTime) {
      return (MinTime / MaxTime).toFixed(2) * 100;
    },

    //  播放与暂停
    PlaySuspend() {
      if (this.isSwitchover == false) {
        this.isSwitchover = true;
        this.audio.play();
      } else {
        this.isSwitchover = false;
        this.audio.pause();
      }
    },
  },
};
</script>

<style lang="less" scoped>
.audio-view {
  width: 100%;
  background: #7c2997;
  overflow: hidden;
  position: relative;
  z-index: 0;
  .picture {
    width: 40px;
    height: 40px;
    margin-top: 10px;
    margin-left: 10px;
  }
  .message {
    text-align: left;
    margin-left: 10px;
    color: #fff;
    .song-name {
      font-size: 14px;
      font-weight: 600;
      margin-top: 8px;
    }
    .singer {
      font-size: 12px;
      margin-top: 5px;
    }
  }
  .bnt {
    line-height: 40px;
    margin-top: 10px;
    .icon {
      font-size: 30px;
      margin: 15px 10px;
      color: #fff;
    }
    .play {
      font-size: 40px;
      color: #ffffff;
    }
    .player {
      border-radius: 50%;
      color: #fff;
    }
  }
  .schedule {
    width: 0;
    height: 60px;
    background: #853a9d;
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
    border-bottom: 1px solid #e945af;
     transition: width 1s linear;
  }
}
</style>