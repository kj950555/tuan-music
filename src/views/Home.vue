<template>
  <div class="home">
    <div class="showon-top"></div>
    <van-nav-bar @click-left="InformationPage" @click-right="Search">
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
      <template #right>
        <van-icon name="search" size="18" color="#fff" />
      </template>
      <template #left>
        <van-icon name="bars" size="18" color="#fff" />
      </template>
    </van-nav-bar>

    <van-popup v-model="show" position="left" :style="{ height: '100%' ,width:'80%'}" round>
      <info-pages />
    </van-popup>
    <div class="audio">
      <audio-view
        :name="'浮夸'"
        :singer="'陈奕迅'"
        :image="'http://p3.music.126.net/ltoFA2DfaCPOsAiXnDns2Q==/109951164681625927.jpg?param=100y100'"
        :AudioPath="'http://m8.music.126.net/20200810150751/628830546f4d1f54db504bffe8c56abd/ymusic/obj/w5zDlMODwrDDiGjCn8Ky/3509928572/40a7/8de3/33c0/40fb919098def04c73c8b7342f445ad1.mp3' "
      />
    </div>
    <div class="content">
      <transition name="slide-fade">
        <router-view />
      </transition>
    </div>
  </div>
</template>

<script>
import InfoPages from "@/components/InfoPages";
import AudioView from "@/components/AudioView";
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
  // 注册组件
  components: {
    InfoPages,
    AudioView,
  },
  created() {
    this.$router.push({ name: this.skip[0].naem });
    this.ActiveIem();
  },
  methods: {
    ActiveIem() {
      for (let i = 0; i < this.skip.length; i++) {
        if (this.skip[i].urls.indexOf(this.$route.name) > -1) {
          this.skip[i].isActive = true;
        }
      }
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

  .title {
    text-align: center;
    font-size: 16px;
    color: #fff;
    margin-top: 10px;
  }

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
    }
    .active {
      font-size: 16px;
      font-weight: 800;
    }
  }
  .slide-fade-enter-active {
    transition: all 0.25s linear;
  }
  .slide-fade-leave-active {
    transition: all 0.25s linear;
  }
  .slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
    transform: rotate(30deg);
    opacity: 0;
  }
  .audio {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    z-index: 999;
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
</style>