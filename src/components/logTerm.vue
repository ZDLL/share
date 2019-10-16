<template>
  <div class="longTerm">
    <div class="press-cont">
      <p class="tit">{{letDec}}</p>
      <div class="press">
        <div class="pres-cont">
          <div :style="{'width':le*10+'%'}" class="press-left-act preLeft"></div>
        </div>
        <span class="log-txt">{{le}}分</span>
      </div>
    </div>
    <div class="press-cont">
      <p class="tit">{{rigDec}}</p>
      <div class="pres-cont">
        <div :style="{'width':ri*10+'%'}" class="press-left-act preRight"></div>
      </div>
      <span class="log-txt">{{ri}}分</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "logterm",
  props:{
        leftScore:{
            type:String,
            default:'0'
        },
        letDec:{
           type:String,
            default:'0'
        },
        rightScore:{
            type:String,
            default:'0'
        },
        rigDec:{
           type:String,
            default:'0'
        },
    },
    data(){
        return{
          le:0,
          ri:0
        }
    },
    mounted(){
      let _this = this; 
       _this.le =0;
      setTimeout(() => {
        _this.le = _this.leftScore;
        _this.ri = _this.rightScore
      }, 1000);
    },
    created(){
      //  this.$nextTick(()=>{
      //     this.le = this.leftScore
      // });
    }

};
</script>
<style lang="less">
.longTerm {
  .press-cont {
    position: relative;
    .press {
      margin-bottom: 30px;
    }
    .tit {
      font-size: 0.12rem;
      color: #403f4c;
      margin-bottom: 10px;
    }
    .pres-cont{
      width: 85%;
      display: inline-block;
      height: 14px;
      border-radius: 20px;
      position: relative;
       background-color: #f5f5f5;
    }
    .press-left-act {
      position: absolute;
      top:0px;
      display: inline-block;
      vertical-align: top;
      width: 0px;
      height: 14px;
      border-radius: 20px;
      z-index: 2;
      transition: All 1.5s linear;
      -webkit-transition: All 1.5s linear;
      -moz-transition: All 1.5s linear;
      -o-transition: All 1.5s linear;
      // right: 0px;
    }
    .log-txt {
      font-size: 13px;
      color: #999;
      margin-left: 10px;
      position: relative;
      top: -3px;
    }
    .preLeft {
      background-color: #4066f5;
      box-shadow: 0px 1px 2px 0px rgba(21, 132, 243, 0.24);
      // margin-bottom: 30px;
    }
    .preRight {
      background-color: #ff1c27;
      box-shadow: 0px 1px 2px 0px rgba(255, 108, 88, 0.32);
    }
  }
}
</style>