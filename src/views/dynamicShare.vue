<template>
    <div class="dyn-page">
        <div class="dyn-cont" v-if='resData && resData.comment && resData.article'>
           <div class='heade' v-if='resData.article'>
               <!-- <span class='heade-left'>
                   <img src="@/assets/img/lefticon.png" alt="left">
               </span> -->
               <div class='heade-cont'>
                   <span class='portrait'>
                       <img :src='resData.article.head_portrait' alt="头像">
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
           <div v-if='resData.article' class="cont">
               <div class="cont-img" v-if='smallImg.length>0'>
                   <!-- <img class='dnyimg' :src='bigImgUrl' alt="图片"> -->
                    <swiper :options="swiperOption" ref="mySwiper" class='dnyimg' v-if='smallImg.length>0'>
                        <swiper-slide v-for="(item,index) in smallImg" :key="index">
                            <div class='dnyimg-swper'>
                                 <img :src='item' alt="图片"/>
                            </div>
                           
                        </swiper-slide>
                    </swiper>
                    <myNocont v-else/>
                   <div class='shadow'>{{activeImg}} | {{allImg}}</div>
               </div>
               <div class='small-img'>
                   <ul v-if='smallImg.length>0'>
                       <li v-for='(ite,index) in smallImg' :key='index' @click="imgClick(ite,index)" :class='index==parseInt(activeImg)-1?"act":""'>
                        <img :src='ite' alt="tupian ">
                       </li>
                   </ul>
                   <p v-else style="text-align: center;color: #999;font-size: 14px;">暂无数据！</p>
               </div>
               <div class='cont-tetx'>
                  {{resData.article.content}}
               </div>
               <div class='cont-tag' v-if='resData.article.topic'>#{{resData.article.topic}}#</div>
                <div class='cont-time'>{{resData.article.create_time}}</div>
           </div>
            <myNocont v-else/>
           <div class="review">
              <h2>热门评论</h2>
              <ul v-if=' resData.comment && resData.comment.length>0'>
                  <li class='review-list' v-for='(itm,index) in resData.comment' :key='index'>
                      <span class='review-img'>
                          <img :src='itm.head_portrait' alt="头像">
                      </span>
                      <div class="review-top">{{itm.nickname}}</div>
                      <div class="review-mid">
                          <span class='mid-left'>{{itm.content}}</span>
                          <span class="mid-right">{{itm.praise}} <i class="icon"><img src="../assets/img/love.png" alt="点赞"></i></span>
                      </div>
                      <div class="review-btm">{{itm.create_time}}</div>
                  </li>
              </ul>
                <myNocont v-else/>
           </div>
        </div>
        <myNocont v-else/>
        <myFoot/>
    </div>
</template>
<script>
import {sendPostFunc} from '@/requst/axiosFunc.js';
import apiUrl from '@/requst/api.js'
import myFoot from '../components/foot.vue'
import myNocont from '../components/nocont.vue'
// import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
// import Swiper from 'swiper'
export default {
   name:"dynshare" ,
   data(){
       let _this = this
       return{
           smallImg:[],
           bigImgUrl:"",
           allImg:'',
           activeImg:1,
           resData:{},
           id:'',
            swiperOption: {
                notNextTick: true,
                speed:200,
                direction: 'horizontal',
                // setWrapperSize: true,
                // autoHeight: true,
                initialSlide:0,
                on:{
                    slideChangeTransitionEnd:function (){
                        _this.activeImg = parseInt(this.realIndex)+1;
                    }
                }
            },
       }
   },
   methods:{
       imgClick(url,index){
            this.$refs.mySwiper.swiper.slideTo(index, 200, true)
       },
        getDetale(){
            let _this = this;
         sendPostFunc(apiUrl.getsharedetail,{id:_this.id,type:1})
         .then(data=>{
             if(data.data.code!=10000){

                 return;
             }
            _this.resData = data.data.info;
            _this.bigImgUrl = _this.resData.article.picture[0]
            _this.smallImg = _this.resData.article.picture
            _this.allImg = _this.smallImg.length;
         })
         .catch(err=>{
         })
           
       },
       
   },
   components:{
       myFoot,
       myNocont,
       swiper,
       swiperSlide
   },
   created(){
    this.id= this.$route.query.id;
    this.getDetale();
     
   },
   mounted(){},

}
</script>

<style lang="less">
@import '../style/heade.less';
    .dyn-page{
        padding-bottom: 70px;
        .dyn-cont{
            // .heade{
            //     height: 42px;
            //     overflow: hidden;
            //     position: fixed;
            //     top:0px;
            //     padding: 4px 15px;
            //     width: 100%;
            //     z-index: 2;
            //     background-color: #fff;
            //     z-index:999;
            //     .heade-left{
            //         display: inline-block;
            //         width: 24px;
            //         height: 100%;
            //         float: left;
            //         clear: both;
            //         line-height: 62px;
            //         margin-right: 6px;
            //         img{
            //             width: 100%;
            //             height: auto;
            //         }
            //     }
            //     .heade-cont{
            //         position: absolute;
            //         left: 15px;
            //         width: 250px;
            //         overflow: hidden;
            //         line-height: 1.5;
            //         .isVip{
            //             position: absolute;
            //             width: 9px;
            //             height: 9px;
            //             border-radius: 50%;
            //             background-color: #FFCC00;
            //             font-size: 12px;
            //             color: #fff;
            //             text-align: center;
            //             line-height: 8px;
            //             bottom: -1px;
            //             left: 30px;
            //             border: 1.5px #fff solid;
            //         }
            //         .portrait{
            //             width: 40px;
            //             height: 40px;
            //             overflow: hidden;
            //             border-radius: 50%;
            //             margin-right: 12px;
            //             // border:1px #999 solid;
            //             display: inline-block;
            //             vertical-align: top;
            //             background-color: #FFCC00;
            //             float: left;
            //             img{
            //                 width: 100%;
            //                 height: 100%;
            //             }
            //         }
            //         .userName,.userTage{
            //             display: inline-block;
            //             width: 150px;
            //             white-space: nowrap;
            //             overflow: hidden;
            //             text-overflow: ellipsis;
            //         } 
            //         .userName{
            //             font-size: .14rem;
            //             color: #403F4C;
            //         }
            //         .lin{
            //             line-height: 40px;
            //         }
            //         .userTage{
                       
            //             font-size: .12rem;
            //             color: #69707F;
            //         }
            //     }
            //     .heade-reight{
            //         overflow: hidden;
            //         float:right;
            //         position: relative;
            //         top:9px;
            //         .focus{
            //             display: inline-block;
            //             vertical-align: top;
            //             width: 48px;
            //             height: 22px;
            //             text-align: center;
            //             line-height: 22px;
            //             color: #BBBBBB;
            //             font-size: 12px;
            //             background:rgba(245,245,245,1);
            //         }
            //         .focusActive{
            //             color: #1D1E2C;
            //             background:rgba(255,204,0,1);
            //             margin-left:10px; 
            //         }
            //     }
            // }
            .cont{
                margin-top: 50px;
                background-color: #fff;
                padding-bottom: 25px;
                border-bottom: 10px #F5F5F5 solid;
                .cont-img{
                    position: relative;
                    overflow: hidden;
                    height: 425px;
                    border-bottom: 1px #F2F2F2 solid;
                    border-top: 1px #F2F2F2 solid;
                    .dnyimg{
                        // height: 425px;
                        // width: 100%;
                        width: 100%;
                        position: absolute;
                        left: 0;
                        top: 50%;
                        transform: translateY(-50%);
                        .dnyimg-swper{
                            height: 425px;
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
                        
                    }
                    .shadow{
                        position: absolute;
                        width: 44px;
                        height: 22px;
                        background:rgba(29,30,44,0.5);
                        z-index: 2;
                        top: 19px;
                        right: 15px;
                        color: #fff;
                        font-size: 12px;
                        text-align: center;
                        line-height: 22px;
                    }
                }
                .small-img{
                    padding-left: 7px;
                    padding-right: 7px;
                    ul{
                        font-size: 0px;
                        margin: 0px;
                        padding: 0px;
                        overflow-y: hidden;
                        overflow-x:scroll;
                        // border: 1px red solid;
                        white-space: nowrap;
                        -webkit-overflow-scrolling:touch; 
                        li{
                            -webkit-tap-highlight-color: transparent;
                            margin-top: 14px;
                            width: 50px;
                            height: 50px;
                            white-space: nowrap;
                            margin-right: 8px;
                            // border: 1px red solid;
                            display: inline-block;
                            vertical-align: top;
                            position: relative;
                            overflow: hidden;
                            img{
                                // width: 100%;
                                // height: 100%;
                                width: 100%;
                                position: absolute;
                                left: 0;
                                top: 50%;
                                transform: translateY(-50%);
                            }
                        }
                        .act{
                            width: 60px;
                            height: 60px;
                            margin-top: 9px;
                            border: 1px #1D1E2C solid;
                        }
                    }
                }
                .cont-tetx{
                    margin-top: 10px;
                    color: #1D1E2C;
                    text-align: left;
                    padding:0 15px;
                    padding-bottom: 10px;
                    line-height: 1.8;
                    font-size: .15rem;
                    letter-spacing: 1px;
                }
                .cont-tag{
                    font-size: .11rem;
                    // line-height: 15px;
                    color: #403F4C;
                    padding: 3px 8px;
                    max-width: 90px;
                    background-color:rgba(245,245,245,1);
                    margin-left: 15px;

                }
                .cont-time{
                    margin-top: 18px;
                    color: #768196;
                    font-size: .12rem;
                    margin-left: 15px;
                }
            }
            .review{
                position: relative;
                font-size: 0px;
                background-color: #fff;
                overflow: hidden;
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
        }
        // .noCont{
        //     width: 100px;
        //     height: 100px;
        //     margin: 100px auto;
        //     text-align: center;
        //     font-size: .12rem;
        //     color: #999;
        //     img{
        //         width: 100%;
        //         height: 100%;
        //     }
        // }
    }
</style>


