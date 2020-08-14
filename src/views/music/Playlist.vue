<template>
  <div class="playlist">
    <div class="selection clearfix" @click="ShowHidden">
      <i class="iconfont icon fl">&#xe7f8;</i>
      <span class="fl">选择分类</span>
    </div>
    <!-- 分类 -->
    <div class="category" v-show="isActive">
      <div class="clearfix details" v-for="(imen, index) in option" :key="index">
        <div class="fl theme">{{imen.text}}</div>
        <div class="fl marked">
          <van-tag
            v-for="(tag , i) in imen.label"
            :key="i"
            color="#ffe1e1"
            :text-color="tag.activity ?  '#FF0D00' :'#666666' "
            plain
            size="large"
            @click="tagActivity(index,i)"
          >{{tag.name}}</van-tag>
        </div>
      </div>
    </div>
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
      option: [
        { text: "语种", label: [] },
        { text: "风格", label: [] },
        { text: "场景", label: [] },
        { text: "情感", label: [] },
        { text: "主题", label: [] },
      ],
      isActive: false,
    };
  },
  created() {
    this.getPlaylist();
    this.$router.push({ name: "Easyman" });
  },
  // 注册组件
  components: {
    VinylRecord,
  },
  methods: {
    async getPlaylist() {
      const { data: res } = await this.$http.get("/playlist/catlist");
      console.log(res);
      if (res.code !== 200) {
        return;
      }
      for (let i = 0; i < this.option.length; i++) {
        for (let j = 0; j < res.sub.length; j++) {
          if (res.sub[j].category == i) {
            this.option[i].label.push(res.sub[j]);
          }
        }
      }
      console.log(this.option);
    },

    // 分类高亮显示
    tagActivity(index, i) {
      for (let i = 0; i < this.option.length; i++) {
        for (let j = 0; j < this.option[i].label.length; j++) {
          if (this.option[i].label[j].activity == true) {
            this.option[i].label[j].activity = false;
            break;
          }
        }
      }
      this.option[index].label[i].activity = true;
    },

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