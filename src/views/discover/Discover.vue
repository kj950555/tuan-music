<template>
  <div class="disover">
    <div class="clearfix cut-tag">
      <div
        ref="options"
        class="fl options"
        v-for="(itme,index) in tabTag"
        :key="index"
        @click="Switchover($event ,index)"
      >{{itme.option}}</div>
      <i class="line-tag" ref="lingTag"></i>
    </div>
    <div class="particulars">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      tabTag: [
        { option: "艺人", icon: "friends-o", mane: "Singer", isActive: true },
        { option: "歌曲", icon: "music-o", mane: "Song", isActive: false },
        { option: "专辑", icon: "fire-o", mane: "Album", isActive: false },
      ],
    };
  },
  created() {
    this.$router.push({ name: "Singer" });
  },
  methods: {
    Switchover(e, index) {
      if (this.tabTag[index].isActive == true) {
        return;
      }
      for (let i = 0; i < this.tabTag.length; i++) {
        if (this.tabTag[i].isActive == true) {
          this.tabTag[i].isActive = false;
          break;
        }
      }
      this.tabTag[index].isActive = true;
      let lingTag = this.$refs.lingTag;
      lingTag.style.left = e.srcElement.offsetLeft + "px";
      this.$router.push({ name: this.tabTag[index].mane });
    },
  },
};
</script>

<style lang="less" scoped>
.cut-tag {
  width: 250px;
  height: 28px;
  line-height: 28px;
  font-size: 16px;
  color: #fff;
  box-shadow: 2px -1px 5px #636363;
  border-radius: 0px 0px 30px 0px;
  overflow: hidden;
  background-color: #f2830d;
  position: relative;
  .line-tag {
    width: 32px;
    position: absolute;
    left: 20px;
    bottom: 0;
    display: block;
    border-bottom: 2px #fff solid;
    transition: all 0.5s;
  }
}

.particulars {
  width: 100%;
}
.options {
  margin: 0 20px;
}
</style>