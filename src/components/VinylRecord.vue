<template>
  <div class="vinyl-record">
    <div class="vinyl-cartoon">
        <div class="vinyl-img">
            <img src="" alt="">
        </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.vinyl-record {
  .vinyl-cartoon {
      position: relative;
      width: 100px;
      height: 100px;
      border-radius: 50%;
      overflow: hidden;
      background-image: radial-gradient( #51504F,#0B0B0B ,#51504F,#51504F,);
      .vinyl-img{
          position: absolute;
          top: 50%;
          left: 50%;
          margin-left: -25px;
          margin-top: -25px;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background-color: #F86C4D;
      }







      
  }
}
</style>