<template>
  <div id="app">

    <router-view/>
  </div>
</template>
<script>
import myFoot from './components/foot.vue'
export default {
  name:"min",
  components:{
    myFoot
  }
  
}
</script>

<style lang="less">
*{
  padding: 0px;
  margin: 0px;
}
html{
  font-size: 100px;
}
body{
  height: 100%;
  width: 100%;
  // overflow: hidden;
   overflow-x: hidden;
  overflow-y: auto;
  background-color: #fff;
  // -webkit-overflow-scrolling: touch;
}
body::-webkit-scrollbar{
width:0;
height:0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  font-size: 0px;
  // -webkit-overflow-scrolling: touch;
  // -webkit-tap-highlight-color: transparent;
  // -webkit-user-select: none;
  // -moz-user-focus: none;
  // -moz-user-select: none;
}
</style>
