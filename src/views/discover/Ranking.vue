<template>
  <div class="ran-king">
    <!-- 排行榜 -->
    <div class="tabulate clearfix" v-for="(imet ,index) in tabulate" :key="index" @click="LeaderboardContent(imet)">
      <div class="card fr">
        <img class="img-scale" :src="imet.coverImgUrl+'?param=300y200'" alt />
      </div>
      <div class="content">
        <div>{{imet.name}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabulate: [],
    };
  },
  created() {
    this.getRankingList();
  },
  methods: {
    async getRankingList() {
      const { data: res } = await this.$http.get("/toplist/detail");
      console.log(res);
      if (res.code !== 200) {
        return this.$notify({
          type: "primary",
          message: "资源获取失败",
        });
      }
      this.tabulate = res.list;
      console.log(this.tabulate);
    },
  LeaderboardContent(imet){
    this.axios({
    })
  }
  },
};
</script>

<style lang="less" scoped>
.tabulate {
  width: 100%;
  height: 100px;
  margin-top: 10px;
  position: relative;
  .card {
    width: 80%;
    height: 100px;
 
  
    transform: matrix3d(1.0, 2.0);
    opacity: 0.9;
  }
  .content {
    position: absolute;
    bottom: 0px;
    right: 10px;
    color: pink;
    font-size: 16px;
    background: linear-gradient(to right, #fff, #C2C2C2);
    -webkit-background-clip: text;
    color: transparent;
  }
}
</style>