<template>
  <div class="search">
    <div class="showon-top"></div>

    <div class="topnav clearfix">
      <div class="fl back">
        <van-icon name="arrow-left" color="#fff" size='18px' />
      </div>
      <div class="fr search-box">
        <van-field right-icon="search" placeholder="搜索音乐，歌词" @click-right-icon="SearchResult" />
      </div>
    </div>
  

  </div>
</template>

<script>
export default {
  created(){
    this.HotSearch()
  },
  methods:{
    SearchResult(){

    },
    async HotSearch(){
      const{data:res} = await this.$http.get('/search/hot')
      console.log(res);
    }
  }
};
</script>

<style lang="less" scoped>
.topnav {
  width: 100%;
  height: 46px;
  background-color: #191C1E;
  .back{
    width: 50px;
    height: 46px;
    text-align: center;
    line-height: 46px;
  }
  .search-box {
    width: 300px;
    border-radius: 23px;
    overflow: hidden;
    height: 40px;
    margin: 3px 5px;
    background-color: #a82828;
  }
}
</style>