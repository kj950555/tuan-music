<template>
  <div class="player">
    <!-- 音乐页面 -->
    <div class="navigation clearfix">
      <div class="fl get-back">
        <van-icon name="arrow-left" size="30px" color="#fff" @click="Backtrack" />
      </div>

      <div class="fl artist-name">{{PlayTime.name}}</div>
    </div>
    <div class="player-img" ref="picture">
      <img class="img-scale" :src="PlayTime.image+'?param=200y200'" alt />
    </div>
    <!-- 歌词详情 -->
    <div class="lyrics">
      <div class="lyrics-box" ref="lyrics-box">
        <div
          ref="lrc-active"
          class="lrc"
          :class="imen.isActive ? 'lrc-active' : ''"
          v-for="(imen , index) in lyrics"
          :key="index"
        >{{imen.lrc}}</div>
      </div>
    </div>
    <div class="Play-button clearfix">
      <audio ref="audio" style="display: none;">您的浏览器不支持 audio 元素。</audio>

      <!-- 上一首 -->
      <div class="fl up-one" @click="UpOneHome">
        <i class="icon iconfont">&#xe62c;</i>
      </div>
      <!-- 播放与暂停 -->
      <div class="fl player-box" @click="PlaySuspend">
        <span class="play iconfont">{{ PlayTime.isSwitchover ? "&#xe6ad;": "&#xe667;" }}</span>
      </div>
      <!-- 下一首 -->
      <div class="fl up-one" @click="NextOneHome">
        <i class="icon iconfont">&#xe62d;</i>
      </div>
    </div>
  </div>
</template>

<script>
// 引入vueX数据管理中心
import { createNamespacedHelpers } from "vuex";
const { mapMutations, mapState } = createNamespacedHelpers("menuModule");
export default {
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.axios({
        methods: "GET",
        url: `/lyric?id=${vm.PlayTime.id}`,
      })
        .then((res) => {
          console.log("歌词详情==》", res);
          if (res.data.lrc.lyric) {
            let lyric = res.data.lrc.lyric.split("\n");
            for (let i = 0; i < lyric.length; i++) {
              let t = /\[\d*:\d*((\.|\:)\d*)*\]/g;
              let ts = lyric[i].substring(
                lyric[i].indexOf("[") + 1,
                lyric[i].indexOf("]") - 4
              );
              let clause = lyric[i].replace(t, "");
              vm.lyrics.push({ t: ts, lrc: clause, isActive: false });
            }
            console.log(vm.lyrics);
          }
        })
        .catch((err) => {
          console.log(err);
        });
      vm.Displayplayer({ valu: false });
      vm.serialNumber = vm.MusicCurrentTim.index;
    });
  },
  data() {
    return {
      currentRate: 0,
      gradientColor: {
        "0%": "#ED466F",
        "100%": "#881A90",
      },
      timer: null,
      deg: 0,
      lyrics: [],
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
        schedule: null,
        // 最大长度
        minW: 0,
        musicMin: 0,
        musicMax: 0,
      },
      rotateDeg: 0,
      // 播放序号
      serialNumber: 0,
    };
  },
  // 计算属性
  computed: {
    ...mapState(["TheSongList", "MusicCurrentTim", "PlayTime"]),
  },
  components: {},
  mounted() {
    this.AudioPlayer();
    this.audio.src = this.MusicCurrentTim.url;
    this.audio.play();
    this.audio.currentTime = this.MusicCurrentTim.currentTime;
  },
  methods: {
    // 解构vuex的mutations.js文件的事件
    ...mapMutations(["Displayplayer", "playTheSong"]),
    // 获取音频路径{}
    async AudioPath(id) {
      const { data: res } = await this.$http.get(`/song/url?id=${id}`);
      // console.log("音频路径", res);
      this.audio.src = res.data[0].url;
      this.audio.play();
    },
    // 监听audio标签
    AudioPlayer() {
      // 获取标签audio/schedule
      this.audio = this.$refs.audio;
      this.audio.crossOrigin = "anonymous";
      let picture = this.$refs.picture;
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
          let lyricsBox = this.$refs["lyrics-box"];
          this.timer = setInterval(() => {

            if (this.rotateDeg > 360) {
              this.rotateDeg = 0;
            }
            this.music.minTime = this.RunningTime(this.audio.currentTime);
            for (let i = 0; i < this.lyrics.length; i++) {
              if (this.music.minTime == this.lyrics[i].t) {
                for (let j = 0; j < this.lyrics.length; j++) {
                  if (this.lyrics[j].isActive == true) {
                    this.lyrics[j].isActive = false;
                    break;
                  }
                }
                var lrcHeight = this.$refs["lrc-active"][0].offsetHeight;
                var lyricsHids = lyricsBox.offsetHeight;
                this.lyrics[i].isActive = true;
                lyricsBox.style.top =70 -(lrcHeight*i)  + "px";
                break;
              }
            }
            picture.style.transform = `rotate(${this.rotateDeg}deg)`;
            this.rotateDeg++;
            // 进度条
            this.music.step = this.dragMoove(
              this.audio.currentTime,
              this.audio.duration
            );
          }, 25);
        }
      });
      // 监听歌曲有没有获取
      this.audio.addEventListener("error", () => {
        this.$toast.fail({
          message: "当前歌曲没法获取",
          forbidClick: true,
          //延迟自动关闭加载提示，如果该值为0，则不会自动关闭
          duration: 1000,
        });
        this.NextOneHome();
      });
    },
    // 歌词获取
    Thelyrics(id) {
      this.lyrics = [];
      this.axios({
        methods: "GET",
        url: `/lyric?id=${id}`,
      })
        .then((res) => {
          console.log("歌词详情==》", res);
          if (res.data.lrc.lyric) {
            let lyric = res.data.lrc.lyric.split("\n");
            for (let i = 0; i < lyric.length; i++) {
              let t = /\[\d*:\d*((\.|\:)\d*)*\]/g;
              let ts = lyric[i].substring(
                lyric[i].indexOf("[") + 1,
                lyric[i].indexOf("]") - 3
              );
              let clause = lyric[i].replace(t, "");
              this.lyrics.push({ t: ts, lrc: clause, isActive: false });
            }
            console.log(this.lyrics);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 当前播放
    PlayMessage(index) {
      this.eliminate(this.timer);
      this.playTheSong({ valu: this.TheSongList[index] });
      this.AudioPath(this.PlayTime.id);
      this.Thelyrics(this.PlayTime.id);
    },
    //  播放与暂停
    PlaySuspend() {
      if (this.PlayTime.isSwitchover == false) {
        this.PlayTime.isSwitchover = true;
        this.audio.play();
      } else {
        this.PlayTime.isSwitchover = false;
        this.audio.pause();
        this.eliminate(this.timer);
      }
      console.log(this.PlayTime.isSwitchover);
    },
    // 上一首
    UpOneHome() {
      if (this.serialNumber <= 0) {
        return (this.serialNumber = 0);
      }
      this.serialNumber--;
      this.PlayMessage(this.serialNumber);
      console.log("上一首", this.serialNumber);
    },
    NextOneHome() {
      if (this.serialNumber >= this.TheSongList.length - 1) {
        return (this.serialNumber = this.TheSongList.length - 1);
      }
      this.serialNumber++;
      this.PlayMessage(this.serialNumber);
      console.log("下一首", this.TheSongList.length);
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
    // 返回
    Backtrack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="less" scoped>
.player {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  z-index: 200;
  background: #191c1e;
  .navigation {
    position: absolute;
    top: 30px;
    left: 0px;
    line-height: 50px;
    z-index: 999;
    .get-back {
      margin: 10px 5px 10px 5px;
    }
    .artist-name {
      font-size: 18px;
      color: #fff;
      font-weight: 800;
    }
  }
  .player-img {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    position: absolute;
    margin-left: -100px;
    left: 50%;
    top: 100px;
    background-size: 100% 100%;
    overflow: hidden;
  }
  .circular {
    position: absolute;
    top: 0;
    left: 0;
  }
  .lyrics {
    width: 270px;
    height: 100px;
    position: absolute;
    top: 310px;
    left: 50px;
    overflow-y: auto;
    .lyrics-box {
      width: 100%;
      position: absolute;
      top: 75px;
      left: 0;
      transition: top 0.25s linear;
      .lrc {
        height: 20px;
        text-align: center;
      }
      .lrc-active {
        color: #fff;
        font-weight: 800;
      }
    }
  }
  .Play-button {
    width: 100%;
    height: 100px;
    background-color: brown;
    position: absolute;
    bottom: 10px;
    left: 0;
    text-align: center;
    line-height: 80px;
    .icon {
      font-size: 40px;
      color: #fff;
    }
    .play {
      font-size: 50px;
      color: #fff;
    }
    .player-box {
      background-image: linear-gradient(#f24a6e, #831d85);
      border-radius: 50%;
      overflow: hidden;
      width: 80px;
      height: 80px;
      text-align: center;
      line-height: 80px;
      margin: 10px;
    }
    .up-one {
      width: 50px;
      height: 80px;
      margin: 10px;
    }
  }
}
/deep/.van-nav-bar {
  border: 0;
  background-color: transparent;
}
</style>