<template>
    <div class="video-page">
        <div v-if='resData.article'>
            <div class='heade'>
                <div class='heade-cont'>
                    <span class='portrait' v-if='resData.article && resData.article.head_portrait'>
                        <img :src='resData.article.head_portrait' alt="头像">
                        <span v-show='resData.article.is_cert==1' class='isVip'>v</span>
                    </span>
                    
                    <span class='userName' :class='{"lin":!resData.article.cert}'>{{resData.article.nickname || '--'}}</span>
                    <span v-if='resData.article.cert' class='userTage'>{{resData.article.cert || '--'}}</span>
                </div>
            </div>
            <div class="video-cont">
                <!-- <video class='myVideo'  
                v-if='resData.article.video_url' 
                style="object-fit:cover"
                controls="controls" 
                webkit-playsinline 
                playsinline
                x5-video-player-type="h5"
                x5-video-player-fullscreen="true" 
                x5-video-orientation="landscape|portrait"
                >
                    <source :src='resData.article.video_url' type="video/mp4" />
                    <p>您的浏览器不支持 video 标签。</p>
                </video> -->
                <video-player class="video-player vjs-custom-skin"
                    ref="videoPlayer"
                    :playsinline="playsinline"
                    :options="playerOptions"
                    @ended="onPlayerEnded($event)" 
                    @canplay="onPlayerCanplay($event)"
                ></video-player>
            </div>
            <div class='video-foot'>
                <div class="video-title" v-if='resData.article&&resData.article.content'>
                    <div class="txt">
                    {{resData.article.content}}
                    </div>
                    <span class='openOrclose' style="color:#999;margin-left:5px" @click="openClick">[ 展开 ]</span>
                </div>
                <div class='video-tag' v-if='resData.article&&resData.article.topic'># {{resData.article.topic}} #</div>
                <div class="video-bottom" v-if='resData.article'>
                    <span class='bottom-txt'>写个回复走个心</span>
                    <div class="bottm-mid">
                        <span class='give_like'>
                            <img src="@/assets/img/videogood.png" alt="点赞">
                            <span class='like-num'>{{resData.article.praise}}</span>
                        </span>
                            <span class='give_like mgl30'>
                            <img src="@/assets/img/com.png" @click="reviewOpenClick" alt="评论">
                            <span class='like-num'>{{resData.article.comment}}</span>
                        </span>
                    </div>
                    
                </div>
            </div>
        </div>
        <myNocont v-else></myNocont>
        <div class="moretxt" v-show='more_txt_show'>
            <div class="moretxt-cont" v-if='resData.article'>
                <span class='moretxt-cont-span'>
                     {{resData.article.title}}
                </span>
                <div class='video-tag'># {{resData.article.topic}} #</div>
                <!-- <div class='video-tag'>收起</div> -->
                <span class='closetxt' style="color:#fff" @click="txtCloseClick">收起</span>
            </div>
        </div>
        <div class="moreReviw" v-show='review_show'>
             <div class="review">
              <h2>热门评论</h2>
              <div class='reviewClose' @click="reviewCloseClick">
                  <img src="../assets/img/close_2.png" alt="关闭">
              </div>
              <ul v-if=' resData.comment && resData.comment.length>0'>
                  <div class='line'></div>
                  <li class='review-list' v-for='(itm,index) in resData.comment' :key='index'>
                      <span class='review-img'>
                          <img :src='itm.head_portrait' alt="头像">
                      </span>
                      <div class="review-top">{{itm.nickname}}</div>
                      <div class="review-mid">
                          <span class='mid-left'>{{itm.content}}</span>
                          <span class="mid-right">{{itm.praise}} <i class="icon"><img src="../assets/img/love-2.png" alt="点赞"></i></span>
                      </div>
                      <div class="review-btm">{{itm.create_time}}</div>
                  </li>
              </ul>
                <myNocont style="margin-top:20px" v-else/>
           </div>
           <!-- <div class='reviewClose'><span @click="reviewCloseClick">关闭</span></div> -->
        </div> 
        <myFoot/>
    </div>
</template>
<script>
import {sendPostFunc} from '@/requst/axiosFunc.js';
import apiUrl from '@/requst/api.js';
import myFoot from '../components/foot.vue';
import myNocont from '../components/nocont.vue';
import { videoPlayer } from 'vue-video-player'
import 'video.js/dist/video-js.css'
export default {
    name:"videopage",
    data(){
        let _this = this;
        return{
            resData:{
              
            },
           id:'',
           type:"",
           more_txt_show:false,
           review_show:false,
           goodNum:0,
           playerOptions:{
            //    playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
                autoplay: false, //如果true,浏览器准备好时开始回放。
                muted: false, // 默认情况下将会消除任何音频。
                loop: false, // 导致视频一结束就重新开始。
                preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
                language: 'zh-CN',
                aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                sources: [{
                src:'',  // 路径
                type: 'video/mp4'  // 类型
                },],
                poster: '', //你的封面地址
                // height:"800px",
                width: document.documentElement.clientWidth,
                // width: document.documentElement.clientWidth,
                notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
                controlBar: {
                    // timeDivider: true,
                    // durationDisplay: true,
                    remainingTimeDisplay: true,//时间
                    fullscreenToggle: true  //全屏按钮
                }
           }
        }
    },
    computed: {
        playsinline(){
                var ua = navigator.userAgent.toLocaleLowerCase();
        //x5内核
        if (ua.match(/tencenttraveler/) != null || ua.match(/qqbrowse/) != null) {
            return false
        }else{
            //ios端
            return true				
        }
        }
    },
    components:{
        myNocont,
        videoPlayer,
        myFoot
    },
    methods:{
        getData(){
            let _this = this;
            sendPostFunc(apiUrl.getsharedetail,{id:_this.id,type:_this.type})
            .then(data=>{
                if(data.data.code!=10000){
                    return;
                }
                _this.resData = data.data.info;
                _this.playerOptions.sources[0].src = data.data.info.article.video_url
                _this.playerOptions.poster = data.data.info.article.cover;
            })
            .catch(err=>{
            })
        },
        openClick(){
            this.more_txt_show=true
        },
        txtCloseClick(){
             this.more_txt_show=false
        },
        reviewOpenClick(){
            this.review_show = true
        },
        reviewCloseClick(){
            this.review_show = false
        },
        onPlayerEnded(player){
        },
        onPlayerCanplay(player) {
            //解决自动全屏
            var ua = navigator.userAgent.toLocaleLowerCase();
            //x5内核
            if (ua.match(/tencenttraveler/) != null || ua.match(/qqbrowse/) != null) {
                let video = document.getElementsByTagName("video");
                video.setAttribute('x-webkit-airplay',true).setAttribute('x5-playsinline',true).setAttribute('webkit-playsinline',true).setAttribute('playsinline',true)
            }
        }
    },
    created(){
        this.id= this.$route.query.id;
        this.type = this.$route.query.type==1?"2":"1"
        this.getData();
    },
    mounted(){
    }
}
</script>
<style lang="less">
    @import '../style/heade.less';
    @import '../style/review.less';
    * { touch-action: none; } 
    .video-page{
        background-color: #000000;
        min-height: 100%;
        // padding-bottom: 70px;
        .heade{
              background-color: #000000;
              .userName,.userTage{
                   color: #fff;
              }
        }
        .video-cont{
            // height: 258px;
            width: 100%;
            padding-top: 30%;
            padding-bottom: 10px;
            // #vjs_video_3{
            //     height: 300px;
            // }
            .myVideo{
                height: 100%;
                width: 100%;
                object-position: center top;
                
            }
            .video-player{
            //   touch-action: none;
                .video-js {
                    button{
                        outline-color: transparent;
                    }
                    .vjs-big-play-button{
                            height: 1.5em;
                            width: 1.5em;
                            border-radius: 50%;
                            top: 0px;
                            bottom: 0px;
                            left: 0px;
                            right: 0px;
                            margin: auto;
                    }
                    .vjs-control-bar{
                        background-color: rgba(43, 51, 63, 0.7);
                    }
                    .vjs-tech{
                        // height: 300px;
                    }

                }
                .vjs-custom-skin{
                    width: 50%;
                    height: 50%;
                    display: block;
                    margin: 0 auto;
                }
               
            }
            // margin-top: 100px
        }
        .video-foot{
            position: fixed;
            bottom: 70px;
            width: 100%

        }
        .video-title{
            padding: 0 16px;
            font-size: .14rem;
            color: #FFFFFF;
            line-height: 20px;
            height: 40px;
            overflow: hidden;
            position: relative;
            .txt{
                width: 100%;
                height: 100%;
                overflow: hidden;
                // padding-right: 35px;
            }
            .openOrclose{
                position: absolute;
                bottom: 0px;
                right: 22px;
                background-color: #000000;
            }
        }
        .video-tag{
            padding: 3px 8px;
            font-size: .12rem;
            color: #403F4C;
            background-color: #fff;
            display: inline-block;
            vertical-align: top;
            margin-left: 16px;
            margin-top: 15px;
            margin-bottom: 15px;
        //    background:rgba(0,0,0,1); 
        }
        .video-bottom{
            height: 70px;
            padding-bottom: 20px;
            border-top: 1px #fff solid;
            padding: 0 16px;
        }
        .bottom-txt{
            display: inline-block;
            vertical-align: top;
            color: #999999;
            background:rgba(255,255,255,1);
            border-radius:39px;
            font-size: 14px;
            line-height: 40px;
            text-align: center;
            width: 158px;
            height: 40px;
            margin-top: 16px;
        }
        .bottm-mid{
            display: inline-block;
            height: 100%;
        }
        .give_like{
            display: inline-block;
            width: 22px;
            height: 22px;
            margin-top: 26px;
            margin-left: 20px;
            position: relative;
            img{
                width: 100%;
                height: 100%;
            }
        }
        .mgl30{
            margin-left: 50px;
        }
        .like-num{
            color:#fff;
            font-size: 14px;
            position: absolute;
            top:-3px;
            right: -21px;
        }
        .moreReviw ,.moretxt{
            background:rgba(0,0,0,.8);
            width: 100%;
            height: 100%;
            position: fixed;
            top:0px;
            z-index: 1000;
            overflow-x: hidden;
            overflow-y: auto;
        }
        .moretxt{
            .moretxt-cont{
                font-size: 14px;
                color: #fff;
                position: absolute;
                width: 100%;
                bottom: 140px;
                .moretxt-cont-span{
                    padding: 0 15px;
                    display: block;
                    line-height: 1.5;
                    letter-spacing: 1px;
                }
            }
          
        }
        .closetxt{
            color: rgb(255, 255, 255);
            float: right;
            margin-top: 18px;
            margin-right: 16px;
        }
        .moreReviw{
            background:rgba(0,0,0,.5);
            // background:rgba(255,255,255,0.8);
            .review{
                background-color: #fff;
                margin-top: 50px;
                border-radius: 8px 8px 0 0;
                height: calc(100% - 50px);
                overflow-x: hidden;
                overflow-y: auto;
                h2{
                    // color: #fff;
                    text-align: center;
                    height: 70px;
                    line-height: 70px;
                    border: none;
                }
                ul{
                    .line{
                         border-bottom:1px #F0F0F0 solid;
                    }
                    li{
                        border: none
                    }
                }
                // ul{
                //     .review-mid,.mid-left,.review-top,.mid-right{
                //         color: #fff;
                //     }
                //     .review-img{
                //         border: 1px #666 solid;
                //     }
                //     .review-btm{
                //         left: 0px;
                //     }
                // } 
            }
            .reviewClose{
              margin-top: 20px;
                text-align: center;
                font-size: 0.12rem;
                color: #333;
                position: absolute;
                top: 8px;
                right: 20px;
                width: 15px;
                height: 15px;
                img{
                    width: 100%;
                }
                span{
                    display: inline-block;
                    border-radius: 50%;
                    border:1px #fff solid;
                    height: 26px;
                    width: 26px;
                    line-height: 26px;
                    text-align: center;
                    padding: 3px;
                    // padding: 8px;
                }
            }
        }
    }
</style>

