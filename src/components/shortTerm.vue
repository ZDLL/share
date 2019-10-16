<template>
     <div class='pressTwo'>
        <div class='press-cont'>
            <div class='press'>
                <div :style="{'width':le*10+'%'}" class='press-left-act preLeft'></div>
            </div>
            <div class='num'>{{le}}分</div>
        </div>
        <img class='bat-Img' :src='indexPicture' alt="">
        <div class='press-cont'>
            <div class='press'>
                <div :style="{'width':ri*10+'%'}" class='press-left-act preRight'></div>
            </div>
            <div class='num'>{{ri}}分</div>
        </div>
    </div>
</template>
<script>
export default {
    name:"term",
    props:{
        leftScore:{
            type:String,
            default:'0'
        },
        rightScore:{
            type:String,
            default:'0'
        },
        indexPicture:{
            type:String,
            default:""
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
    data(){
        return{
            le:0,
            ri:0
        }
    }
}
</script>
<style lang="less">
     .pressTwo{
    //   overflow: hidden;
    .press-cont{
        width: 42%;
        display: inline-block;
        vertical-align: top;
    }
      .press{
          width: 100%;
          height: 14px;
          border-radius: 20px;
           background-color: #f5f5f5;
            display: inline-block;
            vertical-align: top;
            z-index: 1;
            position: relative;
          .press-left-act{
            position: absolute;
            top:0px;
            width: 10%;
            height: 14px;
            border-radius: 20px;
            z-index: 2;
            transition:All 1s linear;
            -webkit-transition:All 1s linear;
            -moz-transition:All 1s linear;
            -o-transition:All 1s linear;
          }
          .preLeft{
              right: 0px;
              background-color: #4066f5;
              box-shadow:0px 1px 2px 0px rgba(21,132,243,0.24);
          }
          .preRight{
               left: 0px;
               background-color: #ff1c27;
               box-shadow:0px 1px 2px 0px rgba(255,108,88,0.32);
          }
         
      }
      .bat-Img{
          width: 28px;
          height: 28px;
          margin: 0 9px;
          position: relative;
          top:-8px
      }
       .num{
            font-size: 12px;
            color: #403f4c;
            margin-top: 10px;
            text-align: center;
        }
  }
</style>