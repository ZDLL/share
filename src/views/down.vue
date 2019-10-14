<template>
    <div class='down-page'>
        <div class='down-cont'>
            <div class='down-imglist' style="height:645px">
                <div class='left'>
                    <img src="@/assets/img/down1.jpg" alt="">
                </div>
            </div>
            <div class='down-btn'>
                <img @click="downClick(1)" src="@/assets/img/google.png" alt="">
               <img  @click="downClick(2)" style="margin-left:3%" src="@/assets/img/app.png" alt="">
            </div>

            <!-- 1111111111111 -->
            <div class='down-imglist'>
                <div class='left imgLeft' :class="{'let':listInd1==1}">
                    <img src="@/assets/img/down2.jpg" alt="">
                </div>
                <div class='right txtRight' :class='listInd1==1?"rig":""'><img src="@/assets/img/down2_t.png" alt=""></div>
            </div>


        <!-- 2222222222 -->
            <div class='down-imglist'>
                <div class='left imgRight' :class='listInd2==2?"rig":""'>
                    <img src="@/assets/img/down3.jpg" alt="">
                </div>
                <div class='right txtLeft' :class='listInd2==2?"let":""'><img src="@/assets/img/down3_t.png" alt=""></div>
            </div>

            <!-- 333333 -->
            <div class='down-imglist'>
                <div class='left imgLeft' :class='listInd3==3?"let":""'>
                    <img src="@/assets/img/down4.jpg" alt="">
                </div>
                <div class='right txtRight' :class='listInd3==3?"rig":""'><img src="@/assets/img/down4_t.png" alt=""></div>
            </div>
            <!-- 44444444444444 -->
            <div class='down-imglist'>
                <div class='left imgRight' :class='listInd4==4?"rig":""'>
                    <img src="@/assets/img/down5.jpg" alt="">
                </div>
                <div class='right txtLeft' :class='listInd4==4?"let":""'><img src="@/assets/img/down5_t.png" alt=""></div>
            </div>

        </div>
    </div>
</template>
<script>
export default {
    name:"down",
    data(){
        return{
            listInd:0,
           listInd1:"0",
           listInd2:"0",
           listInd3:"0",
           listInd4:'0',
           addFex:false
        }
    },
    methods:{
        handleScroll(){
            let scrollObj = document.getElementById("scrll") 
            let scrollObjBody=  document.getElementById("scrllbod"); // 滚动区域
            let scrollTop = scrollObj.scrollTop; // div 到头部的距离
            let  scrollTopBody = scrollObjBody.scrollTop;
            let scr = scrollTopBody?scrollTopBody:scrollTop
            if(scr>500){
                let num=0;
                if(parseInt(scr/500) ==1){
                    this.listInd1=1
                }else if(parseInt(scr/500) ==2){
                    this.listInd2 =2
                }
                else if(parseInt(scr/500) ==3){
                    this.listInd3 =3
                }
                else if(parseInt(scr/500) ==4){
                    this.listInd4 = 4
                }
            }
        },
        downClick(type){
            if(type=="1" ){//安卓
                window.location.href = 'https://sj.qq.com/myapp/detail.htm?apkName=com.chaoshang.huatianli'
            }else if(type=="2"){//苹果
                window.location.href ='https://apps.apple.com/cn/app/%E6%BD%AE%E4%B8%8A-%E5%A5%A2%E4%BE%88%E5%93%81-%E6%BD%AE%E6%B5%81/id1477925983?from=singlemessage&isappinstalled=0'
            }
        }
    },
    created(){},
    mounted(){
        window.scroll(0, 0);
        window.addEventListener('scroll', this.handleScroll,true)
    },
    destroyed(){
        window.removeEventListener('scroll', this.handleScroll)
    }
}
</script>
<style lang="less">
.down-page{
  
    .down-cont{
            position: relative;
            overflow-x: hidden;
            overflow-y: scroll;
            padding-bottom: 70px;
        .down-imglist{
            position: relative;
            overflow: hidden;
            width: 100%;
            height: 530px;
            div{
                height: 100%;
            }
            img{
                width: 100%;
                height: 100%;
            }
        
            .left,.right{
                position: absolute;
                top:0px;
                width: 100%;
                // transition:All 2s ease-in-out;
                // -webkit-transition:All 2s ease-in-out;
                // -moz-transition:All 2s ease-in-out;
                // -o-transition:All 2s ease-in-out;

                 transition:All 0.5s linear;
                -webkit-transition:All 0.5s linear;
                -moz-transition:All 0.5s linear;
                -o-transition:All 0.5s linear;
            }
            .imgLeft{
                left:-15%;
            }
            .imgRight{
                right: -15%
            }
            .txtLeft{
                left:-5%;
            }
            .txtRight{
                right:-5%
            }
            .let{
                left: 0%
            }
            .rig{
                right: 0%
            }
            .moveLeft{
                transform:translate(-50%,0);
                -webkit-transform:translate(-50%,0);
                -moz-transform:translate(-50%,0);
                -o-transform:translate(-50%,0);
                -ms-transform:translate(-50%,0);

            }
            .moveRight{
                transform:translate(0,10px);
                -webkit-transform:translate(0,10px);
                -moz-transform:translate(0,10px);
                -o-transform:translate(0,10px);
                -ms-transform:translate(0,10px);

            }
        }
    }
    .mar{
        padding-bottom: 70px;
    }
    .down-btn{
        position: fixed;
        padding:10px 4%;
        bottom: 0px;
        height: 50px;
        font-size: 0px;
        vertical-align: top;
        // position: fixed;
        z-index: 999;
        background-color: #fff;
        img{
            width: 48%;
            height: auto
        }
    } 
}

@media (min-width:376px){
   .down-page{
        .down-cont{
            .down-imglist{
                height: 622px;
            }
        }
   }
}
    

</style>