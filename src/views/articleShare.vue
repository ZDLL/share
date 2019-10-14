<template>
    <div class="art-page">
        <div class="art-page-cont" v-if='resData && resData.comment && resData.article'>
            <div v-show='noScore' class="cont" v-if='resData.article'>
                <div class="cont-img">
                    <div class='cont-img-div' v-if='bigImgUrl'>
                        <img class='dnyimg' :src='bigImgUrl' alt="图片">
                    </div>
                      <myNocont v-else/>
                
                    <div class='shadow'>{{resData.article.topic||'--'}}</div>
                    <div class='cont-imgs' @click="showBingImgClick">
                        <img src="@/assets/img/imgicon.png" alt="图片集">
                    </div>
                </div>
                <h2>{{resData.article.title}}</h2>
                <div class='heade'>
                <!-- <span class='heade-left'>
                    <img src="@/assets/img/lefticon.png" alt="left">
                </span> -->
                <div class='heade-cont'>
                    <span class='portrait'>
                        <img :src='resData.article.head_portrait' alt="">
                        <span v-show='resData.article.is_cert==1' class='isVip'>v</span>
                    </span>
                   
                    <span class='userName' :class='{"lin":!resData.article.cert}'>{{resData.article.nickname || '--'}}</span>
                    <span v-if='resData.article.cert' class='userTage'>{{resData.article.cert || '--'}}</span>
                </div>
                <!-- <div class='heade-reight'>
                    <div class='focus'>已关注</div>
                        <div class='focus focusActive'>+ 关注</div>
                </div> -->
                </div>
                <div class='xian'><span class='xian-span'></span></div>
                <div class='cont-tetx' v-if='resData.article.publish_type==1' v-html='resData.article.content'>
                </div>
                <div class='myVideo-warp'>
                     <video class='myVideo' v-if='resData.article.video_url' controls="controls">
                        <source :src='resData.article.video_url' type="video/mp4" />
                    </video>
                </div>
            </div>
            <myNocont v-else/>
            <div  v-show='noScore' class="review">
                <h2>热门评论</h2>
                <ul v-if='resData.comment && resData.comment.length>0'>
                    <li class='review-list' v-for='(item,inde) in resData.comment' :key='inde'>
                        <span class='review-img'>
                            <img :src='item.head_portrait' alt="头像">
                        </span>
                        <div class="review-top">{{item.nickname || '--'}}</div>
                        <div class="review-mid">
                            <span class='mid-left'>{{item.content || '--'}}</span>
                            <span class="mid-right">{{item.praise || '0'}} <i class="icon"><img src="../assets/img/love.png" alt="点赞"></i></span>
                        </div>
                        <div class="review-btm">{{item.create_time || '--'}}</div>
                    </li>
                </ul>
                <myNocont v-else/>
            </div>
            <div class='bigImg' v-show='imgSlider'>
                <swiper :options="swiperOption" ref="mySwiper" class='sliderBox' v-if='someList.length>0'>
                    <swiper-slide v-for="(item,index) in someList" :key="index">
                        <!-- <img :src='item.html' alt="图片"/> -->
                            <div class='dnyimg-swper'>
                                <img :src='item.src' alt="图片"/>
                            </div>
                           
                    </swiper-slide>
                </swiper>
                 <myNocont v-else/>
                <div class='close' @click="closeBigImgClick">
                    <img src="@/assets/img/close.png" alt="关闭" />
                </div>
                <div class='sliderTxt'>{{activeImg}} / {{allImg}}</div>
            </div>
        </div>
        <myNocont v-else/>
        <myFoot/>
    </div>
</template>
<script>
// import {slider, slideritem} from 'vue-concise-slider'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import {sendPostFunc} from '@/requst/axiosFunc.js';
import apiUrl from '@/requst/api.js'
import myFoot from '../components/foot.vue'
import myNocont from '../components/nocont.vue'
export default {
    name:"artpage",
    data(){
        let _this =this
       return{
           smallImg:[],
           bigImgUrl:"",
           someList:[],
           imgSlider:false,
            allImg:'',
            activeImg:1,
            swiperOption: {
                notNextTick: true,
                speed:400,
                direction: 'horizontal',
                setWrapperSize: true,
                autoHeight: true,
                initialSlide:0,
                on:{
                    slideChangeTransitionEnd:function (){
                        _this.activeImg = parseInt(this.realIndex)+1;
                    }
                }
            },
           
            resData:{},
            id:"",
            noScore:true
       }
   },
   components: {
        // slider,
        // slideritem,
        swiper,
        swiperSlide,
        myFoot,
        myNocont
  },
   methods:{
       // Listener event
      slide (data) {
        // console.log(data)
        this.activeImg = parseInt(data.currentPage)+1;
      },
      onTap (data) {
        // console.log(this.smallImg[data.currentPage])
      },
      onInit (data) {
        //   console.log('初始化')
      },
      showBingImgClick(){
          this.imgSlider =true;
          this.noScore = false;
      },
      closeBigImgClick(){
        this.imgSlider =false;
        this.noScore = true;
      },
      getDetale(){
            let _this = this;
         sendPostFunc(apiUrl.getsharedetail,{id:_this.id,type:2})
         .then(data=>{
             if(data.data.code!=10000){

                 return;
             }
            _this.resData = data.data.info;
            _this.bigImgUrl = _this.resData.article.cover || ''
            _this.smallImg = _this.resData.article.picture
            _this.allImg = _this.smallImg.length;
            let i=0;
            if( _this.smallImg.length>0){
                 for(i=0;i<_this.smallImg.length;i++ ){
                    _this.someList.push({src:_this.smallImg[i]})
                }
            }
            _this.allImg = _this.smallImg.length;
         })
         .catch(err=>{
         })
           
       }
   },
   created(){
       this.id= this.$route.query.id;
       this.getDetale();

   },
   mounted(){
    //    alert(document.body.innerHTML)
        // alert(document.body.scrollHeight)
   }
}
</script>
<style lang="less">
    .art-page{
         padding-bottom: 70px;
        .cont{
            background-color: #fff;
            padding-bottom: 25px;
            border-bottom: 10px #F5F5F5 solid;
            h2{
                font-size: .2rem;
                font-weight: 600;
                 margin-top: 28px;
                 padding-left: 15px;
                 padding-right: 24px;
                 line-height: 28px;
                 letter-spacing: 1px;
                 color: #1D1E2C;
            }
            .cont-imgs{
                width: 40px;
                height: 40px;
                position: absolute;
                bottom: -20px;
                right: 15px;
                -webkit-tap-highlight-color: transparent;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            .heade{
                height: 42px;
                overflow: hidden;
                padding: 4px 15px;
                z-index: 2;
                background-color: #fff;
                margin-top: 16px;
                margin-bottom: 36px;
                position: relative;
                .heade-left{
                    display: inline-block;
                    width: 24px;
                    height: 100%;
                    float: left;
                    clear: both;
                    line-height: 62px;
                    margin-right: 6px;
                    img{
                        width: 100%;
                        height: auto;
                    }
                }
                .heade-cont{
                    position: absolute;
                    left: 15px;
                    width: 250px;
                    overflow: hidden;
                    line-height: 1.5;
                    .isVip{
                        position: absolute;
                        width: 9px;
                        height: 9px;
                        border-radius: 50%;
                        background-color: #FFCC00;
                        font-size: 12px;
                        color: #fff;
                        text-align: center;
                        line-height: 8px;
                        bottom: -1px;
                        left: 30px;
                        border: 1.5px #fff solid;
                    }
                    .portrait{
                        width: 40px;
                        height: 40px;
                        overflow: hidden;
                        border-radius: 50%;
                        margin-right: 12px;
                        // border:1px #999 solid;
                        background-color: #FFCC00;
                        display: inline-block;
                        vertical-align: top;
                        // position: relative;
                        float: left;
                        // padding: 3px;
                        
                        img{
                            width: 100%;
                            height: 100%;
                        }
                    }
                    .userName,.userTage{
                        display: inline-block;
                        width: 150px;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    } 
                    .userName{
                        font-size: .14rem;
                        color: #403F4C;
                    }
                    .lin{
                        line-height: 40px;
                    }
                    .userTage{
                       
                        font-size: .12rem;
                        color: #69707F;
                    }
                }
                .heade-reight{
                    overflow: hidden;
                    float:right;
                    position: relative;
                    top:9px;
                    .focus{
                        display: inline-block;
                        vertical-align: top;
                        width: 48px;
                        height: 22px;
                        text-align: center;
                        line-height: 22px;
                        color: #BBBBBB;
                        font-size: 12px;
                        background:rgba(245,245,245,1);
                    }
                    .focusActive{
                        color: #1D1E2C;
                        background:rgba(255,204,0,1);
                        margin-left:10px; 
                    }
                }
            }
            .xian{
                text-align: center;
                margin-bottom: 25px;
                .xian-span{
                    width: 30%;
                    display: inline-block;
                    border-top: 1px #1D1E2C solid;
                }
            }
            .cont-img{
                 position: relative;
                 height: 255px;
                 border-bottom: 1px #F2F2F2 solid;
                .cont-img-div{
                     position: relative;
                    overflow: hidden;
                    height: 255px;
                    .dnyimg{
                        width: 100%;
                        position: absolute;
                        left: 0;
                        top: 0%;
                        // transform: translateY(-50%);
                    }
                }
                
                .shadow{
                    position: absolute;
                    max-width: 108px;
                    height: 18px;
                    background:#FFCC00;
                    padding: 4px 10px;
                    z-index: 2;
                    // top: 19px;
                    bottom: 14px;
                    left: 15px;
                    color: #fff;
                    font-size: 12px;
                    text-align: center;
                    line-height: 18px;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }
            }
            .myVideo-warp{
                padding: 15px;
            }
            .myVideo{
                width: 100%;
                height: auto;
            }
            .cont-tetx{
                width: 100%;
                font-size: 15px;
                padding: 15px;
                box-sizing: border-box;
                letter-spacing: 1px;
                p{
                    margin: 10px 0;
                    line-height: 2;
                }
                img{
                    margin: 10px 0;
                }
                h1,h2,h3,h4,h5,h6{
                    margin: 5px 0;
                    line-height: 2.5
                }
                img{
                    max-width: 100%;
                    margin: 3px;
                    height: auto;
                }
                // color: #1D1E2C;
                // text-align: left;
                // padding:0 15px;
                // padding-bottom: 10px;
                // // line-height: 1.8;
                // font-size: .14rem;
                // letter-spacing: 1px;
                // p{
                //     margin: 10px 0;
                //     line-height: 1.6;
                // }
                // h1,h2,h3,h4,h5,h6{
                //     margin: 12px 0;
                //     line-height: 1.6;
                // }
                // img{
                //     margin-top: 3px;
                //     margin-bottom: 3px;
                //     text-align: center;
                //     max-width: 100%;
                //     height: auto;
                // }
            }
        }
        .review{
            position: relative;
            font-size: 0px;
            overflow: hidden;
            min-height: 100px;
            .noCont{
                padding: 0px;
            }
            h2{
                font-weight: 600;
                font-size: 18px;
                height: 90px;
                line-height: 90px;
                color: #333333;
                border-bottom: 0.5px #E2E2E2 solid;
                padding: 0 16px;
            }
            ul{
                font-size: 0px;
                padding: 0px;
                margin: 0px;
                padding: 0 16px;
                li{
                    list-style: none;
                    height: 90px;
                    border-bottom: 0.5px #E2E2E2 solid;
                }
                .review-list{
                    position: relative;
                    overflow: hidden;
                    padding-top: 12px;
                }
                .review-img{
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    display: inline-block;
                    vertical-align: top;
                    float: left;
                    margin-right: 12px;
                    overflow: hidden;
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
                .review-top{
                    color: #0D0E15;
                    font-size: .14rem;
                    line-height: .2rem;
                    font-weight: 600;
                    height: 20px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                .review-mid{
                    overflow: hidden;
                        font-size: .14rem;
                    .mid-left{
                        display: inline-block;
                        float: left;
                        width: 82%;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        color: #0D0E15;
                        height: 20px;
                    }
                    .mid-right{
                        display: inline-block;
                        float: right;
                        width:18%;
                        font-size: 12px;
                        color: #768196;
                        line-height: 20px;
                        text-align: right;
                        height: 20px;
                        i{
                            font-style: normal;
                            display: inline-block;
                            width: 15px;
                            height: 15px; 
                            margin-left: 6px;
                            position: relative;
                            top: 3px;
                            img{
                                width: 100%;
                                height: 100%;
                            }
                        }
                    }
                }
                .review-btm{
                    height: 20px;
                    display: inline-block;
                    overflow: hidden;
                    color: #768196;
                    font-size: 12px;
                    line-height: 20px;
                    position: relative;
                    left: 53px;
                }
            }
        }
        .disNOne{
            display: none
        }
    }
    .bigImg{
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0px;
        left: 0px;
        background: rgba(255,255,255,1);
        z-index: 99;
        -webkit-overflow-scrolling: touch;
         .dnyimg-swper{
            height: 100%;
            position: relative;
            img{
                width: 100%;
                height: auto;
                position: absolute;
                left: 0;
                top: 50%;
                transform: translateY(-50%);
            }
        }
        .close{
            position: absolute;
            top:0px;
            z-index: 100;
            width: 30px;
            height: 30px;
            right: 15px;
            // border:1px red solid;
            top:10px;
            img{
                width:100%;
                height: 100%;
            }
            
        }
        .sliderTxt{
           width: 100%;
            text-align: center;
            font-size: 0.14rem;
            color: #333;
            position: absolute;
            bottom: 20px;
            font-weight: 500;
            z-index: 100;
        }
        .swiper-container{
            top:50px;
            height:calc(100% - 100px);
        }
        // img{
        //     width: 100%;
        //     height: auto;
        // }
    }
    .over{
        overflow: hidden;
    }
</style>