<template>
  <div class="Indicator">
    <div class="custom-indicator">
      <van-tag color="#CB3837" size="large">{{coord}}</van-tag>
    </div>
  </div>
</template>

<script>
export default {
  props: ["coord"],
  data() {
    return {};
  },

  computed: {},
};
</script>

<style lang="less" scoped>
.custom-indicator {
  position: absolute;
  right: 5px;
  bottom: 5px;
  padding: 2px 5px;
  font-size: 12px;
}
</style>