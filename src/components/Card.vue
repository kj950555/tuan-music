<template>
  <div class="card clearfix">
    <div class="fl portrait">
      <img class="img-scale" :src="imen.picUrl+'?param=68y68'" alt />
    </div>
    <div class="fl message">
      <div class="thie">{{imen.name}}</div>
      <div class="copyweier">{{imen.copywriter}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["imen"],
};
</script>

<style lang="less" scoped>
.card {
  width: 360px;
  height: 75px;
  margin: 10px auto 0px;
  border-bottom: 1px #2F3234 solid;
  .portrait {
    width: 68px;
    height: 68px;
    border-radius: 5px;
    background-color: aqua;
    overflow: hidden;
  }
  .message {
    margin-left: 10px;
    width: 280px;
    text-align: center;
    .thie {
      margin-top: 20px;
      font-size: 10px;
      color: #fff;
    }
    .copyweier{
        margin-top: 10px;
        font-size: 12px;
    }
  }
  .skip {
    line-height: 75px;
    margin-right: 25px;
  }
}
</style>