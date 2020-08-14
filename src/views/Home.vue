<template>
  <div class="home">
    <div class="showon-top"></div>
    <!-- 顶部导航栏 -->
    <van-nav-bar @click-left="InformationPage" @click-right="Search" :placeholder="true">
      <template #title>
        <div class="navigation">
          <div class="tab-control clearfix">
            <div
              class="fl title"
              v-for="(item,index) in skip"
              :key="index"
              @click="onChange(index,item)"
              :class="item.isActive ? 'active' : ''"
            >{{item.title}}</div>
          </div>
        </div>
      </template>
      <!-- 右边 -->
      <template #right>
        <van-icon name="search" size="18" color="#fff" />
      </template>
      <!-- 左边 -->
      <template #left>
        <van-icon name="bars" size="18" color="#fff" />
      </template>
    </van-nav-bar>

    <!-- 用户信息侧栏 -->
    <van-popup v-model="show" position="left" :style="{ height: '100%' ,width:'80%'}" round>
      <info-pages />
    </van-popup>

    <!-- 播放组件 -->
    <div class="audio" v-show="PlayPart">
      <transition name="slide-fade">
        <audio-view />
      </transition>
    </div>
    <div :class="PlayPart? 'content-active':'content'">
      <transition name="slide-fade">
        <router-view />
      </transition>
    </div>
  </div>
</template>

<script>
import InfoPages from "@/components/InfoPages";
import AudioView from "@/components/AudioView";
// 引入vueX数据管理中心
import { createNamespacedHelpers } from "vuex";
const { mapMutations, mapState } = createNamespacedHelpers("menuModule");
export default {
  data() {
    return {
      active: 0,
      skip: [
        { title: "热门", naem: "Hot", isActive: false, urls: ["Hot"] },
        {
          title: "发现",
          naem: "Discover",
          isActive: false,
          urls: ["Discover", "Singer", "Album", "Song", "Ranking"],
        },
        {
          title: "歌单",
          naem: "Playlist",
          isActive: false,
          urls: ["Playlist", "Easyman"],
        },
      ],
      show: false,
    };
  },
  // 计算属性
  computed: {
    //  解构vuex的state文件数据、
    ...mapState(["PlayPart"]),
  },
  // 注册组件
  components: {
    InfoPages,
    AudioView,
  },
  created() {
    this.$router.push({ name: this.skip[0].naem });
    this.ActiveIem();
  },
  mounted() {
    this.MonitorScreen();
  },
  methods: {
    // 解构vuex的mutatuons文件内容
    ...mapMutations(["getTheSongList"]),
    ActiveIem() {
      for (let i = 0; i < this.skip.length; i++) {
        if (this.skip[i].urls.indexOf(this.$route.name) > -1) {
          this.skip[i].isActive = true;
        }
      }
    },

    // 显示播放组件
    MonitorScreen() {
      window.addEventListener("touchmove", (e) => {
        // console.log(e.targetTouches[0].pageY);
      });
    },
    // 显示
    InformationPage() {
      this.show = true;
    },
    Search() {
      this.$router.push({ name: "Search" });
    },
    onChange(index, item) {
      if (item.isActive) {
        return;
      }
      for (let i = 0; i < this.skip.length; i++) {
        if (this.skip[i].isActive == true) {
          this.skip[i].isActive = false;
          break;
        }
      }
      this.skip[index].isActive = true;
      this.$router.push({ name: this.skip[index].naem });
    },
  },
};
</script>

<style lang="less" scoped>
.home {
  width: 100%;
  .navigation {
    width: 200px;
    overflow: hidden;
  }
  .tab-control {
    text-align: center;
    .title {
      width: 62px;
      font-size: 14px;
      margin-top: 0;
      color: #858577;
    }
    .active {
      font-size: 16px;
      color: #fff;
      font-weight: 800;
    }
  }
  .content {
    position: fixed;
    top: 46px;
    bottom: 0;
    left: 0;
    right: 0;
    overflow-y: auto;
  }
  .content-active {
    position: fixed;
    top: 46px;
    bottom: 60px;
    left: 0;
    right: 0;
    overflow-y: auto;
  }

  .slide-fade-enter-active {
    transition: all 0.25s linear;
  }
  .slide-fade-leave-active {
    transition: all 0.25s linear;
  }
  .slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
    transform: translateX(-120px);
    opacity: 0;
    z-index: -1;
  }
  .audio {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    z-index: 99;
  }
}
/deep/ .van-nav-bar {
  background-color: #191c1e;
  color: #fff;
}
/deep/ .van-swipe {
  border-radius: 10px;
  overflow: hidden;
}

/deep/ .van-nav-bar__title {
  color: #fff;
}
/deep/ .van-tabbar {
  background-color: #24262b;
}
/deep/ .van-popup {
  background: #f5f5f7;
}
/deep/ .van-nav-bar{
   z-index: 0;
}
</style>