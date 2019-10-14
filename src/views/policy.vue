<template>
    <div class="polid">
           <img class='polid-img' src="@/assets/img/img10.png" alt="">
    </div>
</template>
<script>
export default {
    data(){
        return{}
    },
    created(){
        document.getElementsByTagName("title")[0].innerText = '隐私政策';
    }
    
}
</script>
<style lang="less">
    .polid{
      .polid-img{
          width: 100%;
      }
    }
</style>