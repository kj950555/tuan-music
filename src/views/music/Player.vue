<template>
  <div>
    音乐页面
    <Kj-Progress
      :prop-initial="imen.percent"
      :prop-index="index"
      @dotPercent-event="dotPercent"
      v-for="(imen, index) in pallet"
      :key="index"
    />

    <div class="color-area" ref="area"></div>
  </div>
</template>

<script>
import KjProgress from "@/components/Kj-Progress";
import Audio from "@/components/Audio";
export default {
  data() {
    return {
      trichroism: [{ palette: 0 }, { palette: 0 }, { palette: 0 }],
      pallet: [
        { name: "红色", percent: 50 },
        { name: "绿色", percent: 40 },
        { name: "蓝色", percent: 80 },
      ],
    };
  },
  components: {
    Audio,
    KjProgress,
  },
  mounted() {
    let area = this.$refs.area;
    this.trichroism[0].palette = (this.pallet[0].percent / 100) * 255;

    this.trichroism[1].palette = (this.pallet[1].percent / 100) * 255;
    this.trichroism[2].palette = (this.pallet[2].percent / 100) * 255;
    console.log(this.trichroism);
    area.style.backgroundColor = `rgb(${this.trichroism[0].palette}, ${this.trichroism[1].palette}, ${this.trichroism[2].palette} ,0)`;
  },
  methods: {
    dotPercent(data) {
      let area = this.$refs.area;
      console.log(data);

      this.trichroism[data.index].palette = data.dotPercent * 255;

      console.log(this.trichroism);
      console.log("过来的值==>", data);
      area.style.backgroundColor = `rgb(${this.trichroism[0].palette}, ${this.trichroism[1].palette}, ${this.trichroism[2].palette} ,0)`;
    },
  },
};
</script>

<style lang="less" scoped>
.color-area {
  width: 300px;
  height: 300px;
  z-index: 666;
  background: rgb(225,230,142);
}
</style>