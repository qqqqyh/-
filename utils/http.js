//设置数据请求，封装成函数，调用函数时，往里面传参
/*
 *  method: string 请求的方式 get/post
 *  params  发送的参数{ key:value } 
 *  url:    请求的接口地址
 *  message 信息弹框交互数据  loading 
 *  callback 成功的回调函数
 *  error  失败的回调函数
*/
function http(method,params,url,message,callback,error) {
  if (message) {
    // 如果弹窗有数据
    wx.showLoading({
      // 弹出提示框，内容为数据
      title: message,
    })
  }
  wx.request({  
  // 数据请求
    method: method,  //请求方式，看传入的数据方式
    url: 'http://iwenwiki.com:3002' + url, //数据地址 = 数据地址开头+传入的地址后段
    data: params,   //数据请求的参数
    header: { //请求头
      'content-type': 'application/x-www-form-urlencoded' //固定的请丢头
    },
    success:res => {  //请求成功的回调函数
      console.log(res.data);
      if (res.data.status == 200) {   //当请求状态为200时
        wx.showToast({
          title: '数据加载完毕',   //显示消息提框
        })
        callback(res.data) //成功的回调
      } else { //请求不是200
        error('没有数据') //报错没有数据
      }
    },
    fail:err=> {  //请求失败的回调
      error('请求失败')
  
    },
    complete:function(){ 
    
      //数据请求后执行
      wx.hideLoading() // 清除提示框
    }
  })
}
module.exports=http;