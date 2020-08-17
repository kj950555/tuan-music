<template>
  <div class="playlist">
    <div class="content">
      <router-view />
    </div>
    <!-- 分类end -->
  </div>
</template>

<script>
import VinylRecord from "@/components/VinylRecord";
export default {
  data() {
    return {
      isActive: false,
    };
  },
  created() {
    this.$router.push({ name: "Easyman" });
  },
  // 注册组件
  components: {
    VinylRecord,
  },
  methods: {
  


    ShowHidden() {
      if (this.isActive == true) {
        this.isActive = false;
      } else {
        this.isActive = true;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.playlist {
  overflow: hidden;
  .selection {
    width: 80px;
    background-color: #1d1e1e;
    border-radius: 10px;
    margin-left: 10px;
    margin-top: 5px;
    box-shadow: -1px -1px 2px #636363;
    padding: 5px;
    position: absolute;
    right: 10px;
    .icon {
      font-size: 18px;
      color: #808073;
      display: block;
     
    }
    span {
      font-size: 14px;
      font-weight: 400;
      color: #808073;
      display: block;
    
    }
  }
  .category {
    background-color: #fafafa;
    margin: 10px;
    padding: 10px;
    border-radius: 10px;
    position: absolute;
    left: 0;
    top: 110px;
    overflow-y: auto;
    height: 300px;
    z-index: 999;
    .details {
      margin-bottom: 10px;
      .theme {
        width: 19%;
        text-align: center;
        color: #000;
        font-weight: 800;
        font-size: 16px;
      }
      .marked {
        width: 80%;
        text-align: left;
      }
    }
  }
  .content{
    margin-top: 10px;
  }
}
/deep/ .van-tag {
  margin-right: 10px;
  margin-bottom: 10px;
}
</style>