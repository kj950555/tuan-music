<template>
  <div class="info-pages clearfix">
    <div class="portrait">
      <div class="portrait-img">
        <img class="img-scale" :src='urls' alt />
      </div>
      <div class>
        <samp>点击登录</samp>
      </div>
    </div>
    <van-cell is-link><i class="iconfont icon">&#xe7b8;</i> 发现音乐</van-cell>
    <van-cell is-link><i class="iconfont icon">&#xeb81;</i> 我的收藏</van-cell>
    <van-cell is-link><i class="iconfont icon">&#xe60c;</i>私人FM</van-cell>
    <van-cell is-link><i class="iconfont icon">&#xe61a;</i>朋友</van-cell>
    <van-cell is-link><i class="iconfont icon">&#xeb81;</i>我喜欢的音乐</van-cell>
  </div>
</template>

<script>
export default {
    data(){
        return{
            urls:require('../assets/images/timg.jpg')
        }
    }
};
</script>

<style lang="less" scoped>
.info-pages {
  width: 100%;

  .portrait {
      width: 100%;
      height: 160px;
      background-image: linear-gradient(to right, red , yellow);
      overflow: hidden;
      background: url(../assets/images/timg.jpg) no-repeat center;
    .portrait-img {
      width: 70px;
      height: 70px;
      margin: 20px auto 0px;
      border-radius: 50%;
      overflow: hidden;
     background-color: #fff;
     border: 1px solid #FF5C05;
    }
  }
  .icon{
      font-size: 16px;
      color:#5C5C5C;
      margin: 0 5px;
  }
}
</style>