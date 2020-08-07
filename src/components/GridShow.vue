<template>
  <div class="grid-show">
    <div class="exhibition clearfix"   >
      <div class="title">{{title}}</div>
        <div class="exhibition-content fl" v-for="(song, i) in songlists" :key="i">
          <div class="exhibition-img">
            <img class="img-scale" :src="song.coverImgUrl+'?param=100y100'" alt />
          </div>
          <div class="exhibition-message">
            <van-notice-bar
              color="#fff"
              :scrollable="false"
              background="#191C1E"
            >{{song.description}}</van-notice-bar>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    props:{
        title:[String, Number],
       songlists:[Array]
    }
    
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
        background-image: linear-gradient(-90deg, red, yellow);
        padding: 0.5px;
      }
    }
  }
}
</style>