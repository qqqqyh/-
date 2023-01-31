var http = require('../../utils/http.js')
Page({
  data: {
    current: 1,
    bannerArr: [],
    list:[]
  },
  //1.swiper轮播的时候触发事件 swiperChange
  swiperChange:function(e){
    // console.log(e.detail);//获取当前的轮播的位置的current  修改data里面的数据 current 页面数据同步修改
    this.setData({
      current: e.detail.current+1
    })
  },
  onLoad: function () {
    console.log(http);
    http('get','','/api/banner','加载中',(res)=>{
      console.log(res);
         this.setData({
              bannerArr: res.data
          })
    });
    http('get','','/api/indexlist','数据加载中',(res)=>{
      console.log('leibiao',res);
      this.setData({
        list:res.data
      })
    })
  },
  onReachBottom() {
   wx.showToast({
     title: '到底了'
   })
  },
})