// dist/navbar/index.js
var sliderWidth = 96; 
Component({
  /**
   * 组件的属性列表
   */
  externalClasses: ['i-class'],
  properties: {
    tabs: {
      type: Array,
      value: []
    },
    color:{
      type:String,
      value: "#29B6F6"
    },
    fixed:{
      type:Boolean,
      value:false
    },
    activeIndex:{
      type:Number,
      value:0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    sliderOffset: 0,
    sliderLeft: 0,
    slider_width:0,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    tabClick: function (e) {
      let activeIndex = e.currentTarget.id
      this.setData({
        sliderOffset: e.currentTarget.offsetLeft,
        activeIndex: activeIndex
      });
      this.triggerEvent('change', { index: Number(activeIndex)});
    },
  },
  ready:function() {
    var that = this;
    wx.createSelectorQuery().in(this).select('#navbar').fields({
      size: true
    },res=>{
      sliderWidth = res.width / that.data.tabs.length > sliderWidth ? sliderWidth: (res.width / that.data.tabs.length).toFixed(0)
      that.setData({
        slider_width: sliderWidth,
        sliderLeft: (res.width / that.data.tabs.length - sliderWidth) / 2,
        sliderOffset: res.width / that.data.tabs.length * that.data.activeIndex
      });
      }).exec()
  }
})
