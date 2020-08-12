<template>
  <div class="artist">
    <div class="showon-top"></div>
    <!-- 导航 -->
    <div class="navigation clearfix">
      <div class="fl get-back">
        <van-icon name="arrow-left" size="30px" color="#fff" @click="Backtrack" />
      </div>
      <div class="fl artist-name">{{SingerInformation.name}}</div>
    </div>
    <!-- 图片 -->
    <div class="artist-img">
      <div class="base-map">
        <img class="img-scale" :src="SingerInformation.img1v1Url+'?param=460y380'" alt />
      </div>
      <div class="head-portrait">
        <img class="img-scale" :src="SingerInformation.picUrl+'?param=100y100'" alt />
      </div>
      <div class="publicity">
        <div class="details">
          <i class="iconfont icon">&#xe7b8;</i>
          <span>单曲：</span>
          <span>{{SingerInformation.musicSize}}</span>
        </div>

        <div class="details">
          <i class="iconfont icon">&#xe64b;</i>
          <span>专辑：</span>
          <span>{{SingerInformation.albumSize}}</span>
        </div>
      </div>
    </div>

    <div class="correlation">
      <van-tabs v-model="active">
        <van-tab v-for="(imen,index) in correlation" :key="index">
          <template #title>
            <span>{{imen.option}}</span>
          </template>

          <van-cell :sticky="true" is-link v-for="(item , i) in imen.content" :key="i">
            <!-- 使用 title 插槽来自定义标题 -->
            <template #title>
              <div class="content">
                <div class="content-mene">{{item.name}}</div>
              </div>
            </template>
            <template #right-icon>
              <i class="iconfont icon-play">&#xe618;</i>
            </template>
          </van-cell>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
// 引入vueX
import { createNamespacedHelpers } from "vuex";
const { mapMutations, mapState } = createNamespacedHelpers("menuModule");

export default {
  // 路由跳转前跟新数据
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.backtrack = from.path;
    });
  },
  data() {
    return {
      active: 0,
      backtrack: "",
      correlation: [
        { option: "单曲", icon: "&#xe7b8;", content: [] },
        { option: "专辑", icon: "&#xe64b;", content: [] },
      ],
    };
  },
  // 计算属性
  computed: {
    //  解构vuex的state文件数据、
    ...mapState(["SingerInformation"]),
  },
  created() {
    this.ListPage();
    this.AlbumPage()
  },
  methods: {
    ListPage() {
      this.axios({
        methods: "GET",
        url: `/artist/top/song?id=${this.SingerInformation.id}`,
      })
        .then((res) => {
          console.log(res);
          this.correlation[0].content = res.data.songs;
          console.log(this.correlation);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    AlbumPage() {
      this.axios({
        methods: "GET",
        url: `/artist/album?id=${this.SingerInformation.id}`,
      })
        .then((res) => {
          console.log('专辑==》',res);
         this.correlation[1].content=res.data.hotAlbums
         
        })
        .catch((err) => {
          console.log(err);
        });
    },


    Backtrack() {
      console.log(this.backtrack);
      this.$router.push({ path: this.backtrack });
    },
  },
};
</script>

<style lang="less" scoped>
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
    opacity: 0.1;
  }
  .head-portrait {
    position: absolute;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    left: 50%;
    top: 30px;
    margin-left: -50px;
    overflow: hidden;
  }
  .publicity {
    position: absolute;
    left: 10px;
    bottom: 100px;
    .details {
      font-size: 16px;
      color: #fff;
      margin-bottom: 10px;
      text-align: left;
      .icon {
        color: #969999;
        margin-right: 5px;
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
.icon-play {
  font-size: 14px;
  line-height: 30px;
  margin-right: 10px;
}
.content {
  text-align: left;
  margin-left: 10px;
  .content-mene {
    line-height: 30px;
    font-size: 14px;
    color: #101010;
    font-weight: 800;
  }
  .content-singer {
    color: #b5b4b5;
    font-size: 14px;
  }
}
</style>