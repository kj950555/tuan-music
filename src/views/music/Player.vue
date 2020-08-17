<template>
  <div class="player">
    <!-- 音乐页面 -->
    <div class="navigation clearfix">
      <div class="fl get-back">
        <van-icon name="arrow-left" size="30px" color="#fff" @click="Backtrack" />
      </div>
      <div class="fl artist-name">歌名</div>
    </div>
    <div class="player-img" ref="picture">
     
      <div class="song-img">
        <img class="img-scale" :src="ViewPlayback.image" alt />
      </div>
    </div>
    <div class="circular">
      <van-circle
        v-model="currentRate"
        :rate="rate"
        size="200px"
        :color="gradientColor"
        layer-color="#D3D6D8"
      />
    </div>

   <div class="lyrics">

   </div>


  </div>
</template>

<script>
// 引入vueX数据管理中心
import { createNamespacedHelpers } from "vuex";
const { mapMutations, mapState } = createNamespacedHelpers("menuModule");
export default {
  beforeRouteEnter(to, from, next) {
    next((vm) => {
     vm.axios({
        methods: "GET",
        url: `/lyric?id=${vm.ViewPlayback.id}`,
      })
        .then((res) => {
          console.log("歌词详情==》", res);
          vm.lyrics = res.data.lrc.lyric.split("\n")
        })
        .catch((err) => {
          console.log(err);
        });
     

      vm.Displayplayer({ valu: false });
    });
  },
  data() {
    return {
      currentRate: 0,
      rate: 10,
      gradientColor: {
        "0%": "#ED466F",
        "100%": "#881A90",
      },
      timer:null,
      deg:0,
      lyrics:[]
    };
  },
  // 计算属性
  computed: {
    //  解构vuex的state文件数据、
    ...mapState(["ViewPlayback" ,"TheSongList",]),
    
  },
  components: {},
  mounted() {
    this.Rotate()
  },
  methods: {
    // 解构vuex的mutations.js文件的事件
    ...mapMutations(["Displayplayer"]),
    Backtrack() {
      this.$router.go(-1);
    },
    GetLyrics(){
      let result = timeExp.exec(line)

    },
    Rotate(){
      let picture= this.$refs.picture
      console.log(picture);
      this.timer = setInterval(() => {
        
        picture.style.transform=`rotate(${this.deg}deg)`;
        if(this.deg >=360){
          this.deg=0
        }else{
          this.deg++
        }
        
      },25)
    },
  },
};
</script>

<style lang="less" scoped>
.player {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  z-index: 200;
  background: #191c1e;
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
  .player-img {
    width: 200px;
    height: 200px;
    background: url("../../assets/images/coverall.png") no-repeat center center;
    border-radius: 50%;
    position: absolute;
    margin-left: -100px;
    left: 50%;
    top: 100px;
    background-size: 100% 100%;
    overflow: hidden;
    .song-img {
      width: 130px;
      height: 130px;
      background-color: bisque;
      border-radius: 50%;
      position: absolute;
      left: 50%;
      top: 50%;
      margin: -65px 0 0 -65px;
      overflow: hidden;
    }
  }
  .circular {
    position: absolute;
    margin-left: -100px;
    left: 50%;
    top: 100px;
  }
  .lyrics{
    width: 270px;
    height: 100px;
    background-color: blueviolet;
    position: absolute;
    top: 310px;
    left: 50px;
  }
}
/deep/.van-nav-bar {
  border: 0;
  background-color: transparent;
}
</style>