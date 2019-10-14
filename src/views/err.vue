<template>
    <div class='err-page'>
        <img src="@/assets/img/errimg.png" alt="错误">
        <div>{{mesg}}</div>
    </div>
</template>
<script>
export default {
    name:"err",
    data(){
        return{
            mesg:"错误"
        }
    },
    created(){
        this.mesg = this.$route.query.msg
    }   
}
</script>
<style lang="less">
    .err-page{
        width: 150px;
        margin: 120px auto;
        text-align: center;
        line-height: 1.8;
        font-size: 14px;
        color: #666;
        letter-spacing: 1px;
        img{
            width: 100px;
            // height: 100px;
        }
    }
</style>