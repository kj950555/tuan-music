<template>
  <div class="singer">
    <div class="artist-list" v-for="(item ,index) in SingerClass" :key="index">
      <van-nav-bar :left-text="item.name" right-text="更多" @click-right="onClickRight" />
      <div class="artist clearfix">
        <div class="card fl" v-for="( card, index) in item.artist" :key="index">
          <div class="picture">
            <img class="img-scale" :src="card.img1v1Url +'?param=100y100'" alt />
          </div>
          <div class="name">
            <span>{{card.name}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      SingerClass: [
        { name: "华语", area: 7, artist: [] },
        { name: "欧美", area: 96, artist: [] },
        { name: "日本", area: 8, artist: [] },
        { name: "其他", area: 0, artist: [] },
      ],
    };
  },
  created() {
    this.getInformation(this.SingerClass[0].area, 0);
    this.getInformation(this.SingerClass[1].area, 1);
    this.getInformation(this.SingerClass[2].area, 2);
    this.getInformation(this.SingerClass[3].area, 3);
  },
  methods: {
    onClickRight() {},
    //   获取歌手
    async getInformation(id, index) {
      const { data: res } = await this.$http.get(
        `/artist/list?type=1&area=${id}&limit=6`
      );

      if (res.code !== 200) {
        return this.$notify({
          type: "primary",
          message: "资源获取失败",
        });
      }
      this.SingerClass[index].artist = res.artists;
      console.log(this.SingerClass);
    },
  },
};
</script>

<style lang="less" scoped>
.artist {
  margin-bottom: 20px;
  width: 100%;
  opacity: 0.8;
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
</style>