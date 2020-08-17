<template>
  <!-- 歌手列表页 -->
  <div class="more-artist">
    <div class="showon-top"></div>
    <div class="artist-list">
      <van-nav-bar :left-text="MoreArtis.name" :left-arrow="true" @click-left="GetBack" />
      <div class="artist clearfix">
        <div
          class="card fl"
          v-for="( card, index) in artist"
          :key="index"
          @click="DetailsSinger(card)"
        >
          <div class="picture">
            <img class="img-scale" :src="card.img1v1Url +'?param=100y100'" alt />
          </div>
          <div class="name">
            <span>{{card.name}}</span>
          </div>
        </div>
      </div>
    </div>
    <van-pagination
      v-model="MoreArtis.currentPage"
      :page-count="3"
      mode="simple"
      @change="PageTurning"
    />
  </div>
</template>

<script>
// 引入vueX
import { createNamespacedHelpers } from "vuex";
const { mapMutations, mapState } = createNamespacedHelpers("menuModule");
export default {
  beforeRouteEnter(to, from, next) {
    // 路由跳转前跟新数据
    next((vm) => {
      vm.axios({
        methods: "GET",
        url: `/artist/list?offset=${vm.MoreArtis.currentPage}&area=${vm.MoreArtis.area}&limit=30`,
      }).then((res) => {
        vm.artist = res.data.artists;
       
        console.log("跳转==>", vm.artist);
      });
      vm.Displayplayer({valu:false})
    });
  },

  data() {
    return {
      artist: [],
     
    };
  },
  // 计算属性
  computed: {
    //  解构vuex的state文件数据、
    ...mapState(["MoreArtis"]),
  },
  created() {},
  methods: {
    ...mapMutations(["getSingerInformation",'Displayplayer']),
    // 跳转歌手详情页
    DetailsSinger(card) {
      console.log(card);
      this.getSingerInformation({ valu: card });
      this.$router.push({ name: "Artist" });
    },
    // 返回
    GetBack() {
      this.$router.go(-1)
    },

    //   获取歌手
    async getSingerList(id, page) {
      const { data: res } = await this.$http.get(
        `/artist/list?type=${page}&area=${id}&linitial=b`
      );

      if (res.code !== 200) {
        return this.$notify({
          type: "primary",
          message: "资源获取失败",
        });
      }
      this.artist = res.artists;
      console.log("歌手列表==》", this.artist);
    },
    // 下一页
    PageTurning(index) {
      window.scrollTo(0, 0);
      this.getSingerList(this.MoreArtis.area, this.MoreArtis.currentPage);
    },
  },
};
</script>

<style lang="less" scoped>
.more-artist {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: #191c1e;
  z-index: 100;
  overflow-y: auto;
  .artist {
    margin-bottom: 20px;
    width: 100%;
    .card {
      padding: 5px 5px 10px;
      margin: 15px 0px 0px 11px;
      background-color: #1e1e1e;
      overflow: hidden;
      border-radius: 10px;
      box-shadow: -1px -1px 5px #636363;
      .picture {
        width: 100px;
        height: 100px;
        margin: 0px auto;
        overflow: hidden;
        border-radius: 5px;
      }
      .name {
        width: 100px;
        height: 30px;
        margin: 5px auto;
        color: #fff;
        text-overflow: ellipsis;
      }
    }
  }
}
/deep/ .van-nav-bar__text {
  color: #fff;
}
/deep/.van-nav-bar .van-icon {
  color: #fff;
}
</style>