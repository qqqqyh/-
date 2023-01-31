// pages/citys/citys.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hotCitys:[]
  },
  getLocation:function(){
wx.getLocation({
  success:res =>{
    console.log(res);
    wx.request({
      url: 'http://iwenwiki.com:3002/api/lbs/location',
      data:{
        latitude:res.latitude,
        longitude:res.longitude
      },
      success:result=>{
        console.log(result);
        var citys = result.data.result.ad_info.city;
        var cityName = citys.slice(0, citys.length-1);
        console.log(citys);
        wx.setStorageSync('cityName', cityName);
        wx.switchTab({
          url: '../food/food',
        })  
      }
    })
  }
})
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
wx.request({
  url: 'http://iwenwiki.com:3002/api/hot/city',
  success:res=>{
    this.setData({
      hotCitys:res.data.data
    })
  }
})
  },
  selectCity:function(e){
    var citys=e.currentTarget.dataset.val
    wx.setStorageSync('cityName', citys);
    wx.switchTab({
      url: '../food/food',
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})