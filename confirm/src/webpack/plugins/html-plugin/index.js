let log = console.log

class Plugin{
  constructor(options){
  }
  apply(compiler){
    compiler.plugin('emit', (compilation, callback) => {
      for (let filePathName in compilation.assets) {
        log(filePathName,'===')
        if (/\.html/g.test(filePathName)){
          log(compilation.assets[filePathName].source(),111)
        }
      }
      callback()
    })
  }
}

module.exports = Plugin