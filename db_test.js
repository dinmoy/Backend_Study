const mysql=require('mysql2');

const pool=mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'hozu'
})

pool.query(`SELECT 1 FROM dual`,function(err,rows,fields){
    console.log(rows)
    pool.end()
})



