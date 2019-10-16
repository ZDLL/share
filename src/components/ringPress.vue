<template>
  <div class='svgClass' style="height: 150px; width: 150px;">
    <svg viewBox="0 0 100 100">
      <path
        d="
                            M 50 50
                            m 0 47
                            a 47 47 0 1 1 0 -94
                            a 47 47 0 1 1 0 94
                            "
        stroke="#e5e9f2"
        stroke-width="5.3"
        fill="none"
        style="stroke-dasharray: 221.482px, 295.31px; stroke-dashoffset: -36.9137px;stroke-linecap: round;"
      />
      <path
        d="
                            M 50 50
                            m 0 47
                            a 47 47 0 1 1 0 -94
                            a 47 47 0 1 1 0 94
                            "
        :stroke='preColor'
        fill="none"
        stroke-linecap="round"
        stroke-width="5.3"
        :style= 'ringStyle'
      />
    </svg>
    <!-- :style="{'stroke-dasharray':( parseInt(preScore)/20)*222+'px'+', 295.31px;'+'stroke-dashoffset: -36.9137px;'+'transition: stroke-dasharray 0.6s ease 0s, stroke 0.6s ease 0s;'}" -->
    <!-- style= "stroke-dasharray: 100px, 295.31px; stroke-dashoffset: -36.9137px; transition: stroke-dasharray 0.6s ease 0s, stroke 0.6s ease 0s;" -->
    <span class='low'>低</span>
    <span class='hig'>高</span>
    <span class="svgScore"><span class='bigTxt'>{{preScore}}</span>分</span>
  </div>
</template>
<script>
export default {
  name: "ring",
  props:{
    preColor:{
      type:String,
      default:"#4066f5"
    },
    preScore:{
      type:String,
      default:'0'
    }
  },
  computed:{
    ringStyle(){
      return 'stroke-dasharray: '+(this.prs/10)*221.482+'px, 295.31px; stroke-dashoffset: -36.9137px; transition: stroke-dasharray 2s ease 0s, stroke 2s ease 0s;'
    }
  },
  data(){
    return{
      sty:"",
      prs:0
    }
  },
  mounted(){
      let _this = this; 
       _this.le =0;
      setTimeout(() => {
        _this.prs = _this.preScore;
      }, 1000);
    },
  created(){
    
  }
};
</script>
<style lang="less">
    .svgClass{
        position: relative;
        display: inline-block;
        .low,.hig,.svgScore{
            color: #403f4c;
            font-size: 13px;
            position: absolute;
        }
        .low{
            left: 23px;
            bottom: 0px;
            // top: 140px;
        }
         .hig{
            // top: 140px;
            bottom: 0px;
            right: 26px;
        }
        .svgScore{
            position: absolute;
            top:35%;
            left: 0px;
            width: 100%;
            text-align: center;
            color: #999;
        }
        .bigTxt{
            font-size: 35px;
            font-weight: 500;
             color: #403f4c;
        }

    }
</style>