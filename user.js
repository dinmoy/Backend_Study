const express=require(`express`)
const bodyParser=require('body-parser')
const mysql=require('mysql2')
const bcrypt=require('bcrypt')
const session=require('express-session')

const app=express()
app.use(session({
    secret: 'secret',
    resave:false,
    saveUninitialized:true,
    cookie: {
        maxAge: hour
    }
}))
const SALT_ROUNDS=10

const port=3000
const pool=mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'hozu'
})

//로그인 여부 확인 관련 미들웨어 추가
const loginRequired=function(req,res,next){
    if(req.session.user){
        next()
    }else{
        res.status(440).json({result: "현재 로그인 상태가 아닙니다"})
    }
}

app.post("/api/user",(req,res)=>{
    bcrypy.hash(req.body.password,SALT_ROUNDS,function(err,hash){
        pool.query(
            "INSERT INTO post(email,password,name,roles,createdAt) VALUES(?,?,?,?,now())",
            [req.body.email,hash,req.body.name,req.body.roles],
            (err,rows,fields)=>{
                if(err) res.status(400).json({result: err})
                else res.json({result:"ok"})
            }
        )
    })
   
})

app.get("/api/user",(req,res)=>{
    pool.query("SELECT * FROM user",(err,rows,fields)=>{
        res.json({result: rows })
    })
})

app.get("/api/user:id",(req,res)=>{
    const id=req.params.id
    pool.query("SELECT * FROM user WHERE id = ?",[id],(err,rows.fields)=>{
        if(rows.length===0) res.send({result:null})
        else res.json({result: rows[0]})
    })
})

app.delete ("/api/user:id",(req,res)=>{
    const id= req.params.id
    pool.query("DELETE FORM user WHERE id = ?",
    [id],
    function(err,rows,fields){
        if(rows,affectedRows===0){
            res.status(404).json({result:null})
        }else{
            res.json({result:"ok"})
        }
    })
})

app.patch("/api/user/:id",(req,res)=>{
    const id=req.params.id
    pool.query(
        "SELECT * FORM user WHERE id = ?",
        [id],
        function(err,rows,fields){
            if(rows.length===0) res.status(404).
        }
    )
})