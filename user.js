const express=require(`express`)
const bodyParser=require('body-parser')
const mysql=require('mysql2')

const app=express()
app.use(bodyParser.json())

const port=3000
const pool=mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'hozu'
})

app.post("/posts",(req,res)=>{
    pool.query(
        "INSERT INTO post(email,password,name,roles,createdAt) VALUES(?,?,?,?,now())",
        [req.body.email,req.body.password,req.body.name,req.body.roles],
        (err,rows,fields)=>{
            if(err) res.status(400).json({result: err})
            else res.json({result:"ok"})
        }
    )
})

