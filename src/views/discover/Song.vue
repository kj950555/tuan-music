<template>
  <div class="song">
    <!-- 最新MV -->
    <div class="title">最新 MV</div>
    <div class="navigation clearfix">
      <div class="reveal">
        <div class="fl show-MV" v-for="(imet , index) in MVlist" :key="index">
          <div class="MV-img">
            <img class="img-scale" :src="imet.cover+'?param=130y130'" alt />
          </div>
          <div class="message">
            <van-notice-bar color="#fff" background="#191C1E">{{imet.name}}</van-notice-bar>
            <van-notice-bar color="#fff" background="#191C1E">{{imet.artistName}}</van-notice-bar>
          </div>
        </div>
      </div>
    </div>
    <div class="title">新歌速递</div>
    <!-- 新歌速递 -->
    <van-tabs animated @change="LabelSwitching" type="card" background="#191C1E" color="#F2830D">
      <van-tab v-for="(inem,index) in SingerClass" :title="inem.name" :key="index">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad(index)"
        >
          <div class="song-list clearfix" v-for="(imen , i) in loadingList" :key="i">
            <div class="song-img fl">
              <img class="img-scale" :src="imen.album.picUrl+'?param=70y70'" alt />
            </div>
            <div class="particulars fl">
              <div class="scrollbar">
                <van-notice-bar
                  color="#fff"
                  background="#191C1E"
                  :scrollable="false"
                >{{imen.album.name}}</van-notice-bar>
              </div>
              <span>{{imen.artists[0].name}}</span>
            </div>
            <div class="play-bnt fr" @click="PlayBack(imen)">
              <i class="iconfont">&#xe667;</i>
            </div>
          </div>
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
// 引入vuex
import { createNamespacedHelpers } from "vuex";
const { mapMutations, mapState } = createNamespacedHelpers("menuModule");
export default {
  data() {
    return {
      MVlist: [],
      loadingList: [],
      newSong: [],
      SingerClass: [
        { name: "全部", area: 0, haveAccess: false, newSong: [] },
        { name: "华语", area: 7, haveAccess: false, newSong: [] },
        { name: "欧美", area: 96, haveAccess: false, newSong: [] },
        { name: "日本", area: 8, haveAccess: false, newSong: [] },
      ],
      loading: false,
      finished: false,
      newSongIndex: 0,
    };
  },
  created() {
    this.getAccessSong(
      this.SingerClass[0].area,
      0,
      this.SingerClass[0].haveAccess
    );
    this.getSongMV();
    this.LabelSwitching(0);
  },
  methods: {
    // 解构vuex的mutations.js文件的事件
    ...mapMutations(["getTheSongList", "changeCurrentList"]),
    //   获取最新歌曲
    async getAccessSong(id, index, access) {
      // 判断是不是获取到数据了，如果获取到了就return
      if (access == true) {
        return;
      }
      // 获取新歌100歌曲
      const { data: res } = await this.$http.get(`/top/song?type=${id}`);
      // console.log("歌曲", res);
      if (res.code !== 200) {
        return this.$notify({
          type: "primary",
          message: "资源获取失败",
        });
      }
      this.SingerClass[index].newSong = res.data;
      this.SingerClass[index].haveAccess = true;
    },
    // 获取最新MV
    async getSongMV() {
      const { data: res } = await this.$http.get("/mv/first?limit=6");
      // console.log(res);
      if (res.code !== 200) {
        return this.$notify({
          type: "primary",
          message: "资源获取失败",
        });
      }
      this.MVlist = res.data;
    },
    // 选项卡切换歌曲分类
    LabelSwitching(index) {
      this.loadingList = [];
      this.newSongIndex = 0;
      this.getAccessSong(
        this.SingerClass[index].area,
        index,
        this.SingerClass[index].haveAccess
      );
      console.log(this.SingerClass);
      this.finished = false;
      this.onLoad(index);
    },
    clearTimeout(timer) {
      clearInterval(timer);
    },

    // 播放歌曲
    PlayBack(imen) {
      console.log("imen ==> ", imen);
      this.getTheSongList({
        valu: {
          name: imen.album.name,
          singer: imen.artists[0].name,
          image: imen.album.picUrl ,
          id: imen.id,
        },
      });
      this.changeCurrentList({
        valu: {
          name: imen.album.name,
          singer: imen.artists[0].name,
          image: imen.album.picUrl ,
          id: imen.id,
        },
      });
    },

    // 加载数据
    onLoad(index) {
      console.log(index);
      let timer = setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.loadingList.push(
            this.SingerClass[index].newSong[this.newSongIndex]
          );
          this.newSongIndex++;
        }
        // 加载状态结束
        this.loading = false;
        // 数据全部加载完成
        // console.log(index);
        console.log(this.SingerClass[index].newSong.length);
        if (this.loadingList.length >= this.SingerClass[index].newSong.length) {
          this.clearTimeout(timer);
          this.finished = true;
        }
      }, 1000);
    },
  },
};
</script>

<style lang="less" scoped>
.title {
  font-size: 16px;
  font-weight: 800;
  text-align: left;
  text-indent: 15px;
  margin-top: 10px;
  color: #d9d9da;
  margin-bottom: 15px;
}
.navigation {
  width: 100%;
  overflow: hidden;

  overflow-x: auto;
  .reveal {
    width: 900px;
    .show-MV {
      width: 130px;
      margin: 0px 0px 10px 20px;
      border-radius: 10px;
      overflow: hidden;
      background-color: #191c1e;
      box-shadow: 2px -1px 5px #191c1e;
    }
    .MV-img {
      width: 130px;
      height: 130px;
      border-radius: 5px;
      overflow: hidden;
    }
    .message {
      p {
        width: 88px;
        margin: 0px auto;
        text-align: left;
        color: #fff;
        padding-bottom: 10px;
      }
    }
  }
}
.song-list {
  width: 350px;
  margin: 0 auto;
  border-bottom: 1px #2f3234 solid;

  .song-img {
    width: 60px;
    height: 60px;
    border-radius: 10px;
    overflow: hidden;
    background-color: blueviolet;
    margin: 10px;
  }
  .particulars {
    width: 180px;
    margin-left: 10px;
    text-align: left;
    .scrollbar {
      margin-top: 10px;
    }
    p {
      margin-top: 20px;
      font-size: 14px;
      color: #fcfffe;
    }
    span {
      font-size: 10px;
      color: #fdffff;
      padding: 0 16px;
    }
  }
  .play-bnt {
    margin-right: 10px;
    font-size: 30px;
    line-height: 80px;
    color: #fff;
  }
}
/deep/.van-notice-bar {
  height: 30px;
  line-height: 30px;
  font-size: 12px;
}
</style>
