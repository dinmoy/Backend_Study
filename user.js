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

app.get("/posts",(req,res)=>{
    pool.query("SELECT * FROM user",(err,rows,fields)=>{
        res.json({result: rows })
    })
})

app.get("/posts/:id",(req,res)=>{
    const id=req.params.id
    pool.query("SELECT * FROM user WHERE id = ?",[id],(err,rows.fields)=>{
        if(rows.length===0) res.send({result:null})
        else res.json({result: rows[0]})
    })
})

