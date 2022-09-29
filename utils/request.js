function request(url, data, method, enableHttp2 = true) {
  return new Promise((resolve, reject) => {
    wx.request({
      url,
      data,
      method,
      enableHttp2,
      success: (res) => {
        resolve(res?.data)
      },
      fail: (res) => {
        reject(res)
      }
    })
  })
}

export function post(url, data, method = 'POST') {
  return request(url, data, method)
}

export function get(url, data, method = 'GET',) {
  return request(url, data, method)
}