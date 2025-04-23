let log = console.log
let fs = require('fs')
let loaderUitls = require('loader-utils')
let minify = require('html-minifier').minify

let ssi = {
  merge(root,data){
    data = data.replace(/<!--#set.*?>/g,res=>{
      return ''
    })
    data = data.replace(/<!--#echo.*?>/g,res=>{
      return '/'
    })
    data = data.replace(/<!--#include.*?>/g,res=>{
      let start = res.indexOf('"')
      res = res.substring(start+1,res.indexOf('"',start+1))
      return fs.readFileSync(root+res.slice(7),'utf8')
    })
    return data
  }
}
let compress = {
  html(data){
    data = minify(data,{
      // 去掉注释
      removeComments: true,
      // 去掉空白
      collapseWhitespace: true,
      // 元素之间不留下任何空格
      // collapseInlineTagWhitespace: true,
      // 压缩html中的js
      minifyJS:true,
      // 压缩html中的css
      minifyCSS:true,
    })
    return data
  }
}

module.exports = function(data){
  let option = loaderUitls.getOptions(this)
  let res = ssi.merge(option.root,data)
  res = compress.html(res)
  fs.writeFileSync(option.out,res)
  return ''
}