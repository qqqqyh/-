// pages/food/food.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    location:'山东',
    num:1,  //页数
    listArr:[],//列表信息
    msg:'',
    navBarArr:[
      {
        id:0,
        imgUrl:'../../images/item1.jpg',
        name:'美容养颜'
      },
      {
        id: 1,
        imgUrl: '../../images/item2.jpg',
        name: '保健调养'
      },
      {
        id: 2,
        imgUrl: '../../images/item3.jpg',
        name: '补养'
      },
      {
        id: 3,
        imgUrl: '../../images/item4.jpg',
        name: '减肥'
      },
      {
        id: 4,
        imgUrl: '../../images/item5.jpg',
        name: '母婴'
      },
      {
        id: 5,
        imgUrl: '../../images/item6.jpg',
        name: '气节'
      },
      {
        id: 6,
        imgUrl: '../../images/item7.jpg',
        name: '常见食疗'
      }, {
        id: 7,
        imgUrl: '../../images/item8.jpg',
        name: '维生素'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
 
   wx.request({
     url: 'http://iwenwiki.com:3002/api/foods/list',
     data:{
      city:"上海",
      page: 1
    },
     success:res=>{
       console.log(res);
       if(res.data.status==200){
         console.log(res.data.data.result);
         this.setData({
          listArr:res.data.data.result
        })
     
       }if (res.data.status==500) {
         wx.showLoading({
           title: '无数据，服务器有问题',
         })
         setTimeout(()=>{
           wx.hideLoading()
         },1000)
         
       } else {
         
       }
  
     },
     fail:err=>{
       console.log(1);
       console.log(err);
     }
   })

  },
  onShow:function (){
    console.log(1);
    var cityName = wx.getStorageSync('cityName')
    console.log('cityName',cityName);
    if(cityName){
      this.setData({
        location:cityName
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */

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
   console.log('下拉数据刷新');
   wx.request({
      url: 'http://iwenwiki.com:3002/api/foods/list',
      data:{
        city:'上海',
        page:1
      },
      success:res=>{
        console.log('更新的上海数据', res.data.data.result);
        this.setData({
          listArr: res.data.data.result
        })
      }
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
console.log('xiala');
   this.data.num++
   wx.request({
     url: 'http://iwenwiki.com:3002/api/foods/list',
     data:{
       city:this.data.location,
       page:this.data.num
     },
     success:res=>{
       if(res.data.status==200){
         this.setData({
           listArr:this.data.listArr.concat(res.data.data.result)
         })
       }else{
         this.setData({
           msg:"没数据"
         })
       }
     }
   })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})