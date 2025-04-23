let detils = {
  init(){
    let back = app.back
    let self = this
    dq('.vSubscribe').onclick = function(){
      // 验证
      if(!self.name){
        alert('名称不能为空')
        return
      }
      let email = /^.*@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
      if(!email.test(self.email)){
        alert('输入的邮箱不正确')
        return
      }
      back.get(`/applySubscribe/${self.name}/${self.email}/${self.role}`).then(data=>{
        if(data.success){
          alert('申请成功,请到邮箱中确认')
        }else{
          alert('申请失败了')
        }
      })
    }
  },
  get root(){
    return dq('.details')
  },
  get email(){
    return this.root.q('.email').value
  },
  get name(){
    return this.root.q('.name').value
  },
  get role(){
    return this.root.q('input[name=role]:checked').value
  },
}

module.exports = detils