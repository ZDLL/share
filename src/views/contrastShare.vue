<template>
  <div class="contras-page">
    <div class="contras-cont" v-if='Object.keys(backData).length>0'>
      <div class="contras-top" >
        <img class="backImg" src="@/assets/img/cons/crabak.png" alt />
        <div class="contras-score">
          <div class="score-left">
            <span>综合评分</span>
            <h2>{{backData.left.synthesize_score}}</h2>
          </div>
          <div class="score-mid">
            <div class="vsImg">
              <img src="@/assets/img/cons/vs.png" alt />
            </div>
          </div>
          <div class="score-right">
            <span>综合评分</span>
            <h2>{{backData.right.synthesize_score}}</h2>
          </div>
        </div>
      </div>
      <div class="contras-gds">
        <div class="left-gds" >
          <div class="gdsImg">
            <img :src='backData.left.group_picture' alt />
            <img class="changeImg" src="@/assets/img/cons/change.jpg" alt />
          </div>
          <div class="gds-title">{{backData.left.goods_group_name}}</div>
        </div>
        <div class="right-gds">
          <div class="gdsImg">
            <img class="changeImg" src="@/assets/img/cons/change.jpg" alt />
            <img :src='backData.right.group_picture' alt />
          </div>
          <div class="gds-title">{{backData.right.goods_group_name}}</div>
        </div>
      </div>
      <div class="battle-cont" v-for='(itm,inx) in detailData' :key='inx'>
        <h2 class="battle-title">{{itm.index_name}}</h2>
        <p class="battle-dac">{{itm.index_describe}}</p>
        <div class='battle-score'>
          <div v-if='itm.display_type =="07000003"'>
            <div style="float:left">
                <ringPres :pre-color='"#4066f5"' :pre-score='itm.index_score_left'></ringPres>
            </div>
            <div style="float:right">
                <ringPres :pre-color='"#ff1c27"' :pre-score='itm.index_score_right'></ringPres>
            </div>
          </div>
          <termPres 
          v-if='itm.display_type =="07000001"' 
          :left-score='itm.index_score_left'
          :right-score='itm.index_score_right'
          :index-picture='itm.index_picture'></termPres>
          <logPres 
            v-if='itm.display_type =="07000002"'
            :left-score='itm.index_score_left' 
            :let-dec='backData.left.goods_group_name' 
            :right-score='itm.index_score_right'
            :rig-dec='backData.right.goods_group_name' 
            ></logPres>
        </div>
      </div>
    </div>
     <myNocont style="margin-top:20px" v-else/>
     <myFoot></myFoot>
  </div>
</template>
<script>
import ringPres from '../components/ringPress.vue'
import termPres from '../components/shortTerm.vue'
import logPres from '../components/logTerm.vue'
import {sendPostFunc} from '@/requst/axiosFunc.js';
import apiUrl from '@/requst/api.js';
import myNocont from '../components/nocont.vue';
import myFoot from '../components/foot.vue'

export default {
  name: "contras",
  data() {
    return {
      left_no:"",
      right_no:"",
      backData:{},
      detailData:[]
    };
  },
  methods: {
    draw() {
      let bg = document.getElementById("bg");
      let ctx = bg.getContext("2d");
      let circ = Math.PI * 2;
      let quart = Math.PI / 2;
      let imd = null;
      // let circ = Math.PI * 2;
      // let quart = Math.PI / 2;
      ctx.beginPath();
      ctx.strokeStyle = "#4066F5";
      ctx.lineCap = "square";
      ctx.closePath();
      ctx.fill();
      ctx.lineWidth = 10.0;
      imd = ctx.getImageData(0, 0, 240, 240);
      ctx.putImageData(imd, 0, 0);
      ctx.beginPath();
      ctx.lineCap = "round";
      // ctx.shadowOffsetX = 0;
      // // 阴影的y偏移
      // ctx.shadowOffsetY = 2;
      // // 阴影颜色
      // ctx.shadowColor = 'rgba(0,0,0,0.5)';
      // // 阴影的模糊半径
      // ctx.shadowBlur = 2;
      // ctx.fillStyle = 'rgba(255,0,0,0.5)'

      ctx.arc(120, 120, 70, -quart, circ * 0.8 - quart, false);
      ctx.stroke();
    }
  },
  components:{
      ringPres,
      termPres,
      logPres,
      myNocont,
      myFoot
  },
  methods:{
    getCompareDetail(){
      let _this = this;
      sendPostFunc(apiUrl.getprocompare,
          {goods_group_no_left:_this.left_no,goods_group_no_right:_this.right_no})
          .then((bacData)=>{
            _this.backData = bacData.data.out;
            _this.detailData =  _this.backData.detail
          })
          .catch((err)=>{
          })
    }
  },
  mounted() {
     
  },
  created() {
    document.getElementsByTagName("title")[0].innerText = "专业对比";
    this.left_no = this.$route.query.leftNo;
    this.right_no = this.$route.query.rightNo;
    if(!this.left_no || !this.right_no){
      this.$router.push({
        path:"/err",
        query:{
          msg:"缺少参数"
        }
      })
    }
    this.getCompareDetail();
  }
};
</script>
<style lang="less">
.contras-page {
  //  background-color:#e2e2e2;
  .contras-cont {
    padding-bottom: 50px;
    .contras-top {
      overflow: hidden;
      position: relative;
      padding: 52px 0;
      // background-image: url('/assets/img/cons/crabak.png');
      // background-size: 100% auto;
      .backImg {
        position: absolute;
        left: 0px;
        width: 100%;
        top: 0px;
      }
      .contras-score {
        height: 116px;
        width: 330px;
        margin: 0 auto;
        .score-left,
        .score-right,
        .score-mid {
          display: inline-block;
          width: 110px;
          vertical-align: top;
          box-sizing: border-box;
          height: 100%;
          position: relative;
          text-align: center;
          color: #fff;
          line-height: 1.8;
          text-align: center;
          // border:1px red solid;
          span {
            font-size: 12px;
          }
          h2 {
            font-weight: 500;
            font-size: 44px;
          }
        }
        .vsImg {
          position: absolute;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          top: 40px;
          left: 50px;
          background-color: transparent;
          z-index: 2;
          img {
            width: 100%;
            height: 100%;
          }
          &::before {
            position: absolute;
            content: "";
            width: 100%;
            top: 10px;
            right: 30px;
            height: 1px;

            background: rgba(255, 255, 255, 0.5);
          }
          &::after {
            position: absolute;
            content: "";
            width: 100%;
            top: 10px;
            left: 30px;
            height: 1px;
            background: rgba(255, 255, 255, 0.5);
          }
        }
        .score-mid {
          // .line{
          //     position: absolute;
          //     width: 60%;
          //     left: 20%;
          //     height: 1px;
          //     background-color: #fff;
          // }
        }
      }
    }
    .contras-gds {
      padding: 0 15px;
      margin-top: -32px;
      position: relative;
      // overflow: hidden;
      .left-gds,
      .right-gds {
        display: inline-block;
        vertical-align: top;
        width: 160px;
        position: relative;
        // border:1px red solid;
        // overflow: hidden;
        .gdsImg {
          height: 160px;
          text-align: center;
          border-radius: 4px;
          overflow: hidden;
          background-color: #fff;
          box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.3);
          // position: relative;
          img {
            width: 97px;
            height: 109px;
            margin-top: 27px;
          }
          .changeImg {
            width: 20px;
            height: 20px;
            position: absolute;
            right: 8px;
            top: 9px;
            margin-top: 0px;
          }
          // padding:30px;
        }
        .gds-title {
          margin-top: 15px;
          font-size: 0.12rem;
          color: #403f4c;
          line-height: 1.5;
        }
      }
      .right-gds {
        float: right;
      }
    }
    .battle-cont {
      border-top: 1px #e2e2e2 solid;
      margin-top: 12px;
      .battle-title {
        color: #403f4c;
        font-size: 16px;
        font-weight: 500;
        margin-top: 29px;
        margin-bottom: 13px;
        text-align: center;
      }
      .battle-dac {
        color: #999;
        font-size: 12px;
        text-align: center;
        margin-top: 13px;
        margin-bottom: 20px;
        padding: 0 15px;
      }
    }
  }
  .battle-score{
      padding: 20px;
      overflow: hidden;
  }
  
 
}
</style>