const express=require('express')
const bodyParser=require('body-parser')
const mysql=require('mysql2')

const app=express()
app.use(bodyParser.json())

const port=3000
const pool=mysql.createPool({ //커넥션을 만들어놓고 쓸 수 있는
        host: 'localhost',
        user: 'root',
        password: '1234',
        database: 'hozu'
})

app.post("/posts",(req,res)=>{
    //여기서 게시글 생성과 관련된 작업 진행
    pool.query(
        "INSERT INTO post(title,author,createdAt,content) VALUES(?,?,now(),?)",
        [req.body.title,req.body.author,req.body.content],
        (err,rows,fields)=>{
            if(err) res.status(400).json({result: err})
            else res.json({result:"ok"})
        }
    )
})

app.get("/posts",(req,res)=>{
    pool.query("SELECT * FROM post",(err,rows,fields)=>{
        res.json({ result: rows })
    })
})

app.get("/posts/:id",(req,res)=>{
    const id=req.params.id
    pool.query("SELECT * FROM post WHERE id = ?",[id],(err,rows,fields)=>{
        if(rows.length===0) res.send({result:null})
        else res.json({result: rows[0]})
    })
})

app.delete("/posts/:id",(req,res)=>{
    const id=req.params.id
    pool.query("DELETE FROM post WHERE id = ?",
        [id],
        function(err,rows,fields){
            if(rows.affectedRows===0){
                res.status(404).json({result: null})
            }else{
                res.json({result: "ok"})
            }
        }
    )
})

app.listen(port,() =>{
    console.log(`Example app listening on port ${port}`)
})