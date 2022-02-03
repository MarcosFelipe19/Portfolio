require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const routerApi = require('./routes/api')
const routerUser = require('./routes/userRoute')
const routerAdmin = require('./routes/adminRoute')
const app = express()

mongoose.connect(process.env.MONGO_CONNECTION_URL, (erro)=>{
    if(erro){
        console.log(erro)
    }else{
        console.log('Mongo cennection')
    }
})

app.use('/',express.static(path.join(__dirname, 'public')))
app.use('/api', express.json() , routerApi)
app.use('/user', routerUser)
app.use('/admin', express.urlencoded({extended:true}),  routerAdmin)


app.listen(process.env.PORT, ()=>{
    console.log('servidor rodando na porta:' + process.env.PORT)
})
