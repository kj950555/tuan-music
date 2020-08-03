<template>
  <div class="album">
    <!-- 最新MV -->
    <div class="title">最新 专辑</div>
    <div class="navigation clearfix" >
      <div class="reveal" v-for="(imen , index) in NewestAlbum" :key="index">
        <div class="fl show-MV" >
          <div class="MV-img">
            <img class="img-scale" :src="imen.picUrl+'?param=130y130'"  alt />
          </div>
          <div class="message">
            <van-notice-bar color="#fff" background="#191C1E">{{imen.name}}</van-notice-bar>
            <van-notice-bar color="#fff" background="#191C1E">{{imen.artist.name}}</van-notice-bar>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  // 注册组件
  data() {
    return {
      NewestAlbum:[]
    };
  },
  created() {
    this.getAlbum();
  },
  methods: {
    async getAlbum() {
      const { data: res } = await this.$http.get("/album/newest");
      console.log('专辑资源==>', res);
      if (res.code !== 200) {
        return this.$notify({
          type: "primary",
          message: "资源获取失败",
        });
      }
      this.NewestAlbum = res.albums
      console.log(this.NewestAlbum);
    },
  },
};
</script>

<style lang="less" scoped>
.title {
  font-size: 16px;
  font-weight: 800;
  text-align: left;
  text-indent: 15px;
  margin-top: 10px;
  color: #d9d9da;
  margin-bottom: 15px;
}
.navigation {
  width: 100%;
  overflow: hidden;

  overflow-x: auto;
  .reveal {
    width: 900px;
    .show-MV {
      width: 130px;
      margin: 0px 0px 10px 20px;
      border-radius: 10px;
      overflow: hidden;
      background-color: #191c1e;
      box-shadow: 2px -1px 5px #191c1e;
    }
    .MV-img {
      width: 130px;
      height: 130px;
      border-radius: 5px;
      overflow: hidden;
    }
    .message {
      p {
        width: 88px;
        margin: 0px auto;
        text-align: left;
        color: #fff;
        padding-bottom: 10px;
      }
    }
  }
}
</style>