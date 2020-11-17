const Koa = require('koa')
const fs = require('fs')
const path = require('path')
const {promisify} = require('util')
const getStatus = promisify(fs.stat)
const app = new Koa()
var cors = require('koa2-cors');
app.use(cors());
/*
//    获取文件的大小；
    console.log(stats.size);
//    获取文件最后一次访问的时间；
    console.log(stats.atime.toLocaleString());
//    文件创建的时间；
    console.log(stats.birthtime.toLocaleString());
//    文件最后一次修改时间；
    console.log(stats.mtime.toLocaleString());
//    状态发生变化的时间；
    console.log(stats.ctime.toLocaleString())
//判断是否是目录；是返回true；不是返回false；
    console.log(stats.isFile())
//    判断是否是文件；是返回true、不是返回false；
    console.log(stats.isDirectory())
*/ 
/**
 * 
 * @param {*} path 文件夹绝对路径
 * 读取文件夹的内容返回文件
 */
 function readDir(dirPath){
    let res = []
     return new Promise((resolve,reject)=>{
      fs.readdir(dirPath,async (err,files)=>{
        if(err){
          console.log(err)
          reject(err)
        }else{
          console.log('files',files);
          for(let i = 0;i<files.length;i++){
            let filename= files[i]
            let filePath = path.join(dirPath,filename)
            console.log('filePath',filePath)
            const fileStatus = await getStatus(filePath)
            console.log('fileStatus',fileStatus)
            res.push({
              id:i,
              name:files[i],
              path:filePath,
              mtime:fileStatus.mtime,
              status:0,
              size:fileStatus.size,
              content:{...fileStatus}
            })
          }
          resolve(res)
          /*files.forEach( async filename => {
            let filePath = path.join(dirPath,filename)
            console.log('filePath',filePath)
            /*fs.stat(filePath,(err2,fileStatus)=>{
              if(err2){
                console.log(err2)
                reject(err2)
              }else{
                console.log('fileStatus',fileStatus)
                res.push({
                  path:filePath,
                  status:fileStatus
                })
      
              }
            })
            const fileStatus = await getStatus(filePath)
            console.log('fileStatus',fileStatus)
            res.push({
              path:filePath,
              status:fileStatus
            })
          })*/
        

        }
        
      })
     })
    

  
  
}
app.use(async(ctx,next)=>{
  /*ctx.header("Access-Control-Allow-Origin", "*");

     
  
    ctx.header("Access-Control-Allow-Headers", "*");
    ctx.header("Access-Control-Allow-Methods", "*");*/
  
  
  const files  = await readDir("C:\\Users\\legion\\Desktop")
  console.log(files);
  ctx.body = JSON.stringify(files)
})
app.listen(3000)