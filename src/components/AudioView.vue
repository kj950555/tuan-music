<template>
  <div class="audio-view clearfix" ref="AudioView">
    <!-- 进度条 -->
    <div class="schedule" ref="schedule"></div>
    <!-- 图片 -->
    <div class="picture fl">
      <img class="img-scale" :src="ViewPlayback.image" alt />
    </div>
    <!-- 信息 -->
    <div class="message fl">
      <div class="song-name">
        <van-notice-bar scrollable :text="ViewPlayback.name" background="#7C2997"></van-notice-bar>
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
    };
  },
  computed: {
    //  解构vuex的state文件数据、
    ...mapState(["TheSongList", "ViewPlayback"]),
  },

  watch: {
    TheSongList: function (newQuestion, message) {
      if (newQuestion.length > 0) {
        this.QueryMusic(this.ViewPlayback.id);
      }
    },
  },
  mounted() {
    this.AudioPlayer();
  },
  methods: {
    // 解构mapMutations文件
    ...mapMutations(["getTheSongList", "changeCurrentList"]),
    // 视图信息
    // 获取音频路径{}
    async AudioPath(id) {
      const { data: res } = await this.$http.get(`/song/url?id=${id}`);
      console.log("音频路径", res);
      this.audio.src = res.data[0].url;
      this.audio.play();
    },
    // 查询音乐是否可用
    async QueryMusic(id) {
      const { data: res } = await this.$http.get(`/check/music?id=${id}`);
      if (!res.message) {
        return this.$toast.loading({
          message: "当前歌曲无法获取",
          forbidClick: true,
          //延迟自动关闭加载提示，如果该值为0，则不会自动关闭
          duration: 1000,
        });
      }
      console.log("是否可以使用", res);
      this.AudioPath(this.ViewPlayback.id);
    },
    // 监听audio标签
    AudioPlayer() {
      this.audio = this.$refs.audio;
      this.music.schedule = this.$refs.schedule;
      this.minW = this.$refs.AudioView.offsetWidth;
      // console.log(this.minW);

      // console.log('标签==>', this.audio);
      this.audio.addEventListener("emptied", () => {
        if (this.audio.src == "") {
          // console.log("111");
          return this.$toast.loading({
            message: "当前播放器没有歌曲",
            forbidClick: true,
            //延迟自动关闭加载提示，如果该值为0，则不会自动关闭
            duration: 1000,
          });
        }
      });
      // 监听audio标签音频是否缓存
      this.audio.addEventListener("loadeddata", () => {
        // 判断是否播放歌曲
        if (this.audio.play) {
          //  获取歌曲长度
          this.music.currentTime = this.audio.duration;
          //  转换时间
          this.music.maxTime = this.RunningTime(this.music.currentTime);
          // console.log("时间==》", this.music.maxTime);
          this.timer = setInterval(() => {
            // 当前时间
            this.music.minTime = this.RunningTime(this.audio.currentTime);
            // console.log("当前时间==》", this.music.minTime);
            this.music.step = this.dragMoove(
              this.audio.currentTime,
              this.audio.duration
            );
            // console.log('进度条==>', this.music.step);
            // console.log('W===>', this.minW*(this.music.step/100));
            this.music.schedule.style.width =
              this.minW * (this.music.step / 100) + "px";
          }, 500);
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

    // 当前播放
    PlayMessage(index) {
      this.changeCurrentList({ valu: this.TheSongList[index] });
      this.QueryMusic(this.ViewPlayback.id);
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
}
/deep/ .van-notice-bar {
  padding: 0;
  height: 20px;
}
</style>