// require => import 구문이랑 비숫한 역할(모듈을 불러옴)
const express=require('express')
const bodyParser=require('body-parser')
const app=express()
app.use(bodyParser.json())
const port=3000  //포트번호

//앞에 :이 붙으면 변수 취급하라는 의미 num1,num2는 변수
//POST "/calc1/100/200"
//데이터를 "주소"를 통해서 보내기(id같은 것을 이용해서 조회할 때 자주 사용)
app.post("/calc1/:num1/:num2",(req,res)=>{
    const num1= +req.params.num1 // +만 붙이면 자동으로 parseInt()
    const num2= +req.params.num2
    res.json({result: num1+num2})
})

//POST /calc2?num1=100&num2=200
//데이터를 "쿼리스트링"을 통해서 보내기 (쇼핑몰에서 조건같은 걸로 거를때)
app.post("/calc2",(req,res)=>{
    const num1= +req.query.num1;
    const num2= +req.query.num2;
    res.json({result: num1+num2})
})

//데이터를 "바디"를 통해서 보내는 방법
app.post("/body_data",(req,res)=>{
    console.log(req.body)
    res.json({})
})
//데이터를 "헤더"를 통해서 보내는 방법
app.post("/calc3",(req,res)=>{
    console.log(JSON.stringify(req.headers));
    const num1= +req.header("My-Number1")
    const num2= +req.header("My-Number2")
    res.json({result : num1+num2})
})

app.listen(port,()=>{
    console.log(`Example app listening on port ${port}`)
})
