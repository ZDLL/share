<template>
    <div class='my-foot'>
        <div class='foot-left'>
            <img src="@/assets/img/biglogo.png" alt="">
        </div>
        <div class='foot-mid'>
            <h3>潮上奢侈品</h3>
            <span>潮上，让潮流触手可及</span>
        </div>
        <div class='foot-reight' @click="downAppClick">下载APP</div>
    </div>
</template>
<script>
export default {
    name:"myfoot",
    data(){
        return{}
    },
    methods:{
        downAppClick(){
            this.$router.push({
                path:"/down"
            })
        }
    }
}
</script>
<style lang="less">
    .my-foot{
        position: fixed;
        bottom: 0px;
        width: 100%;
        height: 70px;
        background-color: #fff;
        z-index: 2;
        padding:15px;
        box-sizing: border-box;
        overflow: hidden;
         border-top: 1px #eee solid;
        .foot-left,.foot-mid, .foot-reight {
            display: inline-block;
            vertical-align: top;
        }
         .foot-left{
             width: 40px;
             height: 40px;
             font-size: 0px;
             float: left;
             margin-right: 12px;
             img{
                 width: 100%;
                 height: 100%;

             }
         }
         .foot-mid{
             line-height: 1.5;
             h3{
                 color: #1D1E2C;
                 font-size: .16rem;
                 font-weight: 500;
             }
             span{
                 color: #69707F;
                 font-size: .12rem;
             }
         }
         .foot-reight{
             height: 40px;
             width: 85px;
             background-color: #000000;
             color: #FFFFFF;
             text-align: center;
             line-height: 42px;
             float: right;
             font-size: .14rem;
             border-radius: 20px;
         }

    }
</style>