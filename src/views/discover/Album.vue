<template>
  <div class="album">
    <!-- 最新MV -->
    <div class="title">最新上架</div>
    <div class="navigation clearfix">
      <div class="album-details fl" v-for="(imet, index) in NewestAlbum" :key="index">
        <div class="album-img">
          <img class="img-scale" :src="imet.picUrl+'?param=100y100'" alt />
        </div>
        <div class="album-referral">
          <div class="album-name">{{imet.name}}</div>
          <div class="album-artist">{{imet.artists[0].name}}</div>
        </div>
      </div>
    </div>
    <!-- 数字专辑 -->
    <div class="title">数字专辑</div>
    <div class="digital-album">
      <div class="digital-carousel clearfix" ref="digital">
        <div class="digital-content fl" v-for="(imet , index) in DigitalAlbum" :key="index">
          <div class="digital-intro clearfix" v-for="(album, i) in imet" :key="i">
            <div class="digital-img fl">
              <img class=" img-scale" :src="album.coverUrl+'?param=100y100'" alt />
            </div>
            <div class="digital-name fl">{{album.albumName}}</div>
            <div class="digital-bnt fl"><i class="iconfont">&#xe667;</i></div>
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
      NewestAlbum: [],
      DigitalAlbum: [],
    };
  },
  created() {
    this.getAlbum();
    this.getDigitalAlbum();
  },
  mounted() {},

  methods: {
    async getAlbum() {
      const { data: res } = await this.$http.get("/album/newest");
      console.log("专辑资源==>", res);
      if (res.code !== 200) {
        return this.$notify({
          type: "primary",
          message: "资源获取失败",
        });
      }
      for (let i = 0; i < 6; i++) {
        this.NewestAlbum.push(res.albums[i]);
      }
    },
    async getDigitalAlbum() {
      const { data: res } = await this.$http.get("/album/list?limit=9");

     this.DigitalAlbum.push(res.products.slice(0, 3))
     this.DigitalAlbum.push(res.products.slice(3, 6))
     this.DigitalAlbum.push(res.products.slice(6, 9))
      console.log('数字专辑==>',this.DigitalAlbum);
    },

  
  }
};
</script>

<style lang="less" scoped>
.title {
  font-size: 14px;
  font-weight: 800;
  text-align: left;
  text-indent: 15px;
  margin-top: 10px;
  color: #d9d9da;
  margin-bottom: 10px;
}
.navigation {
  width: 100%;
  overflow: hidden;
  .album-details {
    width: 33.33%;
    .album-img {
      width: 60px;
      height: 60px;
      overflow: hidden;
      padding-right: 15px;
      margin: 10px auto;
      background: url("../../assets/images/coverall.png") no-repeat -241px -248px;
    }
    .album-referral {
      text-align: left;
      width: 75px;
      margin: 0 auto;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;

      .album-name {
        font-size: 12px;
        color: #fff;
      }
      .album-artist {
        font-size: 10px;
        color: #d2d2d2;
      }
    }
  }
}
.digital-album {
  width: 100%;
  height: 120px;
  overflow-x: auto;
  .digital-carousel {
   width: 1040px;
   padding-left: 10px;
    .digital-content {
     width: 340px;
    }
    .digital-intro {
      width: 340px;
      height: 40px;
      line-height: 40px;
      .digital-img {
        width: 30px;
        height: 30px;
        margin: 5px 10px;
      }
      .digital-name {
        width: 250px;
       text-align: left;
       color: #fff;
      }
      .digital-bnt {
         line-height: 40px;
         font-size: 18px;
      }
    }
  }
}
</style>