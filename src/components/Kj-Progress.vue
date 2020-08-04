<template>
  <div class="progres" ref="progres" @touchend="Coordinates">
    <div class="extent" ref="extent" :class="{'extentW-active':isDrag}"></div>
    <div
      class="dot"
      @touchstart="clicks"
      @touchmove="move"
      ref="dot"
      :class="{'slide-active':isDrag}"
    >
      <div class="red-dot"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //   初始坐标
      dotX: 0,
      //   移动坐标
      dotsX: 0,
      //   滑块位置
      dotLeft: 0,
      //   滑块宽度
      maxProgress: 0,
      //   进度条宽度
      extentW: 0,
      //   判断是否s使用过渡事件
      isDrag: false,
      // 百分比
      dotPercent: 0,
    };
  },
  props: {
    PropInitial: {
      type: [Number],
      default: 0,
    },
    PropIndex:{
       type: [Number]
    }
  },
  created() {
    //   初始进条，和滑块位置
    this.$nextTick(() => {
      let dot = this.$refs.dot;
      // 进度条
      let extent = this.$refs.extent;

      this.dotPercent = this.PropInitial / 100;
      


      let progres = this.$refs.progres;
      //   获取最大宽度
      this.maxProgress = progres.clientWidth;


      //   获取进度条宽度
      this.extentW = this.$refs.extent.clientWidth;
      this.extentW = this.dotX;

      let left = this.dotPercent * this.maxProgress;
      dot.style.left = `${left}px`;
      extent.style.width = `${left}px`;
    });
  },
  methods: {
    clicks(e) {
      //   console.log(e.targetTouches[0].pageX);
      this.dotX = e.targetTouches[0].pageX;
    },

    move(e) {
      this.isDrag = false;
      // 滑块
      let dot = this.$refs.dot;
      // 进度条
      let extent = this.$refs.extent;
      this.dotsX = e.targetTouches[0].pageX;
      // 获取滑块移动位置
      let left = this.dotLeft + this.dotsX;
      left = left <= 0 ? 0 : left >= this.maxProgress ? this.maxProgress : left;

      dot.style.left = `${left}px`;
      extent.style.width = `${left}px`;
      this.dotPercent = left/this.maxProgress
    //   console.log(this.dotPercent);
      this.$emit("dotPercent-event" ,  { dotPercent: this.dotPercent ,index:this.PropIndex})

    },
    Coordinates(e) {
      let dot = this.$refs.dot;
      // 进度条
      let extent = this.$refs.extent;
      this.isDrag = true;
      let left = e.changedTouches[0].pageX;
      left = left <= 0 ? 0 : left >= this.maxProgress ? this.maxProgress : left;
      dot.style.left = `${left}px`;
      extent.style.width = `${left}px`;
      this.dotPercent = left/this.maxProgress
    //   console.log(this.dotPercent);
      this.$emit("dotPercent-event" , { dotPercent: this.dotPercent ,index:this.PropIndex})
    },
  },
};
</script>

<style lang="less" scoped>
.progres {
  width: 95%;
  margin: 20px auto;
  height: 5px;
  background-color: #c2c2c4;
  position: relative;
}
.extent {
  width: 0px;
  height: 5px;
  background-color: #f02408;
}
.dot {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  position: absolute;
  margin: -7.5px 0px 0px -10px;
  left: 0px;
  top: 0px;
  background-color: #fff;
}
.red-dot {
  width: 5px;
  height: 5px;
  position: absolute;
  top: 50%;
  left: 50%;
  border-radius: 50%;
  margin: -2.5px 0 0 -2.5px;
  background-color: #f02408;
}
.slide-active {
  transition: left 0.3s ease-in-out;
}
.extentW-active {
  transition: width 0.3s ease-in-out;
}
</style>