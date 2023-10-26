// require => import 구문이랑 비숫한 역할(모듈을 불러옴)
const express=require('express')
const app=express()
//포트 번호
const port=3000

//GET요청
//주소 "/"
//req => 요청 메시지 객체 , res => 응답메시지 객체
app.get('/',(req,res)=>{
    //응답 메시지의 body에 들어감
    res.send('Hello World!');
})

app.get("/hello",(req,res)=>{
    res.header("Content-Type","text/plain");
    res.send("<h1>Hello</h1>");
})

app.get("/data",(req,res)=>{
    //json을 보내는 send 내부적으로 자동으로 content-type을 applicaion으로 바꿔줌
    res.json({name: "John",age: 20 })
})

//GET POST PUT PATCH DELETE
let array=[]
app.get("/array",(req,res)=>{
    res.json(array)
})

app.post("/array",(req,res)=>{
    array.push({content: array.length+1})
    res.json({result:"ok"})
})

// Q) DELETE/array HTTP 1.1
app.delete("/array",(req,res) =>{
    array=[]
    res.json({result:"ok"})
})
app.listen(port,()=>{
    console.log(`Example app listening on port ${port}`)
})
