<template>
    <div class="cont">
        <div v-if='cont' class="cont-warp" v-html="cont">

        </div>
    </div>
</template>
<script>
import { setTimeout } from 'timers';
import { all } from 'q';
export default {
    name:"editor",
    data(){
        return{
            cont:''
        }
    },
    methods:{
        imgClick(){
           let imgEment = document.getElementsByTagName("img");
           let _this = this;
           for(let i = 0;i<imgEment.length;i++){
               imgEment[i].addEventListener("click",function(){
                    let imgSrc = imgEment[i].src
                    subject.getImgUrl(imgSrc);
                    return;
               })
           }
        }
    },
    created(){
        this.cont='';
        this.cont= subject.getContent()//this.$route.query.cont
    },
    mounted(){
        this.imgClick();
        let sH= document.body.scrollHeight
    }
}
</script>
<style lang="less">
    .cont-warp{
        width: 100%;
        font-size: 0px;
        padding: 15px;
        box-sizing: border-box;
        letter-spacing: 1px;
        margin: 0px;
        p{
            margin: 10px 0;
            line-height: 2;
            font-size: .15rem
        }
        img{
            margin: 10px 0;
            font-size: 0px;
        }
        h1,h2,h3,h4,h5,h6{
             margin: 5px 0;
             line-height: 2.5;
              font-size: .15rem
        }
        img{
            max-width: 100%;
            margin: 3px;
            height: auto;
            font-size: 0px;
        }
    }
</style>