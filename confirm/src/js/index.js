let log = console.log
let dir = console.dir

let global = window

let config = require('./config')
let Object = require('./Object')
let obj = new Object()

obj.copyAttr(global,{
  log,dir,obj,
  dq(key){
    return document.querySelector(key)
  },
  dqa(key){
    return document.querySelectorAll(key)
  },
})
Element.prototype.q = function(key){
  return this.querySelector(key)
}
Element.prototype.qa = function(key){
  return this.querySelectorAll(key)
}

let axios = require('axios')
global.app = {
  axios,config,
}

let page = require('./page/index')
let back = require('./back')

obj.copyAttr(global.app,{
  page,back,
})

page.init()