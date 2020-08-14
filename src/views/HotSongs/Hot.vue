<template>
  <div class="hot">
    <div class="title">热门推荐</div>
    <div class="slideshow">
      <van-swipe @change="onChange" :autoplay="3000" style="height: 180px; width:100%" >
        <van-swipe-item v-for="(inet,index) in hotSlideshow" :key="index" >
          <img class="img-scale" :src="inet.imageUrl+'?param=420y200'" alt />
          <!-- <div class=""></div> -->
        </van-swipe-item>
        <template #indicator>
          <Indicator :coord="coord" />
        </template>
      </van-swipe>
    </div>
    <div class="title">推荐歌单</div>
    <div class="everyday">
      <Card v-for="(imen,index) in discover" :key="index" :imen="imen" />
    </div>
  </div>
</template>

<script>
import Indicator from "@/components/Indicator";
import Card from "@/components/Card";

export default {
  data() {
    return {
      hotSlideshow: [],
      coord: "",
      discover: [],
    };
  },
  
  created() {
    console.log('1111');
    // 获取轮播图资源
    this.Slideshow();
    // 获取发现
    this.getDiscover();
  },

  components: {
    // 注册组件
    Indicator,
    Card,
  },
  methods: {
    // 获取轮播图资源
    async Slideshow() {
      const { data: res } = await this.$http.get("/banner");
      if (res.code !== 200) {
        return this.$notify({
          type: "primary",
          message: "通知内容",
        });
      }
      this.hotSlideshow = res.banners;
      console.log("热门歌曲", this.hotSlideshow);
    },
    async getDiscover() {
      const { data: res } = await this.$http.get("/personalized?limit=5");
      if (res.code !== 200) {
        return this.$notify({
          type: "primary",
          message: "通知内容",
        });
      }
      console.log(res);
      this.discover = res.result;
      console.log(this.discover);
    },
    onChange(index) {
      this.coord = this.hotSlideshow[index].typeTitle;
    },
  },
};
</script>

<style lang="less" scoped>
.title {
  text-align: center;
  font-size: 16px;
  color: #fff;
  margin-top: 10px;
  
}
.slideshow {
  margin-top: 20px;
  width: 100%;
}
.everyday {
  width: 100%;
}
/deep/ .van-swipe{
  border-radius: 0px;
}
</style>