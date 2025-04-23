// 与后端交互
let axios= app.axios
let config = app.config

let back = {
  async get(url){
    return new Promise((resolve, reject)=>{
      axios.get(config.backUrl + url)
        .then(res=>{
          resolve(res.data)
        }).catch(err=>{
          reject(err)
        })
    })
  }
}

module.exports = back