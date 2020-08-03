<template>
  <div class="home">
    <div class="showon-top"></div>
    <van-nav-bar title="个性推荐">
      
      <template #right>
        <van-icon name="search" size="18" color="#fff" />
      </template>
      <template #left>
        <van-icon name="bars" size="18" color="#fff" />
      </template>
    </van-nav-bar>

    <div class="content">
      <router-view />
    </div>
    <van-tabbar v-model="active" inactive-color="#636363" active-color="#FFFFFF" @change="onChange">
      <van-tabbar-item icon="fire">热门</van-tabbar-item>
      <van-tabbar-item icon="audio">发现</van-tabbar-item>
      <van-tabbar-item icon="music">播放</van-tabbar-item>
      <van-tabbar-item icon="manager">登录</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      skip: [
        { naem: "Hot", isActive: true },
        { naem: "Discover", isActive: true },
        { naem: "Player", isActive: true },
        { naem: "Login", isActive: true },
      ],
    };
  },
  methods: {
    onChange(index) {
      this.$router.push({ name: this.skip[index].naem });
       
    },
  },
};
</script>

<style lang="less" scoped>
.home {
  width: 100%;

  .showon-top {
    width: 100%;
    height: 30px;
    background-color: #24262b;
  }
  .title {
    text-align: center;
    font-size: 16px;
    color: #fff;
    margin-top: 10px;
  }
  .content {
    position: fixed;
    top: 76px;
    left: 0;
    right: 0;
    bottom: 50px;
    overflow-y: auto;
  }
}
/deep/ .van-nav-bar {
  background-color: #191c1e;
  color: #fff;
}
/deep/ .van-swipe {
  border-radius: 10px;
  overflow: hidden;
}

/deep/ .van-nav-bar__title {
  color: #fff;
}
/deep/ .van-tabbar {
  background-color: #24262b;
}
</style>