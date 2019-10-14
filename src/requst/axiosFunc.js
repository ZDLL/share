import axios from 'axios'
import qs from 'qs'
import router from '../router.js'

/**
 * axios的post请求
 */
let loading

function startLoading() {    //使用Element loading-start 方法
  loading = Loading.service({
      target:document.querySelector("#searchBar"),
      lock: true,
      text: '加载中……',
      background: 'rgba(255, 255, 255, 0.7)'
  })
}
function endLoading() {    //使用Element loading-close 方法
  loading.close()
}

let needLoadingRequestCount = 0
function showFullScreenLoading() {
    if (needLoadingRequestCount === 0) {
        startLoading()
    }
    needLoadingRequestCount++
}

function tryHideFullScreenLoading() {
    if (needLoadingRequestCount <= 0) return
    needLoadingRequestCount--
    if (needLoadingRequestCount === 0) {
        endLoading()
    }
}
let sendPostFunc = function(url,payload){
  axios.interceptors.request.use((config)=>{
      // 在发送请求之前做些什么
      // showFullScreenLoading();
      return config;
  }, function (error) {
      // 对请求错误做些什么
      Message.error("请求错误");
      return
  });
  return new Promise((res,rej)=>{
    axios({
      method: 'get',
      url: url,
      params:payload
    }).then(data=>{
      if(data.data.code !=10000){
        router.push({path: "/err",query:{msg:data.data.msg}})
        return;
      }
       res(data)
    }).catch(err=>{
      router.push({path: "/err",query:{msg:"系统异常，请稍后重试"}})
      rej(err)
    })
 })
};

export{
    sendPostFunc
}
