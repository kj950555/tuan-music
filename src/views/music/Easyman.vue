<template>
  <div class="easyman">
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <div class="exhibition clearfix">
        <div class="title">歌单</div>
        <div
          class="exhibition-content fl"
          v-for="(imen, index) in playlists"
          :key="index"
          @click="SongListPage(imen)"
        >
          <div class="exhibition-img">
            <img class="img-scale" :src="imen.coverImgUrl + '?param=100y100'" alt />
          </div>
          <div class="exhibition-message">
            <van-notice-bar color="#fff" :scrollable="false" background="#191C1E">{{imen.name}}</van-notice-bar>
          </div>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script>
import GridShow from "@/components/GridShow";
// 引入vuex
import { createNamespacedHelpers } from "vuex";
const { mapMutations, mapState } = createNamespacedHelpers("menuModule");
export default {
  data() {
    return {
      playlists: [],
      loading: false,
      finished: false,
      lazyComponent: true,
      name: "SongDetails",
      quantity: 10,
      before: 0,
    };
  },
  created() {
    this.getExhibition(18, "华语", 0);
  },
  // 注册组件
  components: {
    GridShow,
  },
  methods: {
    // 解构vuex的mutations.js文件的事件
    ...mapMutations(["getSongListID"]),
    //  获取推荐歌单
    async getExhibition(quantity, tag, before) {
      const { data: res } = await this.$http.get(
        `/top/playlist/highquality?before=${before}&limit=${quantity}&cat=${tag}`
      );
      if (res.code !== 200) {
        return;
      }
      for (let i = 0; i < res.playlists.length; i++) {
        this.playlists.push(res.playlists[i]);
      }
      console.log("歌单==》", res.playlists);
      this.quantity = res.playlists.length;
      this.before = res.playlists[res.playlists.length - 1].updateTime;
    },
    // 跳转到歌单详情页面
    SongListPage(imen) {
      console.log(imen);
      this.getSongListID({ valu: imen.id });
      this.$router.push({ path: this.name });
    },
    getHotname(name, index) {
      this.axios({
        method: "GET",
        url: `/top/playlist?limit=6&cat=${name}&order=new`,
        data: {
          limit: 6,
        },
      })
        .then((res) => {})
        .catch((err) => {});
    },

    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        this.getExhibition(9, "全部", this.before);
        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.quantity < 9) {
          this.finished = true;
        }
      }, 1000);
    },
  },
};
</script>

<style lang="less" scoped>
.easyman {
  transition: all 0.5s ease-in 0.1s;
  .exhibition {
    padding: 10px;

    .title {
      font-size: 18px;
      color: #fff;
      font-weight: 800;
      text-align: left;
      text-indent: 16px;
    }
    .exhibition-content {
      width: 33.33%;
      overflow: hidden;
      border-radius: 10px;
      margin-top: 10px;
      .exhibition-img {
        width: 80px;
        height: 80px;
        border-radius: 5px;
        overflow: hidden;
        margin: 0 auto;
      }
    }
  }
}
</style>