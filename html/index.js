const fs = require('fs')
const path = require('path')
const mimeType = require('mime-types')

let log = console.log

// 读取文件转换为 base64 编码的 Data URI scheme
function parse(file) {
   // 原始文件地址
  let filePath = path.resolve(file)
  // 获取文件的 memeType
  let fileMimeType = mimeType.lookup(filePath)
  // 读取文件数据
  let data = fs.readFileSync(filePath)
  data = Buffer.from(data).toString('base64')
  // 转换为 data:image/jpeg;base64,***** 格式的字符串
  let base64 = `data:${fileMimeType};base64,${data}`

  return base64
}

// let res = parse('img/favicon.png')
// parse('css/index.css')
// parse('js/index.js')
// fs.writeFileSync('out.txt', res)

// 读取html
let cl = {
  // 把html文件中的图片,css,js合并进文件中
  mergeHtml(file){
    let baseName = path.dirname(file)+'/'
    let data = fs.readFileSync(file,'utf8')
    // <link href="">
    // <script src=""></script>
    data = data.replace(/<link.*?href=".*?">/g,res=>{
      return res.replace(/href=".*?"/g,res=>{
        let file = res.substring(6,res.length-1)
        file=parse(baseName+file)
        return `href="${file}"`
      })
    })
    data = data.replace(/<script src=".*?"><\/script>/g,res=>{
      return res.replace(/src=".*?"/g,res=>{
        let file = res.substring(5,res.length-1)
        file=parse(baseName+file)
        return `src="${file}"`
      })
    })
    return data
  }
}

// node index.js index.html out.html
// 命令 输入html文件名 输出文件名
// 要包含的内容,按输入文件目录去查找
let input = process.argv[2]
let out = process.argv[3]
if(input && out){
  let res = ''
  res = cl.mergeHtml(input)
  fs.writeFileSync(out,res)
}