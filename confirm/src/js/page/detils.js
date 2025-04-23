let url = {
  // 获取请求?后面的参数
  get(key){
    let data = window.location.search.slice(1)
    let res = {}
    for(let v of data.split('&')){
      let t = v.split('=')
      res[t[0]] = t[1]
    }
    return res[key]
  }
}
let detils = {
  init(){
    let back = app.back
    // ?email=
    let email = url.get('email')
    let role = url.get('role')
    back.get(`/confirmSubscribe/${email}/${role}`).then(data=>{
      if(data.success){
        alert('订阅成功')
      }else{
        alert('订阅失败了')
      }
    })
  },
}

module.exports = detils