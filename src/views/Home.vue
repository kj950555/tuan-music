<template>
  <div class="home">
    <div class="showon-top"></div>
    <van-nav-bar >
      <template #title>
        <div class="navigation">
         <div class="tab-control clearfix">
                <div class="fl title"  v-for="(item,index) in skip" :key="index" @click="onChange(index,item)" :class="item.isActive ? 'active' : ''">
                      {{item.title}}
                </div>
         </div>
        </div>
      </template>
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
  </div>
</template>

<script>
export default {
 
  data() {
    return {
      active: 0,
      skip: [
        {title:"热门",  naem: "Hot", isActive: false ,urls:['Hot']},
        {title:"发现",  naem: "Discover", isActive: false,urls:['Discover','Singer','Album','Song','Ranking'] },
        {title:"歌单", naem: "Playlist", isActive: false,urls:['Playlist','Easyman'] },
        {title:"播放", naem: "Login", isActive: false,urls:['Login'] },
      ],
    };
  },
  created(){
  this.ActiveIem()
  },
  methods: {
    ActiveIem(){
     for(let i =0 ;i<this.skip.length;i++){
       if(this.skip[i].urls.indexOf(this.$route.name) > -1){
        
         this.skip[i].isActive = true
       }
     }
    },
    onChange(index ,item) {
      if(item.isActive){
        return
      }
      for(let i =0 ; i<this.skip.length;i++){
        if(this.skip[i].isActive == true){
          this.skip[i].isActive = false
          break
        }
      }
      this.skip[index].isActive = true
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
   
  }
  .navigation{
    width: 200px;
    overflow: hidden;

  }
  .tab-control{
    .title{
      width: 50px;
      font-size: 14px;
       margin-top: 0;
    }
    .active{
      font-size: 16px;
      font-weight: 800;
    }
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