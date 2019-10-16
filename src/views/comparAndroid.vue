<template>
    <div class='isAndroid'>
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
            :index-picture='itm.index_picture'>
            </termPres>
            <logPres 
                v-if='itm.display_type =="07000002"'
                :left-score='itm.index_score_left' 
                :let-dec='backData.left.goods_group_name' 
                :right-score='itm.index_score_right'
                :rig-dec='backData.right.goods_group_name' 
                >
            </logPres>
            </div>
        </div>
    </div>
</template>
<script>
import ringPres from '../components/ringPress.vue'
import termPres from '../components/shortTerm.vue'
import logPres from '../components/logTerm.vue'
import {sendPostFunc} from '@/requst/axiosFunc.js';
import apiUrl from '@/requst/api.js';
export default {
    name:"compar",
    data(){
        return{
            detailData:[],
            left_no:'',
            right_no:""
        }
    },
    components:{
        ringPres,
        termPres,
        logPres
    },
    methods:{
        getCompareDetail(){
            let _this = this;
            sendPostFunc(apiUrl.getprocompare,
                {goods_group_no_left:_this.left_no,goods_group_no_right:_this.right_no})
                .then((bacData)=>{
                    alert(bacData.data.out)
                    _this.backData = bacData.data.out;
                    _this.detailData =  _this.backData.detail
                })
                .catch((err)=>{
            })
        }
    },
    created(){
        this.left_no = contrast.getLeft();
        this.right_no = contrast.getRight();
        alert(this.left_no,this.right_no)
        this.getCompareDetail()
        
    }
}
</script>
<style lang="less">
    .isAndroid{
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
            padding: 0 14px;
        }
        }
        .battle-score{
            padding: 20px;
            overflow: hidden;
        }
    }
   
</style>