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

app.listen(port,() =>{
    console.log(`Example app listening on port ${port}`)
})