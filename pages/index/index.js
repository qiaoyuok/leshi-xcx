//index.js
//获取应用实例
const app = getApp()
var md5 = require("../../utils/md5.js");
console.log(md5)
Page({

  data: {
    username: null,
    password: null
  },

  onLoad: function() {
    var that = this;
    wx.getStorage({
      key: 'login_log',
      success: function(res) {
        console.log(res)
        that.setData({
          username: res.data.username,
          password: res.data.password
        })
      },
    })
  },

  login: function(e) {
    console.log(e)
    wx.showLoading({
      title: '登陆中...',
    })
    var that = this;
    var username = e.detail.value.username;
    var password = e.detail.value.password;
    console.log(Math.random())
    var devid = md5.hex_md5("" + Math.random());
    console.log(devid)
    var sign = md5.hex_md5("8.9.9" + username + password + devid + "e3F5gIfT3zj43MAc3F");
    wx.request({
      url: 'https://vip.yhqq.top',
      data: {
        loginname: username,
        password: password,
        sign: sign,
        devid: devid
      },
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      method: 'POST',
      success: function(res) {
        console.log(res)
        wx.hideLoading();
        if (res.data.status == 1) {
          wx.setStorage({
            key: 'login_log',
            data: {
              username: username,
              password: password,
            },
          })
          wx.showToast({
            icon:"none",
            title: '恭喜：登录测试成功，在官网或APP上可无障碍登录',
          })
        } else {
          wx.showToast({
            icon: "none",
            title: res.data.message,
          })
        }
      },
    })
  }
})