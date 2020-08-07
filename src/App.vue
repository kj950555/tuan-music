<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
body {
  background-color: #191c1e;
}
.font-color {
  color: #fff;
}
p {
  margin: 0;
  padding: 0;
}
.img-scale {
  width: 100%;
  height: 100%;
  display: block;
}
.fl {
  float: left;
}
.fr {
  float: right;
}
.clearfix::after {
  display: block;
  content: "";
  clear: both;
}
@font-face {
  font-family: "iconfont";
  src: url("../src/assets/images/iconfont/iconfont.eot");
  src: url("../src/assets/images/iconfont/iconfont.eot?#iefix")
      format("embedded-opentype"),
    url("../src/assets/images/iconfont/iconfont.woff") format("woff"),
    url("../src/assets/images/iconfont/iconfont.ttf") format("truetype"),
    url("../src/assets/images/iconfont/iconfont.svg#iconfont") format("svg");
}
.iconfont {
  font-family: "iconfont" !important;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
   color: #575B62;
}
.showon-top {
    width: 100%;
    height: 30px;
    background-color: #24262b;
  }
</style>
