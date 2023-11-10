const bcrypt=require('bcrypt')
const SALT_ROUNDS=10
const plainPAssword="1234"

bcrypt.hash(plainPAssword,SALT_ROUNDS,function(err,hash){
    console.log(hash)
})