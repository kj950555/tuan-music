<template>
  <div class="grid-show">
    <div class="exhibition clearfix">
      <div class="title">{{title}}</div>
      <div
        class="exhibition-content fl"
        v-for="(song, i) in songlists"
        :key="i"
        @click="SongListPage(song)"
      >
        <div class="exhibition-img">
          <img class="img-scale" :src="song.coverImgUrl+'?param=100y100'" alt />
        </div>
        <div class="exhibition-message">
          <van-notice-bar color="#fff" :scrollable="false" background="#191C1E">{{song.name}}</van-notice-bar>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 引入vueX
import { createNamespacedHelpers } from "vuex";
const { mapMutations, mapState } = createNamespacedHelpers("menuModule");
export default {
  props: {
    title: [String, Number],
    songlists: [Array],
  },
  data(){
    return {
      name:'SongDetails'
    }
  },
  methods: {
     // 解构vuex的mutations.js文件的事件
    ...mapMutations(["getSongListID"]),
    SongListPage(imen) {
      console.log(imen);
      this.getSongListID({ valu: imen.id });
       this.$router.push({ path: this.name });
    },
  },
};
</script>

<style lang="less" scoped>
.grid-show {
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