<template>
  <div class="search">
    <div class="showon-top"></div>
    <div class="topnav clearfix">
      <div class="fl back">
        <van-icon name="arrow-left" color="#fff" size="25px" @click="Backtrack" />
      </div>
      <div class="fr search-box">
        <van-field right-icon="search" placeholder="搜索音乐，歌词"   @click-right-icon="SearchResult" />
      </div>
    </div>
   <div>
   </div>
  </div>
</template>

<script>
export default {
  beforeRouteEnter(to, from, next) {
    next((vm) => {
     
    });
  },
  data() {
    return {
    
    };
  },

  created() {
    this.HotSearch();
  },
  methods: {
    SearchResult() {
      console.log('111');
    },
    async HotSearch() {
      const { data: res } = await this.$http.get("/search/hot");
      console.log(res);
    },
     Backtrack() {
    this.$router.go(-1)
    },
  },
};
</script>

<style lang="less" scoped>
.topnav {
  width: 100%;
  height: 46px;
  background-color: #191c1e;
  .back {
    width: 50px;
    text-align: center;
    margin-top: 20px;
  }
  .search-box {
    width: 300px;
    border-radius: 23px;
    overflow: hidden;
    height: 32px;
    margin-top: 18px;
    margin-right: 15px;

  }
}
/deep/.van-cell{
  padding: 4px 10px;
  background-color:#858585 ;
  color: #fff;
}
/deep/.van-field__control{
  color: #fff;
}
/deep/.van-field__right-icon{
  color: #fff;
}
</style>