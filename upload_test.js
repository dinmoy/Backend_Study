const express=require('express')
const multer = require('multer')

const port = 3000

//multer 미들웨어 설정
const storage=multer.diskStorage({
    destination: function (req,file,cb){
        cb(null,'./uploads')
    },
    filename: function (req,file,cb){
        console.log(file.originalname)
        console.log(file.mimetype)
        const filename = Date.now()+"_"+file.originalname
        cb(null,filename)
    }
})

//미들웨어 
const upload = multer({storage})

const app=express()


app.post("/upload",upload.single("my_file"), (req,res)=>{
    //single : 파일 1개만
    console.log(req.file)
    console.log(req.body)
    res.send("ok")
})

app.post("/photos",upload.array("photo"),(req,res) =>{
    console.log(req.files)
    res.send("ok")
})

app.listen(port,() =>{
    console.log(`Example app listening on port ${port}`)
})