<template>
  <div class="audio-view clearfix" ref="AudioView">
    <!-- 进度条 -->
    <div class="schedule" ref="schedule"></div>
    <!-- 图片 -->
    <div class="picture fl" @click="SkipPlayer">
      <img class="img-scale" :src="ViewPlayback.image+'?param=70y70'" alt />
    </div>
    <!-- 信息 -->
    <div class="message fl">
      <div class="song-name">
        <van-notice-bar
          :scrollable="ViewPlayback.isSwitchover"
          :text="ViewPlayback.name"
          background="transparent"
        ></van-notice-bar>
      </div>
      <div class="singer">{{ ViewPlayback.singer }}</div>
    </div>
    <!-- 播放组件 -->
    <div class="bnt fr clearfix">
      <!-- 上一首 -->
      <div class="fl" @click="UpOneHome">
        <i class="icon iconfont">&#xe62c;</i>
      </div>
      <!-- 播放与暂停 -->
      <div class="fl player" @click="PlaySuspend">
        <span class="play iconfont">{{ ViewPlayback.isSwitchover ? "&#xe6ad;": "&#xe667;" }}</span>
      </div>
      <!-- 下一首 -->
      <div class="fl" @click="NextOneHome">
        <i class="icon iconfont">&#xe62d;</i>
      </div>
    </div>
    <audio ref="audio" style="display: none;">您的浏览器不支持 audio 元素。</audio>
    <canvas id="canvas" ref="canvas"></canvas>
  </div>
</template>

<script>
// 引入vueX数据管理中心
import { createNamespacedHelpers } from "vuex";
const { mapMutations, mapState } = createNamespacedHelpers("menuModule");
export default {
  data() {
    return {
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
        schedule: null,
        // 最大长度
        minW: 0,
        musicMin: 0,
        musicMax: 0,
      },
      // 定时器
      timer: null,
      // audio标签
      audio: null,
      // 播放序号
      serialNumber: 0,
      voiceHeight: [],
      // 可视化数据
      canvas: null,
      // 画布上下文
      ctx: null,
      count: 300,
    };
  },
  computed: {
    //  解构vuex的state文件数据、
    ...mapState(["TheSongList", "ViewPlayback","MusicCurrentTim"]),
  },

  watch: {
    TheSongList: function (newQuestion, message) {
      if (newQuestion.length > 0) {
        this.AudioPath(this.ViewPlayback.id);
      }
    },
  },
  mounted() {
    this.AudioPlayer();
  },
  methods: {
    // 解构mapMutations文件
    ...mapMutations([
      "getTheSongList",
      "changeCurrentList",
      "Displayplayer",
      "getMusicCurrentTime",
      "playTheSong"
    ]),
    // 视图信息
    // 获取音频路径{}
    async AudioPath(id) {
      const { data: res } = await this.$http.get(`/song/url?id=${id}`);
      // console.log("音频路径", res);
      this.audio.src = res.data[0].url;
      this.audio.play();
    },
    // 查询音乐是否可用
    async QueryMusic(id) {
      const { data: res } = await this.$http.get(`/check/music?id=${id}`);
      if (!res.message == 200 || res.message == "") {
        return this.$toast.fail({
          message: "当前歌曲无法获取",
          forbidClick: true,
          //延迟自动关闭加载提示，如果该值为0，则不会自动关闭
          duration: 1000,
        });
      }
      this.AudioPath(this.ViewPlayback.id);
    },
    // 监听audio标签
    AudioPlayer() {
      // 获取标签audio/schedule
      this.audio = this.$refs.audio;
      this.audio.crossOrigin = "anonymous";
      // 1.0 创建音频上下文
      let audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      // 1.1 连接音源
      let audioSrc = audioCtx.createMediaElementSource(this.audio);
      //  进度条标签
      this.music.schedule = this.$refs.schedule;
      // 获取进度条总长度
      this.minW = this.$refs.AudioView.offsetWidth;
      let maxWA = this.minW;
      // 获取画布标签
      this.canvas = this.$refs.canvas;
      this.canvas.width = window.innerWidth;
      this.canvas.height = 60;
      this.ctx = this.canvas.getContext("2d");
      // 监听是否播放完毕歌曲
      this.audio.addEventListener("pause", () => {
        console.log("歌曲暂停了");
        if (this.audio.ended) {
          this.eliminate(this.timer);
          console.log("下一首");
          this.NextOneHome();
        }
      });

      // 监听audio标签音频是否缓存
      this.audio.addEventListener("loadeddata", () => {
        // 判断是否播放歌曲
        if (this.audio.play) {
          this.audio.currentTime = this.MusicCurrentTim.currentTime;
          //  获取歌曲长度
          this.music.currentTime = this.audio.duration;
          //  转换时间
          this.music.maxTime = this.RunningTime(this.music.currentTime);

          // 2.0 console.log("连接音源==>", audioSrc);
          let analyser = audioCtx.createAnalyser();
          // console.log("关联分析器==>", analyser);
          //  连接
          audioSrc.connect(analyser);
          // 输出的目标：将分析机分析出来的处理结果与目标点（耳机/扬声器）连接
          analyser.connect(audioCtx.destination);
          this.voiceHeight = new Uint8Array(analyser.frequencyBinCount * 2);

          // console.log(this.voiceHeight.length, "数值");
          // 定时器==========================================
          this.timer = setInterval(() => {
            analyser.getByteFrequencyData(this.voiceHeight);
            // 自定义获取数组里边数据的频步
            var step = Math.round(this.voiceHeight.length / this.count);
            // 清除画布
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.beginPath();
            // this.ctx.strokeStyle = "#fff";
            this.ctx.lineWidth = 1;
            var x = 0;
            var grd = this.ctx.createLinearGradient(0, 0, 170, 0);
            grd.addColorStop(0, "#FFCC00");
            grd.addColorStop(0.25, "#BA5656");
            grd.addColorStop(0.5, "#C46CB7");
            grd.addColorStop(0.75, "#41B883");
            grd.addColorStop(1, "#007ACC");
            for (let i = 0; i < this.count; i++) {
              var audioHeight = this.voiceHeight[step * i];
              this.ctx.fillStyle = grd;
              this.ctx.fillRect(
                i * 5,
                this.canvas.height,
                5,
                this.canvas.height - audioHeight
              );
            }
            // console.log(audioHeight);
            this.music.minTime = this.RunningTime(this.audio.currentTime);
            // console.log("当前时间==》", this.music.minTime);
            this.music.step = this.dragMoove(
              this.audio.currentTime,
              this.audio.duration
            );
            //  进度条
            this.music.schedule.style.width =
              this.minW * (this.music.step / 100) + "px";
          }, 25);
        }
      });

      // 监听歌曲有没有获取
      this.audio.addEventListener("onerror", () => {
        console.log("onerror出错了！！！！！");
      });
      // 监听歌曲有没有获取
      this.audio.addEventListener("error", () => {
        console.log("出错了切换下一首！！！！");
        this.$toast.fail({
          message: "当前歌曲没法获取",
          forbidClick: true,
          //延迟自动关闭加载提示，如果该值为0，则不会自动关闭
          duration: 1000,
        });
        this.NextOneHome();
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

    //  跳动转化
    bounce(value) {
      var system = 1024;
      value = value.toString(10);
      system = system.toString(10);
      var a = (value / system).toFixed(2);
      return a * this.canvas.height;
    },

    // 当前播放
    PlayMessage(index) {
      this.changeCurrentList({ valu: this.TheSongList[index] });
      this.AudioPath(this.ViewPlayback.id);
    },

    //  播放与暂停
    PlaySuspend() {
      if (this.ViewPlayback.isSwitchover == false) {
        this.ViewPlayback.isSwitchover = true;
        this.audio.play();
      } else {
        this.ViewPlayback.isSwitchover = false;
        this.audio.pause();
      }
      console.log(this.ViewPlayback.isSwitchover);
    },
    // 上一首
    UpOneHome() {
      if (this.serialNumber <= 1) {
        return (this.serialNumber = 1);
      }
      this.serialNumber--;
      this.PlayMessage(this.serialNumber);
      console.log("视图信息", this.serialNumber);
    },

    NextOneHome() {
      if (this.serialNumber >= this.TheSongList.length - 1) {
        return (this.serialNumber = this.TheSongList.length);
      }
      this.serialNumber++;
      this.PlayMessage(this.serialNumber);
      console.log("视图信息", this.TheSongList.length);
    },
    // 跳转页面
    SkipPlayer() {
      this.Displayplayer({ valu: false });
      this.$router.push({ name: "Player" });
      this.playTheSong({valu:this.ViewPlayback})
      // 传输当前时间
      this.getMusicCurrentTime({
        valu: {
          Time: this.audio.currentTime,
          url: this.audio.src,
          index: this.serialNumber,
        },
      });
      this.eliminate(this.timer);
       this.audio.pause();
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
  z-index: 3;
  .picture {
    width: 40px;
    height: 40px;
    margin-top: 10px;
    margin-left: 10px;
  }
  .message {
    width: 170px;
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
  #canvas {
    display: block;
    height: 60px;
    width: 100%;
    z-index: -1;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0.5;
  }
}
/deep/ .van-notice-bar {
  padding: 0;
  height: 20px;
}
</style>