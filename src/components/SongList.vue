<template>
  <!-- 歌曲列表组件 -->
  <div class="song-list clearfix">
    <div class="content fl">{{name}}</div>
    <div class="iocn fr" @click="PlayBack">
      <i class="iconfont">&#xe618;</i>
    </div>
  </div>
</template>

<script>
// 引入vuex
import { createNamespacedHelpers } from "vuex";
const { mapMutations, mapState } = createNamespacedHelpers("menuModule");
export default {
  props: {
    id: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      name: "",
      picUrl:'',
      singer:''
    };
  },
  created() {
    this.AccessSong();
  },
  methods: {
    ...mapMutations(["getTheSongList",'changeCurrentList']),
    async AccessSong() {
      const { data: res } = await this.$http.get(`/song/detail?ids=${this.id}`);
      
      this.name = res.songs[0].name;
      this.picUrl =res.songs[0].al.picUrl
      this.singer =res.songs[0].ar[0].name
    },
    PlayBack() {
      this.getTheSongList({
        valu: {
          name: this.name,
          singer: this.singer,
          image: this.picUrl ,
          id: this.id,
        },
      });

      this.changeCurrentList({
        valu: {
         name: this.name,
          singer: this.singer,
          image: this.picUrl ,
          id: this.id,
        },
      });
    },
  },
};
</script>

<style lang="less" scoped>
.song-list {
  padding: 10px;
  line-height: 30px;
  .content {
    text-align: left;
    text-indent: 12px;
    color: #101010;
    font-weight: 800;
    font-size: 14px;
  }
  .iocn {
    font-size: 16px;
    color: #101010;
    margin-right: 12px;
  }
}
</style>