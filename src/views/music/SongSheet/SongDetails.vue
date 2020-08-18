<template>
  <!-- 歌单详情页面 -->
  <div class="song-details">
    <div class="showon-top"></div>
    <!-- 导航 -->
    <div class="navigation clearfix">
      <div class="fl get-back">
        <van-icon name="arrow-left" size="30px" color="#fff" @click="Backtrack" />
      </div>
      <div class="fl artist-name">歌单</div>
    </div>
    <!-- 图片 -->
    <div class="artist-img">
      <div class="base-map">
        <!-- <img class="img-scale" :src="SingerInformation.img1v1Url+'?param=460y380'" alt /> -->
      </div>
      <div class="introduce clearfix">
        <div class="head-portrait fl">
          <img class="img-scale" :src="Playlist.coverImgUrl+'?param=100y100'" alt />
        </div>
        <div class="information fl">
          <div class="title">
            <span>{{Playlist.name}}</span>
          </div>
          <div class="author clearfix">
            <div class="author-img fl">
              <img class="img-scale" :src="Playlist.creator.avatarUrl+'?param=100y100'" alt />
            </div>
            <div class="fl author-name">
              <span>{{Playlist.creator.nickname}}</span>
            </div>
          </div>
          <div class="describe">
            <van-notice-bar :text="Playlist.description" background="transparent" color="#fff" />
          </div>
        </div>
      </div>
    </div>
    <!-- 下面内容 -->
    <div class="correlation">
      <div class="play-all clearfix" @click="PlayAll">
        <div class="fl all-word">播放全部</div>
        <div class="fr play-icon">
          <i class="iconfont">&#xe667;</i>
        </div>
      </div>
      <div class="song-list">
        <song-list v-for="(imet, index) in Playlist.trackIds" :key="index" :id="imet.id" />
      </div>
    </div>
  </div>
</template>
<script>
import SongList from "@/components/SongList";
// 引入vuex
import { createNamespacedHelpers } from "vuex";
const { mapMutations, mapState } = createNamespacedHelpers("menuModule");
export default {
  beforeRouteEnter(to, from, next) {
    next( async (vm) => {
      vm.axios({
        methods: "GET",
        url: `/playlist/detail?id=${vm.SongListID}`,
      })
        .then((res) => {
          console.log("歌单详情==》", res);
          if(res.data.code==200){
             vm.Playlist = res.data.playlist;
              vm.songfile = res.data.playlist.trackIds;     
          }
          
        })
        .catch((err) => {
          console.log(err);
        });
     

      vm.Displayplayer({ valu: false });
    });
  },
  data() {
    return {
      active: 0,
    
      Playlist: { creator: { avatarUrl: "" } },
      songData: [],
      songfile: [],
    };
  },
  // 注册组件
  components: {
    SongList,
  },
  computed: {
    //  解构vuex的state文件数据、
    ...mapState(["SongListID"]),
  },
  created() {},
  methods: {
    // 解构vuex的mutations.js文件的事件
    ...mapMutations(["Displayplayer","getPlayAll"]),
    Backtrack() {
     this.$router.go(-1)
    },
    // 获取歌曲列表
    async AccessSong() {
      for (let i = 0; i < this.Playlist.trackIds.length; i++) {
        // console.log(i);
        const { data: res } = await this.$http.get(
          `/song/detail?ids=${this.Playlist.trackIds[i].id}`
        );
        console.log('图片路径',res.songs[0].al.picUrl);
        this.songData.push({
          name: res.songs[0].name,
          image: res.songs[0].al.picUrl,
          singer: res.songs[0].ar[0].name,
          id:this.Playlist.trackIds[i].id,
        });
      }
       this.getPlayAll({valu:this.songData})
      //  是否显示播放插件
       this.Displayplayer({valu:false})
      console.log("数据==》", this.songData);
    },
    // 播放全部
    PlayAll() {
      this.AccessSong();

    },
  },
};
</script>

<style lang="less" scoped>
.song-details {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  z-index: 200;
  background-color: #fff;
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
  .artist-img {
    width: 100%;
    height: 310px;
    overflow: hidden;
    position: relative;
    z-index: -1;
    .base-map {
      width: 100%;
      height: 310px;
      position: absolute;
      top: 0;
      left: 0;
      background-color: #8c7a73;
    }
    .introduce {
      position: absolute;
      left: 0px;
      top: 100px;
      overflow: hidden;
      padding: 0 20px;
      .head-portrait {
        width: 120px;
        height: 120px;
        border-radius: 5px;
        overflow: hidden;
      }
      .information {
        width: 200px;
        margin-left: 10px;
        text-align: left;
        .title {
          font-size: 18px;
          color: #fff;
          font-weight: 800;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .author {
          font-size: 14px;
          color: #e9e4e3;
          margin: 5px 0;
          .author-img {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background-color: #007acc;
            overflow: hidden;
          }
          .author-name {
            font-weight: 600;
            line-height: 50px;
            margin-left: 10px;
          }
        }
      }
    }
  }
  .correlation {
    position: fixed;
    width: 100%;
    background-color: #fff;
    border-radius: 40px 40px 0px 0px;
    box-shadow: -10px -4px 8px 0 rgba(0, 0, 0, 0.2),
      10px 4px 8px 0 rgba(0, 0, 0, 0.19);
    overflow-y: auto;
    z-index: 1;
    top: 280px;
    left: 0;
    bottom: 0;
    right: 0;
  }
  .song-list {
    margin-top: 5px;
  }
  .play-all {
    width: 100px;
    height: 30px;
    border-radius: 15px;
    border: 1px solid #858585;

    margin-left: 20px;
    margin-top: 10px;
    .all-word {
      text-indent: 10px;
      font-size: 14px;
      font-weight: 600;
      line-height: 30px;
    }
    .play-icon {
      font-size: 16px;
      margin-right: 10px;
      margin-top: 5px;
    }
  }
}
/deep/.van-notice-bar {
  padding: 0;
}
</style>