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
      <transition name="slide-fade">
         <keep-alive >
        <router-view />
         </keep-alive >
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      tabTag: [
        { option: "艺人", icon: "friends-o", mane: "Singer", isActive: false },
        { option: "歌曲", icon: "music-o", mane: "Song", isActive: false },
        { option: "专辑", icon: "fire-o", mane: "Album", isActive: false },
        { option: "排行榜", icon: "fire-o", mane: "Ranking", isActive: false },
      ],
    };
  },
  created() {
    this.$router.push({ name: this.tabTag[0].mane });
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
  width: 300px;
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
  margin: 0 15px;
}


.slide-fade-enter-active {
  transition: all .25s linear;
}
.slide-fade-leave-active {
  transition: all .25s linear;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateY(100px);
  opacity: 0;
}
</style>