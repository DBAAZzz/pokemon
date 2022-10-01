import { get } from "../../utils/request"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    pokemonDetail: {},
    abilityLoading: true,
    abilityDetail: []
  },
  name: '',

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const { name } = options
    this.name = name
    this.getPokemonDetail()
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

  },

  async getPokemonDetail() {
    let { data } = await get('https://pokemon.fantasticmao.cn/pokemon/detail', {
      nameZh: this.name
    })
    data[0].nameEn = data[0].nameEn.toLowerCase()
    this.setData({
      pokemonDetail: data[0]
    })
    this.getAbilityDetail()
  },



  async getAbilityDetail() {
    let requestArr = []
    if(this.data.pokemonDetail.ability1) {
      requestArr.push(
        get('https://pokemon.fantasticmao.cn/ability/detail', {
          nameZh: this.data.pokemonDetail.ability1
        })
      )
    }
    if(this.data.pokemonDetail.ability2) {
      requestArr.push(
        get('https://pokemon.fantasticmao.cn/ability/detail', {
          nameZh: this.data.pokemonDetail.ability2
        })
      )
    }
    if(this.data.pokemonDetail.abilityHide) {
      requestArr.push(
        get('https://pokemon.fantasticmao.cn/ability/detail', {
          nameZh: this.data.pokemonDetail.abilityHide
        })
      )
    }
    let data = await Promise.all(requestArr)
    let abilityRes = []
    for(let i = 0; i < data.length; i++ ) {
      abilityRes[i] = {
        nameZh: data[i].data[0].nameZh,
        id: data[i].data[0].id,
        detail: data[i].data[0].detail,
      } 
    }
    this.setData({
      abilityLoading: false,
      abilityDetail: abilityRes
    })
  }
})