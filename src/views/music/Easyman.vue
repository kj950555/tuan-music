<template>
  <div class="easyman">
    <div class="exhibition clearfix">
      <div class="title">精品歌单</div>
      <div class="exhibition-content fl" v-for="(imen, index) in playlists" :key="index">
        <div class="exhibition-img">
          <img class="img-scale" :src="imen.coverImgUrl + '?param=100y100'" alt />
        </div>
        <div class="exhibition-message">
          <van-notice-bar color="#fff" :scrollable="false" background="#191C1E">{{imen.copywriter}}</van-notice-bar>
        </div>
      </div>
    </div>
   <grid-show v-for="(imen,index) in hotPlaylist" :key="index" :title='imen.name' :songlists='imen.songlists' />

  </div>
</template>

<script>
import GridShow from "@/components/GridShow";
export default {
  data() {
    return {
      playlists: [],
      hotPlaylist: [
        {name:'华语',songlists:[]},
        {name:'粤语',songlists:[]},
        {name:'ACG',songlists:[]},
        {name:'流行',songlists:[]},
        {name:'电子',songlists:[]},
      ],
      lazyComponent: true,
    };
  },
  created() {
    this.getExhibition();
    for(let i =0;i<this.hotPlaylist.length;i++){
      this.getHotname(this.hotPlaylist[i].name,i);
    }
    
  },
 
  // 注册组件
  components: {
    GridShow,
  },
  methods: {
    //  获取推荐歌单
    async getExhibition() {
      const { data: res } = await this.$http.get(
        "/top/playlist/highquality?limit=6"
      );
      if (res.code !== 200) {
        return;
      }
      this.playlists = res.playlists;
    },
   
    getHotname(name, index) {
      this.axios({
        method: "GET",
        url: `/top/playlist?limit=6&cat=${name}`,
      })
        .then((res) => {
          // console.log(res.data);
          if (res.data.code == 200) {
           
            this.hotPlaylist[index].songlists = res.data.playlists;
             console.log(this.hotPlaylist[index]);
          }
        })
        .catch((err) => {});
    },
  },
};
</script>

<style lang="less" scoped>
.easyman {
  transition:all .5s ease-in .1s;
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
        background-image: linear-gradient(-90deg, red, yellow);
        padding: 0.5px;
      }
    }
  }
}
</style>