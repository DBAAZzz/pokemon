// components/lazyImage/lazyImage.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 传入的图片的src
    src: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    id: '',
    realSrc: ''
  },
  ready() {
    this.setData({
      id: this.randomString(10)
    })
    this._observe = wx.createIntersectionObserver(this)
    this._observe.relativeToViewport()
      .observe(`#image-${this.data.id}`, (res) => {
        let { intersectionRatio } = res
        // 当显示区域出现image时就将src赋值给image
        if (intersectionRatio > 0 && this.data.realSrc == '') {
          this.setData({
            realSrc: this.data.src
          })
        }
      })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 生成随机的字符串
     */
    randomString(len) {
      len = len || 32;
      var $chars = 'abcdefhijkmnprstwxyz2345678'; /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
      var maxPos = $chars.length;
      var pwd = '';
      for (var i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
      }
      return pwd;
    }
  }
})