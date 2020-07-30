<template>
    <div class="card clearfix">
        <div class="fl portrait">
           <img  src="" alt="">
        </div>
        <div class="fl message">
             <div class="thie">歌名/歌单名</div>
             <div class="thie">歌手/歌曲信息</div>
        </div>
        <div class="fr skip">
           <van-icon name="arrow" size="20px" />
        </div>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="less" scoped>
 .card{
     width: 360px;
     height: 75px;
     margin: 10px auto 0px;
     border-bottom: 1px #191C1E solid;
     .portrait{
         width: 68px;
         height: 68px;
         border-radius: 5px;
         background-color: aqua;
         overflow: hidden;
     }
     .message{
         margin-left: 40px;
     }
     .skip{
        line-height: 75px;
        margin-right: 25px;
     }
 }
</style>